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
              <el-button @click="handleBtnQuery(query)" type="primary">查询</el-button>
          </div>
      </div>
      <el-main>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column prop="id" label="ID" width="140">
          </el-table-column>
          <el-table-column prop="auditStatusName" label="审核状态" width="120">
          </el-table-column>
          <el-table-column prop="statusName" label="上架状态">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="name" label="发布部门">
          </el-table-column>
          <el-table-column prop="" label="操作">
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
      <AddInformation v-if="addInformationVisible" ref="AddInformation"></AddInformation>
  </div>
</template>
<script>
import { findAllInformation } from '../../api/menu2/api'
import AddInformation from '../../components/menu2/addInformation'
export default {
  components: { AddInformation },
  data () {
    return {
      tableData: [],
      addInformationVisible: false,
      currentPage: 1,
      pageSize: 30,
      currentTotal: 100,
      status: '',
      auditStatus: '',
      title: '',
      statusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: 1,
        label: '已上架'
      }, {
        value: -1,
        label: '未上架'
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
    handleBtnQuery (query) {
      console.log(query)
      findAllInformation(query).then(res => {
        this.tableData = res.data.data
        this.currentTotal = this.tableData.length
        this.$message({
          message: res.msg,
          type: res.code === 200 ? 'success' : 'warning'
        })
      })
        .catch(err => {
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
  .topHead{
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
  .topHead .el-button{
    float: left;
  }
  .ReleaseNews .chunk{
    float: left;
  }
  .topHead .el-option{
    float: left;
  }
  .topHead .search{
    float: right;
  }
  .topHead .el-form-item__label{
    float: left;
    width: 85px;
    height: 32px;
    text-align: center;
    padding: 0;
    line-height: 2.3;
  }
  .topHead .el-input{
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
  .topHead .search .el-button{
    width: 73px;
    height: 32px;
    margin-left: 20px;
    float: right;
  }
  .el-pagination{
    float: right;
  }
</style>
