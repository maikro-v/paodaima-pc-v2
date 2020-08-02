<template>
  <h1 class="logo">
    <nuxt-link to="/">
      <img src="@/static/logo.png" alt="maikro" class="logo__img">
    </nuxt-link>
  </h1>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .logo {
    height: 40px !important;
    color: $titleColor;
    display: inline-block;
    &__img {
      height: 100%;
    }
  }
</style>
