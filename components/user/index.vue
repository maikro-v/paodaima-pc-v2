<template>
  <el-dropdown trigger="hover" :show-timeout="50" @command="action">
    <div class="user row align-center">
      <div class="col">
        <el-avatar size="medium" />
      </div>
      <div class="user__name text-over">
        用户名
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
  methods: {
    action(command) {
      if (command === 'logout') {
        console.log('退出登录')
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
      @include fontMain;
      margin-left: 10px;
      color: #e0e3da;
    }
  }
</style>
