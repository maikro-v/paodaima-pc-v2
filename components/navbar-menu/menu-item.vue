<template>
  <el-menu-item :index="data.id.toString()">
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
  }
}
</script>
