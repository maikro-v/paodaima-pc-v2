<template>
  <div class="side-menu-item text-overs" @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String || Object,
      required: true
    },
    method: {
      type: String,
      default: 'push'
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  methods: {
    onClick() {
      if (typeof this.to === 'string' || typeof this.to === 'object') {
        if (this.target === '_blank') {
          const { href } = this.$router.resolve(this.to)
          window.open(href, '_blank')
        } else {
          this.$router[this.method](this.to)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-item {
  position: relative;
  // min-height: 30px;
  line-height: 1.4;
  cursor: pointer;
  padding: 0 20px;
  margin: 10px 0;
  transition: $transition;
  @include fontMain;
  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 50%;
    display: block;
    width: 2px;
    height: $mainFontSize;
    background: $primary;
    transition: $transition;
    transform: translateY(-50%);
  }
  &:hover {
    color: $primary;
    &::before {
      left: 0;
    }
  }
}
</style>
