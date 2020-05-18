<template>
  <div class="MemberCardDept">
      <div class="topHead">
          <el-button @click="auditStuCards">批量审核</el-button>
          <div class="search">
              <div class="chunk">
                  <label class="el-form-item__label">学号</label>
                  <el-input v-model="stuId" placeholder="请输入学号"></el-input>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">班级号</label>
                  <el-input v-model="classId" placeholder="请输入班级号"></el-input>
              </div>
              <el-button @click="handleBtnQuery" type="primary">查询</el-button>
          </div>
      </div>
      <el-main>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="stuId" label="学号" width="100">
          </el-table-column>
          <el-table-column prop="identityId" label="证件号码" width="150">
          </el-table-column>
          <el-table-column prop="translateIssueDate" label="发证日期" width="120">
          </el-table-column>
          <el-table-column prop="deptName" label="院系" width="120">
          </el-table-column>
          <el-table-column prop="professionName" label="专业" width="150">
          </el-table-column>
          <el-table-column prop="cancelStatus" label="状态" width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="auditMemberCard(scope.row)" type="text" size="small">同意注销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="currentTotal">
        </el-pagination>
      </div>
  </div>
</template>
<script>
import { findByCondition, updateMemberCardInfo } from '../../api/menu4/memberCard'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      currentTotal: null,
      stuId: '',
      classId: ''
    }
  },
  methods: {
    handleBtnQuery () {
      findByCondition({status: 1, stuId: this.stuId, classId: this.classId, memberCardAuditResStatus: ''}).then(res => {
        this.tableData = res.data.data
        this.currentTotal = this.tableData.length
      }).catch(err => {
        console.log(err)
      })
    },
    auditStuCards () {

    },
    auditMemberCard (row) {
      this.$confirm('确认同意转送学生档案？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        row.status = -1
        row.createUser = localStorage.getItem('user')
        await updateMemberCardInfo(row)
        this.findAllMemberCard()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    findAllMemberCard () {
      findByCondition({status: 1, stuId: '', classId: '', memberCardAuditResStatus: ''}).then(res => {
        this.tableData = res.data.data
        this.currentTotal = this.tableData.length
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  },
  created () {
    this.findAllMemberCard()
  }
}
</script>
<style>
  .MemberCardDept .topHead{
    width:100%;
    height:32px;
    padding:0 10px 0 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    overflow: hidden;
  }
  .MemberCardDept .topHead .el-button{
    float: left;
  }
  .MemberCardDept .chunk{
    float: left;
  }
  .MemberCardDept .topHead .el-option{
    float: left;
  }
  .MemberCardDept .topHead .search{
    float: right;
  }
  .MemberCardDept .topHead .el-form-item__label{
    float: left;
    width: 85px;
    height: 32px;
    text-align: center;
    padding: 0;
    line-height: 2.3;
  }
  .MemberCardDept .topHead .el-input{
    -webkit-appearance: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    outline: none;
    padding: 0px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 150px;
    float: left;
  }
  .MemberCardDept .topHead .search .el-button{
    width: 73px;
    height: 32px;
    margin-left: 20px;
    float: right;
  }
  .MemberCardDept .el-pagination{
    float: right;
  }
</style>
