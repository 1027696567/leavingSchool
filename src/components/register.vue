<template>
  <div class="register">
    <!-- 注册弹框 -->
    <el-dialog title="注册" :visible.sync="dialogVisible" width="380px" :before-close="closeDiv">
      <el-form label-position="left" ref="userForm" status-icon :rules="rules" :model="userForm" label-width="0px" class="demo-ruleForm">
        <el-form-item  prop="username">
          <el-input v-model="userForm.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="userForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="realName">
          <el-input v-model="userForm.realName" auto-complete="off" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="userForm.email" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model.number="userForm.mobile" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 110px">
          <el-button type="primary" @click="onSubmit('userForm')">确认</el-button>
          <el-button @click="reset('userForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { register } from '../api/api'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      userForm: {
        username: '',
        password: '',
        checkPass: '',
        realName: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'number', message: '请输入正确的号码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.userForm).then()
            .catch((err) => {
              this.$message.error(err)
            })
        } else {
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    closeDiv (done) {
      this.$refs['userForm'].resetFields()
      done()
    }
  },
  created () {

  }
}
</script>
<style scope>
</style>
