<template>
  <el-card shadow="hover" class="article-author" :body-style="{ padding: 0 }">
    <img class="avatar" src="@/assets/images/avatar.jpg">
    <h6 class="title">
      前端小弟
    </h6>
    <p class="desc">
      刚刚入门前端的小菜鸟
    </p>
    <div class="contact text-center">
      <i class="iconfont icon-github contact__icon" />
      <i class="iconfont icon-email contact__icon" />
    </div>
    <el-card :body-style="{ padding: 0 }" class="footer">
      <el-row type="flex" align="middle" class="statis">
        <el-col :span="12" class="text-center">
          <p class="statis__label">
            文章总数
          </p>
          <p class="statis__number">
            10
          </p>
        </el-col>
        <el-col :span="12" class="text-center">
          <p class="statis__label">
            获赞总数
          </p>
          <p class="statis__number">
            10
          </p>
        </el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .article-author {
    position: relative;
    background: linear-gradient($primary 120px, white 0);
    overflow: hidden;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid white;
    margin: 70px auto 0;
    display: block;
  }
  .title {
    @include fontTitle;
    text-align: center;
    margin-top: 10px;
  }
  .desc {
    @include fontMain;
    text-align: center;
    margin-top: 10px;
  }
  .contact {
    margin-top: 20px;
    &__icon {
      color: $textColor;
      font-size: 24px;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        color: $titleColor;
      }
    }
  }
  .footer {
    margin-top: 20px;
  }
  .statis {
    height: 70px;
    &__label {
      @include fontMain;
    }
    &__number {
      @include fontTitle;
      font-size: 18px;
      margin-top: 6px;
    }
  }
</style>
