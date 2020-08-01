<template>
  <el-card
    class="side-menu"
    :class="[
      { 'sticky': sticky }
    ]"
    :body-style="{
      padding: '0px'
    }"
    :style="{
      top: `${stickyTop}px`
    }"
  >
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
    },
    sticky: {
      type: Boolean,
      default: false
    },
    stickyTop: {
      type: [Number, String],
      default: 0
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
.sticky {
  position: sticky;
}
.header {
  padding: 16px 20px 6px;
  font-size: 20px;
  font-weight: bold;
  color: $titleColor;
}
.main {
  padding-bottom: 10px;
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
      background: $primary;
      transform: translateX(-50%);
      border-radius: 1px;
      transition: $transition;
    }
    &:hover {
      color: $primary;
      &::before {
        bottom: 2px;
      }
    }
  }
}
</style>
