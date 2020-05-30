<template>
  <el-card shadow="hover" class="article-author" :body-style="{ padding: 0 }">
    <img class="avatar" :src="_author.avatar" @click="toAuthor">
    <h6 class="title">
      {{ _author.name }}
    </h6>
    <p class="desc">
      {{ _author.description }}
    </p>
    <div class="contact text-center">
      <i class="iconfont icon-github contact__icon" />
      <i class="iconfont icon-email contact__icon" />
    </div>
    <el-card :body-style="{ padding: 0 }" class="statis-wrap">
      <el-row type="flex" align="middle" class="statis">
        <el-col :span="12" class="text-center">
          <p class="statis__label">
            文章总数
          </p>
          <p class="statis__number">
            {{ _author.articleCount }}
          </p>
        </el-col>
        <el-col :span="12" class="text-center">
          <p class="statis__label">
            获赞总数
          </p>
          <p class="statis__number">
            {{ _author.linkCount }}
          </p>
        </el-col>
      </el-row>
    </el-card>
    <!-- <footer class="text-center footer">
      <el-button type="primary" size="small">
        添加文章
      </el-button>
    </footer> -->
  </el-card>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true
    }
  },
  computed: {
    _author() {
      const author = this.author || {}
      return {
        avatar: author.avatar || '',
        name: author.name || '',
        description: author.description || '',
        articleCount: author.article_count || 0,
        linkCount: author.link_count || 0
      }
    }
  },
  methods: {
    toAuthor() {}
  }
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
    cursor: pointer;
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
  .statis {
    height: 70px;
    &-wrap {
      margin-top: 20px;
    }
    &__label {
      @include fontMain;
    }
    &__number {
      @include fontTitle;
      font-size: 18px;
      margin-top: 6px;
    }
  }
  .footer {
    padding: 10px 0;
  }
</style>
