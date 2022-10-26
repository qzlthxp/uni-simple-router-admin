<template>
  <view class="content">
    <view class="status_bar" />
    <text>login</text>
    <view class="login-form">
      <uni-forms
        ref="form"
        :modelValue="formData"
        label-position="left"
        label-align="center"
        :rules="rules"
        :border="true"
        err-show-type="toast"
      >
        <uni-forms-item label="用户名" name="username">
          <uni-easyinput type="text" :inputBorder="false" v-model="formData.username" placeholder="请输入用户名" />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput type="password" :inputBorder="false" v-model="formData.password" placeholder="请输入密码" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submitForm">登录</button>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      path: '/pages/index/index',
      formData: {
        username: '',
        password: ''
      },
      rules: {
        // 对name字段进行必填验证
        username: {
          rules: [
            {
              required: true,
              errorMessage: '请输入用户名'
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: '请输入密码'
            }
          ]
        }
      }
    }
  },
  onLoad({ redirect }) {
    if (redirect) {
      this.path = redirect
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async submitForm() {
      const res = await this.$refs.form.validate()
      this.login(res).then(() => {
        if (this.path === '/pages/index/index') {
          uni.switchTab({
            url: this.path
          })
        } else {
          uni.redirectTo({
            url: this.path
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 3%;
  width: 100%;
  height: 100vh;
}
</style>
