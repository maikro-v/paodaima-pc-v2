<template>
  <div class="login">
    <div id="bg" class="login__bg" />
    <div class="login__container">
      <h1 class="title">
        LOGIN
      </h1>
      <el-form ref="form" :model="form" :rules="rules" class="form" @submit.native.prevent="handleSubmit('form')">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="输入邮箱" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loginLoading" type="primary" native-type="submit" class="form__btn" @click="handleSubmit('form')">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import particleLogin from '@/assets/particles/login.json'
export default {
  data() {
    return {
      router: null,
      loginLoading: false,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigget: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigget: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigget: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.createBg()
  },
  methods: {
    ...mapActions('user', ['login']),
    createBg() {
      particlesJS('bg', particleLogin)
    },
    handleSubmit(name) {
      this.loginLoading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login({
            email: this.form.email,
            password: this.form.password
          }).then((data) => {
            this.$message.success('登录成功')
            this.$router.replace({
              path: this.router.fullPath
            })
          }).catch((err) => {
            this.$message.error(err)
          }).finally(() => {
            this.loginLoading = false
          })
        } else {
          if (!this.form.email) {
            this.$message.error('请填写邮箱')
          } else if (!this.form.password) {
            this.$message.error('请填写密码')
          }
          this.loginLoading = false
          return false
        }
      })
    }
  },
  beforeRouteEnter(to, form, next) {
    next((vue) => {
      vue.router = form
    })
  }
}
</script>

<style lang="scss" scoped>
  .login {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgb(35, 39, 65);
    &__container {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80%;
      max-width: 380px;
      padding: 10px 20px 30px;
      background: rgba(97, 109, 143, .9);
      box-shadow: 0 0 10px rgba($primary, .3);
      border-radius: 4px;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    &__bg {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    font-size: 30px;
    text-align: center;
    margin: 20px 0;
    color: white;
  }
  .form {
    /deep/ .el-form-item {
      margin-bottom: 17px;
    }
    &__btn {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
