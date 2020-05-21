<template>
  <div class="FinalAuditStu">
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="stuId" label="学号" width="80">
          </el-table-column>
          <el-table-column prop="stuCardAuditResStatusName" label="二级学院" width="80">
          </el-table-column>
          <el-table-column prop="partyBranchAuditResStatusName" label="组织部" width="80">
          </el-table-column>
          <el-table-column prop="memberCardAuditResStatusName" label="团委" width="80">
          </el-table-column>
          <el-table-column prop="libraryCardAuditResStatusName" label="图书馆" width="80">
          </el-table-column>
          <el-table-column prop="educationAuditResStatusName" label="教务处" width="80">
          </el-table-column>
          <el-table-column prop="ministryFinanceAuditResStatusName" label="财务处" width="80">
          </el-table-column>
          <el-table-column prop="dormitoryAuditResStatusName" label="宿管" width="80">
          </el-table-column>
          <el-table-column prop="collegeCardAuditResStatusName" label="国有资产" width="80">
          </el-table-column>
          <el-table-column prop="auditStatusName" label="离校审核" width="80">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deptAudit(scope.row)" type="text" v-if="scope.row.status === null?true:false" size="small">申请离校</el-button>
              <el-button type="text" v-if="scope.row.status === 0?true:false" size="small">待审核</el-button>
              <el-button type="text" v-if="scope.row.status === 1?true:false" size="small">审核通过</el-button>
              <el-button @click="findSCAuditRes(scope.row)" type="text" v-if="scope.row.status === -1?true:false" size="small">查看原因</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<script>
import { findByUsername, updateFinalAuditRes } from '../../api/menu4/finalAuditRes'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    findByUsername () {
      findByUsername({user: localStorage.getItem('user')}).then(res => {
        this.tableData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    deptAudit (row) {
      if (row.stuCardAuditResStatus === 1 &&
      row.partyBranchAuditResStatus === 1 &&
      row.memberCardAuditResStatus === 1 &&
      row.libraryCardAuditResStatus === 1 &&
      row.educationAuditResStatus === 1 &&
      row.ministryFinanceAuditResStatus === 1 &&
      row.dormitoryAuditResStatus === 1 &&
      row.collegeCardAuditResStatus === 1) {
        this.$confirm('确认申请离校？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          row.createUser = localStorage.getItem('user')
          row.stuInfoId = row.id
          row.id = row.finalAuditResId
          row.status = 0
          await updateFinalAuditRes(row)
          this.findByUsername()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$alert('有部门未通过审核', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    findSCAuditRes (row) {
      this.$alert(row.content, '审核意见', {
        confirmButtonText: '确定'
      })
    }
  },
  created () {
    this.findByUsername()
  }
}
</script>
<style>
</style>
