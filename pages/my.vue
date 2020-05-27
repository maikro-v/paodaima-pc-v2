<template>
  <div class="my">
    <main class="main">
      <el-row type="flex" :gutter="14">
        <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
          <!-- 作者信息 -->
          <side-author />
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <section class="article">
            <article-item v-for="item in articleList" :key="item.id" :data="item" is-edit :show-image="false" />
          </section>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import articleItem from '@/components/article-item'
import sideAuthor from '@/components/side-author'
import { throttle } from '@/libs/tools'
export default {
  layout: 'common',
  components: { articleItem, sideAuthor },
  async asyncData({ app }) {
    let page = 1
    try {
      const { data } = await app.$api.article.page({
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
      page: 1,
      totalPage: 0,
      articleList: [],
      canScroll: true
    }
  },
  mounted() {
    const scroll = throttle(this.handleScroll, 100)
    window.onscroll = scroll
  },
  methods: {
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
    },
    handleScroll() {
      if (!this.canScroll || this.page > this.countPage) {
        return false
      }
      const distance = 20 // 触发加载的距离阈值
      const contentHeight = document.documentElement.scrollHeight
      const viewHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop

      if (viewHeight + scrollTop >= contentHeight - distance) {
        this.canScroll = false
        this.getData()
        this.page++
        this.canScroll = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .my {
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
