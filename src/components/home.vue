<template>
    <el-row style = "margin-top : 10px;">
      <el-col :span = "20" :offset = "2">
        <el-col :span = "5">
          
      <el-menu  style = "height:750px;width:100%;" router default-active="2"
       class="el-menu-vertical-demo" 
       unique-opened

      background-color="#424344" 
      show-timeout="100" 
      text-color="#efefef" 
      active-text-color="#ffd04b">
         <el-row style ="margin-top :10px;">
                 <el-col style = "text-align:center"><img v-bind:src="shopImgUrl" alt="" width="100px" height="100px"></el-col>
               <el-col style = "text-align:center"> {{shopImgText}}</el-col>
        </el-row>
    
      <el-submenu :index="i.num" v-for = "(i, k) in $router.options.routes[0].children" :key = "i.name">
        
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{i.name}}</span>
        </template>
        <el-menu-item-group v-for = "i2 in $router.options.routes[0].children[k].children"  :key = "i2.name">
           <el-menu-item :index="i2.num" :route = "i2.path">{{i2.name}}</el-menu-item>
        </el-menu-item-group>
       </el-submenu>
    </el-menu>
    
        </el-col>
      
        <el-col :span = "19">
         <router-view/>
        </el-col>
    </el-col>

    </el-row>
</template>

<script>
export default {
    data(){
        return {
            shopImgUrl:"",
            shopImgText:"店铺名"
        }
    },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
  }
};
</script>

<style scoped>
.el-submenu .el-menu-item{
    min-width:100px;
}
</style>
