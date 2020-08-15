<template>
  <div
    class="navbar"
    :class="[
      { 'navbar_fixed': fixed }
    ]"
    :style="_headerStyle"
  >
    <el-row
      type="flex"
      align="middle"
      class="navbar__container"
      :class="[bodyClass ? bodyClass : '']"
    >
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
      <btn v-else round class="btn-login" @click="toLogin">
        登录
      </btn>
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
    fixed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'white'
    },
    bodyClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menuNavList: [
        {
          name: '首页',
          path: 'index'
        },
        {
          name: '文章分享',
          path: 'article'
        }
        // {
        //   name: '专栏',
        //   path: 'special'
        // }
      ],
      loginLoading: false,
      keyword: ''
    }
  },
  computed: {
    ...mapState('user', ['name', 'avatar', 'hasLogin']),
    _theme() {
      return this.theme
    },
    _headerStyle() {
      let color = ''
      let activeColor = ''
      if (this._theme === 'white') {
        color = '#2f1d5d'
        activeColor = '#7e8dce'
      } else if (this._theme === 'black') {
        color = '#ffffff'
        activeColor = '#f4f4f4'
      }
      return {
        '--color': color,
        '--activeColor': activeColor
      }
    }
  },
  watch: {
    '$route'(val) {
      if (val.query.keyword) {
        this.keyword = val.query.keyword
      }
    }
  },
  created() {
    // this.getMenuNav()
    this.setUserInfo()
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword
    }
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
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    async handlerLogout() {
      try {
        await this.logout()
        if (this.$route.name === 'my') {
          this.$router.replace({
            name: 'index'
          })
        }
      } catch (e) {
        this.$notify.error('退出失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $headerHeight: 70px;
  .navbar {
    width: 100%;
    height: $headerHeight;
    padding: 0 40px;
    box-sizing: border-box;
    transition: background 150ms linear;
    &_fixed {
      position: fixed;
      top: 0;
      z-index: 2000;
    }
    &__container {
      height: 100%;
    }
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
  .btn-login,
  /deep/ .user__name {
    color: var(--color);
  }
</style>
