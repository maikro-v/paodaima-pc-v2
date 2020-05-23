<template>
  <div class="navbar">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .navbar {
    height: 60px;
    background: #566270;
    &-wrap {
      @include container;
    }
  }
</style>
