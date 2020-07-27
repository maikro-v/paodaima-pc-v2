<template>
  <div
    class="navbar"
    :style="{
      '--height': height
    }"
  >
    <div class="navbar__block" />
    <div class="navbar__content navbar__content_colored">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: var(--height);
    &__block {
      height: 100%;
    }
    &__content {
      width: 100%;
      height: var(--height);
      &_colored {
        position: fixed;
        top: 0;
        z-index: 100;
        transition: background 150ms linear;
        /*background: rgba(255, 255, 255, 0.98);*/
      }
    }
    &-wrap {
      height: var(--height);
    }
  }
</style>
