<template>
  <layout :scroll-disabled="scrollDisabled" @load="load">
    <div class="my">
      <main class="main">
        <el-row type="flex" :gutter="14">
          <el-col :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
            <!-- 作者信息 -->
            <div class="sticky">
              <side-author :author="author" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <section class="article">
              <template v-if="articleList && articleList.length > 0">
                <article-item
                  v-for="(item, index) in articleList"
                  :key="item.id"
                  :data="item"
                  :actions="actions"
                  :show-image="false"
                  @on-active="(row) => handleArticleAction(row, item, index)"
                />
                <el-divider v-if="isLoadEnd">
                  没有更多数据了
                </el-divider>
              </template>
              <template v-else>
                <empty />
              </template>
            </section>
          </el-col>
        </el-row>
      </main>
    </div>
  </layout>
</template>

<script>
import { getToken } from '../libs/utils'
import { isEmpty } from '../libs/tools'
import layout from '@/components/layout'
import articleItem from '@/components/article-item'
import sideAuthor from '@/components/side-author'
import empty from '@/components/empty'
export default {
  components: { articleItem, sideAuthor, empty, layout },
  // async asyncData({ app, query }) {
  //   let page = 1
  //   try {
  //     const { data } = await app.$api.article.page({
  //       author_id: query.id,
  //       page
  //     })
  //     return {
  //       page: ++page,
  //       totalPage: data.page.total_page,
  //       articleList: data.data,
  //       isAdmin: (!query.id && getToken()) // 没有指定用户id，并且有token就是管理员状态
  //     }
  //   } catch (err) {
  //     return err
  //   }
  // },
  data() {
    return {
      articleList: [],
      author: {}, // 用户信息
      page: 1,
      totalPage: 0,
      scrollDisabled: false
    }
  },
  computed: {
    // 是否管理员，管理员可对文章进行删除编辑等操作 没有指定用户id，并且有token就是管理员状态
    isAdmin() {
      return !isEmpty(getToken()) && !this.$route.query.id
    },
    actions() {
      return this.isAdmin && [
        '编辑',
        '删除'
      ]
    },
    isLoadEnd() {
      return this.page >= this.totalPage
    }
  },
  mounted() {
    this.getUserInfo()
    this.getData()
  },
  methods: {
    load() {
      this.page++
      this.getData()
    },
    handleArticleAction(row, item, index) {
      if (row === 0) {
        this.toArticleEdit(item)
      } else if (row === 1) {
        this.removeArticleEdit(item, index)
      }
    },
    toArticleEdit(row) {
      this.$router.push({
        name: 'article-edit',
        query: {
          id: row.id
        }
      })
    },
    removeArticleEdit(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$api.article.remove(row.id)
      }).then(() => {
        this.articleList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getUserInfo() {
      const target = this.$route.query.id ? this.$api.user.userInfoById(this.$route.query.id) : this.$api.user.userInfo()
      target.then(({ data }) => {
        this.author = data
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err
        })
      })
    },
    async getData() {
      try {
        this.scrollDisabled = true
        const { data } = await this.$api.article.page({
          author_id: this.$route.query.id ? this.$route.query.id : this.isAdmin ? null : -999,
          status: this.isAdmin ? [1, 2] : [2],
          page: this.page
        })
        this.articleList.push(...data.data)
        this.totalPage = data.page.total_page
        this.scrollDisabled = false
        return Promise.resolve()
      } catch (err) {
        this.$notify.error({
          title: '错误',
          message: err
        })
      }
    }
  },
  head() {
    return {
      title: '个人中心'
    }
  }
}
</script>

<style lang="scss" scoped>
  .my {
    padding-top: 100px;
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1064' height='1064' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%2388898d'/%3E%3Cstop offset='1' stop-color='%23d8dadf'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%238f8f8f'/%3E%3Cstop offset='0.09' stop-color='%23b3b3b3'/%3E%3Cstop offset='0.18' stop-color='%23c9c9c9'/%3E%3Cstop offset='0.31' stop-color='%23dbdbdb'/%3E%3Cstop offset='0.44' stop-color='%23e8e8e8'/%3E%3Cstop offset='0.59' stop-color='%23f2f2f2'/%3E%3Cstop offset='0.75' stop-color='%23fafafa'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='0.35' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: top left;
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
  .sticky {
    position: sticky;
    top: 100px;
  }
</style>
