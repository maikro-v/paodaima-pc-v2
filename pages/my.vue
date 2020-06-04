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
              <article-item
                v-for="(item, index) in articleList"
                :key="item.id"
                :data="item"
                :actions="actions"
                :show-image="false"
                @on-active="(row) => handleArticleAction(row, item, index)"
              />
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
// import { throttle } from '@/libs/tools'
import scroll from '@/mixins/scroll'
import articleItem from '@/components/article-item'
import sideAuthor from '@/components/side-author'
import empty from '@/components/empty'
export default {
  layout: 'common',
  components: { articleItem, sideAuthor, empty },
  mixins: [scroll],
  head() {
    return {
      title: '个人中心'
    }
  },
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
      author: {} // 用户信息
    }
  },
  mounted() {
    this.getUserInfo()
    this.getData()
  },
  computed: {
    // 是否管理员，管理员可对文章进行删除编辑等操作 没有指定用户id，并且有token就是管理员状态
    isAdmin() {
      return (!this.$route.query.id && (getToken() !== '' || getToken() !== null || getToken() !== undefined))
    },
    actions() {
      return this.isAdmin && [
        '编辑',
        '删除'
      ]
    }
  },
  methods: {
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
        const { data } = await this.$api.article.page({
          author_id: this.$route.query.id,
          status: this.isAdmin ? [1, 2] : [2],
          page: this.page
        })
        this.articleList.push(...data.data)
        this.totalPage = data.page.total_page
        return Promise.resolve()
      } catch (err) {
        this.$notify.error({
          title: '错误',
          message: err
        })
      }
    },
    onScrollLoad({ page, totalPage }) {
      console.log(page, totalPage)
      return this.getData()
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
