<template>
  <article class="article-content">
    <div class="user row align-center">
      <el-avatar size="medium" :src="require('@/assets/images/avatar.jpg')" />
      <div class="col user__detail">
        <p class="user__name">
          用户名
        </p>
        <p class="user__time">
          2020-03-28 12:00:00 阅读：1234
        </p>
      </div>
    </div>
    <h1 class="title">
      文章标题
    </h1>
    <section class="content">
      <img :src="require('@/assets/images/avatar.jpg')">
      <p>
        React毫无疑问是前端界主流的框架，而框架本身就是热点。课程以讲解React实现原理为主，并在实现过程中讲解这么做的原因，带来的好处以及规避了哪些问题。理解源码之后对于React开发过程中出现的一系列问题都可以非常轻松得进行解决，也是能力提升，晋升高级开发工程师的必备技能。
      </p>
    </section>
  </article>
</template>

<script>
export default {
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
    & * {
      max-width: 100%;
      line-height: 1.5;
      @include fontMain;
    }
  }
</style>
