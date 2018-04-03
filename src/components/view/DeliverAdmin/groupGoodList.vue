<template>
  <el-col :span = "22" :offset="1" style = "text-align:center;margin-top:20px;">
      <el-col style = "text-align:left;line-height:40px;font-weight:800;">团购列表查看</el-col>
      <el-table stripe border empty-text = "团购列表为空"  :data = "groupGoodList"  style="width: 100%" :header-cell-style = "headerStyle">
          <el-table-column prop = "id" align = "center" header-align = "center" label = "商品id">

          </el-table-column>
          <el-table-column prop = "name" align = "center" header-align = "center" label = "商品名称">

          </el-table-column>
            <el-table-column prop = "price" align = "center" header-align = "center" label = "商品价格">
              
          </el-table-column>
        <el-table-column prop = "group_price" align = "center" header-align = "center" label = "团购价格">
              
          </el-table-column>
                            <el-table-column
                            prop="type"
                             style = "height:20px;line-height:20px"
                            label = "状态"
                            align = "center"
                            header-align = "center"
               
                           >
                           <template slot-scope="scope">
                                {{ scope.row.status ==1?'待审核':scope.row.status ==2?'已审核':scope.row.status ==3?'上架':"下架" }}
                           </template>
                        </el-table-column>
          <el-table-column label = "操作"  align ="center" header-align = "center">
              <template slot-scope="scope">
        <el-button
          size="mini" type = "text"
          @click="handleEdit(scope.$index, scope.row)">某些操作</el-button>
       

      </template>
          </el-table-column>
        
      </el-table>
        <el-pagination
                        style="margin-right:20px;margin-top:20px;"
                        background
                        :page-size="showListNum"
                        :current-page = "currentPage"
                        @current-change = "toogleCurrent"
                        layout="prev, next"
                        :total="100">
                    </el-pagination>
  </el-col>
</template>

<script>
import {promiseAjax} from "@/api/ajax";
import { base_IP, base_port, base_uploadUrl } from "@/api/base";
export default {
    data(){
        return {
            groupGoodList:[

            ],
            showListNum:10,
            currentPage: 1,
            start:0,
            headerStyle: {
                background: "#ecf1f5",
                border: "0px solid #333",
                color: "#333",
                textAlign: "center",
                fontWeright: "0",
            },
        }
    },
    computed:{
        userPhone(){
            return JSON.parse(localStorage.getItem('pailewang_token')).phone;
        }
    },
    methods:{
            toogleCurrent(val) {
      this.start = (val - 1) * this.showListNum;
       this.getGroupGoodsList();
    },
        handleEdit(index,row){
                console.log(index,row)
        },
            getGroupGoodsList(){
                promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/getCargoByPhone`,{
                    phone: this.userPhone,
                    index: this.start,
                    length: this.showListNum
                }).then(data=>{
                    console.log(data)
                    if(data.code == 0){
                    this.groupGoodList = data.datas;
                    }else{
                    return;
                    }
                })
            }
    },
    created(){
        this.getGroupGoodsList();
    }
}
</script>

<style>

</style>
