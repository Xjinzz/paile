<template>
   <el-row style = "margin-top:20px;">
      <el-col :span = "16" :offset = "4">
        <el-steps :active="active" finish-status="success" process-status = "finish" space = "40%" align-center>
            <el-step title="个人信息"  icon = "el-icon-time"></el-step>
            <el-step title="店铺信息" icon = "el-icon-time"></el-step>
            <el-step title="注册成功" icon = "el-icon-time"></el-step>
        </el-steps>
      </el-col>
      <el-col style = "text-align:center;margin-top:50px;">
            <!-- <i class="el-icon-circle-check-outline" style  = "line-height:200px;font-size:100px;color:#f00"></i>
             -->
             <img :src="successimgurl" alt="">
            <h1>恭喜您注册成功</h1>
      </el-col>
      <el-col :span = "8" :offset = "8" style = "margin-top : 30px;" >
      <el-col :span = "12" style = "text-align:center">
             <el-button type="danger" style = " width : 150px;" @click = "login">登陆</el-button>
          </el-col>
          <el-col :span = "12" style = "text-align:center">
            <el-button plain type = "danger"  style = " width : 150px;" @click = "goHome">返回首页</el-button>
          </el-col>
      </el-col>
   </el-row>

</template>

<script>
export default {
  data() {
    return {
      active: 3,
      successimgurl: "../../../../static/success.png"
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    login() {
      return false;
    }
  }
};
</script>

<style>

</style>
