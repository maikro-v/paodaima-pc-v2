import { throttle } from '@/libs/tools'

export default {
  data() {
    return {
      page: 0,
      totalPage: 0,
      canScrollLoad: true
    }
  },
  mounted() {
    const scroll = throttle(this.handleScroll, 100)
    window.onscroll = scroll
  },
  methods: {
    async handleScroll() {
      if (!this.canScrollLoad || this.page > this.totalPage) {
        return false
      }
      try {
        const distance = 20 // 触发加载的距离阈值
        const contentHeight = document.documentElement.scrollHeight
        const viewHeight = document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop

        if (viewHeight + scrollTop >= contentHeight - distance) {
          this.beforeLoad()
          this.canScrollLoad = false
          // 加载中
          await this.onScrollLoad({
            page: this.page,
            totalPage: this.totalPage
          })
          this.page++
          this.canScrollLoad = true
          this.LoadEnd()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 滚动加载之前
    beforeLoad() {
      this.$emit('scroll-before-load')
    },
    // 滚动加载完成
    LoadEnd() {
      this.$emit('scroll-load-end', ths.page > this.totalPage)
    }
  },
  beforeDestroy() {
    window.onscroll = null
  }
}
