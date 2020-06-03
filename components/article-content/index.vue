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
    <article v-highlight v-html="_datas.content" class="content" />
  </article>
</template>

<script>
import dayjs from 'dayjs'
import showdown from 'showdown'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      converter: new showdown.Converter()
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
        content: this.converter.makeHtml(data.content) || '',
        time: data.create_time ? dayjs(data.create_time).format('YYYY-MM-DD hh:mm:ss') : '',
        title: data.title || '',
        visitorCount: data.visitor_count || 0
      }
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
    line-height: 2;
    & * {
      max-width: 100%;
      line-height: 2;
      @include fontMain;
    }
  }
</style>
