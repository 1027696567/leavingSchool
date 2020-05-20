<template>
  <div class="News">
    <div class="block">
      <el-carousel height="250px">
        <el-carousel-item v-for="item in imgs" :key="item.url">
          <img class="carousel-img" :src="item.url"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card class="box-card" :body-style="{ padding: '0 20px 0 20px' }">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-tickets"></i> 新闻公告</span>
        <el-button @click="findAllInformation" style="float: right; padding: 3px 0" type="text">查看更多</el-button>
      </div>
        <p v-for="(data,index) in Information" class="nav" :key="index" :index="index+''">
          <el-link :href=href+data.id  target="_blank">
            <span class="urlTitle">{{data.title}}</span>
          </el-link>
          <span class="urlTime">{{data.updateTimeToString}}</span>
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
          <span class="urlTime">{{data.updateTimeToString}}</span>
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
      imgs: [
        {url: require('../../assets/image/lun_imgs/5dce3e51813b1.jpg'), link: '/content1'},
        {url: require('../../assets/image/lun_imgs/5dce37766bc9a.jpg'), link: '/content1'},
        {url: require('../../assets/image/lun_imgs/5ea61b349f390.jpg'), link: '/content1'},
        {url: require('../../assets/image/lun_imgs/5eaa4b4a45ace.png'), link: '/content1'}
      ]
    }
  },
  methods: {
    findPartInformation () {
      findPartInformation({title: '', status: 1, auditStatus: 1}).then(res => {
        this.Information = res.data.data.slice(0, 4)
      }).catch(err => {
        console.log(err)
      })
    },
    findAllInformation () {
      window.open('/informationList')
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
    width: 55%;
    min-height: 200px;
    float: left;
  }
  .News .box-card2 {
    min-height: 200px;
    width: 44.5%;
    float: right;
  }
  .News .el-carousel .el-carousel-item{
     background: white;
  }
  .News .carousel-img {
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  .News .block{
    padding-bottom: 10px;
  }
</style>
