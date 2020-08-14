<template>
  <el-card class="article-item" :body-style="bodyStyle">
    <el-row type="flex" justify="center" class="header">
      <el-col>
        <h5 class="header__title" @click="toDetail">
          <el-tag
            v-if="data.classify"
            effect="dark"
            size="mini"
          >
            {{ data.classify }}
          </el-tag>
          {{ data.title }}
        </h5>
      </el-col>
      <el-popover
        v-if="actions && actions.length > 0"
        placement="bottom"
        trigger="click"
        width="130"
        class="more"
      >
        <div>
          <el-button
            v-for="(item, index) in actions"
            :key="index"
            type="text"
            size="small"
            class="ml-10 more__block"
            @click="handleAction(index, item)"
          >
            {{ actionKey ? item[actionKey] : item }}
          </el-button>
          <!-- <el-button type="text" size="small" class="more__block" @click="handleAction(1)">
            下架
          </el-button>
          <el-button slot="reference" type="text" size="small" class="more__block" @click="handleAction(2)">
            删除
          </el-button> -->
        </div>
        <i slot="reference" class="el-icon-more more__icon" />
      </el-popover>
    </el-row>
    <div class="main">
      <el-image
        v-if="showImage && data.image"
        :src="data.image"
        fit="cover"
        :lazy="true"
        :alt="data.title"
        class="main__img"
      >
        <div slot="error">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
      <p class="text-overs main__text">
        {{ data.description }}
      </p>
      <div v-if="data.tag_name && data.tag_name.length" class="main__tag">
        <tag v-for="(item, index) in data.tag_name" :key="index">
          {{ item }}
        </tag>
      </div>
    </div>
<!--    <el-row type="flex" class="main" @click.native="toDetail">-->
<!--      <el-col class="row column justify-between">-->
<!--        <p class="text-overs main__text">-->
<!--          {{ data.description }}-->
<!--        </p>-->
<!--        <div v-if="data.tag_name && data.tag_name.length" class="main__tag">-->
<!--          <tag v-for="(item, index) in data.tag_name" :key="index">-->
<!--            {{ item }}-->
<!--          </tag>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-image-->
<!--        v-if="showImage && data.image"-->
<!--        :src="data.image"-->
<!--        fit="cover"-->
<!--        :lazy="true"-->
<!--        :alt="data.title"-->
<!--        class="main__img"-->
<!--      >-->
<!--        <div slot="error">-->
<!--          <i class="el-icon-picture-outline" />-->
<!--        </div>-->
<!--      </el-image>-->
<!--    </el-row>-->
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
          <span class="footer__action_number">{{ data.like_count }}</span>
        </span>
        <span class="footer__action">
          <i class="iconfont icon-yulan footer__action_icon" />
          <span class="footer__action_number">{{ data.visitor_count }}</span>
        </span>
        <!--        <span class="footer__action">-->
        <!--          <i class="iconfont icon-fenxiang footer__action_icon" />-->
        <!--        </span>-->
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
    showImage: {
      type: Boolean,
      default: true
    },
    bodyStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    target: {
      type: String,
      default: '_self'
    },
    method: {
      type: String,
      default: 'push'
    },
    to: {
      type: [String, Object]
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    actionKey: {
      type: String
    }
  },
  computed: {
    time() {
      return dayjs(this.data.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    handleAction(index) {
      this.$emit('on-active', index)
    },
    toDetail() {
      if (typeof this.to === 'string' || typeof this.to === 'object') {
        if (this.target === '_blank') {
          const { href } = this.$router.resolve(this.to)
          window.open(href, '_blank')
        } else {
          this.$router[this.method](this.to)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-item{
    background: #fff;
    border: 1px solid #fafbff;
    & + & {
      margin-top: 20px;
    }
  }
  .header {
    &__title {
      display: inline-block;
      @include fontTitle;
      cursor: pointer;
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
    padding-top: 20px;
    cursor: pointer;
    font-size: 16px;
    &__text {
      line-height: 1.4;
      text-align: justify;
    }
    &__img {
      width: 100%;
      max-height: 500px;
      margin-bottom: 10px;
      @media screen and (max-width: 1500px) {
        max-height: 440px;
      }
      @media screen and (max-width: 1260px) {
        max-height: 380px;
      }
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
