<template>
  <div class="navbar">
    <el-row type="flex" align="middle" class="navbar-wrap">
      <logo class="logo"/>
      <el-col>
        <navbar-menu class="menu"/>
      </el-col>
      <span>
        <el-button type="primary" size="mini">发表文章</el-button>
      </span>
      <!-- <user /> -->
    </el-row>
  </div>
</template>

<script>
import logo from '@/components/logo'
import navbarMenu from './menu'
// import user from '@/components/user'
export default {
  components: { logo, navbarMenu },
  async fetch ({ store, params }) {
    console.log(axios)
    // let { data } = await axios.get('/api/classify')
    // console.log(data)
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 60px;
    background: #566270;
    &-wrap {
      @include container;
    }
  }
  .logo {
    color: #A593E0;
  }
  .menu {
    margin-left: 30px;
  }
</style>
