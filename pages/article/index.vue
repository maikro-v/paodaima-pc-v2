<template>
  <layout
    :scroll-disabled="isLoadEnd"
    header-theme="white"
    :header-fixed="true"
    :header-style="{
      background: '#ffffff',
      boxShadow: '0 0 10px rgba(0, 0, 0, .1)'
    }"
    header-body-class="header-nav"
    @load="load"
    @scroll="handleScroll"
  >
    <!--    <transition name="header-fixed">-->
    <!--      <div v-show="showSubHeader" class="header-fixed">-->
    <!--        <div class="header-fixed__container">-->
    <!--          <logo />-->
    <!--          <div class="header-fixed__search">-->
    <!--            <el-input-->
    <!--              v-model="search"-->
    <!--              placeholder="搜索文章"-->
    <!--              size="small"-->
    <!--              class="search"-->
    <!--            >-->
    <!--              <i slot="suffix" class="el-icon-search header-fixed__icon" @click="handleSearch" @enter="handleSearch" />-->
    <!--            </el-input>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </transition>-->

    <section class="tag-wrap container">
      <div
        v-for="item in menuNavList"
        :key="item.id"
        class="tag"
        :class="{ 'tag_active': classify === item.id }"
        @click="handleChangeType(item)"
      >
        {{ item.name }}
      </div>
    </section>
    <div class="article-type">
      <main class="main">
        <el-row type="flex" :gutter="14">
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <section v-loading="scrollDisabled" class="article">
              <template v-if="articleList && articleList.length > 0">
                <article-item v-for="item in articleList" :key="item.id" :data="item" :to="item.id | toPath" target="_blank" />
                <el-divider v-if="isLoadEnd">
                  没有更多数据了
                </el-divider>
              </template>
              <template v-else>
                <empty />
              </template>
            </section>
          </el-col>
          <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
            <side-menu v-if="hotArticleList && hotArticleList.length" title="热门文章" :show-footer="false" class="side-menu__list">
              <side-menu-item
                v-for="item in hotArticleList"
                :key="item.id"
                :to="item.id | toPath"
                target="_blank"
              >
                {{ item.title }}
              </side-menu-item>
            </side-menu>
            <side-menu v-if="recommendArticleList && recommendArticleList.length" title="推荐文章" :show-footer="false" class="side-menu__list">
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
  </layout>
</template>

<script>
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
import empty from '@/components/empty'
import layout from '@/components/layout'
export default {
  components: { articleItem, sideMenu, empty, sideMenuItem, layout },
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
  async asyncData({ app, query }) {
    const page = 1
    try {
      const { data } = await app.$api.article.page({
        classify_id: query.type === 0 || query.type === '0' || !query.type ? '' : query.type,
        keyword: query.keyword,
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
      // 分类
      const menu = await app.$api.classify.list()
      menu.data.unshift({
        id: 0,
        name: '全部'
      })
      return {
        page,
        totalPage: data.page.total_page,
        articleList: data.data,
        recommendArticleList: recommendArticle.data.data,
        hotArticleList: hotArticle.data.data,
        menuNavList: menu.data
      }
    } catch (err) {
      return err
    }
  },
  data() {
    return {
      menuNavList: [],
      articleList: [],
      recommendArticleList: [], // 推荐文章列表
      hotArticleList: [], // 热门文章列表
      keyword: '',
      page: 0,
      totalPage: 0,
      scrollDisabled: false,
      showSubHeader: false,
      classify: 0
    }
  },
  computed: {
    isLoadEnd() {
      return this.page >= this.totalPage || this.scrollDisabled
    },
    _type() {
      return Number(this.$route.query.type) || 0
    }
  },
  watch: {
    '$route'(val) {
      this.page = 1
      const params = val.query
      this.keyword = params.keyword || ''
      this.getData(params).then((res) => {
        this.articleList = res || []
      })
    }
  },
  created() {
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword
    }
  },
  methods: {
    handleChangeType(item) {
      this.page = 1
      this.classify = item.id
      this.keyword = ''
      this.articleList = []
      this.$nextTick(() => {
        this.getData()
      })
    },
    handleScroll(scrollTop) {
      this.showSubHeader = scrollTop > 350
    },
    load() {
      this.page++
      this.getData()
    },
    handleSearch() {
      this.page = 1
      this.articleList = []
      this.getData()
      const params = {
        keyword: this.keyword,
        ...this.$route.query
      }
      this.$router.push({
        name: 'article',
        query: params
      })
    },
    async getData(params = {}) {
      this.scrollDisabled = true
      try {
        const { data } = await this.$api.article.page({
          page: this.page,
          keyword: this.keyword,
          classify_id: this.classify === 0 ? '' : this.classify,
          ...params
        })
        this.articleList.push(...data.data)
        this.scrollDisabled = false
        return Promise.resolve(data.data)
      } catch (err) {
        this.$notify.error(err)
      }
    },
    toArticleDetail(id) {
      const { href } = this.$router.resolve({
        name: 'article-detail-id',
        params: {
          id
        }
      })
      window.open(href, '_blank')
    }
  },
  head() {
    return {
      title: 'maikro技术博客'
    }
  }
}
</script>

<style lang="scss">
  .header-nav {
    @include container;
  }
</style>

<style lang="scss" scoped>
  .article-type {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(121,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(326,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='10.23'%3E%3Cpath transform='translate(-15.4 -8.8) rotate(-8.8 1409 581) scale(0.934)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='3.4100000000000006' transform='translate(-55 22) rotate(-4.4 800 450) scale(0.989)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(-15.4 33) rotate(-55 401 736) scale(0.989)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='3.1'%3E%3Cpath transform='translate(132 13.2) rotate(-3.3 150 345) scale(1.022)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='6.820000000000001' transform='translate(33 -66) rotate(-79.2 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-8.8 -8.8) rotate(-13.2 1400 132) scale(0.89)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
  .header-fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    background: rgba(255, 255, 255, .9);
    &__container {
      @include container;
    }
    &__search {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 300px;
      transform: translate(-50%, -50%);
    }
    &__icon {
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .tag-wrap {
    margin: 0 auto 40px;
    font-size: 0;
    padding-top: 100px;
  }
  .tag {
    height: 28px;
    line-height: 28px;
    padding: 0 14px;
    font-size: 14px;
    color: #666;
    display: inline-block;
    margin: 0 15px 15px 0;
    background: none;
    border-radius: 14px;
    cursor: pointer;
    &_active {
      background: $primary;
      color: white;
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

  .header-fixed-enter-active, .header-fixed-leave-active {
    transition: transform .5s ease;
  }
  .header-fixed-enter, .header-fixed-leave-to {
    transform: translateY(-100px);
  }
</style>
