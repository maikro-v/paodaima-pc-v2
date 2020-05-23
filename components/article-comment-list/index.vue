<template>
  <div class="article-comment-list">
    <div class="row">
      <el-avatar size="medium" :src="require('@/assets/images/avatar.jpg')" />
      <div class="col detail">
        <p class="name">
          用户名
        </p>
        <main class="main">
          评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
        </main>
        <footer class="footer clear">
          <span class="time lf">2020-05-23</span>
          <span class="rf footer__action">
            <i class="el-icon-chat-square" />
            回复
          </span>
        </footer>
        <!-- <article-comment-list /> -->
        <div class="article-comment-list">
          <div class="row">
            <el-avatar size="medium" :src="require('@/assets/images/avatar.jpg')" />
            <div class="col detail">
              <p class="name">
                用户名
              </p>
              <main class="main">
                回复<span class="main__user">用户名：</span>
                评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
              </main>
              <footer class="footer clear">
                <span class="time lf">2020-05-23</span>
                <span class="rf footer__action">
                  <i class="el-icon-chat-square" />
                  回复
                </span>
              </footer>
              <!-- <article-comment-list /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCommentList',
  data() {
    return {
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
