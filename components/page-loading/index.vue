<template lang="html">
  <div v-if="loading" class="page-loading">
    <div class="content">
      <span class="box" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  $size: 140px;
  .page-loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(white, .3);
    z-index: 9999;
  }
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: $size;
    height: $size;
    border: 8px solid;
    border-top-color: #009e5a;
    border-left-color: #1a6fef;
    border-bottom-color: #d4422b;
    border-right-color: #ffb405;
    border-radius: 50%;
    transform: rotate(45deg);
    margin-top: calc(-#{$size} / 2);
    margin-left: calc(-#{$size} / 2);
  }
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    display: inline-block;
    width: $size + 2px;
    height: $size + 2px;
    background: transparent linear-gradient(90deg, rgba(30, 88, 153, 0) 0%, rgba(44, 139, 216, 0) 76%, white 85%, white 100%);
    -moz-background-origin: border;
    background-origin: border-box;
    border: 6px solid transparent;
    border-radius: 50%;
    box-shadow: inset -999px 0 0 #fff;
    margin-top: calc(-#{$size} / 2);
    margin-left: calc(-#{$size} / 2);
    animation: loading 1s linear infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
