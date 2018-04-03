<template>
    <el-row>
        <el-col :span = "22" :offset = "1">
            <h3>商品列表</h3>
            <el-row>
            <el-col :span = "22" :offset="1">
                <el-row  style = "background:#eee;margin-top:20px;">
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
                    <el-radio-group v-model="goods.type" size = "mini">
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
                <el-row >
                <h3>查询结果</h3>
                <el-col :span = "22" :offset="1">
                <el-row style = "margin-top : 0px;">
                    
                    <el-table
                        :data="tableData"
                        :stripe = "true"
                        :border = "true"
                        empty-text = "查询列表空"
                        :cell-style = "cellStyle"
                        :highlight-current-row = "true"
                        :header-cell-style = "headerStyle"
                        style="width: 100%" :row-style = "TableRow"  size = "mini">
                        <el-table-column
                            prop="id"
                            label="商品id"
                            style = "height:20px;line-height:20px"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="商品名称"
                             style = "height:20px;line-height:20px"
                            >
                            <template slot-scope="scope">
                                <el-button type = "text" @click = "goodShow(scope.row)">{{ scope.row.name }}</el-button>
                           </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                             style = "height:20px;line-height:20px"
                            label = "商品价格"
                           >
                        </el-table-column>
                          <el-table-column
                            prop="group_price"
                             style = "height:20px;line-height:20px"
                            label = "团购价格"
                           >
                        </el-table-column>
                          <el-table-column
                            prop="rate1"
                             style = "height:20px;line-height:20px"
                            label = "库存"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="rate1"
                             style = "height:20px;line-height:20px"
                            label = "销量"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                             style = "height:20px;line-height:20px"
                            label = "状态"
                           >
                           <template slot-scope="scope">
                                {{ scope.row.status ==1?'待审核':scope.row.status ==2?'已审核':scope.row.status ==3?'上架':"下架" }}
                           </template>
                        </el-table-column>
                         <el-table-column
                            label = "操作"
                            width = "120"
                             style = "height:20px;line-height:20px"
                           >
                            <template slot-scope="scope">

                                <el-button v-if = "scope.row.status == 3 || scope.row.status == 4" type = "text" @click = "changeType(scope.row)">{{scope.row.status == 3?'下架':scope.row.status == 4?'上架':""}}</el-button>
                                <el-col v-if = "scope.row.status ==1 || scope.row.status == 2">不可操作</el-col>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col style = "text-align:center;margin-bottom:20px;" class = "top20" >
                    <el-pagination
                        style="margin-right:20px"
                        background
                        :page-size="showListNum"
                        :current-page = "currentPage"
                        @current-change = "toogleCurrent"
                        layout="prev, next"
                        :total="100">
                    </el-pagination>
                    </el-col>
                </el-row>
            </el-col>
                </el-row>
          <el-col v-if = "pover_show" class = "scrollbal" 
          style = "z-index:11;border-radius:10px;position:fixed;top:0;left:0;background:#fff;top:5%;height:80%;overflow-y:scroll" 
          :span = "16" :offset="4">
             <el-col :span = "22" :offset="1">
               <el-col style = "margin-top:30px;text-align:center;font-weight:800;font-size:1.5em;line-heihgt:3em;">
                  {{powerData.name}}详细信息
              </el-col>
              <el-col style = "margin-top:20px;font-size:1.2em;line-height:1.8rem;">
                商品基本信息
              </el-col>
                <el-col style ="background:#ecf1f5;margin-top:20px;" :span = "22" :offset = "1">
                  <el-form label-width="200px">
                      <el-form-item style = "margin-top:20px;" label = "商品名称:">
                            <el-col>
                                {{powerData.name}}
                            </el-col>
                      </el-form-item>
                      <el-form-item label = "商品市场价:">
                            <el-col>
                                {{powerData.price}}
                            </el-col>
                      </el-form-item>
                      <el-form-item label = "七天无理由退货:">
                            <el-col>
                                是 
                            </el-col>
                      </el-form-item>
                      
                      <el-form-item label = "假一赔十:">
                            <el-col>
                                是 
                            </el-col>
                      </el-form-item>
                      <el-form-item label = "商品描述:">
                            <el-col>
                                是 
                            </el-col>
                      </el-form-item>

                  </el-form>
                </el-col>
                <el-row>
                  <el-col style = "margin-top:20px;font-size:1.2em;line-height:1.8em;">商品规格库存</el-col>
                  <el-col :span = "24">
                    <table style = "width : 100%;margin:0 auto;border-right:1px solid #efefef">
                        <tr  style = "width = 100%" class = "border">
                          <th style = "width:16%">规格一</th>
                          <th style = "width:16%">规格二</th>
                          <!-- <th>库存</th> -->
                          <th style = "width:16%">单价</th>
                          <th style = "width:16%">团购价</th>
                          <th style = "width:16%">商品编码</th>
                          <th>状态</th>
                        </tr>
                    </table>
                      
                  </el-col>
                  <el-col >
                        <table style = "border-right:1px solid #efefef; width:100%;text-align:center;"  v-for = "(item,i) in powerData.cargoDescList" :key = "i">
                              <tr v-for = "(data,i2) in item.descList" class = "border" :key = "i2">
                                  <td style = "width:16%">{{data.title}}</td>
                                            <td style = "width:16%">
                                              {{data.desc}} 
                                            </td>
                                            <td style = "width:16%">
                                              {{powerData.price}} 
                                            </td>
                                            <td style = "width:16%">
                                              {{powerData.group_price}} 
                                            </td>
                                            <td style = "width:16%">
                                              {{powerData.create_time}} 
                                            </td>
                                            <td>
                                              {{powerData.status}} 
                                            </td>
                              </tr>

                       
                            
                        </table>
                        <el-col style = "height:1px;background:#efefef;"></el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style = "margin-top:20px;font-size:1.2em;line-height:1.8em;">图片预览</el-col>
                  <el-form label-width="200px">
                      <el-form-item v-if = "powerData.isgroup ==1" style = "margin-top:20px;line-height:100px;" label = "商品团购图:">
                          <el-row> <img :src="powerData.groupimg" alt="图片丢失了" height="180px" width="380px"></el-row>
                      </el-form-item>
                      <el-form-item style = "margin-top:20px;" label = "商品主图、轮播图:">
                            <img :src="powerData.cover_url" alt="图片丢失了" width = "140px" height= "140px;">
                           <el-col :span = "24"> <img :src="item" alt="图片丢失了" v-for = "(item,i) in powerData.urlList" :key = "i" width = "140px" height="140px"></el-col>
                      </el-form-item>

                  </el-form>            
                </el-row>
                <!-- <el-row v-if = "powerData.isgroup ==1">
                  <el-col style = "line-height:40px;">团购信息</el-col>
                  <el-col style = "background:#ecf1f5;">
                       <el-form label-width="200px">
                      <el-form-item v-if = "powerData.isgroup ==1" style = "margin-top:20px;line-height:100px;" label = "团购人数:">
                           {{powerData}}
                      </el-form-item>
                      

                  </el-form>            
                  </el-col>
                </el-row> -->

             </el-col>


          </el-col>
            <el-button @click = "poverHidden" v-show = "pover_show" style = "width:100%;dispaly:inline-block;position:fixed;z-index:10;background:rgba(30,30,30,0.5);top:0;left:0;
           height:100%">
                
           </el-button>

        </el-col>
    </el-row>
</template>

<script>


import {promiseAjax} from "@/api/ajax";
import { base_IP, base_port, base_uploadUrl } from "@/api/base";
export default {
  data() {
    return {
      goods: {
        id: "",
        name: "",
        type: "0"
      },
      pover_show:false,
      // 是否关闭了message
      errorClose: true,
      // 翻页的当前页
      currentPage: 1,
      tableData:[],
      headerStyle: {
        background: "#ecf1f5",
        border: "0px solid #333",
        color: "#333",
        textAlign: "center",
        fontWeright: "0",
      },
      cellStyle: {
        color: "#333",
        textAlign: "center",
        overflow: "hidden",
      },
      start: 0,
      showListNum: 7,
      hasTerm: 0,
      goodsData: [],
      backupData: [],
      tableData:[],
      TableRow:{
        'line-height':'20px',
        'height':"20px"
      },
      // 弹出层需要的数据
      powerData: {},
    };

  },
  mounted(){
    this.start = 0;
    this.getGoodsData();
  },
  methods: {

       poverHidden(){
           
            this.pover_show = false;
           
        },
    toogleCurrent(val) {
      this.start = (val - 1) * this.showListNum;
       this.getGoodsData();
    },
    filterData() {
      // 判断用户是清空条件的查询。还是在已经返回全部列表的清空下继续点击查询

      if (this.errorClose) {
        //判断用户是否没有点击关闭，防止暴力测试

          this.start = 0;
            this.getGoodsData();
          this.hasTerm = 0;
          this.currentPage = 0;

       
      
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
            if(data.datas.length > 0){
                  if(data.code == "0"){
                    this.tableData = data.datas;
                  }else{
                  } 
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
        let val = {
          status : row.status==3?4:3,
          cargoId : row.id,
        }
         this.taggleType(val);
    },
    goodShow(row) {
          promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/getCargoById`,{
              cargoId : row.id,
              userId  : row.shop_id,
              type : row.type,
          }).then((data)=>{
            console.log(data.datas);
              this.powerData = data.datas;
            this.pover_show = !this.pover_show;
          })

          
    },
    getGoodsList(){
      promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/getCargoByPhone`,{
        phone: this.userPhone,
        index: 0,
        length: this.showListNum
      }).then(data=>{
        if(data.code == 0){
          this.goodsData = data.datas;
        }else{
          return;
        }
      })
    }
  },
  computed: {
      userPhone(){
        return JSON.parse(localStorage.pailewang_token).phone;
      }
  },

  created() {
      
  }
}
</script>

<style scoped lang="scss" scoped>
@import "../../publicStyle/style";
.successBtn {
  background: #dd2525;
  color: #fff;
}
.errorBtn {
  background: #ccc;
  color: #eee;
}

.border td,.border th{
    border-left:1px solid #efefef;
    border-top:1px solid #efefef;
    font-size:1em;
    line-height: 2em;
    
}

    .Text_title{
            font-weight:800;
            line-height: 50px;
            color:#333;
        }
        .tableBox{
            width:100%;
            text-align:center;
            background:#fff;
        }
        .tdBorder tr td,.tdBorder tr th{
          border-top:1px solid #999; 
          border-right:1px solid #999;
        }
        .tdBorder tr:nth-child(odd){
            background:#efefef
        }
        .tdBorder tr:hover{
            background:#efefef;
        }
        
        .tdBorder{
            border:1px solid #999; 
            border-top-width:0px; 
        }
      .bower {
  height: 730px;
 
  }
  .scrollbal{
       overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    width: 8px; /*滚动条宽度*/
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px; /*滚动条的背景区域的圆角*/
    background-color: rgba(255, 255, 255, 0); /*滚动条的背景颜色*/
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 15px; /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0); /*滚动条的背景颜色*/
  }
}
</style>

