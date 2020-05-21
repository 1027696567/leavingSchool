<template>
  <div class="ReleaseNews">
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
              <el-button @click="findAuditRes(scope.row)" type="text" v-if="scope.row.auditStatus === -1?true:false" size="small">查看原因</el-button>
              <el-button @click="editInformation(scope.row)" type="text" size="small" v-if="scope.row.auditStatus === 0?true:false">编辑</el-button>
              <el-button @click="editInformation(scope.row)" type="text" size="small" v-if="scope.row.auditStatus === -1?true:false">重新编辑</el-button>
              <el-button @click="editInformationStatus(scope.row)" type="text" size="small" v-if="scope.row.auditStatus === 1&scope.row.status === -1?true:false">上架</el-button>
              <el-button @click="editInformationStatus(scope.row)" type="text" size="small" v-if="scope.row.auditStatus === 1&scope.row.status === 1?true:false">下架</el-button>
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
import { findAllInformation, findPartInformation, updateInformationStatus, findAuditResByInformationId, buttomAudit } from '../../api/menu2/api'
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
    findAllInformation () {
      findAllInformation().then(res => {
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
      buttomAudit().then(res => {
        if (res.data.code === 200) {
          this.auditInformationVisible = true
          this.$nextTick(() => {
            this.$refs.AuditInformation.init(row)
          })
        }
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
    this.findAllInformation()
  }
}
</script>
<style>
  .ReleaseNews .topHead{
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
  .ReleaseNews .topHead .el-button{
    float: left;
  }
  .ReleaseNews .chunk{
    float: left;
  }
  .ReleaseNews .topHead .el-option{
    float: left;
  }
  .ReleaseNews .topHead .search{
    float: right;
  }
  .ReleaseNews .topHead .el-form-item__label{
    float: left;
    width: 85px;
    height: 32px;
    text-align: center;
    padding: 0;
    line-height: 2.3;
  }
  .ReleaseNews .topHead .el-input{
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
  .ReleaseNews .topHead .search .el-button{
    width: 73px;
    height: 32px;
    margin-left: 20px;
    float: right;
  }
  .ReleaseNews .el-pagination{
    float: right;
  }
  .ReleaseNews .table{
    padding: 20px 0;
  }
</style>
