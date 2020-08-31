<template>
  <el-form class="form" label-width="80px" label-position="right">
    <el-form-item label="留言内容">
      <el-input
        ref="input"
        v-model="forms.context"
        :show-word-limit="true"
        :maxlength="200"
        :rows="5"
        type="textarea"
        class="form-input"
        placeholder="想对博主说的话都写这里吧..."
        @blur="ruleValid"
      />
    </el-form-item>
    <el-form-item label="名称">
      <el-input
        v-model="forms.name"
        size="small"
        placeholder="告诉博主怎么称呼您"
        class="form-input_min"
        @blur="ruleValid"
      />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input
        v-model="forms.email"
        size="small"
        placeholder="回复的时候提醒您"
        class="form-input_min"
      />
    </el-form-item>
    <el-form-item>
      <p class="form-error">
        {{ errorText }}
      </p>
      <el-checkbox v-model="forms.saveStatus">
        记住我的名字跟邮箱
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button :loading="_loading" type="primary" size="small" @click="handlerSubmit">
        评论
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      forms: {
        name: '',
        email: '',
        context: '',
        saveStatus: false
      },
      rules: {
        context: '您忘记填写留言内容啦',
        name: '您忘记填写名称啦'
      },
      errorText: ''
    }
  },
  computed: {
    _loading() {
      return this.loading
    }
  },
  mounted() {
    if (localStorage.getItem('commentUserInfo')) {
      const data = JSON.parse(localStorage.getItem('commentUserInfo'))
      this.forms.saveStatus = true
      this.forms.name = data.name
      this.forms.email = data.email
    }
  },
  methods: {
    ruleValid() {
      for (const key in this.rules) {
        if (this.forms[key] === '') {
          this.errorText = this.rules[key]
          return false
        }
      }
      this.errorText = ''
      return true
    },
    handlerSubmit() {
      if (!this.ruleValid()) {
        return
      }
      if (this.forms.saveStatus) {
        localStorage.setItem('commentUserInfo', JSON.stringify({
          name: this.forms.name,
          email: this.forms.email
        }))
      }
      this.$emit('on-submit', this.forms)
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    background: #f7f7f7;
    border-radius: 6px;
    padding: 20px;
    margin-top: 20px;
    &-item {
      position: relative;
    }
    &-label {
      position: absolute;
      left: 16px;
      top: 7px;
      z-index: 10;
      font-size: 14px;
      font-weight: normal;
      color: #bdbdbd;
    }
    &-input {
      width: 100%;
      &_min {
        width: 200px;
      }
    }
    &-error {
      font-size: 14px;
      color: red;
    }
    /deep/ .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
