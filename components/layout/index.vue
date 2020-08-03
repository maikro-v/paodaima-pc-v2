<template>
  <div class="layout">
    <navbar
      :class="{ navbar_colored: navbarColored }"
      :style="headerStyle"
      :theme="headerTheme"
      :fixed="headerFixed"
      :body-class="headerBodyClass"
    />
    <slot />
    <backtop :show="navbarColored" />
  </div>
</template>

<script>
import { throttle } from '@/libs/tools'
import navbar from '@/components/navbar'
import backtop from '@/components/backtop'
export default {
  components: { navbar, backtop },
  props: {
    headerColoredDistance: {
      type: Number,
      default: 80
    },
    threshold: {
      type: Number,
      default: 10
    },
    scrollDisabled: {
      type: Boolean,
      default: false
    },
    headerStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    headerTheme: {
      type: String,
      default: 'white'
    },
    headerFixed: {
      type: Boolean,
      default: true
    },
    headerBodyClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      navbarColored: false
    }
  },
  mounted() {
    this.throttleFun = throttle(this.onScroll, 100)
    document.addEventListener('scroll', this.throttleFun)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.throttleFun)
  },
  methods: {
    onScroll() {
      const scrollTop = document.documentElement.scrollTop
      const totalHeight = document.documentElement.scrollHeight
      const height = document.documentElement.clientHeight
      this.navbarColored = scrollTop > this.headerColoredDistance
      if (Math.ceil(scrollTop + height) >= totalHeight - this.threshold && !this.scrollDisabled) {
        this.onScrollEnd()
      }
    },
    onScrollEnd() {
      this.$emit('load')
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    /*overflow-x: hidden;*/
  }
  .navbar_colored {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
</style>
