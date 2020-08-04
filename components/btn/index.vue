<template>
  <button class="btn" :class="[_type, { btn_round: round }]" @click="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'btn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
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
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    padding: 0 20px;
    @include hover;
    color: $titleColor;
    background: transparent;
    &_default {
      border: 1px solid #dee2e6;
    }
    &_text {
      border: 1px solid transparent;
    }
    &_round {
      border-radius: 30px;
    }
  }
</style>
