<template>
  <el-col :span = "20" :offset="1" style = "margin-top:10px;">
    <el-col style = "font-weight:800">发布新商品</el-col>
    <el-col class="top20">
      <el-button type = "danger" size = "mini" @click = "addGood">新建商品</el-button>
    </el-col>
  </el-col>
</template>

<script>
export default {
  methods: {
    addGood() {
      this.$router.push("/home/goods/addGoods/addGoods1");
    }
  }
};
</script>

<style lang = "scss" scoped>
@import url("../../publicStyle/style.scss");
@import "../../publicStyle/style";
</style>
