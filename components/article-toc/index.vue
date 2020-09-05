<template>
  <div class="article-toc">
    <div class="article-toc__title">
      目录
    </div>
    <article-toc-el v-for="item in _toc" :key="item.id" :tag="item.tag" @click.native="toFocus(item.id)">
      {{ item.title }}
    </article-toc-el>
  </div>
</template>

<script>
import articleTocEl from './article-toc-el'
export default {
  components: {
    articleTocEl
  },
  props: {
    toc: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    _toc() {
      return this.toc || []
    }
  },
  methods: {
    toFocus(id) {
      const scrollTop = document.documentElement.scrollTop
      const top = document.querySelector(`#${id}`).getBoundingClientRect().top + scrollTop - 90
      window.scrollTo(0, top)
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-toc {
    padding: 0 6px;
    &__title {
      font-size: 16px;
      margin-bottom: 6px;
    }
  }
</style>
