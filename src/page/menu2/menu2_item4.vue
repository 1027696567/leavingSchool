<template>
  <div class="ReleaseNews">
      <div class="topHead">
          <el-button icon="el-icon-plus" @click="addInfo">新增</el-button>
          <div class="search">
              <div class="chunk">
                  <label class="el-form-item__label">资讯标题</label>
                  <el-input v-model="input" placeholder="请输入资讯标题"></el-input>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">上架状态</label>
                  <el-select v-model="value" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
              </div>
              <div class="chunk">
                  <label class="el-form-item__label">审核状态</label>
                  <el-select v-model="value" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
              </div>
              <el-button @click="handleBtnQuery(query)" type="primary">查询</el-button>
          </div>
      </div>
      <el-main>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
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
import { findAllNews } from '../../api/menu2/api'
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item),
      currentPage: 1,
      pageSize: 30,
      currentTotal: 100,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    handleBtnQuery (query) {
      findAllNews(query).then(res => {
        this.tableData = res.data
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
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
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
