<template>
  <div class="editInformation">
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
            maxlength="1000"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 180px">
          <el-button type="primary" @click="updateForm('form')">确认</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { updateInformation } from '../../api/menu2/api'
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
    init (data) {
      this.form = data
      this.dialogVisible = true
    },
    updateForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.form.updateUser = localStorage.getItem('user')
          await updateInformation(this.form).then((res) => {
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
      this.dialogVisible = false
    },
    closeDiv (done) {
      done()
    }
  },
  created () {
  }
}
</script>
<style>
.editInformation .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.editInformation .el-form-item__content {
  margin-left: 95px!important;
}
</style>
