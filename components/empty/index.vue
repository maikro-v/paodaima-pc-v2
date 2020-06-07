<template>
  <el-card shadow="hover" class="empty">
    <img src="@/static/svg/empty.svg" class="empty__img">
    <p class="empty__text">
      暂无数据
    </p>
  </el-card>
</template>

<style lang="scss" scoped>
  .empty {
    padding: 50px 0;
    &__img {
      width: 160px;
      margin: 0 auto;
      display: block;
      /*animation: scale 1s ease infinite alternate;*/
    }
    &__text {
      font-size: 16px;
      color: $textColor;
      text-align: center;
      margin-top: 20px;
    }
  }
  @keyframes scale {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-20px);
    }
  }
</style>
