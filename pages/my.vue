<template>
  <div class="my">
    <main class="main">
      <el-row type="flex" :gutter="14">
        <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
          <!-- 作者信息 -->
          <side-author :author="author" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <section class="article">
            <template v-if="articleList && articleList.length > 0">
              <article-item v-for="item in articleList" :key="item.id" :data="item" :is-edit="isAdmin" :show-image="false" />
            </template>
            <template v-else>
              <empty />
            </template>
          </section>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import { getToken } from '../libs/utils'
import { throttle } from '@/libs/tools'
import articleItem from '@/components/article-item'
import sideAuthor from '@/components/side-author'
import empty from '@/components/empty'
export default {
  layout: 'common',
  components: { articleItem, sideAuthor, empty },
  async asyncData({ app, query }) {
    let page = 1
    try {
      const { data } = await app.$api.article.page({
        author_id: query.id,
        page
      })
      const authorData = query.id ? await app.$api.user.userInfoById(query.id) : await app.$api.user.userInfo()
      return {
        page: ++page,
        totalPage: data.page.total_page,
        articleList: data.data,
        author: authorData.data,
        isAdmin: (!query.id && getToken()) // 没有指定用户id，并且有token就是管理员状态
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
      author: {}, // 用户信息
      canScroll: true,
      isAdmin: false // 是否管理员，管理员可对文章进行删除编辑等操作
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
          author_id: this.$route.query.id,
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
