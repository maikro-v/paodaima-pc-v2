<template>
  <div
    class="navbar"
    :style="{
      '--height': height
    }"
  >
<!--    <div class="navbar__block" />-->
    <div class="navbar__content">
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
    /*height: var(--height);*/
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--height);
    box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
    background: #566270;
    z-index: 100;
    &__block {
      height: 100%;
    }
    &__content {
      /*position: fixed;*/
      /*top: 0;*/
      /*width: 100%;*/
      /*height: var(--height);*/
      /*box-shadow: 0 2px 6px rgba(0, 0, 0, .2);*/
      /*background: #566270;*/
      /*z-index: 100;*/
    }
    &-wrap {
      height: var(--height);
    }
  }
</style>
