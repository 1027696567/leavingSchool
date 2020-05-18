<template>
  <div class="MemberCard">
      <div class="topHead">
          <el-button>批量审核</el-button>
          <div class="search">
              <div class="chunk">
                  <label class="el-form-item__label">学号</label>
                  <el-input v-model="stuId" placeholder="请输入学号"></el-input>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">证件状态</label>
                  <el-select v-model="status" placeholder="请选择">
                      <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">审核状态</label>
                  <el-select v-model="memberCardAuditResStatus" placeholder="请选择">
                      <el-option v-for="item in auditStatusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
              </div>
              <el-button @click="handleBtnQuery" type="primary">查询</el-button>
          </div>
      </div>
      <el-main>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="stuId" label="学号" width="80">
          </el-table-column>
          <el-table-column prop="identityId" label="证件号码" width="150">
          </el-table-column>
          <el-table-column prop="deptName" label="院系" width="120">
          </el-table-column>
          <el-table-column prop="professionName" label="专业" width="120">
          </el-table-column>
          <el-table-column prop="cancelStatus" label="证件状态" width="120">
          </el-table-column>
          <el-table-column prop="auditStatusName" label="审核状态" width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deptAudit(scope.row)" type="text" v-if="scope.row.memberCardAuditResStatus === 0||scope.row.memberCardAuditResStatus === null?true:false" size="small">审核</el-button>
              <el-button type="text" v-if="scope.row.memberCardAuditResStatus === 1?true:false" size="small">审核通过</el-button>
              <el-button @click="deptAudit(scope.row)" type="text" v-if="scope.row.memberCardAuditResStatus === -1?true:false" size="small">重新审核</el-button>
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
      <MemberCard v-if="memberCardVisible" ref="MemberCard"></MemberCard>
  </div>
</template>
<script>
import { findByCondition } from '../../api/menu4/memberCard'
import MemberCard from '../../components/menu4/memberCard'
export default {
  components: { MemberCard },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      currentTotal: null,
      stuId: '',
      classId: '',
      memberCardVisible: false,
      memberCardAuditResStatus: '',
      status: '',
      statusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '待注销'
      }, {
        value: -1,
        label: '已注销'
      }],
      auditStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: 0,
        label: '待审核'
      }, {
        value: 1,
        label: '审核通过'
      }, {
        value: -1,
        label: '审核不通过'
      }]
    }
  },
  methods: {
    handleBtnQuery () {
      findByCondition({status: this.status, stuId: this.stuId, classId: this.classId, memberCardAuditResStatus: this.memberCardAuditResStatus}).then(res => {
        this.tableData = res.data.data
        this.currentTotal = this.tableData.length
      }).catch(err => {
        console.log(err)
      })
    },
    deptAudit (row) {
      this.memberCardVisible = true
      this.$nextTick(() => {
        this.$refs.MemberCard.init(row)
      })
    },
    findAllMemberCard () {
      findByCondition({status: '', stuId: '', classId: '', memberCardAuditResStatus: ''}).then(res => {
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
  .MemberCard .topHead{
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
  .MemberCard .topHead .el-button{
    float: left;
  }
  .MemberCard .chunk{
    float: left;
  }
  .MemberCard .topHead .el-option{
    float: left;
  }
  .MemberCard .topHead .search{
    float: right;
  }
  .MemberCard .topHead .el-form-item__label{
    float: left;
    width: 85px;
    height: 32px;
    text-align: center;
    padding: 0;
    line-height: 2.3;
  }
  .MemberCard .topHead .el-input{
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
  .MemberCard .topHead .search .el-button{
    width: 73px;
    height: 32px;
    margin-left: 20px;
    float: right;
  }
  .MemberCard .el-pagination{
    float: right;
  }
</style>
