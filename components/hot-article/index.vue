<template>
  <side-menu title="热门">
    <side-menu-item v-for="item in articleList" :key="item.id">
      {{ item.title }}
    </side-menu-item>
  </side-menu>
</template>

<script>
import sideMenu from '@/components/side-menu'
import sideMenuItem from '@/components/side-menu-item'
export default {
  components: { sideMenu, sideMenuItem },
  data() {
    return {
      articleList: []
    }
  },
  async created() {
    try {
      const { data } = await this.$api.article.hot()
      this.articleList = data.data
    } catch (err) {
      this.$notify.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
}
</style>
