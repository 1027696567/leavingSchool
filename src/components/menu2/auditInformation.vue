<template>
  <div class="auditInformation">
    <!-- 资讯审核弹框 -->
    <el-dialog title="资讯审核" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果：" prop="title" style="width:640px">
              <el-select v-model="form.auditStatus">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="审核内容：" prop="content" style="width:640px" v-if="this.form.auditStatus===-1?true:false">
          <el-input type="textarea"
            :autosize="{ minRows: 6 }"
            resize=vertical
            v-model="form.content"
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
import { auditInformation } from '../../api/menu2/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        informationId: null,
        content: '',
        createUser: null,
        auditStatus: 1
      },
      options: [{
        value: 1,
        label: '审核通过'
      }, {
        value: -1,
        label: '审核不通过'
      }],
      rules: {
        content: [
          {required: true, message: '请输入审核内容', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.form.informationId = row.id
      this.dialogVisible = true
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.form.createUser = localStorage.getItem('user')
          await auditInformation(this.form).then((res) => {
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
.auditInformation .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.auditInformation .el-form-item__content {
  margin-left: 95px!important;
}
</style>
