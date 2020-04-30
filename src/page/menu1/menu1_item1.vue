<template>
  <div class="News">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 新闻公告</span>
          <p v-for="(operate,index) in navTo.operate" class="nav" @click="change(index)" :key="index" :index="index+''">
            <el-link :href=operate.path  target="_blank">
              <span class="urlTitle">{{operate.name}}</span>
              <span class="urlTime">{{operate.time}}</span>
            </el-link>
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
          {'name': '系统测试系统测试系统测试系统测试系统测试系统测试系统测试系统测试系统测试', 'path': '/header'},
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
  .News .el-link{
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .News .urlTitle{
    margin-right: 1150px;
  }
</style>
