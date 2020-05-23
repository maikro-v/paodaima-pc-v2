<template>
  <div class="side-menu-item text-overs">
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
  min-height: 30px;
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
