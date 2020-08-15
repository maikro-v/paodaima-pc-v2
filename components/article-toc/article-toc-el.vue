<template>
  <a
    :href="url"
    class="article-toc-el text-over"
    :class="[`article-toc-${tag}`, {
      'article-toc-el_active': active
    }]"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.article-toc {
  &-el {
    position: relative;
    display: block;
    font-size: 16px;
    color: $titleColor;
    line-height: 1.9;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 4px;
      height: 4px;
      background: #7f828b;
      transform: translate(-12px, -50%);
      border-radius: 2px;
    }
    &:hover {
      background: #f3f5fb;
    }
    &_active {
      background: #f3f5fb;
      color: #7e8dce;
    }
  }
  @for $i from 1 through 6 {
    &-h#{$i} {
      padding-left: 14px * $i;
      &::before {
        left: 14px * $i;
      }
    }
  }
  &-h1 {
    font-weight: bold;
    &::before {
      width: 6px;
      height: 6px;
      transform: translate(-12px, -50%);
    }
  }
}
</style>
