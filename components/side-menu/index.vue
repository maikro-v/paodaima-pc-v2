<template>
  <el-card shadow="hover" class="side-menu" :body-style="{ padding: '0px' }">
    <header class="header text-over">
      {{ title }}
    </header>
    <main class="main">
      <slot />
    </main>
    <footer v-if="showFooter" class="footer">
      <div class="footer__btn" @click="handleMore">
        {{ footerText }}
      </div>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    footerText: {
      type: String,
      default: '查看更多'
    }
  },
  methods: {
    handleMore() {
      this.$emit('on-more')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  @include fontTitle;
}
.main {
  padding: 10px 0;
  border-top: $border;
}
.footer {
  border-top: $border;
  &__btn {
    position: relative;
    height: 34px;
    line-height: 34px;
    text-align: center;
    @include fontMain;
    cursor: pointer;
    transition: $transition;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -2px;
      display: block;
      width: 20px;
      height: 2px;
      background: $colorPrimary;
      transform: translateX(-50%);
      border-radius: 1px;
      transition: $transition;
    }
    &:hover {
      color: $colorPrimary;
      &::before {
        bottom: 2px;
      }
    }
  }
}
</style>
