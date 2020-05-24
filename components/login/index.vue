<template>
  <el-dialog
    title="登录"
    width="360px"
    :visible.sync="_value"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="输入邮箱" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="_loading" type="primary" class="form__btn" @click="handleSubmit('form')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true,
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
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    _loading() {
      return this.loading
    }
  },
  methods: {
    handleClose() {
      this._value = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('on-confirm', this.form)
        } else {
          if (!this.form.email) {
            this.$message.error('请填写邮箱')
          } else if (!this.form.password) {
            this.$message.error('请填写密码')
          }
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin position {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .login {
    @include position;
  }
  .mask {
    @include position;
    background: rgba(0, 0, 0, .4);
  }
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 101;
    width: 350px;
    background: white;
    border-radius: 6px;
    transform: translate(-50%, -50%);
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px 30px;
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
