<template>
    <el-col :span = "22" :offset = "1" class = "Text_title bower scrollbal">
        <el-row>{{title}}</el-row>
        <el-row style="font-weight: normal;">
            <!-- <el-form label-width="120px" :inline="true"  :rules="rules"  v-model="ruleForm" ref = "ruleForm" status-icon class="demo-ruleForm"> -->
                <el-form :model="ruleForm" :inline= true :rules="rules" ref="ruleForm" label-width="120px" status-icon class="demo-ruleForm">
                <el-form-item label = "订单编号" >
                    <el-input :rows="1" style = "margin-top:5px;;" v-model="ruleForm.orderNo"></el-input>
                </el-form-item>
                <el-form-item label = "收货手机号">
                    <el-input :rows="1" style = "margin-top:5px;;"  v-model="ruleForm.customerPhone"></el-input>
                </el-form-item>
                <br>
                <el-form-item label = "订单状态">
                    <el-select style="width:206px;margin-top:5px" v-model = "ruleForm.status" placeholder="请选择订单状态">
                        <el-option  :label = "option.label" :value = "option.value" v-for = "(option,index) in static_option" :key = "index"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label = "成团时间">
                        <el-date-picker
                        v-model="ruleForm.timer"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"   style = "margin-top:5px;;" >
                        </el-date-picker>


                </el-form-item>
                <el-row style = "margin-left:50px">
                    <el-button style="width:100px;background:#DD2525" type = "danger" @click = "search">查询</el-button>
                </el-row>
            </el-form>
        </el-row>
        <el-row style = "margin-top:20px;" v-if = "searched">
            <el-row >查询结果</el-row>
            <el-row style = "width:80%; border-bottom:1px dotted #d2d2d2;"></el-row>
            <!-- <el-row style="color:#606266;margin-left:36px;font-weight:normal">
                共查到<b style="color:red"> {{reqNumber}} </b>条数据
            </el-row> -->
            <el-row style = "margin:20px 0 20px 0;font-weight:normal">
                <el-col :span = "22" :offset="1">
                    <el-col  v-for = "(data,index) in searchData" :key = "index" style = "margin-top:20px;text-align:center;">
                                <el-row style = "margin:10px 0 20px 0s;">
                                    <el-col :span = "8">
                                        订单编号:{{data.orderNo}}
                                    </el-col>
                                    <el-col :span = "8">
                                        成团时间:{{data.createTimeStr}}
                                    </el-col>
                                    <el-col :span = "8">
                                        收货人:{{data.customerName}}
                                    </el-col>
                                </el-row>
                                <table  cellspacing="0px" class = "tableBox" 
                                :class ="border?'tdBorder':''" style="font-size:12px;line-height: 25px;">
                                    <tr style = "background:#efefef;height:30px">
                                        <th style="width:15%">商品id</th>
                                        <th style="width:30%">商品名称</th>
                                        <th style="width:10%">订单状态</th>
                                        <th style="width:10%">商品总价(元)</th>
                                        <th style="width:10%">数量</th>
                                        <th style="width:15%">实收金额(元)</th>
                                        <th style="width:10%">操作</th>                                                     
                                    </tr>
                                    <tr v-for = "(item,index) in data.cargoList" :key = "index" >
                                        <td>
                                            <p>{{item.shop_id}}</p>
                                            <img :src="item.cover_url" style="width:50px; height:50px" alt="商品展示图">
                                        </td>
                                        <td style="text-align: left; padding: 0 2%">{{item.name}}</td>
                                        <td>{{data.status|type}}</td>
                                        <td>{{item.price}}</td>
                                        <td>{{item.count}}</td>
                                        <td>{{item.price}}</td>
                                        <td>
                                            <el-button type="text" @click = "btnClick(index)">
                                                查看
                                            </el-button>
                                        </td>                                                     
                                    </tr>
                                </table>
                    </el-col>
                  
                </el-col>
            </el-row>
        </el-row>
        <el-col v-if = "pover_show" class = "scrollbal" style = "z-index:11;border-radius:10px;position:fixed;top:0;left:0;background:#fff;top:5%;height:80%;overflow-y:scroll" :span = "16" :offset="4">
           <el-col :span = "22" :offset="1">
            <el-col style = "margin-top:20px;text-align:center">
                订单详情
            </el-col>
            <el-row>
                <el-col :span = "4">
                    店铺名称:　{{poverData.shopName}}
                </el-col>
                
                <el-col :span = "8">
                    订单单号:　{{poverData.orderNo}}
                </el-col>
                
                <el-col :span = "5">
                    订单状态:　{{poverData.status|type}}
                </el-col>
                 <el-col :span = "7">
                    收货人手机号:　{{poverData.customerPhone}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span = "8">
                    下单时间:　{{poverData.createTimeStr}}
                </el-col>
                <el-col :span = "8">
                    付款时间:　{{poverData.createTimeStr}}
                </el-col>
                <!-- <el-col :span = "6">
                    成团时间:{{poverData.groupTime}}
                </el-col> -->
                <el-col :span = "8">
                    确认时间:　{{poverData.createTimeStr}}
                </el-col>
            </el-row>
            <el-row>
                 <table  cellspacing="0px" class = "tableBox" 
                    :class ="border?'tdBorder':''" style="font-size:12px;line-height: 25px;">
                        <tr style = "background:#efefef">
                            <th style="width:25%">商品id</th>
                            <th style="width:30%">商品名称</th>
                            <th style="width:10%">订单状态</th>
                            <th style="width:10%">商品总价(元)</th>
                            <th style="width:10%">数量</th>
                            <th style="width:15%">实收金额(元)</th>
                        </tr>
                        <tr v-for = "(item,index) in poverData.cargoList" :key = "index">
                            <td>
                                <p>{{item.id}}</p>
                                <img :src="item.cover_url" alt="商品展示图" style="width:50px; height:50px">
                            </td>
                            <td style="text-align: left; padding: 0 2%">{{item.name}}</td>
                            <td>{{item.static|type}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.price}}</td>
                        </tr>
                    </table>
            </el-row>
           </el-col>
        </el-col>
        <el-button @click = "poverHidden" v-show = "pover_show" style = "width:100%;dispaly:inline-block;position:fixed;z-index:10;background:rgba(30,30,30,0.5);top:0;left:0;height:100%"></el-button>
    </el-col>
</template>

<script>
import {promiseAjax} from "@/api/ajax";
import { base_IP, base_port, base_uploadUrl } from "@/api/base";
export default {
    data(){
        return {
            pover_show:false,
            //弹出层的数据
            poverData:[],
            //弹出层请求的数据
            reqNumber:0,
            //是否有边框
            border:true,
            //边框的样式,
            borderStyle:'1px solid #0c8be4;',
            // 搜索结果是否展现
            searched:true,
            static_option:[{
               label : '全部',
               value : "0" 
            },{
               label : '待取货',
               value : "3" 
            },{
                label : "待评价",
                value : "4"
            },{
                label :"已评价",
                value : "6",
            }],
            searchData:[
                 
            ],
        ruleForm:{
            orderNo:"",
            customerPhone:"",
            phone:"",
            timer:['',''],
        },
        start:0,
        dataList:10,
        rules:{
            number:[
                { required: true, message: "请输入订单编号", trigger: "blur" }
            ],
        },
        }
    },
    filters:{
        type(val){
            if(val == 3){
                return '待取货'
            }else if(val == 4){
                return "待评价"
            }else if(val == 5){
                return '已评价'
            }else{
                return '暂无状态'
            }
        }
    },
    methods:{
        poverHidden(){
            this.pover_show = false;
        },
        shopNameOut(){

        },
        search(){
            this.getSearchData();
        },
        btnClick(index){
            this.poverData = this.searchData[index];
           this.pover_show = !this.pover_show;
        },
        getSearchData(){
            promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/orderHandler/getAllOrderByPhone`,{
                phone :JSON.parse(localStorage.getItem('pailewang_token')).phone,
                orderNo:this.ruleForm.orderNo,
                status: this.ruleForm.status,
                customerPhone:this.ruleForm.customerPhone,
                startTime:this.ruleForm.timer[0],
                endTime:this.ruleForm.timer[1],
                index:this.start,
                length:this.dataList,
            }).then(data=>{
               
                console.log(data);
                if(data.code == 0){
                    this.searchData = data.datas;
                    // console.log(this.searchData);
                }else{
                    return;
                }
            })
        }
    },
    created(){
        //console.log(this.border);
        this.getSearchData();
    },
    computed:{
        title(){
            return document.title;
        }
    }
}
</script>

<style scoped lang = "scss">
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
