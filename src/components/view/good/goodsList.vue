<template>
    <el-row>
        <el-col :span = "22" :offset = "1">
            <h3>商品列表</h3>
            <el-row>
            <el-col :span = "22" :offset="1">
                <el-row  style = "background:#eee;">
                <el-form :model = "goods" label-width="80px" style = "margin-top:20px;">
                    <el-col :span = "8" :offset="1">
                        <el-form-item label = "商品id">
                            <el-input clearable  v-model="goods.id">
                                <i slot = "prefix" class= "el-icon-search"></i>
                            </el-input>
                        </el-form-item>
                        
                    </el-col>
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
                    <el-radio-group v-model="goods.type" size = "mini" @change = "typeChange">
                        <el-radio label = "1" border>全部</el-radio>
                        <el-radio label = "2" border>上架</el-radio>
                        <el-radio label = "3" border>售罄</el-radio>
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
                            prop="goodId"
                            label="商品id"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="goodName"
                            label="商品名称"
                            >
                            <template slot-scope="scope">
                                <el-button type = "text" @click = "goodShow(scope.row)">{{ scope.row.goodName }}</el-button>
                           </template>
                        </el-table-column>
                        <el-table-column
                            prop="goodPrice"
                            label = "商品价格"
                           >
                        </el-table-column>
                          <el-table-column
                            prop="goodTeamPrice"
                            label = "团购价格"
                           >
                        </el-table-column>
                          <el-table-column
                            prop="goodSurplus"
                            label = "库存"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="goodSales"
                            label = "销量"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="goodType"
                            label = "状态"
                           >
                           <template slot-scope="scope">
                                {{ scope.row.goodType ==2?'上架':scope.row.goodType ==3?'售罄':'下架' }}
                           </template>
                        </el-table-column>
                         <el-table-column
                        
                            label = "操作"
                            width = "120"
                           >
                            <template slot-scope="scope">
                                <el-button type = "text">编辑</el-button>
                                <el-button type = "text" @click = "changeType(scope.row)">{{scope.row.goodType == 2?'下架':'上架'}}</el-button>
                            </template>
                        </el-table-column>





                    </el-table>
                    <el-col style = "text-align:center" class = "top20">
                    <el-pagination
                        background
                        :page-size="7"
                        :current-page = "currentPage"
                        @current-change = "toogleCurrent"
                        layout="total,prev, pager, next, -> ,jumper"
                        :total="this.goodsData.length">
                    </el-pagination>
                    </el-col>
                </el-row>
            </el-col>
                </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data() {
    return {
      goods: {
        id: "",
        name: "",
        type: "1"
      },
      // 是否关闭了message
      errorClose: true,
      // 翻页的当前页
      currentPage: 2,
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
      end: 1,
      showListNum: 7,
      hasTerm: 0,
      goodsData: [],
      backupData: []
    };
  },
  methods: {
    toogleCurrent(val) {
      this.start = val - 1;
      this.end = val;
    },
    filterData() {
      // 判断用户是清空条件的查询。还是在已经返回全部列表的清空下继续点击查询

      if (this.errorClose) {
        //判断用户是否没有点击关闭，防止暴力测试
        if (this.goods.id.length == 0 && this.goods.name.length == 0) {
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
          } else {
            this.hasTerm = 0;
            this.goodsData = this.$store.state.goodsMd.goodsList;
          }
        } else {
          this.hasTerm = 1;
          this.currentPage = 1;
          //将按钮选择上架下架的按钮重置掉
          this.goods.type = 0;
          this.goodsData = this.$store.state.goodsMd.goodsList.filter(item => {
            if (this.goods.id.length != 0 && this.goods.name.length != 0) {
              return (
                item.goodId.includes(this.goods.id) ||
                item.goodName.includes(this.goods.name)
              );
            } else if (this.goods.id.length != 0) {
              return item.goodId.includes(this.goods.id);
            } else if (this.goods.name.length != 0) {
              return item.goodName.includes(this.goods.name);
            }
          });
          this.backupData = this.goodsData;
        }
      } else return false;
    },
    typeChange(val) {
      if (val == 1) {
        this.goodsData = this.backupData;
        return false;
      } else {
        this.goodsData = this.backupData.filter(item => {
          return item.goodType == val;
        });
      }
    },
    changeType(row) {
      if (row.goodType == 2) {
        this.$store.dispatch("goodTypeChangeAjax", {
          index: row.goodId,
          goodTypeCode: 4
        });
      } else {
        this.$store.dispatch("goodTypeChangeAjax", {
          index: row.goodId,
          goodTypeCode: 2
        });
      }
    },
    goodShow(row) {
      let url = "/home/goods/goodsList/" + row.goodId;
      this.$router.push(url);
    }
  },
  computed: {
    tableData() {
      return this.goodsData.slice(
        this.start * this.showListNum,
        this.end * this.showListNum
      );
    }
  },

  created() {
    // 之后可以通过ajax获取数据
    // this.goodsData = this.$store.state.goodsMd.goodsList;
    // this.backupData = this.goodsData ;
    // // 重置页数
    // this.start = 0;
    // this.end = 1;
    // this.currentPage = 1;
  }
};
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

