<template>
  <scroll :on-scroll-load="load" :infinite-scroll-disabled="isLoadEnd">
    <div class="home">
      <header class="banner">
        <img src="@/assets/svg/1.svg" class="banner__img">
      </header>
      <main class="main">
        <el-row type="flex" :gutter="14">
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
              <side-menu title="热门" :show-footer="false" class="side-menu__list">
                <side-menu-item
                  v-for="item in hotArticleList"
                  :key="item.id"
                  :to="item.id | toPath"
                  target="_blank"
                >
                  {{ item.title }}
                </side-menu-item>
              </side-menu>
              <side-menu title="推荐" :show-footer="false" class="side-menu__list">
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
  </scroll>
</template>

<script>
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
import appFooter from '@/components/app-footer'
import scroll from '@/components/scroll'
export default {
  components: { articleItem, sideMenu, sideMenuItem, scroll, appFooter },
  layout: 'common',
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
      canScrollLoad: true // 是否可以滚动加载
    }
  },
  computed: {
    isLoadEnd() {
      return this.page >= this.totalPage
    }
  },
  methods: {
    load() {
      this.page++
      this.getData()
    },
    async getData() {
      try {
        const { data } = await this.$api.article.page({
          page: this.page
        })
        this.articleList.push(...data.data)
        return Promise.resolve()
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
    height: 400px;
    padding: 10px 0;
    &__img {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: contain;
    }
  }
  .main {
    width: 100%;
    @include container;
  }
  .side-menu__list {
    & + & {
      margin-top: 10px;
    }
  }
</style>
