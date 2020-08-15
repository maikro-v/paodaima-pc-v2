<template>
  <layout
    :scroll-disabled="isHideMoreHotArticle"
    :header-colored-distance="10"
    class="detail"
    @load="load"
  >
    <div class="container">
      <div class="container__fix_top">
        <!-- 操作 -->
        <div class="action">
          <el-badge class="action__box" :value="info.like_count || 0" type="primary">
            <span class="action__item" @click="goFabulous">
              <i class="action__icon iconfont icon-dianzan" />
            </span>
          </el-badge>
          <el-badge class="action__box" :value="info.comment_count || 0" type="primary">
            <span class="action__item" @click="goComment">
              <i class="action__icon iconfont icon-pinglun" />
            </span>
          </el-badge>
          <!--        <p class="action__title">-->
          <!--          分享-->
          <!--        </p>-->
          <!--        <el-badge class="action__box" :value="0" hidden>-->
          <!--          <span class="action__item">-->
          <!--            <i class="action__icon iconfont icon-weibo" />-->
          <!--          </span>-->
          <!--        </el-badge>-->
          <!--        <el-badge class="action__box" :value="0" hidden>-->
          <!--          <span class="action__item">-->
          <!--            <i class="action__icon iconfont icon-qq" />-->
          <!--          </span>-->
          <!--        </el-badge>-->
          <!--        <el-badge class="action__box" :value="0" hidden>-->
          <!--          <span class="action__item">-->
          <!--            <i class="action__icon iconfont icon-weixin" />-->
          <!--          </span>-->
          <!--        </el-badge>-->
        </div>
      </div>
      <el-row ref="detail" type="flex" :gutter="24">
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <el-card class="main">
            <!-- 文章内容 -->
            <article-content ref="articleContent" :data="info" />
            <!-- 评论 -->
            <article-comment ref="comment" v-model="commentContent" :loading="isShowCommentLoading" class="main__comment" @on-submit="handleComment" />
            <!-- 评论列表 -->
            <article-comment-list :loading="isShowReplyLoading" :data="commentList" @on-submit="handleCommentReply" />
            <!-- 查看更多评论 -->
            <div class="main__btn">
              <el-button v-show="!isHideMoreComment" type="primary" size="mini" @click="loadComment">
                查看更多
              </el-button>
              <el-divider v-if="isHideMoreComment">
                没有更多了
              </el-divider>
            </div>
          </el-card>
          <div class="mt">
            <article-item
              v-for="item in hotArticleList"
              :key="item.id"
              :data="item"
              :show-image="false"
              class="recommend"
              :to="item.id | toPath"
            />
          </div>
          <el-divider v-if="isHideMoreHotArticle">
            没有更多数据了
          </el-divider>
        </el-col>
        <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
          <!-- 作者信息 -->
          <side-author :author="info.author || {}" link />
          <side-menu v-if="articleRecommendList && articleRecommendList.length > 0" title="相关推荐" :show-footer="false" class="mt">
            <side-menu-item
              v-for="item in articleRecommendList"
              :key="item.id"
              :to="item.id | toPath"
            >
              {{ item.title }}
            </side-menu-item>
          </side-menu>
          <article-toc :toc="tocList" class="side-article-toc" />
        </el-col>
      </el-row>
    </div>
  </layout>
</template>

<script>
import dayjs from 'dayjs'
import stickybits from 'stickybits'
import { mapActions, mapMutations } from 'vuex'
import { getToken } from '@/libs/utils'
import sideAuthor from '@/components/side-author'
import articleContent from '@/components/article-content'
import articleComment from '@/components/article-comment'
import articleCommentList from '@/components/article-comment-list'
import articleItem from '@/components/article-item'
import articleToc from '@/components/article-toc'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
import layout from '@/components/layout'
export default {
  components: { sideAuthor, articleContent, articleComment, articleCommentList, sideMenu, sideMenuItem, articleItem, articleToc, layout },
  filters: {
    toPath(id) {
      return {
        name: 'article-detail-id',
        params: {
          id
        }
      }
    }
  },
  async asyncData({ app, params }) {
    const page = 1
    const articleId = params.id
    try {
      // 推荐文章
      const articleRecommendData = await app.$api.article.recommend({
        page,
        topic_id: articleId
      })
      // 热门文章
      const hotArticleData = await app.$api.article.hot({
        page,
        topic_id: articleId
      })
      const detailData = await app.$api.article.detail(params.id)
      return {
        id: articleId,
        info: detailData.data,
        articleRecommendList: articleRecommendData.data.data,
        hotArticleList: hotArticleData.data.data,
        page,
        totalPage: hotArticleData.data.page.total_page
      }
    } catch (err) {
      console.log(err)
      return err
    }
  },
  data() {
    return {
      id: null, // 文章id
      info: {}, // 详情
      commentList: [], // 评论列表
      commentContent: '', // 评论内容
      isShowCommentLoading: false, // 控制评论loading
      isShowReplyLoading: false, // 控制评论回复loading
      commentPage: 1, // 评论分页
      commentTotalPage: 0, // 评论总分页
      articleRecommendList: [], // 推荐文章
      page: 0, // 热门文章当前分页
      totalPage: 0, // 热门文章总分页数
      hotArticleList: [], // 热门文章
      entryTime: new Date().getTime(), // 进入时间
      tocList: [] // 文章目录列表
    }
  },
  computed: {
    isHideMoreComment() {
      return this.commentPage > this.commentTotalPage
    },
    isHideMoreHotArticle() {
      return this.page >= this.totalPage
    }
  },
  created() {
    this.getCommentList()
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.addVisitor()
  },
  methods: {
    ...mapActions('user', ['visitorLogin', 'getUserInfo']),
    ...mapMutations('user', ['SET_HAS_LOGIN']),
    load() {
      this.page++
      this.getData()
    },
    // 初始化
    async init() {
      this.setToc()
      if (getToken()) {
        return
      }
      // 如果用户没有登录，需要先登录，增加访客接口需要
      try {
        // 游客身份登录
        await this.visitorLogin()
        // await this.getUserInfo()
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 获取目录
    setToc() {
      // 获取目录列表
      this.$refs.articleContent.getToc().then((toc) => {
        this.tocList = toc
      })
      // 设置沾性定位
      stickybits('.side-article-toc', {
        stickyBitStickyOffset: 100,
        useStickyClasses: true
      })
    },
    // 点击评论聚焦
    goComment() {
      this.$refs.comment.$refs.input.focus()
    },
    // 点赞
    goFabulous() {
      this.$api.article.like({
        topic_id: this.id, // 文章id
        author_id: this.info.author.id
      }).then(({ data }) => {
        if (data === 1) {
          this.$message.success('点赞成功')
          this.info.like_count++
        } else {
          this.$message.info('已取消点赞')
          this.info.like_count--
          this.info.like_count = this.info.like_count < 0 ? 0 : this.info.like_count
        }
      })
    },
    // 增加访客
    addVisitor() {
      this.$api.article.addVisitor({
        origin: 0, // 来源
        stay_time: dayjs().$s - dayjs(this.entryTime).$s, // 停留时长 单位：秒
        topic_id: this.id // 文章id
      })
    },
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
    // 获取评论列表
    getCommentList() {
      this.$api.comment.page({
        page: this.commentPage,
        topic_id: this.id
      }).then(({ data }) => {
        this.commentList.push(...data.data)
        this.commentTotalPage = data.page.total_page
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 加载评论
    loadComment() {
      if (this.commentPage > this.commentTotalPage) {
        return
      }
      this.commentPage++
      this.getCommentList()
    },
    // 热门文章
    async getData() {
      const hotArticleData = await this.$api.article.hot({
        page: this.page,
        topic_id: this.articleId
      })
      this.hotArticleList.push(...hotArticleData.data.data)
    },
    toArticleDetail(id) {
      this.$router.push({
        name: 'article-detail-id',
        params: {
          id
        }
      })
    }
  },
  head() {
    return {
      title: this.info.title || '',
      meta: [
        { hid: 'description', name: 'description', content: this.info.description },
        { hid: 'description', name: 'keyword', content: this.info.description },
        { name: 'aplus-xplug', content: 'NONE' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .mt {
    margin-top: 30px;
  }
  .sticky {
    position: sticky;
    top: 100px;
  }
  .banner {
    height: 400px;
    /*background: red;*/
    margin-top: 60px;
    &__img {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
    & + .detail {
      margin-top: 40px !important;
    }
  }
  .detail {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='8.58'%3E%3Cpath transform='translate(-4.9 -2.8) rotate(-2.8 1409 581) scale(0.979)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='2.8600000000000003' transform='translate(-17.5 7) rotate(-1.4 800 450) scale(0.997)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(-4.9 10.5) rotate(-17.5 401 736) scale(0.997)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='2.6'%3E%3Cpath transform='translate(42 4.2) rotate(-1.05 150 345) scale(1.007)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='5.720000000000001' transform='translate(10.5 -21) rotate(-25.2 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-2.8 -2.8) rotate(-4.2 1400 132) scale(0.965)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
  .container{
    position: relative;
    @include container;
    margin-top: 100px;
    &__fix_top{
      position: fixed;
    }
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
    // position: fixed;
    position: absolute;
    top: 30px;
    left: -80px;
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
  .side-article-toc {
    margin-top: 20px;
  }
  /deep/ .recommend.article-item {
    border-color: transparent !important;
    border-bottom-color: #EBEEF5 !important;
  }
  @media screen and (max-width: 750px) {
    .detail {
      /*margin-left: 10px;*/
      /*margin-right: 10px;*/
      padding-bottom: 52px;
    }
    .main {
      &__comment {
        margin-top: 0;
      }
    }
  }
</style>
