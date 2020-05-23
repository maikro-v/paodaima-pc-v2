<template>
  <div class="container">
    <navbar>
      <el-row type="flex" align="middle" class="navbar-wrap">
        <logo />
        <el-col>
          <navbar-menu class="menu" :data="menuNavList" />
        </el-col>
        <span>
          <el-button type="primary" size="mini">发表文章</el-button>
        </span>
      </el-row>
    </navbar>
    <nuxt />
  </div>
</template>

<script>
import navbarMenu from '@/components/navbar-menu'
import navbar from '@/components/navbar'
import logo from '@/components/logo'
export default {
  components: { navbar, logo, navbarMenu },
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
  /deep/ .menu {
    margin-left: 30px;
  }
</style>
