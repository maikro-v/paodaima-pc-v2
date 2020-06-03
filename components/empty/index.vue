<template>
  <el-card shadow="hover" class="empty">
    <img src="~/assets/images/empty-icon.png" class="empty__img">
    <p class="empty__text">
      暂无数据
    </p>
  </el-card>
</template>

<style lang="scss" scoped>
  .empty {
    padding: 50px 0;
    &__img {
      width: 200px;
      margin: 0 auto;
      display: block;
      animation: scale 1s ease infinite alternate;
    }
    &__text {
      font-size: 30px;
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
