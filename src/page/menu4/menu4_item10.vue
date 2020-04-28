<template>
    <div class="menu1_item1">
    <!-- 供应商管理 -->
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addInfo">审核</el-button>
          <el-button @click="editInfo">查看</el-button>
          <el-button @click="verifyInfo" type="primary">审核</el-button>
          <el-button @click="deleteInfo" type="danger" disabled>删除</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="机构代码" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="companyDetail(scope.row)" type="text" style="text-decoration:underline" >{{ scope.row.companyNumber }}</el-button>
            </template>
          </el-table-column>
          <el-table-column property="companyName" label="机构名称" width="180"></el-table-column>
          <el-table-column property="contact" label="联系人" width="180"></el-table-column>
          <el-table-column property="telephone" label="联系电话" width="180"></el-table-column>
          <el-table-column property="email" label="E-mail" width="180"></el-table-column>
          <el-table-column property="createUserName" label="创建人" width="180"></el-table-column>
          <el-table-column property="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column property="statusName" label="状态" width="180"></el-table-column>
          <el-table-column property="textarea" label="备注"></el-table-column>
        </el-table>
      </el-main>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      currentRow: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },
  created () {
  }
}
</script>

<style>
  .topHead{
    width:100%;
    height:32px;
    padding:0 20px 0 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    overflow: hidden;
  }
  .buttonList{
    float:left
  }

</style>
