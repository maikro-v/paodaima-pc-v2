<template>
  <el-menu-item
    :index="data.id+''"
    @click="toArticleList"
  >
    {{ data.name }}
  </el-menu-item>
</template>

<script>
export default {
  name: 'NavbarMenuItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    toArticleList() {
      if (this.data.id === 0) {
        this.$router.push({
          name: 'index'
        })
      } else {
        this.$router.push({
          name: 'article',
          query: {
            type: this.data.id
          }
        })
      }
    }
  }
}
</script>
