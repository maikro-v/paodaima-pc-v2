<template>
  <div>
    首页
  </div>
</template>

<script>
import * as classify from '@/api/classify'
export default {
  layout: 'common',
  async fetch ({ store, params }) {
    let { data } = await classify.list()
    console.log(data)
  }
}
</script>

<style>
</style>
