<template>
  <div class="InformationList">
    <el-container>
      <el-main>
        <el-card class="box-card" :body-style="{ padding: '0 20px 0 20px' }">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-tickets"></i> 新闻公告</span>
          </div>
          <p v-for="(data,index) in information" class="nav" :key="index" :index="index+''">
            <el-link :href=href+data.id  target="_blank">
              <span class="urlTitle">{{data.title}}</span>
            </el-link>
          <span class="urlTime">{{data.updateTime}}</span>
        </p>
    </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { findPartInformation } from '../../api/menu2/api'
export default {
  data () {
    return {
      href: '/InformationInfo' + '?id=',
      information: ''
    }
  },
  methods: {
    findPartInformation () {
      findPartInformation({title: '', status: 1, auditStatus: 1}).then(res => {
        this.information = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.findPartInformation()
  }
}
</script>
<style>
  .InformationList .box-card {
    margin: 0 auto;
    width: 800px;
    min-height: 580px;
  }
  .InformationList .title{
    text-align: center;
    font-weight: normal;
    font-size: 26px;
    list-style: none outside none;
  }
  .InformationList .urlTitle{
    float: left;
  }
  .InformationList .urlTime{
    float: right;
    font-weight: 500;
    font-size: 15px;
    color: #606266;
  }
  .InformationList .el-link{
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
