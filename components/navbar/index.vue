<template>
  <div class="navbar">
    <el-row type="flex" align="middle">
      <el-col class="col">
        <logo class="logo-wrap" />
      </el-col>
      <el-input
        v-model="keyword"
        placeholder="搜索文章"
        size="small"
        class="search hidden-sm-and-down"
      >
        <i slot="suffix" class="el-input__icon el-icon-search search__icon" @click="toSearch" @enter="toSearch" />
      </el-input>
      <navbar-menu :data="menuNavList" class="menu hidden-xs-only" />
      <user v-if="hasLogin" :avatar="avatar" :user-name="name" class="user-wrap" @on-logout="handlerLogout" />
      <btn v-else @click="toLogin">登录</btn>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getToken } from '@/libs/utils'
import navbarMenu from '@/components/navbar-menu'
import logo from '@/components/logo'
import user from '@/components/user'
import btn from '@/components/btn'
export default {
  components: { logo, navbarMenu, user, btn },
  props: {
    hideHead: {
      type: Boolean,
      default: false
    }
  },
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
  $headerHeight: 70px;
  .navbar {
    position: fixed;
    top: 0;
    z-index: 2000;
    width: 100%;
    height: $headerHeight;
    padding: 0 40px;
    box-sizing: border-box;
    transition: background 150ms linear;
  }
  .logo-wrap {
    height: $headerHeight;
    line-height: $headerHeight;
  }
  .user-wrap {
    vertical-align: middle;
  }
  .menu {
    margin-right: 50px;
  }
  .search {
    width: 240px;
    display: inline-block;
    margin-right: 20px;
    margin-left: 30px;
    vertical-align: middle;
    background: rgba(#F3F7FF, 1);
    border-radius: 6px;
    &__icon {
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      color: $titleColor;
    }
    /deep/ .el-input__inner {
      background: transparent;
      border-color: transparent;
      color: rgba($titleColor, 1);
      font-size: 16px;
      font-weight: bold;
      &:hover {
        border-color: #c0c7d5;
      }
      &::placeholder {
        font-weight: normal;
      }
      &:focus {
        border-color: #c0c7d5;
      }
    }
  }
</style>
