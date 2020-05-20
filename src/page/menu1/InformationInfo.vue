<template>
  <div class="InformationInfo">
    <el-container>
      <el-main>
        <el-card class="box-card" :body-style="{ padding: '0 20px 0 20px' }">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-document"></i> 公告详情</span>
          </div>
          <div class="body">
            <h4 class="title">{{this.information.title}}</h4>
            <el-divider>作者：{{this.information.createUser}} — 发布时间：{{this.information.updateTimeToString}} — 发布部门：{{this.information.name}}</el-divider>
            <p style="line-height: 2em; text-indent: 2em;">
              <span style="font-family: 微软雅黑,Microsoft YaHei;">{{this.information.content}}</span>
            </p>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { findInformation } from '../../api/menu2/api'
export default {
  data () {
    return {
      href: '/InformationInfo' + '?id=',
      information: ''
    }
  },
  methods: {
    findInformation () {
      findInformation({id: this.$route.query.id}).then(res => {
        console.log(res.data.data)
        this.information = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.findInformation()
  }
}
</script>
<style>
  .InformationInfo .box-card {
    width: 100%;
    min-height: 580px;
  }
  .InformationInfo .body{
    font-family: "微软雅黑";
  }
  .InformationInfo .title{
    text-align: center;
    font-weight: normal;
    font-size: 26px;
    list-style: none outside none;
  }
</style>
