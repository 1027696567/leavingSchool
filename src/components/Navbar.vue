<template>
  <div class="NavMenu">
    <div class="Logo">
      <el-image :src="img" fit="cover"></el-image>
    </div>
    <el-row>
      <el-col :span="12">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          text-color="#000"
          active-text-color="#409eff"
          router
          >
          <el-menu-item index="/menu1_item1">首页</el-menu-item>
          <el-menu-item index="/menu2_item0">系统管理</el-menu-item>
          <el-menu-item index="/menu3_item0">离校管理</el-menu-item>
          <el-menu-item index="/menu4_item0">离校办理</el-menu-item>
          <el-submenu index="2">
            <template slot="title">其他</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col :span="12" style="text-align: right; font-size: 14px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Title from '../assets/title.png'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      img: Title
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scope>
  .NavMenu .Logo{
    height: 70px;
  }
  .NavMenu .el-image{
    height: 90px;
  }

</style>
