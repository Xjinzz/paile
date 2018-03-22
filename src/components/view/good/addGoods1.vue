<template>
  <el-col :span ="22" :offset ="1">
      <el-col :span ="20" :offset ="2" class = "top20" tag = "b">新建商品</el-col>
      <el-col  :span ="20" :offset="2" class = "top20" style = "line-height:30px;padding:20px 20px;background:#eee;">
            <threeSelect 
            :normalTextColor="normalTextColor" 
            :normalbgColor="normalbgColor" 
            :selectTextColor = "selectTextColor" 
            :selectbgColor = "selectbgColor" 
            selectStyle = "overflow-y:scroll;background:#fff;height:500px;" 
            v-on:gettypeChange = "gettypeChange" 
            v-on:getTypePosition = "getTypePosition" 
            :listData ="goodTypeList" >
                <el-col slot = "selectFooter">当前选择位置 : {{typePosition1}}<i v-if = "type1Change">></i>{{typePosition2}}<i  v-if = "type2Change">></i>{{typePosition3}}</el-col>
            </threeSelect>
           
      </el-col>
        <el-col :span = "20" :offset = "1"  style = "text-align:center;">
                <el-button class = "" @click = "btnClick('ordinary')">普通商品</el-button>
                <el-button @click = "btnClick('grounp')">团购商品</el-button>
        </el-col>
         <el-col :span = "20" :offset = "1"  style = "text-align:center;">
                <el-button type="danger" round class = "top20" v-if = "nextclk" @click = "createGood">确认创建该商品</el-button>
        </el-col>
  </el-col>
</template>

<script>
import { mapState } from "vuex";
import $ from "jquery";
import threeSelect from "../viewcomp/threeSelect";
export default {
  data() {
    return {
      typePosition1: "",
      typePosition2: "",
      typePosition3: "",
      type1Change: false,
      type2Change: false,
      selectbgColor: "#4d7df8",
      selectTextColor: "#fff",
      normalTextColor: "#333",
      normalbgColor: "#fff",
      nextclk: false
    };
  },
  computed: {
    ...mapState({
      goodTypeList: state => state.goodsMd.goodTypeList
    })
  },
  methods: {
    btnClick(data) {
      console.log(data);
      this.nextclk = true;
    },
    getTypePosition(arr) {
      this.typePosition1 = arr[0];
      this.typePosition2 = arr[1];
      this.typePosition3 = arr[2];
    },
    createGood() {
      if (
        this.typePosition3 == "" ||
        this.typePosition2 == "" ||
        this.typePosition1 == ""
      ) {
        return false;
      } else {
        this.$router.push("/home/goods/addGoods/addGoods2");
      }
    },
    gettypeChange(arr) {
      this.type1Change = arr[0];
      this.type2Change = arr[1];
    }
  },
  components: {
    threeSelect
  },
  mounted() {}
};
</script>

<style lang = "scss" scoped>
@import "../../publicStyle/style.scss";
</style>
