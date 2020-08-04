<template>
  <el-menu-item
    :index="data.path"
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
      this.$router.push({
        name: this.data.path
      })
    }
  }
}
</script>
