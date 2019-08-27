<template>
    <div class="login-container">
      <el-form :model="loginForm" status-icon ref="loginForm" :rules="rules"
               label-position="left" label-width="0px" class="login-page">
        <h3 style="text-align: center">系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="密码">
            <template slot="prepend">
              <i class="el-icon-unlock"></i>
            </template>
          </el-input>
        </el-form-item>
<!--        <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width: 100%" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入您的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((validate) => {
        if (validate) {
          // TODO 请求校验
          this.loading = true

          setTimeout(() => {
            this.loading = false
            this.$router.replace(this.$route.query.redirect || '/')
          }, 3000)

          // this.$router.replace(this.$route.query.redirect || '/')
        } else {
          this.$message.error('表单校验失败，请检查')
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: calc(100vh);
  background: url('../../../static/imgs/login-bg1.jpg') no-repeat;
  background-size: cover;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  /*margin: 180px auto;*/
  margin: calc(30vh) auto;
  width: 270px;
  padding: 10px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
