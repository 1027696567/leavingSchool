<template>
  <div class="DormitoryStu">
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" width="100">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="130">
          </el-table-column>
          <el-table-column prop="stuId" label="学号" width="130">
          </el-table-column>
          <el-table-column prop="returnDateName" label="归还日期" width="130">
          </el-table-column>
          <el-table-column prop="dormNumber" label="宿舍号" width="130">
          </el-table-column>
          <el-table-column prop="statusName" label="归还状态" width="130">
          </el-table-column>
          <el-table-column prop="auditStatusName" label="审核状态" width="130">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="auditDormitory(scope.row)" type="text" v-if="scope.row.dormitoryAuditResStatus === null?true:false" size="small">申请离校</el-button>
              <el-button type="text" size="small" v-if="scope.row.dormitoryAuditResStatus === 0?true:false">等待审核</el-button>
              <el-button type="text" v-if="scope.row.dormitoryAuditResStatus === 1?true:false" size="small">审核通过</el-button>
              <el-button @click="findSCAuditRes(scope.row)" type="text" size="small" v-if="scope.row.dormitoryAuditResStatus === -1?true:false">查看原因</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<script>
import { findDormitoryByUsername, updateDormitoryInfo } from '../../api/menu4/dormitory'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    findDormitoryByUsername () {
      findDormitoryByUsername({user: localStorage.getItem('user')}).then(res => {
        this.tableData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    auditDormitory (row) {
      if (row.status === 1) {
        this.$confirm('确认申请离校？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          row.createUser = localStorage.getItem('user')
          await updateDormitoryInfo(row)
          this.findDormitoryByUsername()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$alert('钥匙未归还，不能申请', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    findSCAuditRes (row) {
      this.$alert(row.dormitoryAuditResContent, '审核意见', {
        confirmButtonText: '确定'
      })
    }
  },
  created () {
    this.findDormitoryByUsername()
  }
}
</script>
<style>
</style>
