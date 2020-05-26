<template>
  <div class="article-comment-list">
    <div v-for="item in _datas" :key="item.id" class="row list">
      <el-avatar size="medium" :src="item.avatar" />
      <div class="col detail">
        <p class="name">
          {{ item.name }}
        </p>
        <main class="main">
          <template v-if="item.comment_id">
            回复<span class="main__user">{{ item.target_name }}：</span>
          </template>
          {{ item.content }}
        </main>
        <footer class="footer clear">
          <span class="time lf">{{ item.create_time | time }}</span>
          <span class="rf footer__action" @click="handleReply(item)">
            <i class="el-icon-chat-square" />
            回复
          </span>
        </footer>
        <article-comment-list v-if="item.children && item.children.length" :data="item.children" :can-reply="false" @on-reply="handleReply" />
        <div v-if="canReply && isShowReply" class="reply row align-center">
          <el-input :ref="replyRef" v-model="replyContent" :placeholder="`回复 ${target.name}`" size="small" />
          <el-button :loading="_loading" type="primary" size="small" class="reply__btn" @click="submit(item.id)">
            回复
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ArticleCommentList',
  props: {
    data: {
      type: Array,
      required: true
    },
    // 是否有回复框
    canReply: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowReply: false, // 是否显示回复框
      replyContent: '', // 回复内容
      target: {}, // 回复对象
      replyRef: `ref-${(new Date().getTime() + Math.random() * 1000).toFixed(0)}`
    }
  },
  computed: {
    _datas() {
      return this.data || []
    },
    _loading() {
      return this.loading
    }
  },
  methods: {
    handleReply(row) {
      this.target = row
      // 有输入框，最外层的评论才有回复输入框
      if (this.canReply) {
        this.isShowReply = true
        this.$nextTick(() => {
          this.$refs[this.replyRef][0].focus()
        })
      } else {
        this.$emit('on-reply', row)
      }
    },
    submit(root) {
      if (this.replyContent.trim() === '') {
        return this.$message.error('请输入内容')
      }
      this.$emit('on-submit', {
        root,
        value: this.replyContent,
        target: this.target
      })
      this.replyContent = ''
    }
  },
  filters: {
    time(val) {
      return val ? dayjs(val).format('YYYY-MM-DD hh:mm:ss') : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-comment-list {
    margin-top: 10px;
    display: block;
    .article-comment-list {
      padding: 10px;
      background: #f8f8f8;
      border-radius: 6px;
    }
  }
  .list {
    padding: 6px 0;
  }
  .detail {
    width: 100%;
    margin-left: 10px;
    border-bottom: $border;
    padding-bottom: 10px;
  }
  .name {
    font-size: 14px;
    font-weight: bold;
    margin-top: 4px;
  }
  .main {
    @include fontMain;
    margin-top: 10px;
    line-height: 1.5;
    &__user {
      margin-left: 6px;
      color: $primary;
      font-weight: bold;
      // margin-right: 10px;
    }
  }
  .footer {
    margin-top: 10px;
    margin-bottom: 10px;
    @include fontMain;
    &__action {
      cursor: pointer;
    }
  }
  .reply {
    padding: 10px;
    background: #f8f8f8;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    &__btn {
      margin-left: 10px;
    }
  }
</style>
