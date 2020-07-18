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
        class="form__input"
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
  @media screen and (max-width: 750px) {
    .article-comment {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 9999;
    }
    .title {
      display: none;
    }
    .form {
      height: 52px;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      background: #566270;
      box-shadow: 0 -2px 4px rgba(0, 0, 0, .1);
      margin-top: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      /deep/ .el-textarea__inner {
        height: 100%;
      }
      &__input {
        height: 100%;
        flex: 1;
      }
      &__footer {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
</style>
