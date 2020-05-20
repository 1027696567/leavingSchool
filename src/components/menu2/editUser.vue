<template>
  <div class="editAuthorization">
    <!-- 编辑用户权限弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="650px">
      <el-form label-position="left" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名：" style="width:300px">
              <el-input v-model="form.username" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱：" style="width:300px">
              <el-input v-model="form.email" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号：" style="width:300px">
              <el-input v-model="form.mobile" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司：" style="width:300px">
              <el-input v-model="form.company" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="角色：">
          <el-checkbox-group v-model="form.roleName" :min="1">
            <el-checkbox label="管理员"></el-checkbox>
            <el-checkbox label="普通用户"></el-checkbox>
            <el-checkbox label="认证用户"></el-checkbox>
            <el-checkbox label="普通员工"></el-checkbox>
            <el-checkbox label="经理"></el-checkbox>
            <el-checkbox label="董事长"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 150px">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      form: {
        roleName: []
      }
    }
  },
  methods: {
    init (data) {
      console.log(data)
      this.dialogVisible = true
      this.form.username = data.username
      this.form.email = data.email
      this.form.mobile = data.mobile
      this.form.company = data.company
      this.form.roleName = data.roleName.split('，')
      this.form.userId = data.userId
    },
    onSubmit () {
      var roleId = []
      for (var a of this.form.roleName) {
        if (a === '管理员') {
          roleId.push(1)
        } else if (a === '普通用户') {
          roleId.push(4)
        } else if (a === '认证用户') {
          roleId.push(5)
        } else if (a === '普通员工') {
          roleId.push(6)
        } else if (a === '经理') {
          roleId.push(2)
        } else if (a === '董事长') {
          roleId.push(7)
        }
      }
      this.form.roleId = roleId
      this.form.roleName = this.form.roleName.toString()
      console.log(this.form)
    },
    reset () {
      this.dialogVisible = false
    }
  },
  created () {

  }
}
</script>
<style>
.editAuthorization label.el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.editAuthorization .el-form-item__content {
  margin-left: 95px!important;
}
</style>
