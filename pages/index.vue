<template>
  <layout @load="load" :scrollDisabled="scrollDisabled">
    <div class="home">
      <header class="banner">
<!--        <img src="@/assets/svg/1.svg" class="banner__img">-->
      </header>
      <main class="main">
        <el-row type="flex" :gutter="24">
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <section class="article">
              <article-item
                v-for="item in articleList"
                :key="item.id"
                :data="item"
                :to="item.id | toPath"
                target="_blank"
              />
              <el-divider v-if="isLoadEnd">
                没有更多数据了
              </el-divider>
            </section>
          </el-col>
          <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
            <aside>
              <!-- <hot-article class="side-menu__list" /> -->
              <side-menu v-if="hotArticleList && hotArticleList.length" title="热门" :show-footer="false" class="side-menu__list">
                <side-menu-item
                  v-for="item in hotArticleList"
                  :key="item.id"
                  :to="item.id | toPath"
                  target="_blank"
                >
                  {{ item.title }}
                </side-menu-item>
              </side-menu>
              <side-menu v-if="recommendArticleList && recommendArticleList.length > 0" title="推荐" :show-footer="false" class="side-menu__list">
                <side-menu-item
                  v-for="item in recommendArticleList"
                  :key="item.id"
                  :to="item.id | toPath"
                  target="_blank"
                >
                  {{ item.title }}
                </side-menu-item>
              </side-menu>
            </aside>
          </el-col>
        </el-row>
      </main>
    </div>
    <app-footer />
  </layout>
</template>

<script>
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
import appFooter from '@/components/app-footer'
import layout from '@/components/layout'
export default {
  components: { articleItem, sideMenu, sideMenuItem, layout, appFooter },
  async asyncData({ app }) {
    const page = 1
    try {
      // 文章列表
      const { data } = await app.$api.article.page({
        page
      })
      // 推荐的文章
      const recommendArticle = await app.$api.article.recommend({
        page
      })
      // 热门文章
      const hotArticle = await app.$api.article.hot({
        page
      })
      return {
        page,
        totalPage: data.page.total_page,
        articleList: data.data,
        recommendArticleList: recommendArticle.data.data,
        hotArticleList: hotArticle.data.data
      }
    } catch (err) {
      return err
    }
  },
  data() {
    return {
      page: 1,
      totalPage: 0,
      articleList: [], // 文章列表
      recommendArticleList: [], // 推荐文章列表
      hotArticleList: [], // 热门文章列表
      scrollDisabled: false // 是否禁用滚动加载
    }
  },
  computed: {
    isLoadEnd() {
      return this.page >= this.totalPage || this.scrollDisabled
    }
  },
  methods: {
    load() {
      this.page++
      this.getData()
    },
    async getData() {
      this.scrollDisabled = true
      try {
        const { data } = await this.$api.article.page({
          page: this.page
        })
        this.articleList.push(...data.data)
        this.scrollDisabled = false
        return Promise.resolve(data.data)
      } catch (err) {
        // console.log(err)
        // this.$message.error(err)
      }
    }
  },
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
  head() {
    return {
      title: 'maikro技术博客'
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    height: 600px;
    padding: 165px 0 40px;
    background: url('~@/static/images/background.svg') no-repeat center / cover;
    box-sizing: content-box;
    /*&__img {*/
    /*  width: 100%;*/
    /*  height: 100%;*/
    /*  object-position: center;*/
    /*  object-fit: contain;*/
    /*}*/
  }
  .main {
    width: 100%;
    margin-top: 30px;
    @include container;
  }
  .side-menu__list {
    & + & {
      margin-top: 20px;
    }
  }
</style>
