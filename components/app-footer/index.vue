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
    text-align: center;
    font-size: 16px;
    color: #333333;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, .1);
    padding: 14px 0;
    background: #566270;
    &__text {
      color: white;
    }
    &__author {
      text-decoration: underline;
    }
  }
</style>
