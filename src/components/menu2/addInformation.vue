<template>
  <div class="addInformation">
    <!-- 添加资讯信息弹框 -->
    <el-dialog title="新增资讯" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="资讯标题：" prop="companyNumber" style="width:640px">
              <el-input v-model="form.companyNumber" placeholder="请输入资讯标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="资讯内容：" prop="textarea" style="width:640px">
          <el-input type="textarea"
            :autosize="{ minRows: 6 }"
            resize=vertical
            v-model="form.textarea"
            maxlength="1000"
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
        companyNumber: '',
        companyName: '',
        registeredPlace: '',
        creditRating: '',
        corporateRepresentative: '',
        permanentAssets: '',
        email: '',
        fax: '',
        contact: '',
        telephone: '',
        textarea: ''
      },
      rules: {
        companyNumber: [
          {required: true, message: '请输入机构代码', trigger: 'blur'}
        ],
        companyName: [
          {required: true, message: '请输入机构名称', trigger: 'blur'}
        ],
        registeredPlace: [
          {required: true, message: '请输入公司注册地', trigger: 'blur'}
        ],
        creditRating: [
          {required: true, message: '请输入评级资质', trigger: 'blur'}
        ],
        corporateRepresentative: [
          {required: true, message: '请输入法人代表', trigger: 'blur'}
        ],
        permanentAssets: [
          {required: true, message: '请输入固定资产', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        fax: [
          {required: true, message: '请输入传真', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {type: 'number', message: '联系电话必须为数字值'}
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
          this.form.createUserName = localStorage.getItem('user')
          await addInformation(this.form).then((res) => {
            if (res.data === 1) {
              this.$message.success('创建成功！')
              this.$refs[form].resetFields()
              this.dialogVisible = false
              this.parent()
            } else if (res.data === 0) {
              this.$message.error('已申请机构！，请不要重复申请')
            } else {
              this.$message.error('该机构已存在！')
            }
          })
        } else {
          return false
        }
      })
    },
    parent () {
      this.$parent.selectAllCompanyInfo()
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
