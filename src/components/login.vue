<template>
  <div class="login-container">
    <el-form :model="user" :rules="rules2" status-icon ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="用户名" class="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%; margin-left: 0px" @click="handleSubmit" :loading="logining">登录</el-button>
    </el-form>
  <Register v-if="registerVisible" ref="Register"></Register>
  </div>
</template>

<script>
import * as types from '../store/mutations_type'
import Register from '../components/register'
import {mapActions} from 'vuex'
export default {
  components: { Register },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      logining: false,
      rules2: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      registerVisible: false
    }
  },
  methods: {
    ...mapActions({add_Routes: 'add_Routes'}),
    handleSubmit (event) {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.logining = true
          this.api.login(this.user.username, this.user.password).then((res) => {
            if (res.data.code === 200) {
              this.$store.commit(types.LOGIN, res.data.data.token)
              this.logining = false
              localStorage.setItem('menuData', JSON.stringify(res.data.data.menu.navDatas1))
              localStorage.setItem('menuData1', JSON.stringify(res.data.data.menu.navDatas2))
              localStorage.setItem('menuData2', JSON.stringify(res.data.data.menu.navDatas3))
              localStorage.setItem('user', this.user.username)
              localStorage.setItem('routes', JSON.stringify(res.data.data.menu.routerData))
              this.add_Routes(res.data.data.menu.routerData) // 触发vuex里的增加路由
              this.$router.push('/menu1_item1')
            } else {
              this.logining = false
            }
          }).catch((err) => {
            this.$message.error(err)
            this.logining = false
          })
        } else {
          return false
        }
      })
    },
    register () {
      this.registerVisible = true
      this.$nextTick(() => {
        this.$refs.Register.init()
      })
    }
  }
}
</script>
<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
button.el-button.register {
    margin: 0px 0px 15px;
    text-align: left;
}
.title {
    margin-left: 39%;
}
</style>
