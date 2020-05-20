<template>
  <div class="CollegeCardStu">
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="130">
          </el-table-column>
          <el-table-column prop="stuId" label="学号" width="130">
          </el-table-column>
          <el-table-column prop="cancelDateName" label="注销日期" width="130">
          </el-table-column>
          <el-table-column prop="money" label="卡内余额" width="130">
          </el-table-column>
          <el-table-column prop="cancelStatus" label="一卡通状态" width="130">
          </el-table-column>
          <el-table-column prop="auditStatusName" label="审核状态" width="130">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="cancelCollegeCard(scope.row)" type="text" v-if="scope.row.status === 0?true:false" size="small">申请注销</el-button>
              <el-button type="text" v-if="scope.row.status === 1?true:false" size="small">等待注销</el-button>
              <el-button type="text" v-if="scope.row.status === -1?true:false" size="small">注销成功</el-button>
              <el-button type="text" size="small" v-if="scope.row.collegeCardAuditResStatus === 0?true:false">等待审核</el-button>
              <el-button type="text" v-if="scope.row.collegeCardAuditResStatus === 1?true:false" size="small">审核通过</el-button>
              <el-button @click="findSCAuditRes(scope.row)" type="text" size="small" v-if="scope.row.collegeCardAuditResStatus === -1?true:false">查看原因</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<script>
import { findCollegeCardByUsername, updateCollegeCardInfo } from '../../api/menu4/collegeCard'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    findCollegeCardByUsername () {
      findCollegeCardByUsername({user: localStorage.getItem('user')}).then(res => {
        this.tableData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    cancelCollegeCard (row) {
      if (row.status === 0) {
        this.$confirm('确认注销一卡通？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          row.status = 1
          await updateCollegeCardInfo(row)
          this.findCollegeCardByUsername()
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
    },
    findSCAuditRes (row) {
      this.$alert(row.collegeCardAuditResContent, '审核意见', {
        confirmButtonText: '确定'
      })
    }
  },
  created () {
    this.findCollegeCardByUsername()
  }
}
</script>
<style>
</style>
