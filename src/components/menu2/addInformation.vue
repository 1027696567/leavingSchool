<template>
  <div class="addInformation">
    <!-- 添加资讯信息弹框 -->
    <el-dialog title="新增资讯" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="资讯标题：" prop="title" style="width:640px">
              <el-input v-model="form.title" placeholder="请输入资讯标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="资讯内容：" prop="content" style="width:640px">
          <el-input type="textarea"
            :autosize="{ minRows: 6 }"
            resize=vertical
            v-model="form.content"
            maxlength="2000"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 180px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addInformation } from '../../api/menu2/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        title: null,
        content: null,
        createUser: null
      },
      rules: {
        title: [
          {required: true, message: '请输入资讯标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入资讯内容', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.form.createUser = localStorage.getItem('user')
          await addInformation(this.form).then((res) => {
            this.$refs[form].resetFields()
            this.dialogVisible = false
            this.parent()
          })
        } else {
          return false
        }
      })
    },
    parent () {
      this.$parent.findAllInformation()
    },
    resetForm (form) {
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    closeDiv (done) {
      this.$refs['form'].resetFields()
      done()
    }
  },
  created () {

  }
}
</script>
<style>
.addInformation .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.addInformation .el-form-item__content {
  margin-left: 95px!important;
}
</style>
