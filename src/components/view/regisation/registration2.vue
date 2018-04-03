<template>
  <el-row style = "width:100%">
      <el-row style = "display:block;width:1200px;margin:20px auto;padding-top:30px;background:#fff;">
        <el-steps :active="active" finish-status="success" process-status = "finish" space = "40%" style = "width:1000px;color:#f00;margin:0 auto;" align-center>
            <el-step title="个人信息" style = "color:#f00" icon = "el-icon-time"></el-step>
            <el-step title="店铺信息" icon = "el-icon-time"></el-step>
            <el-step title="注册成功" icon = "el-icon-time"></el-step>
        </el-steps>

<el-col :span = "12" :offset = "7" style = "margin-top :30px">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon class="demo-ruleForm">
  <el-form-item label="主营类目" prop="businessDesc2">
    <!-- <el-input v-model="ruleForm.businessDesc" v-on:blur = "categroyOut"  style = "width:220px;" ref = "businessDesc" clearable></el-input> -->
   <el-select v-model="ruleForm.businessDesc2" multiple placeholder="请选择主营类目">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
  </el-select>
        <el-col class = "inputTip" v-if = "tip.businessDesc" style = "margin-top:5px;">* 请认真填写经营类目，信息不实会导致审核结果</el-col>
  </el-form-item>
    <el-form-item label="店铺名称" prop="name" style = "margin-top:30px;">
    <el-input v-model="ruleForm.name" v-on:blur = "shopNameOut"  style = "width:220px;" ref = "name" clearable></el-input>
        <el-col class = "inputTip" v-if = "tip.name" style = "margin-top:5px;">* 店铺名称不可修改，请谨慎填写</el-col>
  </el-form-item>
  <el-form-item label = "登陆账号" required style = "margin-top:30px;">
      <el-input v-model="ruleForm.phone"  ref = "phone"  style = "width:220px;"  :disabled="true" ></el-input>
  </el-form-item>
  <!-- <el-form-item label = "登陆密码" prop = "password" required  ref = "password" clearable>
      <el-input placeholder="请输入密码" type = "password" v-model="ruleForm.password" @blur = "passwordOut"/>
      <el-col class = "inputTip" v-if = "tip.password">8到20位，只能包含大写小写字母、数字以及符号</el-col>
  </el-form-item>
  <el-form-item label = "再次输入密码" prop = "checkpass"  clearable>
      <el-input placeholder="请再次输入密码" @blur = "checkpassfunc" type = "password" v-model="ruleForm.checkpassword"/>
       <el-col class = "inputTip" v-html="checkText"></el-col>
  </el-form-item> -->


        <div style = "margin-bottom:20px;margin-top:30px;">
    <p class = "imgLabel">店铺头像</p>
     <uploadComp @imgReady = "imgicoReady" :actionUrl = "actionUrl"/>
   
</div>
  <!-- 是否有实体店按钮 暂时去掉 -->
      <!-- <el-form-item label="是否有实体店" required prop = "isreal" >
    <el-radio-group v-model="ruleForm.isreal" size="medium" >
      <el-radio border label="1">是</el-radio>
       <el-radio border label="2">否</el-radio>
    </el-radio-group>
  </el-form-item> -->
    <!-- <el-form-item label = "店铺地址" required prop = "address" v-if = "entity==1">
        <el-input v-model="ruleForm.address" placeholder="请输入店铺地址"/>
    </el-form-item>

 <el-form-item label="营业执照" required v-if = "entity==1">
     <uploadComp @imgReady = "imgReady" :actionUrl = "actionUrl"/>
   </el-form-item> -->
<el-form-item label = "城市" required style = "margin-top:30px;">
        <el-input v-model="ruleForm.city" style = "width:220px" disabled/>
    </el-form-item>
   <el-form-item label = "店铺地址" required prop = "address" style = "margin-top:30px;">
        <el-input  v-on:blur = "addresDesc"  style = "width:220px"  v-model="ruleForm.address" placeholder="请输入店铺地址"/>
          <el-col class = "inputTip" v-if = "tip.addresDesc" style = "margin-top:5px;">* 请认真此项否则可能导致注册失败，<br/>示例:铜山区金山桥经济开发区杨山路21-6号</el-col>
    </el-form-item>




  <div style = "margin-bottom:20px;margin-top:30px;">
    <p class = "imgLabel">营业执照</p>
     <uploadComp @imgReady = "imgReady" :actionUrl = "actionUrl"/>
   
</div>
    <!-- <el-form-item label = "联系地址" props = "address" required v-if = "entity==2">
        <el-input v-model="ruleForm.address" placeholder="请输入联系地址"/>
    </el-form-item> -->

    <el-row style = "margin-top:30px;text-align:center;">
             <!-- <el-button type ="danger" @click = "registration2Golast">
            上一步
        </el-button>
        <el-button type ="danger" @click = "registration2Click('ruleForm')">
            下一步
        </el-button> -->



        <el-col style = "width:350px;margin:0 auto;padding-bottom:50px;">
                               <div class = "go-btn"  style = "margin-left:100px;" @click = "registration2Golast">上一步</div> 
                               <div class = "go-btn" style = "margin-left:50px;"  @click = "registration2Click('ruleForm')">下一步</div>                                

       <el-col class = "inputTip" style = " margin-top:20px;text-align:right;">
            * 注册店铺代表我已经同意<a href = "/Agreement" target="_blank" style = "color:blue">《拍乐网协议》</a>&nbsp;
        </el-col>
</el-col>
   
     
    </el-row>
 
</el-form>
</el-col>    
</el-row>
  
  </el-row>
</template>

<script>
import uploadComp from "../viewcomp/upload";
import { ufload } from "../../../api/upyun";
import { promiseAjax } from "../../../api/ajax";
import { base_IP, base_port, base_uploadUrl } from "../../../api/base";
import { searchByStationName } from "../../../api/map";
export default {
  components: {
    uploadComp
  },
  data() {
    return {


 options: [{
          value: '水果生鲜',
          label: '水果生鲜'
        }, {
          value: '家居日用',
          label: '家居日用'
        }, {
          value: '美妆个护',
          label: '美妆个护'
        }, {
          value: '服饰内衣',
          label: '服饰内衣'
        }, {
          value: '母婴',
          label: '母婴'
        }, {
          value: '数码电器',
          label: '数码电器'
        }, {
          value: '家纺家具',
          label: '家纺家具'
        }, {
          value: '运动户外',
          label: '运动户外'
        }, {
          value: '礼品箱包',
          label: '礼品箱包'
        }, {
          value: '食品饮料',
          label: '食品饮料'
        }, {
          value: '收拾配件',
          label: '收拾配件'
        }, {
          value: '百货超市',
          label: '百货超市'
        }, {
          value: '办公学习',
          label: '办公学习'
        }, {
          value: '生活服务',
          label: '生活服务'
        }, {
          value: '医药保健',
          label: '医药保健'
        }, {
          value: '其他',
          label: '其他'
        }],



      uploading: "",
      loadingText: "",
      color: "#f00",
      actionUrl: "http://v0.api.upyun.com/image-paile",
      actionData: {},
      //   提示
      tip: {
        businessDesc: true,
        name: true,
        password: true,
        addresDesc: true
      },
      active: 1,
      //表格里面的数据
      ruleForm: {
        businessDesc2:[],
        // 主营描述
        businessDesc: "",
        //店铺名称
        name: "",
        city: "江苏省徐州市",
        //  password:"",
        //  checkpassword:"",
        //是否有店铺
        isreal: 1,
        //店铺地址/营业地址
        address: "",
        //营业执照url
        licenceUrl: "",
        shopperid: "",
        icon: "",
        latitude: "0",
        longitude: "0"
      },
      businessDesc:"",
      // 密码提示文字
      checkText: "",
      // 校验规则
      rules: {
        businessDesc2: [
          { required: true, message: "请输入主营类目", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入店名", trigger: "blur" }],
        //  password:[
        //      {
        //          min : 8,message : "密码不能少于8位",trigger :"blur"
        //      },
        //      {
        //          max : 20,message:"密码最多20位",trigger:"blur"
        //      },{
        //          pattern:/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,message :"为了您的账户安全，密码不能单纯为数字、字母或符号",trigger:'blur'
        //      }

        //  ],
        // checkpass: [
        //   { required: false, message: "请再次输入密码", trigger: "blur" }
        // ],
        // isreal: [
        //   { required: true, message: "请选择是否有店铺", trigger: "blur" }
        // ],
        address: [
          { required: true, message: "请输入实体店铺所在地", trigger: "blur" }
        ]
      },
      upfileName: "",
      imgicoAttr: ""
    };
  },
  mounted() {
    this.ruleForm.shopperid = JSON.parse(localStorage.getItem("datas")).id;
  },
  computed: {
    // entity() {
    //   return this.ruleForm.isreal;
    // }
  },
  methods: {
    loading() {
      this.uploading = this.$loading({
        lock: true,
        text: this.loadingText,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },

    imgicoReady(attr) {
      this.imgicoAttr = attr;
    },
    imgReady(attr) {
      this.upfileName = attr;
    },
    imgUpLoadErr() {
      this.$message({
        type: "error",
        message: "上传图片失败",
        showClose: true,
        center: true
      });
    },
    categroyOut() {
      this.tip.businessDesc = false;
    },
    addresDesc() {
      this.tip.addresDesc = false;
    },
    shopNameOut() {
      this.tip.name = false;
    },
    passwordOut() {
      this.tip.password = false;
    },
    checkpassfunc() {
      if (this.ruleForm.password == "") {
        return false;
      }
      if (this.ruleForm.password === this.ruleForm.checkpassword) {
        this.checkText =
          "<p style = 'color:#3eff30'><i class = 'el-icon-success'></i>密码校验成功</p>";
        return false;
      } else {
        this.checkText =
          "<p style = 'color:#f00'><i class = 'el-icon-error'></i>密码校验失败</p>";
        return false;
      }
    },
    registration2Click(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          //判断参数
          if (this.ruleForm.isreal == "0") {
            return false;
          } else {
            // 有店铺
            if (this.ruleForm.isreal == "1") {
              // 这里增加一层判断  判断营业执照是否上传 然后传入 ycode
              if (
                typeof this.upfileName == "object" &&
                typeof this.imgicoAttr == "object"
              ) {
                this.loadingText = "正在上传图片";
                this.loading();
                ufload(this.upfileName)
                  .then(data => {
                    if (JSON.parse(data).code == 200) {
                      // JSON.parse(data).url 图片上传的名字和路径
                      // window.localStorage.setItem('ycode',0);
                      // this.$router.push('/registration3')
                      // 这里发送ajax
                      this.ruleForm.licenceUrl = `${base_uploadUrl}${
                        JSON.parse(data).url
                      }`;
                      ufload(this.imgicoAttr)
                        .then(data => {
                          if (JSON.parse(data).code == 200) {
                            this.ruleForm.icon = `${base_uploadUrl}${
                              JSON.parse(data).url
                            }`;
                            console.log(this.ruleForm.address)
                            searchByStationName(this.ruleForm.address)
                              .then(data => {
                                this.ruleForm.longitude = data.point.lng;
                                this.ruleForm.latitude = data.point.lat;
                                 for(let i = 0 ;i<this.ruleForm.businessDesc2.length;i++){
                                   if(i == 0){
                                      this.ruleForm.businessDesc = this.ruleForm.businessDesc2[i];
                                      continue;
                                   }
                                   this.ruleForm.businessDesc = this.ruleForm.businessDesc+','+ this.ruleForm.businessDesc2[i]
                                 }
                                
                                promiseAjax(
                                  `http://${base_IP}:${base_port}/paile-service/api/shopsHandler/createShop`,
                                  this.ruleForm
                                )
                                  .then(data => {
                                    if (data.code == "0") {
                                      localStorage.setItem(
                                        "token_three",
                                        data.code
                                      );
                                      localStorage.setItem(
                                        "datas2",
                                        JSON.stringify(data.datas)
                                      );
                                      this.uploading.close();
                                           let token = {
                                                isLogin:true,
                                            }
                                             localStorage.setItem(
                                                    "pailewang_token",
                                                    JSON.stringify(token)
                                              );
                                      this.$router.push("/registration3");
                                    } else {
                                      this.uploading.close();
                                      this.imgUpLoadErr();
                                    }
                                  })
                                  .catch(err => {
                                    this.uploading.close();
                                    this.imgUpLoadErr();
                                  });
                              })
                              .catch(err => {
                                console.log(err);
                                this.uploading.close();
                                this.$message({
                                  type: "error",
                                  message: "地址获取失败",
                                  showClose: true,
                                  center: true
                                });
                              });
                          } else {
                            this.uploading.close();
                            this.imgUpLoadErr();
                          }
                        })
                        .catch(err => {
                          this.uploading.close();
                          this.imgUpLoadErr();
                        });
                    } else {
                      this.uploading.close();
                      this.imgUpLoadErr();
                    }
                  })
                  .catch(err => {
                    this.uploading.close();
                    this.imgUpLoadErr();
                  });
              } else {
                this.uploading.close();
                this.imgUpLoadErr();
              }
            }
            //  else if (this.ruleForm.isreal == "2") {
            //   //这里和上面重复  造成代码多余  将来优化的店
            //   if (typeof this.imgicoAttr == "object") {
            //     this.loadingText = "正在上传图片";
            //     this.loading();
            //     ufload(this.imgicoAttr)
            //       .then(data => {
            //         if (JSON.parse(data).code == 200) {
            //           this.ruleForm.icon = JSON.parse(data).url;
            //           console.log(this.ruleForm);
            //           promiseAjax(
            //             `http://${base_IP}:${base_port}/paile-service/api/shopsHandler/createShop`,
            //             this.ruleForm
            //           )
            //             .then(data => {
            //               if (data.code == "0") {
            //                 localStorage.setItem("token_three", data.code);
            //                 localStorage.setItem(
            //                   "datas2",
            //                   JSON.stringify(data.datas)
            //                 );
            //                 this.uploading.close();
            //                 this.$router.push("/registration3");
            //               } else {
            //                 this.uploading.close();
            //                 this.imgUpLoadErr();
            //               }
            //             })
            //             .catch(err => {
            //               this.uploading.close();
            //               this.imgUpLoadErr();
            //             });
            //         } else {
            //           this.uploading.close();
            //           this.imgUpLoadErr();
            //         }
            //       })
            //       .catch(err => {
            //         this.uploading.close();
            //         this.imgUpLoadErr();
            //       });
            //   }
            // }
          }
        } else {
          return false;
        }
      });
    },
    registration2Golast() {
               let token = {
                                                isLogin:true,
                                            }
                                             localStorage.setItem(
                                                    "pailewang_token",
                                                    JSON.stringify(token)
                                              );
      this.$router.push("/nextregistration");
    }
  },
  created() {
    this.ruleForm.phone = JSON.parse(localStorage.datas).phone;
  }
};
</script>

<style <style lang="scss" scoped>

$tipcolor: #999;
.imgLabel{
      text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:150px;
    line-height: 110px;
}
.go-btn{
  width:100px;;
  float: left;
  margin-left:50px;
      display:block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    background:#d43636;
    color:#fff;
}
.go-btn:hover{
  background:#f78989
}
.inputTip {
  color: $tipcolor;
  font-size: 12px;
  text-align: left;
  line-height: 15px;
}


.el-step__head.is-success {
    color: #333;
    border-color: #67c23a;
}
</style>