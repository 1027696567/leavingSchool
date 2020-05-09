<template>
  <div class="InformationInfo">
    <el-container>
      <el-main>
        <p>Hello</p>
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

</style>
