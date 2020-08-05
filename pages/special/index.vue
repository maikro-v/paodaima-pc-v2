<template>
  <layout hide-header class="special">
    <header class="header">
      <div class="header__container container row align-center">
        <logo />
      </div>
    </header>
    <section class="tag-wrap container">
      <span class="tag">全部</span>
      <span class="tag tag_active">全部</span>
    </section>
    <div class="container">
      <el-row type="flex">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="list row align-start">
            <img src="@/assets/images/avatar.jpg" alt="" class="list__img">
            <div class="list__detail col">
              <h2 class="list__title text-over">
                分布式链路追踪实战
              </h2>
              <p class="list__desc text-overs">
                20讲玩转微服务可观测性系统
              </p>
              <p class="list__author">
                作者
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import logo from '@/components/logo'
export default {
  components: { layout, logo },
  head() {
    return {
      title: 'maikro - 专栏'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .special {
    min-height: 100vh;
    background: #f6f8ff;
  }
  .header {
    height: 66px;
    background: white;
    box-shadow: 0 0 10px #ebedf4;
    &__container {
      height: 100%;
    }
  }
  .tag-wrap {
    margin: 40px auto;
    font-size: 0;
  }
  .tag {
    height: 28px;
    line-height: 28px;
    padding: 0 14px;
    font-size: 14px;
    color: #666;
    display: inline-block;
    margin: 0 15px 15px 0;
    background: none;
    border-radius: 14px;
    cursor: pointer;
    &_active {
      background: $primary;
      color: white;
    }
  }
  .list {
    padding: 20px;
    height: 172px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
    position: relative;
    &__img {
      width: 100px;
      height: 130px;
      border-radius: 8px;
    }
    &__detail {
      width: 0;
      margin-left: 10px;
      margin-top: 4px;
    }
    &__title {
      font-size: 20px;
      font-weight: 500;
    }
    &__desc {
      font-size: 14px;
      margin-top: 6px;
    }
    &__author {
      position: absolute;
      bottom: 32px;
      left: 130px;
      font-size: 12px;
      color: #999;
    }
  }
</style>
