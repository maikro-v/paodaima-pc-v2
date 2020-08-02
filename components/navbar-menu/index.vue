<template>
  <el-menu
    :default-active="_active"
    class="navbar-menu"
    mode="horizontal"
    background-color="transparent"
    text-color="#2f1c6a"
    active-text-color="#a593e0"
  >
    <template v-for="(item, index) in _menuData">
      <navbar-menu-sub v-if="hasChildren(item.children)" :key="index" :data="item" />
      <navbar-menu-item v-else :key="index" :data="item" />
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
      return this.$route.name
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
  /deep/ .el-menu-item,
  /deep/ .el-submenu__title,
  /deep/ .el-submenu__title i{
    font-weight: bold;
    font-size: 16px;
  }
  /deep/ .el-menu-item,
  /deep/ .el-menu--horizontal .el-menu-item,
  /deep/ .el-submenu__title {
    transition: all .3s ease;
    &:not(.is-disabled):hover {
      background-color: transparent !important;
      opacity: .6;
    }
    &.is-active {
      border-bottom-color: transparent !important;
    }
  }
}
</style>
