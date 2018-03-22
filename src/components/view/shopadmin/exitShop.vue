<template>
  <el-row>
      <el-col :span = "22" :offset = "2" class = "top20 b">
          {{title}}
      </el-col>
      <el-col :span = "24" >
        <el-steps :active="active" finish-status="success" process-status = "finish" space = "40%" align-center>
            <el-step title="退店申请"  icon = "el-icon-time"></el-step>
            <el-step title="平台审核" icon = "el-icon-time"></el-step>
            <el-step title="退款" icon = "el-icon-time"></el-step>
            <el-step title="退店成功" icon = "el-icon-time"></el-step>            
        </el-steps>
      </el-col>
      <el-col :span = "22" :offset = "2" class = "top20 bgeee">

      </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      title: "退店",
      active: 0
    };
  },
  created() {}
};
</script>

<style lang = "scss" scoped>
@import "../../publicStyle/style.scss";
</style>
