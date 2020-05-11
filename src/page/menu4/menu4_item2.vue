<template>
  <div class="secondCollegeStu">
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="auditStatusName" label="审核状态" width="120">
          </el-table-column>
          <el-table-column prop="statusName" label="上架状态" width="120">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="350">
          </el-table-column>
          <el-table-column prop="name" label="发布部门" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="auditInformation(scope.row)" type="text" v-if="scope.row.auditStatus === 0?true:false" size="small">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<script>
import { findStuCardByUsername } from '../../api/menu4/api'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    findStuCardByUsername () {
      findStuCardByUsername({user: localStorage.getItem('user')}).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    findAuditRes (row) {
      findStuCardByUsername({id: row.id}).then(res => {
        this.$alert(res.data.data.content, '审核结果', {
          confirmButtonText: '确定'
        })
      })
    }
  },
  created () {
    this.findStuCardByUsername()
  }
}
</script>
<style>
</style>
