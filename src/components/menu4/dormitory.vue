<template>
  <div class="dormitory">
    <!-- 借书证审核弹框 -->
    <el-dialog title="离校审核" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果：" prop="title" style="width:640px">
              <el-select v-model="form.status">
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
        <el-form-item label="审核意见：" prop="content" style="width:640px" v-if="this.form.status===-1?true:false">
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
import { updateDormitoryAuditRes } from '../../api/menu4/dormitory'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        id: null,
        stuInfoId: null,
        dormitoryId: null,
        content: '',
        createUser: null,
        status: 1
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
          {required: true, message: '请输入审核意见', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.form.id = row.dormitoryAuditResId
      this.form.stuInfoId = row.stuInfoId
      this.form.dormitoryId = row.id
      this.dialogVisible = true
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.form.createUser = localStorage.getItem('user')
          await updateDormitoryAuditRes(this.form).then((res) => {
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
      this.$parent.findAllDormitory()
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
.dormitory .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.dormitory .el-form-item__content {
  margin-left: 95px!important;
}
</style>
