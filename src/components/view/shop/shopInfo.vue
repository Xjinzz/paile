<template>
  <el-row>
      <el-col :span = "22" :offset = "1">
          <el-row class = "pageTitle">{{pageTitle}}</el-row>
          <el-row>
            <ul class = "shopHeaderBtn" style = "margin-top:10px;">
                    <li v-for = "(msg,i) in btnMsg" :key = "msg"   class = "fl btnhover normalBorder btnPadding center" 
                    :class = "i>0?'btnLeft':''"  @click = "headerBtnClick(i)">{{msg}}</li>
                
            </ul>
          </el-row>
          <el-row style = "margin-top:10px;">
            <basicInfo v-show="!switchBtn"/>
            <paperInfo v-show = "switchBtn"/>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
import $ from 'jquery'
import basicInfo from "./basicinfo"
import paperInfo from "./paperinfo"
export default {
    data (){
        return {
            pageTitle : "店铺信息",
            btnMsg : [
                '基本信息','证件信息'
            ],
            switchBtn:true,
        }
    },
    methods:{
        headerBtnClick(i){
          $('.shopHeaderBtn li').removeClass('active').eq(i).addClass('active');
          switch(i){
              case 0 : this.switchBtn = false;break;
              case 1 : this.switchBtn = true;break;
          }
          
        }
    },
    created(){},
    mounted(){
        this.headerBtnClick(0)
    },
    components:{
        paperInfo,basicInfo
    }
}
</script>

<style lang = "scss" type = "text/css">
    @import "../../publicStyle/public";
    .active {
        border:2px solid #f00;
    }
</style>
