<template>
  <div class="detail">
    <el-row type="flex" :gutter="14">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-card shadow="hover" class="main">
          <!-- 文章内容 -->
          <article-content />
          <!-- 评论 -->
          <article-comment class="main__comment" />
          <!-- 评论列表 -->
          <article-comment-list />
          <!-- 查看更多评论 -->
          <div class="main__btn">
            <el-button type="primary" size="mini">
              查看更多
            </el-button>
          </div>
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
        </el-card>
      </el-col>
      <el-col class="hidden-sm-and-down" :lg="6" :xl="6">
        <!-- 作者信息 -->
        <article-author />
        <side-menu title="相关文章" :show-footer="false" class="side__list">
          <side-menu-item>相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章相关文章</side-menu-item>
        </side-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleAuthor from '@/components/article-author'
import articleContent from '@/components/article-content'
import articleComment from '@/components/article-comment'
import articleCommentList from '@/components/article-comment-list'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
export default {
  layout: 'common',
  components: { articleAuthor, articleContent, articleComment, articleCommentList, sideMenu, sideMenuItem },
  // asyncData({ params }) {
  // },
  data() {
    return {
      articlePage: {
        current: 1,
        totalPage: 0
      },
      input2: '',
      commentList: []
    }
  },
  computed: {
    isMore() {
      return this.articlePage.current <= this.articlePage.totalPage
    }
  },
  created() {
    // this.getMomentList()
  },
  methods: {
    // 获取列表
    getMomentList(params) {
      // commentPage({page:++this.articlePage.current,topic_id:this.articleInfo.id}).then(res=>{
      //   this.commentList.push(...res.data.data)
      //   this.articlePage.current=res.data['current_page']
      //   this.articlePage.totalPage=res.data['total_page']
      // })
    },
    // 加载更多
    loadMore() {
      // if(this.isMore){
      //   this.getMomentList()
      // }
    },
    // 评论
    createComment(form) {
      // commentCreate({topic_id:this.articleInfo.id,...form}).then(res=>{
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
