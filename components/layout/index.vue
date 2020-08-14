<template>
  <div class="layout">
    <navbar
      v-if="!hideHeader"
      :class="{ navbar_colored: navbarColored }"
      :style="headerStyle"
      :theme="headerTheme"
      :fixed="headerFixed"
      :body-class="headerBodyClass"
    />
    <slot />
    <backtop :show="navbarColored" />
    <div
      v-show="showProgress"
      class="progress"
    >
      {{ progress }}%
    </div>
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
    scrollFrequency: {
      type: Number,
      default: 30
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
    },
    hideHeader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      navbarColored: false,
      progress: 0,
      progressTop: 0
    }
  },
  computed: {
    showProgress() {
      return this.progress > 2
    }
  },
  mounted() {
    this.throttleFun = throttle(this.onScroll, this.scrollFrequency)
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
      this.progress = Math.ceil((scrollTop / (totalHeight - height)) * 100)
      this.progressTop = scrollTop
      this.onScrollMove(scrollTop, totalHeight)
      if (Math.ceil(scrollTop + height) >= totalHeight - this.threshold && !this.scrollDisabled) {
        this.onScrollEnd()
      }
    },
    onScrollEnd() {
      this.$emit('load')
    },
    onScrollMove(scrollTop, total) {
      this.$emit('scroll', scrollTop, total)
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
  .progress {
    position: fixed;
    right: 60px;
    bottom: 30px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 2px 2px 8px rgba(103, 61, 230, 0.3);
    text-align: center;
    cursor: pointer;
    color: $primary;
    font-weight: bold;
    font-size: 16px;
  }
</style>
