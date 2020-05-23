<template>
  <el-card class="article-item" shadow="hover" @click.native="toDetail">
    <el-row type="flex" justify="center" class="header">
      <el-col class="header__title">
        <el-tag
          v-if="data.classify"
          effect="dark"
          size="mini"
        >
          {{ data.classify }}
        </el-tag>
        {{ data.title }}
      </el-col>
      <el-popover
        v-if="isEdit"
        placement="bottom"
        trigger="click"
        width="130"
        class="more"
      >
        <div>
          <el-button type="text" size="small" class="ml-10 more__block">
            编辑
          </el-button>
          <el-button type="text" size="small" class="more__block" @click="delArticle(article.id)">
            删除
          </el-button>
          <el-button type="text" size="small" class="more__block">
            隐藏
          </el-button>
        </div>
        <i slot="reference" class="el-icon-more more__icon" />
      </el-popover>
    </el-row>
    <el-row type="flex" class="main">
      <el-col class="row column justify-between">
        <p class="text-overs main__text">
          {{ data.description }}
        </p>
        <div v-if="data.tag_name && data.tag_name.length" class="main__tag">
          <tag v-for="(item, index) in data.tag_name" :key="index">
            {{ item }}
          </tag>
        </div>
      </el-col>
      <img :src="data.image" :alt="data.title" class="main__img">
    </el-row>
    <el-row type="flex" align="middle" class="footer">
      <el-col :span="12">
        <span class="footer__username">{{ data.author.name }}</span>
        <span class="footer__time">{{ time }}</span>
      </el-col>
      <el-col :span="12" class="text-right">
        <span class="footer__action">
          <i class="iconfont icon-xiaoxi footer__action_icon" />
          <span class="footer__action_number">{{ data.comment_count }}</span>
        </span>
        <span class="footer__action">
          <i class="iconfont icon-dianzan footer__action_icon" />
          <span class="footer__action_number">15</span>
        </span>
        <span class="footer__action">
          <i class="iconfont icon-yulan footer__action_icon" />
          <span class="footer__action_number">{{ data.visitor_count }}</span>
        </span>
        <span class="footer__action">
          <i class="iconfont icon-fenxiang footer__action_icon" />
        </span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
import tag from '@/components/tag'
export default {
  components: { tag },
  props: {
    data: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    time() {
      return dayjs(this.data.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    handleAction() {
      this.action = true
    },
    delArticle(id) {
      // remove({id}).then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })
    },
    toDetail() {
      this.$router.push(`/article/detail/${this.data.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-item{
    cursor: pointer;
    margin-bottom: 10px;
  }
  .header {
    &__title {
      @include fontTitle;
    }
  }

  .more {
    &__icon {
      cursor: pointer;
      font-size: 22px;
    }
    &__block {
      display: block;
      width: 100%;
      text-align: left;
      margin-left: 0;
      @include fontMain;
      &:hover {
        color: var(--primary);
        padding-left: 6px;
      }
    }
  }
  .main {
    @include fontMain;
    margin-top: 20px;
    &__text {
      line-height: 1.4;
      text-align: justify;
    }
    &__img {
      width: 152px;
      height: 96px;
      object-fit: cover;
      object-position: center;
      margin-left: 10px;
    }
    &__tag {
      margin-top: 20px;
    }
  }
  .footer {
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid #f4f4f4;
    &__username {
      @include fontMain;
      font-weight: bold;
    }
    &__time {
      @include fontMain;
    }
    &__action {
      display: inline-block;
      margin: 0 6px;
      @include fontMain;
      &_icon {
        vertical-align: bottom;
      }
      &_number {
        vertical-align: middle;
      }
      &:nth-child(3) {
        & .footer__action_icon {
          font-size: 18px;
        }
      }
      &:nth-child(4) {
        cursor: pointer;
      }
    }
  }
</style>
