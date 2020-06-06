<template>
  <div
    v-infinite-scroll="load"
    :infinite-scroll-delay="_infiniteScrollDelay"
    :infinite-scroll-disabled="_infiniteScrollDisabled"
    :infinite-scroll-distance="_infiniteScrollDistance"
    :infinite-scroll-immediate="_infiniteScrollImmediate"
    class="page-container"
  >
    <slot />
    <el-backtop target=".page-container" />
  </div>
</template>

<script>
export default {
  props: {
    onScrollLoad: Function,
    infiniteScrollDisabled: {
      type: Boolean,
      default: false
    },
    infiniteScrollDelay: {
      type: Number,
      default: 200
    },
    infiniteScrollDistance: {
      type: Number,
      default: 0
    },
    infiniteScrollImmediate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _infiniteScrollDelay() {
      return this.infiniteScrollDelay
    },
    _infiniteScrollDisabled() {
      return this.infiniteScrollDisabled
    },
    _infiniteScrollDistance() {
      return this.infiniteScrollDistance
    },
    _infiniteScrollImmediate() {
      return this.infiniteScrollImmediate
    }
  },
  methods: {
    load() {
      this.onScrollLoad && this.onScrollLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    height: 100%;
    overflow: auto;
  }
</style>
