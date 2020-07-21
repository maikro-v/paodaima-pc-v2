<template>
  <div class="container-wrap">
    <navbar class="navbar" :style="navbarStyle">
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
import { throttle } from '@/libs/tools'
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
      keyword: '',
      scrollTop: 0
    }
  },
  computed: {
    ...mapState('user', ['name', 'avatar', 'hasLogin']),
    navbarStyle() {
      let opacity = this.scrollTop / 300
      opacity = Math.min(opacity, 1)
      opacity = Math.max(opacity, 0)
      const color = 255 / opacity
      console.log(color)
      return {
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        boxShadow: `0px 2px 6px rgba(212, 212, 212, ${opacity})`,
        '--color': 'rgba(255, 255, 255, 1)'
      }
    }
  },
  created() {
    this.getMenuNav()
    this.setUserInfo()
  },
  mounted() {
    this.handleScroll()
    this.throttleFun = throttle(this.handleScroll, 100)
    document.addEventListener('scroll', this.throttleFun, false)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.throttleFun, false)
  },
  methods: {
    ...mapMutations('user', ['SET_HAS_LOGIN']),
    ...mapActions('user', ['login', 'getUserInfo', 'logout']),
    handleScroll() {
      this.scrollTop = document.documentElement.scrollTop
    },
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
  $headerHeight: 60px;
  .container-wrap {
    width: 100%;
    height: calc(100vh);
  }
  .navbar-wrap {
    height: $headerHeight;
  }
  .logo-wrap {
    height: $headerHeight;
    line-height: $headerHeight;
  }
  .user-wrap {
    vertical-align: middle;
  }
  .menu {
    margin-left: 30px;
  }
  .btn {
    height: $headerHeight;
    line-height: $headerHeight;
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
      background: #3d5265;
      border-color: transparent;
      color: rgb(231, 231, 231);
      &:focus {
        border-color: white;
      }
    }
  }
</style>
