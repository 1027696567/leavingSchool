<template>
  <div class="secondCollegeStu">
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="stuId" label="学号" width="100">
          </el-table-column>
          <el-table-column prop="identityId" label="证件号码" width="150">
          </el-table-column>
          <el-table-column prop="issueDate" label="发证日期" width="120">
          </el-table-column>
          <el-table-column prop="deptName" label="院系" width="120">
          </el-table-column>
          <el-table-column prop="professionName" label="专业" width="150">
          </el-table-column>
          <el-table-column prop="cancelStatus" label="状态" width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="cancelStuCard(scope.row)" type="text" :disabled="scope.row.status !== 0?true:false" size="small">{{ name }}</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<script>
import { findStuCardByUsername, updateStuCardInfo } from '../../api/menu4/api'
export default {
  data () {
    return {
      tableData: [],
      name: '申请注销'
    }
  },
  methods: {
    findStuCardByUsername () {
      findStuCardByUsername({user: localStorage.getItem('user')}).then(res => {
        this.tableData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    cancelStuCard (row) {
      if (row.status === 0) {
        this.$confirm('确认注销学生证？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          row.status = 1
          await updateStuCardInfo(row)
          this.findStuCardByUsername()
          this.$message({
            type: 'success',
            message: '已提交申请'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$alert('请等待处理', '处理结果', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  created () {
    this.findStuCardByUsername()
  }
}
</script>
<style>
</style>
