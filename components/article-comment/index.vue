<template>
  <div class="article-comment">
    <p class="title">
      评论
    </p>
    <section class="form">
      <el-input
        ref="input"
        v-model="_value"
        :show-word-limit="true"
        :maxlength="200"
        :rows="5"
        type="textarea"
        resize="none"
        placeholder="说点什么吧..."
      />
      <footer class="form__footer">
        <el-button :loading="_loading" type="primary" size="mini" @click="handlerSubmit">
          评论
        </el-button>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
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
    handlerSubmit() {
      this.$emit('on-submit', this.value)
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    @include fontMain;
    text-align: center;
  }
  .form {
    background: #f7f7f7;
    border-radius: 6px;
    padding: 20px;
    margin-top: 20px;
    &__footer {
      margin-top: 10px;
    }
  }
</style>
