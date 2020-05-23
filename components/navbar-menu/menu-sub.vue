<template>
  <el-submenu :index="data.id">
    <template v-for="item in data.children">
      <navbar-menu-sub v-if="hasChildren(item.children)" :key="item.id" :data="item.children" />
      <navbar-menu-item :key="item.id" :data="item" />
    </template>
  </el-submenu>
</template>

<script>
import navbarMenuItem from './menu-item'
export default {
  name: 'NavbarMenuSub',
  components: { navbarMenuItem },
  props: {
    data: {
      type: Object,
      required: true
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
