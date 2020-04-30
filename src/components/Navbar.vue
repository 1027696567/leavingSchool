<template>
  <div class="NavMenu">
    <div class="Logo">
      <el-image :src="img" fit="cover"></el-image>
    </div>
    <el-row>
      <el-col :span="12">
        <el-menu
          :default-active="$route.path"
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
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link-one">
              <i class="el-icon-user-solid"></i> {{ user }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="b">基本信息</el-dropdown-item>
              <el-dropdown-item command="c">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Title from '../assets/title.png'
import * as types from '../store/mutations_type'
export default {
  data () {
    return {
      img: Title,
      user: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand (command) {
      switch (command) {
        case 'a':
          break
        case 'b':
          break
        case 'c':
          this.logout()
          break
      }
    },
    // 退出是清空sessionStorage信息
    logout () {
      this.$store.commit(types.LOGOUT)
      localStorage.removeItem('routes')
      localStorage.removeItem('user')
      localStorage.removeItem('menuData')
      localStorage.removeItem('menuData1')
      localStorage.removeItem('menuData2')
      this.$router.push('/login')
    }
  },
  created () {
    this.user = localStorage.getItem('user')
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
