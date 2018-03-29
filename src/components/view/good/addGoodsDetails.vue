<template>
    <el-col class="top20 bower" :span = "20" :offset = "2" style = "">
       
        <el-col :span = "20" :offset = "2">
           <p>商品详情信息</p>
            <el-form :model = "shopData"  ref="ruleForm" :rules="rules"  label-width ="150px" status-icon inline>
                <el-row>
                    <el-form-item label = "商品类型" prop = "shopType">
                        <el-select v-model="shopData.shopType">
                            <el-option v-for="item in options" :label = "item.label" :value = "item.value" :key = "item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                <el-form-item label = "商品标题" prop = "name">
                    <el-input v-model = "shopData.name" placeholder = "请输入商品标题" >
                      <i slot = "suffix" class = "el-input__icon el-icon-goods "></i>
                    </el-input>
                </el-form-item>
                </el-row>
                <el-row>
                <el-form-item label = "商品市场价格" prop = "price">
                    <el-input style="width:221px" v-model = "shopData.price" placeholder = "请输入商品价格">
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
                <el-form-item label = "商品描述" prop = "descr">
                     <el-input
                        style="width:221px"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="shopData.descr">
                      
                    </el-input>
                    
                </el-form-item>
                 </el-row>
                 <el-row>
                      <el-form-item label = "是否为团购商品：">
                            <el-radio-group v-model="shopData.isgroup">
                                  <el-radio-button border  :label = 1 >
                                        是
                                  </el-radio-button>
                                  <el-radio-button border :label= 0>
                                    否
                                  </el-radio-button>
                            </el-radio-group>
                      </el-form-item>
                 </el-row>
                  <transition name="bounce">
                 <el-row v-if = "shopData.isgroup ==1">
                      <el-row>
                        <el-form-item label = "团购价格" prop = "grpuPrice">
                            <el-input style="width:221px" v-model = "shopData.grpuPrice" placeholder = "请输入团购价格">
                                <el-col slot="append">元</el-col>
                                
                            </el-input>
                        </el-form-item>
                      </el-row>
                      <el-row>
                        <el-col :span = "24">
                                    <el-form-item label = "商品团购图">
                                        <el-col :span = "9" :offset = '1'>
                                            <uploadComp @imgReady = "groupimgReady"  action = "http://www.paile.com"  style = "width:360px;height:90px;margin-left:122px; margin-top:-30px"></uploadComp>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                        </el-col>
                                        <el-col :span = "12" :offset = '2' style="margin-top:-20px">
                                            尺寸要求：<br/>宽：750px；高度在340-360px之间，<br/>图片支持：jpg格式  
                                        </el-col>
                                    </el-form-item>
                        </el-col>
                      </el-row>
                 </el-row>
                 </transition>
            
                     <el-col :span = "24" style = "margin-top : 20px;">
                                <el-form-item label = "商品主图轮播图">
                                        <el-col :span = "9" :offset = '1'>
                                            <uploadComp @imgReady = "indexBannerimgReady" action = "http://www.paile.com"  style = "width:360px;margin-left:122px; margin-top:-30px"></uploadComp>
                                        </el-col>
                                        <el-col :span = "12" :offset = '2'>
                                          商品主图：<br>图片尺寸等宽高，仅支持jpg格式的图片
                                        </el-col>
                                </el-form-item>
                    </el-col> 
               
          
                    <el-col :span = "24" style = "margin-top : 20px;">
                        <el-form-item label = "商品轮播图">
                             <el-col :span = "23" :offset = '1' style="margin-left:1px">
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
                             <el-col :span = "23" :offset = '1' style="margin-left:1px">
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

                    <hr/>
                      <el-row>
                      <p style="margin-left:40px;margin-top:20px;">商品规格库存</p>
                      <el-col class = "top20" :span = "22" :offset="1">
                        <el-radio-group v-model="shopData.spennum" size = "mini" style="margin-left:65px">
                            <el-radio-button :label = "k" :key="k" v-for = "(i,k) in ['无','一种','两种','三种']">
                                  {{i}}规格
                            </el-radio-button>
                      </el-radio-group>
                      </el-col>
                      <el-col :span = "20" :offset="1" v-for = "(item,k) in shopData.spennum" :key = "item" style = "margin-top:10px">
                          <selectComp :options = "specOptions" @changeSelect = 'selectfunc' :index = "k" style="margin-left:65px"></selectComp>
                        
                          <el-row style = "margin-top:10px;">
                          <el-tag
                            v-for="(tag,index) in shopData.tags[k]"
                              :key="index"
                              :closable = "true"
                              :disable-transitions ="false"
                               @close="handleClose(tag,k)"
                              :type="tag.type" style = "margin-left:5px;">
                              {{tag.name}}
                          </el-tag>
                            <el-button class="button-new-tag" size="small" @click = "addShopSpec(k)" style="margin-left:65px">
                              添加
                          </el-button>
                          </el-row>
                      </el-col>
                 </el-row>
                  <!-- <hr/> -->
                  <!-- <el-row>
                    <p>商品基本参数</p>
                    <el-form-item label = "商品分类">
                            <el-input value = "xxx" :disabled="true"></el-input>
                    </el-form-item>
                    <el-row>
                      <el-form-item label = "假一赔十">
                              <el-input value = "xxx" :disabled="true"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label = "七天无理由退货">
                              <el-input value = "xxx" :disabled="true"></el-input>
                      </el-form-item>
                    </el-row>
                  </el-row> -->
                  <el-row v-if = "shopData.isgroup" style = "margin-top:15px;">
                  
                    <hr/>
                    <el-form-item label = "团购人数" style="margin-top:15px">
                          <el-input v-model="shopData.groupUserCount" disabled></el-input>
                          <el-slider :min = '2' :max = '10' v-model="shopData.groupUserCount" 
                          :format-tooltip="formatTooltip" style="margin-top:10px;margin-left:10px"></el-slider>
                    </el-form-item>
                    <el-row>
                    <el-form-item label = "单次限量" style="margin-top:-15px">
                        <el-input placeholder="请输入单次限量" v-model="shopData.singleCount"></el-input>
                    </el-form-item>
                    </el-row>
                    <el-form-item label = "限购次数">
                        <el-input placeholder="请输入限购次数" v-model="shopData.buyCount"></el-input>
                    </el-form-item>
                  </el-row>
                    <el-col :span = "24" style = "margin-top:5px;text-align:center">
                        <el-button type="danger" @click="submitUpload('ruleForm')" style="width:150px;margin-left:-200px">提交</el-button>
                    </el-col>
            </el-form>
        </el-col>
    </el-col>
</template>                                                                                                                                                                                         
<script>
import uploadComp from "../viewcomp/upload";
import { ufload } from "../../../api/upyun";
import $ from "jquery";
import selectComp from "../smallcomp/select";
import {promiseAjax} from "@/api/ajax";
import { base_IP, base_port, base_uploadUrl } from "@/api/base";
export default {
  data() {
    return {
      shopData: {
        //手机号
        phone:"",
        type : "1",
        // 商品标题
        name: "",
        //商品市场价格
        price: "",

        //商品描述
        descr: "",
        //团购价格
        grpuPrice: "",
        //商品是否是团购
        isgroup: 1,
        //商品类型
        shopType: 1,
        // 选择几种规格
        spennum: 0,
        //
        spec: [],
        //第一个规格
        paramTitle1: "",
        //第二个规格
        paramTitle2: "",
        //第三个规格
        paramTitle3: "",
        //规格一的参数
        paramValues1:"",
        paramValues2:"",
        paramValues3:"",
        //商品规格标签
        tags: [[], [], []],
        //团购人数
        groupUserCount: 2,
        groupImgUrl:"",
        // 商品主图轮播图
        cover_url:"",
        bannerUrls:"",
        descrUrls:"",
        //单次限量
        singleCount:"",
        buyCount:"",
      },
      //规格下拉
      specOptions: [
        {
          value: "尺寸",
          label: "尺寸"
        },
        {
          value: "颜色",
          label: "颜色"
        },
        {
          value: "款式",
          label: "款式"
        },
        {
          value: "口味",
          label: "口味"
        },
        {
          value: "尺码",
          label: "尺码"
        }
      ],
      //商品类型 下拉
      options: [
        {
          value: 1,
          label: "男装"
        },
        {
          value: 2,
          label: "女装"
        },
        {
          value: 3,
          label: "居家"
        },
        {
          value: 4,
          label: "母婴"
        },
        {
          value: 5,
          label: "鞋包"
        },
        {
          value: 6,
          label: "玩具"
        },
        {
          value: 7,
          label: "美妆"
        },
        {
          value: 8,
          label: "饰品"
        },
        {
          value: 9,
          label: "数码"
        }
      ],
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
      imgGroupUrlTexT:"",
      rules: {
        name: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        price: [
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
        grpuPrice: [
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
        descr: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          { max: 30, message: "最多三十个字符", trigger: "blur" }
        ],
        shopType: [
          {
            required: true,
            message: "请选择类型",
            trigger: "blur"
          }
        ]
      }
    };
  },

  watch: {},
  methods: {
    formatTooltip(val) {
      return val + "人成团";
    },
    handleClose(tag, k) {
      this.shopData.tags[k].splice(this.shopData.tags[k].indexOf(tag), 1);
    },
    addShopSpec(k) {
      let paramValue = "";
      switch (k) {
        case 0:
          paramValue = this.shopData.paramTitle1;
          break;
        case 1:
          paramValue = this.shopData.paramTitle2;
          break;
        case 2:
          paramValue = this.shopData.paramTitle3;
          break;
      }

      this.$prompt(`请输入${paramValue}的规格`, "拍乐网提示", {
        confiremButtonText: "添加",
        cancelButtonText: "取消"
      })
        .then(data => {
          let randomNum = Math.floor(Math.random() * 5);
          let value = {
            name: data.value,
            type: ["", "success", "info", "warning", "danger"][randomNum]
          };
          this.shopData.tags[k].push(value);
        })
        .catch(() => {
        });
    },
    selectfunc(data) {
      console.log(data);
      switch (data.index) {
        case 0:
          this.shopData.paramTitle1 = data.optionSelect;
          break;
        case 1:
          this.shopData.paramTitle2 = data.optionSelect;
          break;
        case 2:
          this.shopData.paramTitle3 = data.optionSelect;
          break;
      }
    },
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

        ufload(fileList[Math.floor(index)])
          .then(data => {    
            console.log(1);  
            if (JSON.parse(data).code == 200) {
      
               
              
                if(Math.floor(index) == 0) {
                 
                  this.imgGroupUrlTexT = `${base_uploadUrl}`+JSON.parse(data).url
          
                }else{
                  this.imgGroupUrlTexT = this.imgGroupUrlTexT + ','+ `${base_uploadUrl}`+JSON.parse(data).url

                }
              if (Math.floor(index) < fileList.length - 1) {
          
                
                index = Math.floor(index) + 1;
          
                
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
          if (this.shopData) {
            //是团购商品时候怎么做
            if (typeof this.groupimgAttr == "object") {
              this.loadingText = "正在上传图片";
              this.loading();
            }
            ufload(this.groupimgAttr)
              .then(data => {
                if (JSON.parse(data).code == 200) {
                    this.shopData.groupImgUrl =  `${base_uploadUrl}`+JSON.parse(data).url;
                } else {
                  this.uploading.close();
                  this.imgUpLoadErr();
                }
              })
              .catch(() => {
                this.uploading.close();
                this.imgUpLoadErr();
              });
          }

          if ((typeof this.indexBannerimgAttr == "object" && this.changeImgList.length > 0 
          && this.changeImgiList.length > 0)) {
            this.loadingText = "正在上传图片";
            this.loading();
            ufload(this.indexBannerimgAttr).then((data)=>{
            
              if(JSON.parse(data).code == 200){
               
               
                this.shopData.cover_url = `${base_uploadUrl}`+JSON.parse(data).url;
                          this.upanyload(this.changeImgList,'0')
              .then(data => {
                  
                this.shopData.bannerUrls = this.imgGroupUrlTexT;
                this.upanyload(this.changeImgiList,'0')
                  .then(() => {
                    this.shopData.descrUrls = this.imgGroupUrlTexT;
                    this.uploading.close();
                    this.loadingText = "上传成功，正在整理";
                    
                    this.loading();
                    setTimeout(() => {
                      this.uploading.close();
                      this.shopData.tags[0].map((item,index)=>{
                          if(index == 0){
                            this.shopData.paramValues1 =  item.name;
                          }else{
                            this.shopData.paramValues1 +=  ','+item.name;
                          }
                      })
                       this.shopData.tags[1].map((item,index)=>{
                          if(index == 0){
                            this.shopData.paramValues2 =  item.name;
                          }else{
                            this.shopData.paramValues2 +=  ','+item.name;
                          }
                      })
                       this.shopData.tags[2].map((item,index)=>{
                          if(index == 0){
                            this.shopData.paramValues3 =  item.name;
                          }else{
                            this.shopData.paramValues3 +=  ','+item.name;
                          }
                      })
                      delete(this.shopData['tags']);
                      console.log(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/createCargo`)
                      promiseAjax(`http://${base_IP}:${base_port}/paile-service/api/cargoHandler/createCargo`,{
                        'phone':this.shopData.phone,
                        'name':this.shopData.name,
                        'type':this.shopData.type,
                        'price':this.shopData.price,
                        'grpuPrice':this.shopData.grpuPrice,
                        'isgroup':this.shopData.isgroup,
                        'descr':this.shopData.descr,
                        'groupImgUrl':this.shopData.groupImgUrl,
                        'cover_url':this.shopData.cover_url,
                        'bannerUrls':this.shopData.bannerUrls,
                        'descrUrls':this.shopData.descrUrls,
                        'paramTitle1':this.shopData.paramTitle1,
                        'paramValues1':this.shopData.paramValues1,
                        'paramTitle2':this.shopData.paramTitle2,
                        'paramValues2':this.shopData.paramValues2,
                        'paramTitle3':this.shopData.paramTitle3,
                        'paramValues3':this.shopData.paramValues3,
                        'groupUserCount':this.shopData.groupUserCount,
                        'singleCount':this.shopData.singleCount,
                        'buyCount':this.shopData.buyCount,
                        
                        
                        
                      }).then((data)=>{
                        console.log(data);
                      }).catch(()=>{
                        console.log(2);
                      });
                      // this.$router.push("/home/goods/goodsList");
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
                
              }else{
                 this.uploading.close();
                this.imgUpLoadErr();
              }
            }).catch(()=>{
               this.uploading.close();
                this.imgUpLoadErr();
            })
  
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
    uploadComp,
    selectComp
  },
  created(){
    this.shopData.phone = JSON.parse(window.localStorage.pailewang_token).phone
  }
};
</script>
<style lang = "scss" scoped>
@import "../../publicStyle/style.scss";
// 增加一个新的标签的按钮
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
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
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0.1;
    transform: translate(0, 20px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0px);
  }
}
</style>