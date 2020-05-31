<template>
  <div class="article-type">
    <main class="main">
      <el-row type="flex" :gutter="14">
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <section class="article">
            <template v-if="articleList && articleList.length > 0">
              <article-item v-for="item in articleList" :key="item.id" :data="item" :to="item.id | toPath" target="_blank" />
            </template>
            <template v-else>
              <empty />
            </template>
          </section>
        </el-col>
        <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
          <aside>
            <side-menu title="热门" class="side-menu__list">
              <side-menu-item
                v-for="item in hotArticleList"
                :key="item.id"
                :to="item.id | toPath"
                target="_blank"
              >
                {{ item.title }}
              </side-menu-item>
            </side-menu>
            <side-menu title="推荐" class="side-menu__list">
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
</template>

<script>
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
import empty from '@/components/empty'
import scroll from '@/mixins/scroll'
export default {
  layout: 'common',
  components: { articleItem, sideMenu, empty, sideMenuItem },
  mixins: [scroll],
  async asyncData({ app, query }) {
    const page = 1
    try {
      const { data } = await app.$api.article.page({
        classify_id: query.type,
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
      articleList: [],
      recommendArticleList: [], // 推荐文章列表
      hotArticleList: [] // 热门文章列表
    }
  },
  methods: {
    async getData(params = {}) {
      try {
        const { data } = await this.$api.article.page({
          classify_id: this.$route.query.type,
          page: this.page,
          ...params
        })
        this.articleList.push(...data.data)
        return Promise.resolve()
      } catch (err) {
        // console.log(err)
        // this.$message.error(err)
      }
    },
    onScrollLoad() {
      return this.getData()
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
  watch: {
    '$route'(val) {
      this.articleList = []
      this.page = 1
      const params = val.query
      this.getData(params)
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-type {
    margin-top: 20px;
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
