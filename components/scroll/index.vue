<template>
  <div class="page-container">
    <slot />
    <el-backtop target=".page-container" :bottom="80" />
  </div>
</template>

<script>
import { throttle } from '@/libs/tools'
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
  mounted() {
    this.throttleFun = throttle(this.handleScroll, 100)
    document.addEventListener('scroll', this.throttleFun, false)
  },
  methods: {
    handleScroll() {
      if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 10 && !this.infiniteScrollDisabled) {
        this.onScrollLoad && this.onScrollLoad()
      }
    },
    load() {
      this.onScrollLoad && this.onScrollLoad()
    }
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.throttleFun, false)
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    /*height: 100%;*/
    /*overflow: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
  }
</style>
