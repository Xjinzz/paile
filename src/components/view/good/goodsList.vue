<template>
    <el-row>
        <el-col :span = "22" :offset = "1">
            <h3>商品列表</h3>
            <el-row>
            <el-col :span = "22" :offset="1">
                <el-row  style = "background:#eee;">
                <el-form :model = "goods" label-width="80px" style = "margin-top:20px;">
                    <!-- <el-col :span = "8" :offset="1">
                        <el-form-item label = "商品id">
                            <el-input clearable  v-model="goods.id">
                                <i slot = "prefix" class= "el-icon-search"></i>
                            </el-input>
                        </el-form-item>
                        
                    </el-col> -->
                     <el-col :span = "8" :offset="1">
                        <el-form-item label = "商品名称">
                            <el-input clearable  v-model="goods.name">
                                <i slot = "prefix" class= "el-icon-search"></i>
                            </el-input>
                        </el-form-item>
                        
                    </el-col>
                    <el-col :span = "5" :offset="1">
                        <el-button :class = "errorClose?'successBtn':'errorBtn'" @click = "filterData">查询</el-button>
                    </el-col>

                </el-form>
                </el-row>
                <el-row class = "top20">
                    <el-radio-group v-model="goods.type" size = "mini" @change = "con">
                        <el-radio label = "0" border>全部</el-radio>
                        <el-radio label = "1" border>待审核</el-radio>
                        <el-radio label = "2" border>已审核</el-radio>
                        
                        <el-radio label = "3" border>上架</el-radio>
                        <!-- <el-radio label = "3" border>售罄</el-radio> -->
                        <el-radio label = "4" border>下架</el-radio>
                        
                    </el-radio-group>
                </el-row>
                
     
               
            </el-col>
            </el-row>
                <el-row>
                <h3>查询结果</h3>
                <el-col :span = "22" :offset="1">
                <el-row style = "margin-top : 10px;">
                    
                    <el-table
                        :data="tableData"
                        :stripe = "true"
                        :border = "true"
                        empty-text = "查询列表空"
                        :cell-style = "cellStyle"
                        :highlight-current-row = "true"
                        :header-cell-style = "headerStyle"
                        style="width: 100%" max-height = 450 size = "mini">
                        <el-table-column
                            prop="id"
                            label="商品id"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="商品名称"
                            >
                            <template slot-scope="scope">
                                <el-button type = "text" @click = "goodShow(scope.row)">{{ scope.row.name }}</el-button>
                           </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label = "商品价格"
                           >
                        </el-table-column>
                          <el-table-column
                            prop="group_price"
                            label = "团购价格"
                           >
                        </el-table-column>
                          <el-table-column
                            prop="rate1"
                            label = "库存"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="rate1"
                            label = "销量"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label = "状态"
                           >
                           <template slot-scope="scope">
                                {{ scope.row.type ==1?'待审核':scope.row.goodType ==2?'已审核':scope.row.goodType ==3?'上架':"下架" }}
                           </template>
                        </el-table-column>
                         <el-table-column
                        
                            label = "操作"
                            width = "120"
                           >
                            <template slot-scope="scope">
                                <el-button type = "text">编辑</el-button>
                                <el-button type = "text" @click = "changeType(scope.row)">{{scope.row.type == 3?'下架':'上架'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col style = "text-align:center" class = "top20">
                    <el-pagination
                        background
                        :page-size="5"
                        :current-page = "currentPage"
                        @current-change = "toogleCurrent"
                        layout="prev, next"
                        :total="100">
                    </el-pagination>
                    </el-col>
                </el-row>
            </el-col>
                </el-row>
        </el-col>
    </el-row>
</template>

<script>
import {promiseAjax} from "@/api/ajax";
import { base_IP, base_port, base_uploadUrl } from "@/api/base";export default {
  data() {
    return {
      goods: {
        id: "",
        name: "",
        type: "0"
      },
      // 是否关闭了message
      errorClose: true,
      // 翻页的当前页
      currentPage: 2,
      tableData:[],
      headerStyle: {
        background: "#ecf1f5",
        border: "0px solid #333",
        color: "#333",
        textAlign: "center",
        fontWeright: "0"
      },
      cellStyle: {
        color: "#333",
        textAlign: "center",
        overflow: "hidden"
      },
      start: 0,
      showListNum: 5,
      hasTerm: 0,
      goodsData: [],
      backupData: []
    };
  },
  methods: {
    con(){
      console.log(this.goods.type)
    },
    toogleCurrent(val) {
      this.start = (val - 1) * this.showListNum;
       this.getGoodsData();
    },
    filterData() {
      // 判断用户是清空条件的查询。还是在已经返回全部列表的清空下继续点击查询

      if (this.errorClose) {
        //判断用户是否没有点击关闭，防止暴力测试
        if (this.goods.name.length == 0) {
          if (this.hasTerm == 0) {
            this.errorClose = false;
            this.$message.error({
              message: "请在输入条件后在进行筛选",
              showClose: true,
              center: true,
              duration: 1500,
              onClose: () => {
                this.errorClose = true;
              }
            });
          }
        } else {
          this.start = 0;
            this.getGoodsData();
          this.hasTerm = 0;
          this.currentPage = 0;

       
      } 
      }else return false;
    },
    getGoodsData(){
      
       promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/getCargoByPhone`,{
            phone : JSON.parse(localStorage.getItem('pailewang_token')).phone,
            name : this.goods.name,
            status : this.goods.type,
            index:this.start,
            length:this.showListNum
          }).then((data)=>{
            console.log(data);
            if(data.code == "0"){
              this.tableData = data.datas;
            }else{
            }   
          })
        },
        taggleType(val){
          promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/changeCargoStatus`,val).then(data=>{
              if(data.code == 0){
                  this.getGoodsData();
              }
          })
        },
    changeType(row) {
        if(row.status == 1 || row.status == 2){
            row.status = 3;
        }
        let val = {
          status : row.status,
          cargoId : row.id,
        }
         this.taggleType(val);
    },
    goodShow(row) {
      let url = "/home/goods/goodsList/" + row.goodId;
      this.$router.push(url);
    }
  },
  computed: {

  },

  created() {
      
  }
}
</script>

<style scoped lang="scss">
@import "../../publicStyle/style";
.successBtn {
  background: #dd2525;
  color: #fff;
}
.errorBtn {
  background: #ccc;
  color: #eee;
}
</style>

