<template>
    <el-col class="top20 bower" :span = "20" :offset = "2" style = "">
        <p>商品详情信息</p>
        <el-col :span = "20" :offset = "2">
            <el-form :model = "shopData"  ref="ruleForm" :rules="rules"  label-width ="150px" status-icon inline>
                <el-row>
                <el-form-item label = "商品标题" prop = "shopTitle">
                    <el-input v-model = "shopData.shopTitle" placeholder = "请输入商品标题" >
                      <i slot = "suffix" class = "el-input__icon el-icon-goods "></i>
                    </el-input>

                </el-form-item>
                </el-row>
                <el-row>
                <el-form-item label = "商品市场价格" prop = "shopPrice">
                    <el-input v-model = "shopData.shopPrice" placeholder = "请输入商品价格">
                        <el-col slot="append">元</el-col>
                    </el-input>
                </el-form-item>
                 </el-row>
                 <!-- <el-row> -->
                 <!-- <el-row> -->
                <!-- <el-form-item label = "运费模板">
                     <el-select v-model="shopData.template" placeholder="运费模板">
                        <el-option v-for = "(option,index) in optionList" :key = "index" :label = "option.label" :value = "option.index"></el-option>
                    </el-select>
                    <el-button type = "text" @click.prevent="createTemplate">新增模板</el-button>
                </el-form-item>
                </el-row> -->
                <!-- <el-row>
                <el-col :span = "18" :offset = "3" style = "background:#efefef;padding:20px;" >
                        <b>包邮配送区域</b>
                        <p>江苏、北京、山东、上海、重庆、浙江、江苏、北京、山东、上海、重庆、浙江、江苏、北京、山东、上海、重庆、浙江、江苏、北京、山东、上海、重庆、浙江</p>
                        <b>不包邮配送区域</b>
                        <p>西藏、新疆、内蒙古、辽宁、江苏、北京、山东、上海、重庆、浙江、江苏、北京、山东、上海、重庆、浙江、江苏、北京、山东、上海、重庆、浙江</p>
                        <p>
                            1件内运费10.00元，每增加一件，加一元
                        </p>
                        <p>
                            指定条件包邮：满5件包邮
                        </p>
                </el-col>
                </el-row> -->
                <!-- <el-row> -->
                <!-- <el-form-item class = "top20" label = "物流重量(含包装)" prop = "shopWeight">
                     <el-input v-model = "shopData.shopWeight" placeholder = "物流重量">
                        <el-col slot="append">kg</el-col>
                    </el-input>
                </el-form-item> -->
                <!-- </el-row> -->
                <el-row>
                <el-form-item label = "商品描述" prop = "shopDesc">
                     <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="shopData.shopDesc">
                      
                    </el-input>
                    
                </el-form-item>
                 </el-row>
                 <el-row>
                      <el-form-item label = "是否为团购商品：">
                            <el-radio-group v-model="shopData.isShopGroup">
                                  <el-radio-button border  :label = true >
                                        是
                                  </el-radio-button>
                                  <el-radio-button border :label= false>
                                    否
                                  </el-radio-button>
                            </el-radio-group>
                      </el-form-item>
                 </el-row>
                  <transition name="bounce">
                 <el-row v-if = "shopData.isShopGroup">
                      <el-row>
                        <el-form-item label = "团购价格" prop = "shopgroupPrice">
                            <el-input v-model = "shopData.shopgroupPrice" placeholder = "请输入团购价格">
                                <el-col slot="append">元</el-col>
                                
                            </el-input>
                        </el-form-item>
                      </el-row>
                      <el-row>
                        <el-col :span = "24">
                                    <el-form-item label = "商品团购图">
                                        <el-col :span = "9" :offset = '1'>
                                            <uploadComp @imgReady = "groupimgReady"  action = "http://www.paile.com"  style = "width:360px;height:90px;"></uploadComp>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                        </el-col>
                                        <el-col :span = "12" :offset = '2'>
                                            尺寸要求：<br/>宽：750px；高度在340-360px之间，<br/>图片支持：jpg格式  
                                        </el-col>
                                    </el-form-item>
                        </el-col>
                      </el-row>
                 </el-row>
                 </transition>
            
                    <!-- <el-col :span = "24" style = "margin-top : 20px;">
                                <el-form-item label = "商品主图轮播图">
                                        <el-col :span = "8" :offset = '1'>
                                            <uploadComp @imgReady = "indexBannerimgReady" action = "http://www.paile.com"  style = "width:360px;"></uploadComp>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                        </el-col>
                                        <el-col :span = "12" :offset = '2'>
                                            商品主图：图片尺寸等宽高，仅支持jpg格式的图片
                                        </el-col>
                                </el-form-item>
                    </el-col> -->
               
          
                    <el-col :span = "24" style = "margin-top : 20px;">
                        <el-form-item label = "商品轮播图">
                             <el-col :span = "23" :offset = '1'>
                                    <el-upload class="upload-demo" ref="uploadforbanner" action="https://jsonplaceholder.typicode.com/posts/" 
                                    :on-preview="handlePreview" 
                                    :on-remove = "changeImg"
                                    :on-change = "changeImg"
                                    accept = "jpg"
                                    :file-list="fileList" 
                                    :auto-upload="false" 
                                     list-type="picture"

                                     >
                                            <el-button slot="trigger" size="small" type="primary">选取轮播图图片</el-button>
                                             <el-col :span = "24">
                                                商品轮播图：<br/>图片尺寸等宽高，<br/>仅支持jpg格式的图片，最多上传10张
                                            </el-col>
                                    </el-upload>
                            </el-col>
                         </el-form-item>
                    </el-col>
             
                    
                    <el-col :span = "24" style = "margin-top : 20px;">
                        <el-form-item label = "商品详情图">
                             <el-col :span = "23" :offset = '1'>
                                    <el-upload class="upload-demo" ref="uploadForshop" action="https://jsonplaceholder.typicode.com/posts/"
                                     :on-preview="handlePreview" 
                                     :file-list="fileList" 
                                     :auto-upload="false"  
                                     list-type="picture"
                                     :on-remove = "changeImgi"
                                    :on-change = "changeImgi"
                                    >
                                            <el-button slot="trigger" size="small" type="primary">选取商品详情图</el-button>
                                             <el-col :span = "24">
                                                商品详情图：<br/>图片尺寸宽度为480-1200px,<br/>高度：0-1500px,最多上传20张
                                            </el-col>
                                    </el-upload>
                            </el-col>
                         </el-form-item>    
                    </el-col>
                    <el-col :span = "24" style = "margin-top:20px;text-align:center">
                        <el-button type="danger" round @click="submitUpload('ruleForm')">提交</el-button>
                    </el-col>
            </el-form>
        </el-col>
    </el-col>
</template>                                                                                                                                                                                         
<script>
import uploadComp from "../viewcomp/upload";
import { ufload } from "../../../api/upyun";
import $ from "jquery";
export default {
  data() {
    return {
      shopData: {
        shopTitle: "",
        shopPrice: "",
        template: "",
        shopWeight: "",
        shopDesc: "",
        shopGroupPrice: "",
        isShopGroup:true,
      },
      // optionList : [
      //     {label : "模板一",value : "模板一"},
      //     {label : "模板二",value : "模板二"},

      // ],
      fileList: [],
      specList1: "",
      specList2: "",
      specList3: "",
      // typeList:[
      //     {
      //         type:'颜色',
      //         value :0,
      //     },
      //     {
      //         type:'尺寸',
      //         value :1,
      //     },
      //     {
      //         type:'款式',
      //         value :2,
      //     },
      //     {
      //         type:'口味',
      //         value :3,
      //     },
      //     {
      //         type:'大小',
      //         value :4,
      //     }
      // ],
      // specShowList:[false,false,false],
      groupimgAttr: "",
      // 商品主图轮播图节点
      indexBannerimgAttr: "",
      changeImgList: [],
      changeImgiList: [],
      uploading: "",
      rules: {
        shopTitle: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        shopPrice: [
          {
            required: true,
            message: "请输入商品金额",
            trigger: "blur"
          },
          {
            pattern: /(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/,
            message: "请输入正确的金额",
            trigger: "blur"
          }
        ],
        shopgroupPrice: [
          {
            required: true,
            message: "请输入团购价格",
            trigger: "blur"
          },
          {
            pattern: /(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/,
            message: "请输入正确的金额",
            trigger: "blur"
          }
        ],
        shopWeight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        shopDesc: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          { max: 30, message: "最多三十个字符", trigger: "blur" }
        ]
      }
    };
  },

  watch: {
    // specList(){
    //     // console.log(this.specList)
    // }
  },
  methods: {


    changeImg(file, filelist) {
    
                     filelist.map((item, index) => {
                         this.changeImgList[index] = item.raw;
                       });
               
                        
                
                 
 
    },
    changeImgi(file, filelist) {
       
            filelist.map((item, index) => {
                this.changeImgiList[index] = item.raw;
              });
    },
    loading() {
      this.uploading = this.$loading({
        lock: true,
        text: this.loadingText,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    imgUpLoadErr() {
      this.$message({
        type: "error",
        message: "上传图片失败",
        showClose: true,
        center: true
      });
    },
    //这里是测试的，如果将来有问题 在重新改，目前来看是没有问题的
    upanyload(fileList, index) {
      return new Promise((resolve, reject) => {
        ufload(fileList[index])
          .then(data => {
            if (JSON.parse(data).code == 200) {
              if (index < fileList.length - 1) {
                index = index + 1;
                return this.upanyload(fileList, index)
                  .then(data => {
                    return resolve();
                  })
                  .catch(() => {
                    return reject();
                  });
              } else {
                resolve(data);
              }
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },

    // 提交上传图片
    submitUpload(formName) {
    
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.shopData){
                //是团购商品时候怎么做
                if(typeof this.groupimgAttr == "object"){
                this.loadingText = "正在上传图片";
                this.loading();
                }
          ufload(this.groupimgAttr)
              .then(data => {
                if (JSON.parse(data).code == 200) {

                }else{
                   this.uploading.close();
                    this.imgUpLoadErr();
                }
              }).catch(()=>{
                 this.uploading.close();
                    this.imgUpLoadErr();
              })
          }
         
          if (
            this.changeImgList.length > 0 &&
            this.changeImgiList.length > 0
          ) {
              this.loadingText = "正在上传图片";
                  this.loading();
                        this.upanyload(this.changeImgList, 0)
                          .then(data => {
                            this.upanyload(this.changeImgiList, 0)
                              .then(() => {
                                this.uploading.close();
                                this.loadingText = "上传成功，正在整理";
                                this.loading();
                                setTimeout(() => {
                                  this.uploading.close();
                                  this.$router.push("/home/goods/goodsList");
                                }, 500);
                              })
                              .catch(() => {
                                this.uploading.close();
                                this.imgUpLoadErr();
                              });
                          })
                          .catch(() => {
                            this.uploading.close();
                            this.imgUpLoadErr();
                          });
                    
                
            
          } else {
            this.$message({
              type: "error",
              message: "请上传图片",
              showClose: true,
              center: true
            });
          }
        } else {
          console.log(1);
          $(".bower").scrollTop("0");
        }
      });
    },
    groupimgReady(attr) {
      this.groupimgAttr = attr;
    },
    indexBannerimgReady(attr) {
      this.indexBannerimgAttr = attr;
    },

    handlePreview(file) {},
    //创建模板
    // createTemplate(){
    //     this.$prompt('请输入模板名称', '新增模板', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         // 校验规则
    //         // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    //         //校验失败提示
    //         // inputErrorMessage: '邮箱格式不正确'
    //         }).then(({ value }) => {
    //             let template = {
    //                label : value,
    //                value,
    //             }
    //             this.optionList.push(template);
    //         }).catch(() => {
    //         this.$message({
    //             type: 'info',
    //             message: '取消输入'
    //         });
    //         });
    // },
    specbtnClick(index) {
      this.specShowList = [false, false, false];
      let btn = document.getElementsByClassName("specbtn");
      for (let item of btn) {
        item.style.border = "1px solid #ccc";
      }
      btn[index].style.border = "1px solid #f00";

      while (index) {
        if (index > 0) {
          this.specShowList[index - 1] = true;
        }
        index--;
      }
    }
  },
  components: {
    uploadComp
  }
};
</script>
<style lang = "scss" scoped>
@import "../../publicStyle/style.scss";
.bower {
  height: 730px;
  overflow-y: scroll;
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
.specbtn {
  box-shadow: 　0 0 1px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  -ms-box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  border: 1px solid #ccc;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: .1;
    transform: translate(0,20px);
  }
  100% {
    opacity: 1;
    transform: translate(0,0px);
  }
}
</style>