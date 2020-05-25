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
          <span class="rf footer__action" @click="handleReply(item.id, item)">
            <i class="el-icon-chat-square" />
            回复
          </span>
        </footer>
        <article-comment-list v-if="item.children && item.children.length" :data="item.children" @on-reply="(row) => handleReply(item.id, row)" />
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
    }
  },
  data() {
    return {
    }
  },
  computed: {
    _datas() {
      return this.data || []
    }
  },
  methods: {
    handleReply(root, row) {
      this.$emit('on-reply', {
        root,
        target: row
      })
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
    @include fontMain;
    &__action {
      cursor: pointer;
    }
  }
</style>
