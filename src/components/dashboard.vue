<template>
  <div class="main">
    <el-container style="height: 610px; border: 1px solid #eee">
      <el-header>
        <navbar></navbar>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'dashboard',
  components: {Navbar},
  data () {
    return {
      user: ''
    }
  },
  created () {
  }
}
</script>
<style scoped>
  .main .el-header{
    height: 131px !important;
    background-color: white;
    color: #333;
    overflow: hidden;
    border-bottom: 1px #eee solid;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-main{
    padding: 10px;
  }
</style>
