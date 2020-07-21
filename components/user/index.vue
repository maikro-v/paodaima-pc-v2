<template>
  <el-dropdown trigger="hover" :show-timeout="50" @command="action">
    <div class="user row align-center">
      <div class="col">
        <el-avatar :src="_avatar" size="medium" />
      </div>
      <div class="user__name text-over">
        {{ _userName }}
      </div>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="my">
        个人中心
      </el-dropdown-item>
      <el-dropdown-item command="article-edit">
        添加文章
      </el-dropdown-item>
      <el-dropdown-item command="logout">
        退出
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  computed: {
    _avatar() {
      return this.avatar
    },
    _userName() {
      return this.userName
    }
  },
  methods: {
    action(command) {
      if (command === 'logout') {
        this.$emit('on-logout')
      } else {
        this.$router.push({
          name: command
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
    cursor: pointer;
    &__name {
      max-width: 80px;
      line-height: 1.4;
      @include fontMain;
      margin-left: 10px;
      color: var(--color);
      font-weight: bold !important;
    }
  }
</style>
