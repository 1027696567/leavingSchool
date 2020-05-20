<template>
  <div class="SysUser">
      <div class="topHead">
          <el-button icon="el-icon-plus" @click="addInformation">新增</el-button>
          <div class="search">
              <div class="chunk">
                  <label class="el-form-item__label">资讯标题</label>
                  <el-input v-model="title" placeholder="请输入资讯标题"></el-input>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">上架状态</label>
                  <el-select v-model="status" placeholder="请选择">
                      <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">审核状态</label>
                  <el-select v-model="auditStatus" placeholder="请选择">
                      <el-option v-for="item in auditStatusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
              </div>
              <el-button @click="handleBtnQuery" type="primary">查询</el-button>
          </div>
      </div>
      <div class="table">
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column prop="id" label="ID" width="100">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="120">
          </el-table-column>
          <el-table-column prop="realName" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="email" label="电子邮箱" width="200">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="170">
          </el-table-column>
          <el-table-column prop="activeName" label="账号状态" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editInformationStatus(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="auditInformation(scope.row)" type="text" v-if="scope.row.status === -1?true:false" size="small">启用</el-button>
              <el-button @click="auditInformation(scope.row)" type="text" v-if="scope.row.status === 1?true:false" size="small">禁用</el-button>
              <el-button @click="editInformation(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <AddInformation v-if="addInformationVisible" ref="AddInformation"></AddInformation>
      <EditInformation v-if="editInformationVisible" ref="EditInformation"></EditInformation>
      <AuditInformation v-if="auditInformationVisible" ref="AuditInformation"></AuditInformation>
  </div>
</template>
<script>
import { findPartInformation, updateInformationStatus, findAuditResByInformationId } from '../../api/menu2/api'
import { findAllUser } from '../../api/menu2/sysUser'
import AddInformation from '../../components/menu2/addInformation'
import AuditInformation from '../../components/menu2/auditInformation'
import EditInformation from '../../components/menu2/editInformation'
export default {
  components: { AddInformation, AuditInformation, EditInformation },
  data () {
    return {
      tableData: [],
      addInformationVisible: false,
      editInformationVisible: false,
      auditInformationVisible: false,
      currentPage: 1,
      pageSize: 15,
      currentTotal: 100,
      status: 2,
      auditStatus: 2,
      title: '',
      statusOptions: [{
        value: 2,
        label: '全部'
      }, {
        value: 1,
        label: '已上架'
      }, {
        value: -1,
        label: '未上架'
      }],
      auditStatusOptions: [{
        value: 2,
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
      findPartInformation({title: this.title, status: this.status, auditStatus: this.auditStatus}).then(res => {
        this.tableData = res.data.data
        this.currentTotal = this.tableData.length
      }).catch(err => {
        console.log(err)
      })
    },
    findAllSysUser () {
      findAllUser().then(res => {
        this.tableData = res.data.data
        this.currentTotal = this.tableData.length
      }).catch(err => {
        console.log(err)
      })
    },
    addInformation () {
      this.addInformationVisible = true
      this.$nextTick(() => {
        this.$refs.AddInformation.init()
      })
    },
    auditInformation (row) {
      this.auditInformationVisible = true
      this.$nextTick(() => {
        this.$refs.AuditInformation.init(row)
      })
    },
    findAuditRes (row) {
      findAuditResByInformationId({id: row.id}).then(res => {
        this.$alert(res.data.data.content, '审核结果', {
          confirmButtonText: '确定'
        })
      })
    },
    editInformation (row) {
      this.editInformationVisible = true
      this.$nextTick(() => {
        this.$refs.EditInformation.init(row)
      })
    },
    async editInformationStatus (row) {
      row.status = -row.status
      await updateInformationStatus(row)
      this.findAllInformation()
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
    this.findAllSysUser()
  }
}
</script>
<style>
  .SysUser .topHead{
    width:100%;
    height:32px;
    padding:0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    overflow: hidden;
  }
  .SysUser .topHead .el-button{
    float: left;
  }
  .SysUser .chunk{
    float: left;
  }
  .SysUser .topHead .el-option{
    float: left;
  }
  .SysUser .topHead .search{
    float: right;
  }
  .SysUser .topHead .el-form-item__label{
    float: left;
    width: 85px;
    height: 32px;
    text-align: center;
    padding: 0;
    line-height: 2.3;
  }
  .SysUser .topHead .el-input{
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
  .SysUser .topHead .search .el-button{
    width: 73px;
    height: 32px;
    margin-left: 20px;
    float: right;
  }
  .SysUser .el-pagination{
    float: right;
  }
  .SysUser .table{
    padding: 20px 0;
  }
</style>
