<template>
  <div class="row article-comment-item">
    <el-avatar :src="item.avatar" size="50px" class="avatar" />
    <div class="col detail">
      <p class="name">
        {{ item.username }}
      </p>
      <main class="main">
        <!--        回复<span class="main__user">张三：</span>-->
        {{ item.content }}
      </main>
      <footer class="footer clear">
        <time class="time lf">{{ item.create_time | toDate }}</time>
      <!--        <span v-show="!showReply" class="rf footer__action" @click="handleAction">-->
      <!--          <i class="el-icon-chat-square" />-->
      <!--          回复-->
      <!--        </span>-->
      </footer>
      <template v-if="item.children && item.children.length">
        <article-comment-item
          v-for="child in item.children"
          :key="child.id"
          :item="child"
        />
      </template>
      <div v-show="showReply" class="comment-reply">
        <article-comment ref="comment" v-model="commentContent" class="main__comment" @on-submit="handleReply" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import articleComment from '../article-comment'
export default {
  name: 'ArticleCommentItem',
  components: {
    articleComment
  },
  filters: {
    toDate(val) {
      return val ? dayjs(val).format('YYYY-MM-DD hh:mm:ss') : ''
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    showReply: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commentContent: ''
    }
  },
  methods: {
    handleAction() {
      this.$emit('reply')
    },
    handleReply() {
      this.$emit('submit', {
        targetId: null,
        content: this.commentContent
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-comment-item {
    padding: 12px 0;
  }
  .avatar {
    box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
  }
  .detail {
    width: 100%;
    margin-left: 16px;
    border-bottom: 1px solid #f3f3f3;
  }
  .name {
    font-size: 16px;
    font-weight: bold;
    margin-top: 4px;
  }
  .main {
    @include fontMain;
    margin-top: 6px;
    line-height: 1.5;
    font-weight: normal;
    &__user {
       margin-left: 6px;
       color: $primary;
       font-weight: bold;
     }
  }
  .footer {
    margin-top: 10px;
    margin-bottom: 10px;
    &__action {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .time {
    font-size: 12px;
  }
  .comment-reply {
    margin-bottom: 10px;
    &__btn {
      margin-top: 4px;
    }
  }
</style>
