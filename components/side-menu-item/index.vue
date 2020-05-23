<template>
  <div class="side-menu-item">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.side-menu-item {
  position: relative;
  line-height: 30px;
  cursor: pointer;
  padding: 0 20px;
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
    background: $colorPrimary;
    transition: $transition;
    transform: translateY(-50%);
  }
  &:hover {
    color: $colorPrimary;
    &::before {
      left: 0;
    }
  }
}
</style>
