<template>
  <el-submenu
    :index="menuData.id+''"
    :show-timeout="0"
    :hide-timeout="0"
  >
    <template slot="title">
      {{ menuData.name }}
    </template>
    <template v-for="(item, index) in menuData.children">
      <navbar-menu-sub v-if="hasChildren(item.children)" :key="index" :data="item" />
      <navbar-menu-item v-else :key="index" :data="item" />
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
  data() {
    return {
      menuData: this.data || {}
    }
  },
  mounted() {
    if (this.hasChildren(this.menuData.children)) {
      this.menuData.children.unshift({
        id: this.data.id,
        name: '全部'
      })
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
