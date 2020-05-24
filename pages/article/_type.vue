<template>
  <div class="article-type">
    <main class="main">
      <el-row type="flex" :gutter="14">
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <section class="article">
            <template v-if="articleList && articleList.length > 0">
              <article-item v-for="item in articleList" :key="item.id" :data="item" />
            </template>
            <template v-else>
              <empty />
            </template>
          </section>
        </el-col>
        <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
          <aside>
            <hot-article class="side-menu__list" />
            <side-menu title="推荐" class="side-menu__list" />
          </aside>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import articleItem from '@/components/article-item'
import sideMenu from '@/components/side-menu'
import hotArticle from '@/components/hot-article'
import empty from '@/components/empty'
import scroll from '@/mixins/scroll'
export default {
  layout: 'common',
  mixins: [scroll],
  components: { articleItem, sideMenu, hotArticle, empty },
  async asyncData({ app, params }) {
    let page = 1
    try {
      const { data } = await app.$api.article.page({
        classify_id: params.type,
        page
      })
      return {
        page: ++page,
        totalPage: data.page.total_page,
        articleList: data.data
      }
    } catch (err) {
      return err
    }
  },
  data() {
    return {
      articleList: []
    }
  },
  methods: {
    async getData() {
      try {
        const { data } = await this.$api.article.page({
          classify_id: this.$route.params.type,
          page: this.page
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
