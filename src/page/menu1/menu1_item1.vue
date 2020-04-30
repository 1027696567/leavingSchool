<template>
  <div class="News">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 新闻公告</span>
          <p v-for="(operate,index) in navTo.operate" class="nav" @click="change(index)" :key="index" :index="index+''">
            <el-link :href=operate.path  target="_blank">
              <span class="urlTitle">{{operate.name}}</span>
            </el-link>
            <span class="urlTime">{{operate.time}}</span>
          </p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navTo: {
        'operate': [
          {'name': '系统测试系统测试系统测试系统测试系统测试系统测试系统测试系统测试系统测试', 'path': '/header', 'time': '2020.4.30'},
          {'name': '系统2', 'path': '/HelloWorld/engine', 'time': '2020.4.30'},
          {'name': '系统3', 'path': '/HelloWorld/engine'},
          {'name': '系统5', 'path': '/HelloWorld/engine'}
        ]
      }
    }
  }
}
</script>
<style>
  .News{
    height: 435px;
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
</style>
