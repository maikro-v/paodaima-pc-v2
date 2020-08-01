<template>
  <div class="btn" :class="[_type]" @click="handleClick">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'btn',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    _type() {
      return {
        [`btn_${this.type}`]: this.type
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    height: 36px;
    line-height: 36px;
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    padding: 0 20px;
    border-radius: 30px;
    @include hover;
    color: $titleColor;
    &_default {
      border: 1px solid #dee2e6;
    }
    &_text {
      border: 1px solid transparent;
    }
  }
</style>
