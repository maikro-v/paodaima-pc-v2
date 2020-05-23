<template>
  <div class="tag">
    <slot />
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .tag {
    height: 22px;
    line-height: 22px;
    padding: 0 10px;
    display: inline-block;
    @include shadow;
    @include card;
    & + & {
      margin-left: 6px;
    }
  }
</style>
