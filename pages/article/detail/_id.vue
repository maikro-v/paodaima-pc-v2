<template>
  <div class="detail">
    <el-row type="flex" :gutter="14">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-card shadow="hover" class="main">
          <!-- 文章内容 -->
          <article-content :data="info" />
          <!-- 评论 -->
          <article-comment v-model="commentContent" :loading="isShowCommentLoading" class="main__comment" @on-submit="handleComment" />
          <!-- 评论列表 -->
          <article-comment-list :loading="isShowReplyLoading" :data="commentList" @on-submit="handleCommentReply" />
          <!-- 查看更多评论 -->
          <div class="main__btn">
            <el-button v-show="!isHideMoreComment" type="primary" size="mini" @click="loadComment">
              查看更多
            </el-button>
          </div>
        </el-card>
        <side-menu title="相关文章" :show-footer="false" class="mt">
          <article-item v-for="item in articleRecommendList" :key="item.id" :data="item" :show-image="false" class="recommend" />
        </side-menu>
      </el-col>
      <el-col class="hidden-sm-and-down" :lg="6" :xl="6">
        <!-- 作者信息 -->
        <article-author />
        <side-menu title="热门文章" :show-footer="false" class="mt">
          <side-menu-item>相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章</side-menu-item>
        </side-menu>
      </el-col>
    </el-row>
    <!-- 操作 -->
    <div class="action">
      <el-badge class="action__box" :value="12" type="primary">
        <span class="action__item">
          <i class="action__icon iconfont icon-dianzan" />
        </span>
      </el-badge>
      <el-badge class="action__box" :value="19" type="primary">
        <span class="action__item">
          <i class="action__icon iconfont icon-pinglun" />
        </span>
      </el-badge>
      <p class="action__title">
        分享
      </p>
      <el-badge class="action__box" :value="0" hidden>
        <span class="action__item">
          <i class="action__icon iconfont icon-weibo" />
        </span>
      </el-badge>
      <el-badge class="action__box" :value="0" hidden>
        <span class="action__item">
          <i class="action__icon iconfont icon-qq" />
        </span>
      </el-badge>
      <el-badge class="action__box" :value="0" hidden>
        <span class="action__item">
          <i class="action__icon iconfont icon-weixin" />
        </span>
      </el-badge>
    </div>
  </div>
</template>

<script>
import articleAuthor from '@/components/article-author'
import articleContent from '@/components/article-content'
import articleComment from '@/components/article-comment'
import articleCommentList from '@/components/article-comment-list'
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
export default {
  layout: 'common',
  components: { articleAuthor, articleContent, articleComment, articleCommentList, sideMenu, sideMenuItem, articleItem },
  async asyncData({ app, params }) {
    const page = 1
    const articleId = params.id
    try {
      const articleRecommendData = await app.$api.article.recommend({
        page,
        topic_id: articleId
      })
      const detailData = await app.$api.article.detail(params.id)
      return {
        id: articleId,
        info: detailData.data,
        articleRecommendList: articleRecommendData.data.data
      }
    } catch (err) {
      console.log(err)
      return err
    }
  },
  data() {
    return {
      // page: 1,
      // totalPage: 0,
      // articleList: [],
      id: null, // 文章id
      info: {}, // 详情
      commentList: [], // 评论列表
      commentContent: '', // 评论内容
      isShowCommentLoading: false, // 控制评论loading
      isShowReplyLoading: false, // 控制评论回复loading
      commentPage: 1, // 评论分页
      commentTotalPage: 0, // 评论总分页
      articleRecommendList: [] // 推荐文章
    }
  },
  computed: {
    isHideMoreComment() {
      return this.commentPage > this.commentTotalPage
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    // 评论
    handleComment() {
      this.isShowCommentLoading = true
      this.handleCommentSubmit({
        topic_id: this.id,
        content: this.commentContent
      })
    },
    // 回复评论
    handleCommentReply(row) {
      this.isShowReplyLoading = true
      this.handleCommentSubmit({
        topic_id: this.id,
        content: row.value,
        target_id: row.target.id,
        target_user_id: row.target.user_id,
        comment_id: row.root
      })
    },
    // 提交评论
    handleCommentSubmit(data) {
      this.$api.comment.add(data).then(() => {
        this.$message.success('评论成功')
        this.commentContent = ''
        // this.getCommentList()
      }).catch((err) => {
        this.$message.error(err)
      }).finally(() => {
        this.isShowCommentLoading = false
        this.isShowReplyLoading = false
      })
    },
    getCommentList() {
      this.$api.comment.page({
        page: this.commentPage,
        topic_id: this.id
      }).then(({ data }) => {
        this.commentList.push(...data.data)
        this.commentTotalPage = data.page.total_page
        console.log(this.commentPage, this.commentTotalPage)
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    loadComment() {
      if (this.commentPage > this.commentTotalPage) {
        return
      }
      this.commentPage++
      this.getCommentList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .mt {
    margin-top: 16px;
  }
  .detail{
   position: relative;
   margin-top: 30px;
   @include container;
  }
  .main {
    &__comment {
      margin-top: 60px;
    }
    &__btn {
      text-align: center;
      margin-top: 20px;
    }
  }
  .action {
    position: fixed;
    top: 20%;
    left: 80px;
    &__box {
      display: block;
    }
    &__item {
      position: relative;
      width: 36px;
      height: 36px;
      line-height: 36px;
      border-radius: 50%;
      border: 1px solid rgba($primary, .2);
      background-color: #fff;
      margin-bottom: 8px;
      box-shadow: 2px 2px 10px rgba($primary, .4);
      text-align: center;
      display: block;
      cursor: pointer;
    }
    &__icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      color: $textColor;
    }
    &__title {
      @include fontMain;
      margin-top: 20px;
      margin-bottom: 10px;
      text-align: center;
    }
    &__item:hover &__icon {
      color: $titleColor;
    }
  }
  .side__list {
    margin-top: 16px;
  }
  /deep/ .recommend.article-item {
    border-color: transparent !important;
    border-bottom-color: #EBEEF5 !important;
  }
</style>
