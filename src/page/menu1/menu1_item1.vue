<template>
  <div class="News">
    <div class="block">
      <el-carousel height="250px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card class="box-card" :body-style="{ padding: '0 20px 0 20px' }">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-tickets"></i> 新闻公告</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
      </div>
        <p v-for="(data,index) in Information" class="nav" :key="index" :index="index+''">
          <el-link :href=href+data.id  target="_blank">
            <span class="urlTitle">{{data.title}}</span>
          </el-link>
          <span class="urlTime">{{data.updateTime}}</span>
        </p>
    </el-card>
    <el-card class="box-card2" :body-style="{ padding: '0 20px 0 20px' }">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-s-promotion"></i> 办事指南</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
      </div>
        <p v-for="(data,index) in Information" class="nav" :key="index" :index="index+''">
          <el-link :href=href+data.id  target="_blank">
            <span class="urlTitle">{{data.title}}</span>
          </el-link>
          <span class="urlTime">{{data.updateTime}}</span>
        </p>
    </el-card>
  </div>
</template>
<script>
import { findPartInformation } from '../../api/menu2/api'
export default {
  data () {
    return {
      Information: null,
      href: '/InformationInfo' + '?id=',
      value: new Date()
    }
  },
  methods: {
    findPartInformation () {
      findPartInformation({title: '', status: 1, auditStatus: 1}).then(res => {
        this.Information = res.data.data.slice(0, 4)
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
  .News{
    min-width: 800px;
  }
  .News .el-link{
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .News .urlTitle{
    float: left;
  }
  .News .urlTime{
    float: right;
    font-weight: 500;
    font-size: 15px;
    color: #606266;
  }
  .News .clearfix:before,
  .News .clearfix:after {
    display: table;
    content: "";
  }
  .News .clearfix:after {
    clear: both
  }

  .News .box-card {
    width: 59%;
    float: left;
  }
  .News .box-card2 {
    width: 40.5%;
    float: right;
  }
  .News .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .News .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .News .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .News .block{
    padding-bottom: 10px;
  }
</style>
