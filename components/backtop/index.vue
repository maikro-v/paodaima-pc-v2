<template>
  <transition name="fade">
    <div v-show="_show" class="backtop" title="返回顶部" @click="handleClick">
      <i class="el-icon-caret-top backtop__icon" />
      <span class="backtop__text">
        <slot />
      </span>
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
    bottom: 90px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    border-radius: 50%;
    background: rgba(white, .8);
    box-shadow: 2px 2px 8px rgba($primary, .3);
    text-align: center;
    cursor: pointer;
    &__icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 26px;
      color: $titleColor;
      opacity: 0;
      transition: all .2s ease;
    }
    &__text {
      color: $titleColor;
      font-weight: bold;
      font-size: 16px;
      opacity: 1;
      transition: all .2s ease;
    }
    &:hover {
      .backtop__icon {
        opacity: 1;
      }
      .backtop__text {
        opacity: 0;
      }
    }
  }

  .fade-entry-active, .fade-leave-active {
    transition: opacity .4s ease-in;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
