<template>
<el-container style="height: 435px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-active="$route.path" unique-opened>
      <el-submenu v-for="(child, index) in currentNavItems"  :key="index" :index="index+''">
        <template slot="title"><i :class="child.icon"></i>{{child.title}}</template>
          <el-menu-item-group v-for="(item,index) in child.subs" :key="index">
              <el-menu-item :index="item.index">{{item.title}}</el-menu-item>
          </el-menu-item-group>
      </el-submenu>
     </el-menu>
  </el-aside>
  <el-container>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      currentNavItems: []
    }
  },
  created () {
    // 从sessionStorage得到menuData
    this.currentNavItems = JSON.parse(localStorage.getItem('menuData2'))
  }
}
</script>
