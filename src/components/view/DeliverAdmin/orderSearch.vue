<template>
    <el-col :span = "22" :offset = "1" class = "Text_title bower scrollbal">
        <el-row>{{title}}</el-row>
        <el-row>
            <!-- <el-form label-width="120px" :inline="true"  :rules="rules"  v-model="ruleForm" ref = "ruleForm" status-icon class="demo-ruleForm"> -->
                <el-form :model="ruleForm" :inline= true :rules="rules" ref="ruleForm" label-width="120px" status-icon class="demo-ruleForm">
                <el-form-item label = "订单编号"  prop="number">
                    <el-input :rows="1" v-model="ruleForm.number"></el-input>
                </el-form-item>
                <el-form-item label = "收货手机号"  prop="phone">
                    <el-input :rows="1" v-model="ruleForm.number"></el-input>
                </el-form-item>
                <el-form-item label = "订单状态"  prop="phone">
                    <el-select v-model = "ruleForm.static" placeholder="请选择订单状态">
                        <el-option :label = "option.label" :value = "option.value" v-for = "(option,index) in static_option" :key = "index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label = "成团时间"  prop="timer">
                        <el-date-picker
                        v-model="ruleForm.timer"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日">

                        </el-date-picker>
                </el-form-item>
                <el-row style = "text-align:center;">
                    <el-button type = "danger" @click = "search">查询</el-button>
                </el-row>
            </el-form>
        </el-row>
        <el-row style = "margin-top:20px;" v-if = "searched">
            <el-row>查询结果</el-row>
            <el-row>
                共查到{{reqNumber}}条数据
            </el-row>
            <el-row style = "margin-top:20px;">
                <el-col :span = "22" :offset="1">
                    <el-col  v-for = "(data,index) in searchData" :key = "index" style = "margin-top:20px;text-align:center;">
                        <el-row>
                        <el-col :span = "8">
                            订单编号:{{data.number}}
                        </el-col>
                        <el-col :span = "8">
                            成团时间:{{data.groupTime}}
                        </el-col>
                        <el-col :span = "8">
                            收货人:{{data.user}}
                        </el-col>
                        </el-row>
                    <table  cellspacing="0px" class = "tableBox" 
                    :class ="border?'tdBorder':''">
                        <tr style = "background:#efefef">
                            <th>商品id</th>
                            <th>商品名称</th>
                            <th>订单状态</th>
                            <th>商品总价(元)</th>
                            <th>数量</th>
                            <th>实收金额(元)</th>
                            <th>操作</th>                                                     
                        </tr>
                        <tr v-for = "(item,index) in data.data" :key = "index">
                            <td>
                                <p>{{item.goodID}}</p>
                                <img :src="item.goodImgUrl" alt="商品展示图">
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{data.static}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.money}}</td>
                            <td>
                                <el-button type="text" @click = "btnClick(data)">
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
                <!-- 
                     number:"1001",
                    groupTime:"2018-02-26",
                    user:"啊什顿",
                    buyTime : '2018-02-03 10:00',
                    confirmTime:'2018-02-03 10:00',
                    data:[

                    {
                    goodID:'1111',
                    goodImgUrl:"xx",
                    name:"i7/xxxx",
                    static:"待发货",
                    price:"6999.00",
                    count:"1",
                    money:"6999.00",
                    
                 -->
                <el-col :span = "6">
                    店铺名称:{{poverData.name}}
                </el-col>
                
                <el-col :span = "6">
                    订单单号:{{poverData.number}}
                </el-col>
                
                <el-col :span = "6">
                    订单状态:{{poverData.static}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span = "6">
                    下单时间:{{poverData.groupTime}}
                </el-col>
                <el-col :span = "6">
                    付款时间:{{poverData.buyTime}}
                </el-col>
                <el-col :span = "6">
                    成团时间:{{poverData.groupTime}}
                </el-col>
                <el-col :span = "6">
                    确认时间:{{poverData.confirmTime}}
                </el-col>
            </el-row>
            <el-row>
                 <table  cellspacing="0px" class = "tableBox" 
                    :class ="border?'tdBorder':''">
                        <tr style = "background:#efefef">
                            <th>商品id</th>
                            <th>商品名称</th>
                            <th>订单状态</th>
                            <th>商品总价(元)</th>
                            <th>数量</th>
                            <th>实收金额(元)</th>                                                  
                        </tr>
                        <tr v-for = "(item,index) in poverData.data" :key = "index">
                            <td>
                                <p>{{item.goodID}}</p>
                                <img :src="item.goodImgUrl" alt="商品展示图">
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.static}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.money}}</td>
                                                               
                        </tr>
                    </table>


            </el-row>
           </el-col>
        

        </el-col>
           <el-button @click = "poverHidden" v-show = "pover_show" style = "width:100%;dispaly:inline-block;position:fixed;z-index:10;background:rgba(30,30,30,0.5);top:0;left:0;
           height:100%">
                
           </el-button>
    </el-col>
</template>

<script>
export default {
    data(){
        return {
            pover_show:false,
            //弹出层的数据
            poverData:{},
            // 查询到多少条数据
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
               label : '无售后/售后处理中',
               value : "1" 
            },{
                label : "无售后/取消售后",
                value : "2"
            },{
                label :"售后处理中",
                value : "3",
            },{
                label:"退款成功",
                value : "4"
            }],
            searchData:[
                {
                    number:"1001",
                    groupTime:"2018-02-26",
                    user:"啊什顿",
                     static:"待发货",
                     buyTime : '2018-02-03 10:00',
                    confirmTime:'2018-02-03 10:00',

                    data:[

                    {
                    goodID:'1111',
                    goodImgUrl:"xx",
                    name:"i7/xxxx",
                   
                    price:"6999.00",
                    count:"1",
                    money:"6999.00",
                    

                },{
                    goodID:'1111',
                    goodImgUrl:"xx",
                    name:"i7/xxxx",
                  
                    price:"6999.00",
                    count:"1",
                    money:"6999.00"

                },{
                    goodID:'1111',
                    goodImgUrl:"xx",
                    name:"i7/xxxx",
                
                    price:"6999.00",
                    count:"1",
                    money:"6999.00"

                },]
                },
                 {
                      number:"1002",
                    groupTime:"2018-02-27",
                    user:"张三",
                     static:"待发货",
                     buyTime : '2018-02-03 10:00',
                    confirmTime:'2018-02-03 10:00',
                     data:[{
                    goodID:'2222',
                    goodImgUrl:"xx",
                    name:"i7/xxxx",
                    price:"6999.00",
                    count:"1",
                    money:"6999.00"

                }],
                 },
                 {
                       number:"1003",
                    groupTime:"2018-02-28",
                    user:"李四",
                     static:"待发货",
                     buyTime : '2018-02-03 10:00',
                    confirmTime:'2018-02-03 10:00',
                     data: [{
                    goodID:'3333',
                    goodImgUrl:"xx",
                    name:"i7/xxxx",
                    price:"6999.00",
                    count:"1",
                    money:"6999.00"

                }],

                 }
                 
            ],
        ruleForm:{
            number:"",
            static:"",
            timer:[],
        },
        rules:{
            number:[
                { required: true, message: "请输入订单编号", trigger: "blur" }
            ],
            

        },
        }
    },
    methods:{
        poverHidden(){
            console.log(1);
            this.pover_show = false;
           
        },
        shopNameOut(){

        },
        search(){
        },
        btnClick(row){
            
           this.poverData = row;
           this.pover_show = !this.pover_show;
        }
    },
    created(){
        console.log(this.border);
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
