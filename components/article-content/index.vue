<template>
  <article class="article-content">
    <div class="user row align-center">
      <el-avatar size="medium" :src="_datas.author.avatar" />
      <div class="col user__detail">
        <p class="user__name">
          {{ _datas.author.name }}
        </p>
        <p class="user__time">
          {{ _datas.time }} 阅读：{{ _datas.visitorCount }}
        </p>
      </div>
    </div>
    <h1 class="title">
      {{ _datas.title }}
    </h1>
    <markdown-view :ref="markdownView" :value="_datas.content" class="content" />
    <!--    <article v-html="_datas.content" class="content markdown" />-->
  </article>
</template>

<script>
import dayjs from 'dayjs'
import markdownView from '@/components/markdown-view2.0'
export default {
  components: { markdownView },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markdownView: `ref-${(new Date().getTime() + Math.random() * 10000).toFixed(0)}`
    }
  },
  computed: {
    _datas() {
      const data = this.data
      return {
        author: data.author || {
          name: '',
          avatar: ''
        },
        content: data.content,
        time: data.create_time ? dayjs(data.create_time).format('YYYY-MM-DD HH:mm:ss') : '',
        title: data.title || '',
        visitorCount: data.visitor_count || 0
      }
    }
  },
  methods: {
    getToc() {
      return this.$refs[this.markdownView].getToc()
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
    &__detail {
      margin-left: 10px;
    }
    &__name {
      @include fontTitle;
    }
    &__time {
      @include fontAssist;
      margin-top: 6px;
    }
  }
  .title {
    font-size: 30px;
    color: $titleColor;
    margin-top: 30px;
  }
  .content {
    margin-top: 20px;
  }
</style>
