<template>
  <transition name="fade">
    <div class="backtop" v-show="_show" @click="handleClick">
      <i class="el-icon-caret-top backtop__icon"></i>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _show() {
      return this.show
    }
  },
  methods: {
    toScrollTop() {
      const scrollTopTime = 7 // 滚动时长
      let scrollTop = document.documentElement.scrollTop
      const animate = requestAnimationFrame(() => {
        scrollTop = scrollTop - (scrollTop / scrollTopTime)
        document.documentElement.scrollTop = scrollTop
        if (scrollTop <= 0) {
          return cancelAnimationFrame(animate)
        }
        this.toScrollTop()
      })
    },
    handleClick() {
      this.toScrollTop()
    }
  }
}
</script>

<style lang="scss" scoped>
  .backtop {
    position: fixed;
    right: 60px;
    bottom: 80px;
    width: 44px;
    height: 44px;
    line-height: 40px;
    border-radius: 50%;
    background: rgba(white, .8);
    box-shadow: 2px 2px 8px rgba($primary, .3);
    text-align: center;
    cursor: pointer;
    &__icon {
      font-size: 26px;
      vertical-align: middle;
      color: $titleColor;
    }
  }

  .fade-entry-active, .fade-leave-active {
    transition: opacity .4s ease-in;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
