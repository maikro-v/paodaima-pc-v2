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
        console.log('滚动中')
        const distance = 20 // 触发加载的距离阈值
        const contentHeight = document.documentElement.scrollHeight
        const viewHeight = document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop

        if (viewHeight + scrollTop >= contentHeight - distance) {
          console.log('请求数据')
          this.canScrollLoad = false
          await this.onScrollLoad()
          console.log('数据请求完成')
          this.page++
          this.canScrollLoad = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  beforeDestroy() {
    window.onscroll = null
  }
}
