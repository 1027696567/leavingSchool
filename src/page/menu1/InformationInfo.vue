<template>
  <div class="InformationInfo">
    <el-container>
      <el-main>
        <el-card class="box-card" :body-style="{ padding: '0 20px 0 20px' }">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-date"></i> 新闻公告</span>
          </div>
          <el-divider>饿了别叫妈, 叫饿了么</el-divider>
          <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { findAllInformation } from '../../api/menu2/api'
export default {
  data () {
    return {
      Information: null,
      href: '/InformationInfo' + '?id='
    }
  },
  methods: {
    findAllInformation () {
      findAllInformation().then(res => {
        console.log(res.data)
        this.Information = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    console.log(this.$route.query.id)
  }
}
</script>
<style>
  .InformationInfo .box-card {
    padding: 10px 0 0 0;
    width: 100%;
    float: left;
  }
</style>
