<template>
  <div class="container-wrap">
    <navbar class="navbar">
      <el-row type="flex" align="middle" class="container navbar-wrap">
        <logo class="logo-wrap" />
        <navbar-menu :data="menuNavList" class="menu hidden-xs-only" />
        <el-col class="col text-right">
          <el-input
            v-model="keyword"
            placeholder="请输入内容"
            size="small"
            class="search hidden-sm-and-down"
          >
            <i slot="suffix" class="el-input__icon el-icon-search search__icon" @click="toSearch" @enter="toSearch" />
          </el-input>
          <user v-show="hasLogin" :avatar="avatar" :user-name="name" class="user-wrap" @on-logout="handlerLogout" />
          <a v-show="!hasLogin" class="btn" @click="toLogin">登录</a>
        </el-col>
      </el-row>
    </navbar>
    <nuxt />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getToken } from '@/libs/utils'
import navbarMenu from '@/components/navbar-menu'
import navbar from '@/components/navbar'
import logo from '@/components/logo'
import user from '@/components/user'
export default {
  components: { navbar, logo, navbarMenu, user },
  data() {
    return {
      menuNavList: [],
      loginLoading: false,
      keyword: ''
    }
  },
  computed: {
    ...mapState('user', ['name', 'avatar', 'hasLogin'])
  },
  created() {
    this.getMenuNav()
    this.setUserInfo()
  },
  methods: {
    ...mapMutations('user', ['SET_HAS_LOGIN']),
    ...mapActions('user', ['login', 'getUserInfo', 'logout']),
    setUserInfo() {
      if (getToken()) {
        this.getUserInfo()
      }
    },
    toSearch() {
      this.$router.push({
        name: 'article',
        query: {
          keyword: this.keyword
        }
      })
      // this.$router.push({
      //     name:'article',
      //     query:{
      //       type:1
      //     }
      // })
    },
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
    },
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    handlerLogout() {
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
  $height: 60px;
  .container-wrap {
    width: 100%;
    height: calc(100vh - #{$height});
    /*padding-top: $height;*/
    /*overflow-x: hidden;*/
    /*overflow-y: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: hidden;*/
  }
  .navbar-wrap {
    height: $height;
  }
  .logo-wrap {
    height: $height;
    line-height: $height;
  }
  .user-wrap {
    vertical-align: middle;
  }
  .menu {
    margin-left: 30px;
  }
  .btn {
    height: $height;
    line-height: $height;
    display: inline-block;
    cursor: pointer;
    color: #e0e3da;
    padding: 0 10px;
  }
  .search {
    width: 180px;
    display: inline-block;
    margin-right: 30px;
    margin-left: 30px;
    vertical-align: middle;
    &__icon {
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
    /deep/ .el-input__inner {
      background: #677483;
      border-color: transparent;
      color: rgb(231, 231, 231);
      &:focus {
        border-color: white;
      }
    }
  }
</style>
