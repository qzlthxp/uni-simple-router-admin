<template>
  <view class="content">
    <view class="status_bar"></view>
    <view>
      <text>个人信息</text>
    </view>
    <view>
      <text>
        {{ userInfo }}
      </text>
    </view>
    <button type="warn" :plain="true" @click="toLogout">退出登录</button>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    toLogout() {
      uni.showModal({
        title: '退出账号',
        content: '确定退出当前账号',
        confirmColor: '#dd524d',
        success: (res) => {
          if (res.confirm) {
            this.logout()
            uni.reLaunch({
              url: '/pages/login/index'
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 $uni-spacing-row-sm;
  width: 100%;
}
</style>
