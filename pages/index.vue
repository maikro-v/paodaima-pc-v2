<template>
  <layout :scroll-disabled="isLoadEnd" @load="load">
    <div class="home">
      <div id="banner" class="banner" />
      <main class="main">
        <el-row type="flex" :gutter="24">
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <section v-loading="scrollDisabled" class="article">
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
            <!-- <hot-article class="side-menu__list" /> -->
            <side-menu
              v-if="hotArticleList && hotArticleList.length"
              title="热门文章"
              :show-footer="false"
              class="side-menu__list"
            >
              <side-menu-item
                v-for="item in hotArticleList"
                :key="item.id"
                :to="item.id | toPath"
                target="_blank"
              >
                {{ item.title }}
              </side-menu-item>
            </side-menu>
            <side-menu v-if="recommendArticleList && recommendArticleList.length > 0" title="推荐文章" :show-footer="false" class="side-menu__list">
              <side-menu-item
                v-for="item in recommendArticleList"
                :key="item.id"
                :to="item.id | toPath"
                target="_blank"
              >
                {{ item.title }}
              </side-menu-item>
            </side-menu>
          </el-col>
        </el-row>
      </main>
    </div>
    <app-footer />
  </layout>
</template>

<script>
import constraints from '@/libs/matter/constraints'
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
import appFooter from '@/components/app-footer'
import layout from '@/components/layout'
export default {
  components: { articleItem, sideMenu, sideMenuItem, layout, appFooter },
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
  mounted() {
    // this.renderMatter()
  },
  methods: {
    renderMatter() {
      const dom = document.getElementById('banner')
      constraints(dom, {
        width: document.documentElement.clientWidth,
        height: 600
      })
    },
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
        // this.$message.error(err)
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
    height: 765px;
    padding: 0 0 40px;
    background: url('~@/static/images/background.svg') no-repeat center / cover;
    box-sizing: content-box;
    /*&__content {*/
    /*  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(121,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(326,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='10.23'%3E%3Cpath transform='translate(-15.4 -8.8) rotate(-8.8 1409 581) scale(0.934)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='3.4100000000000006' transform='translate(-55 22) rotate(-4.4 800 450) scale(0.989)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(-15.4 33) rotate(-55 401 736) scale(0.989)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='3.1'%3E%3Cpath transform='translate(132 13.2) rotate(-3.3 150 345) scale(1.022)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='6.820000000000001' transform='translate(33 -66) rotate(-79.2 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-8.8 -8.8) rotate(-13.2 1400 132) scale(0.89)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");*/
    /*  background-attachment: fixed;*/
    /*  background-size: cover;*/
    /*}*/
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
  @media screen and (max-width: 1500px) {
    .banner {
      height: 765px;
    }
  }
  @media screen and (max-width: 1260px) {
    .banner {
      height: 600px;
    }
  }
  @media screen and (max-width: 1000px) {
    .banner {
      height: 450px;
    }
  }
  @media screen and (max-width: 750px) {
    .banner {
      height: 350px;
    }
  }
  @media screen and (max-width: 640px) {
    .banner {
      height: 280px;
    }
  }
  @media screen and (max-width: 500px) {
    .banner {
      height: 220px;
    }
  }
  @media screen and (max-width: 360px) {
    .banner {
      height: 180px;
    }
  }
</style>
