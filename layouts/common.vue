<template>
  <div class="container">
    <navbar>
      <el-row type="flex" align="middle" class="navbar-wrap">
        <logo />
        <el-col class="menu col">
          <navbar-menu :data="menuNavList" />
        </el-col>
        <user v-if="hasLogin" :avatar="avatar" :user-name="name" class="user-wrap" @on-logout="handlerLogout" />
        <a v-else class="nav__item" @click="toLogin">登录</a>
      </el-row>
    </navbar>
    <login v-model="canShowLogin" :loading="loginLoading" @on-confirm="handleSubmit" />
    <nuxt />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getToken } from '../libs/utils'
import navbarMenu from '@/components/navbar-menu'
import navbar from '@/components/navbar'
import logo from '@/components/logo'
import user from '@/components/user'
import login from '@/components/login'
export default {
  components: { navbar, logo, navbarMenu, user, login },
  data() {
    return {
      menuNavList: [],
      loginLoading: false
    }
  },
  computed: {
    ...mapState('user', ['hasLogin', 'name', 'avatar']),
    canShowLogin: {
      get() {
        return this.$store.state.canShowLogin
      },
      set(val) {
        this.SET_CAN_SHOW_LOGIN(val)
      }
    }
  },
  created() {
    this.getMenuNav()
    this.setUserInfo()
  },
  methods: {
    ...mapMutations(['SET_CAN_SHOW_LOGIN']),
    ...mapActions('user', ['login', 'getUserInfo', 'logout']),
    setUserInfo() {
      if (getToken() && !this.hasLogin) {
        this.getUserInfo()
      }
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
      this.SET_CAN_SHOW_LOGIN(true)
    },
    handleSubmit({ email, password }) {
      this.loginLoading = true
      this.login({
        email,
        password
      }).then((data) => {
        this.$message.success('登录成功')
        window.location.reload()
      }).catch((err) => {
        this.$message.error(err)
      }).finally(() => {
        this.loginLoading = false
      })
    },
    handlerLogout() {
      this.logout()
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
