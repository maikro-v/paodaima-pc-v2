<template>
  <div class="container">
    <navbar>
      <el-row type="flex" align="middle" class="navbar-wrap">
        <logo />
        <el-col class="menu col">
          <navbar-menu :data="menuNavList" />
        </el-col>
        <a class="nav__item">登录</a>
        <user class="user-wrap" />
      </el-row>
    </navbar>
    <nuxt />
  </div>
</template>

<script>
import navbarMenu from '@/components/navbar-menu'
import navbar from '@/components/navbar'
import logo from '@/components/logo'
import user from '@/components/user'
export default {
  components: { navbar, logo, navbarMenu, user },
  data() {
    return {
      menuNavList: []
    }
  },
  created() {
    this.getMenuNav()
  },
  methods: {
    getMenuNav() {
      this.$api.classify.list().then(({ data }) => {
        data.unshift({
          name: '首页',
          id: 0
        })
        this.menuNavList = data
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .menu {
    margin-left: 30px;
  }
  .nav__item {
    display: inline-block;
    cursor: pointer;
    color: #e0e3da;
  }
</style>
