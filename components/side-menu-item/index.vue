<template>
  <div class="side-menu-item" @click="onClick">
    <div class="text-overs">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
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
  padding: 10px 20px;
  transition: all .2s ease;
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
    background: $bgColor;
    /*&::before {*/
    /*  left: 0;*/
    /*}*/
  }
}
</style>
