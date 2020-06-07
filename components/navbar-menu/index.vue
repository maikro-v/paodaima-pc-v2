<template>
  <el-menu
    :default-active="_active"
    class="navbar-menu"
    mode="horizontal"
    background-color="#566270"
    text-color="#e0e3da"
    active-text-color="#a593e0"
  >
    <template v-for="(item) in _menuData">
      <navbar-menu-sub v-if="hasChildren(item.children)" :key="item.id" :data="item" />
      <navbar-menu-item v-else :key="item.id" :data="item" />
    </template>
  </el-menu>
</template>

<script>
import navbarMenuItem from './menu-item'
import navbarMenuSub from './menu-sub'
export default {
  components: { navbarMenuItem, navbarMenuSub },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    _menuData() {
      return this.data
    },
    _active() {
      const type = this.$route.query.type
      if (type) {
        return String(type)
      } else {
        return ''
      }
    }
  },
  methods: {
    // 是否有子类
    hasChildren(children = []) {
      return children && children.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-menu {
  border-bottom: none;
  /deep/ .el-menu-item.is-active {
    border-bottom-color: transparent !important;
  }
}
</style>
