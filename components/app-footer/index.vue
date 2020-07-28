<template>
  <footer class="app-footer">
    <p class="app-footer__text">
      &copy;Copyright 2020-至今
      <a class="app-footer__text app-footer__author" href="http://maikro.cn" target="_blank">
        Maikro
      </a>
      AllRightsReserved
    </p>
    <a class="app-footer__text" href="http://beian.miit.gov.cn/" target="_blank">
      粤ICP备19074062号
    </a>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .app-footer {
    line-height: 1.6;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    padding: 30px 0;
    background: $bgColor;
    &__text {
      color: $titleColor;
    }
    &__author {
      text-decoration: underline;
    }
  }
</style>
