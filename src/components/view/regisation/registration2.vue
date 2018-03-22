<template>
  <el-row style = "margin-top:20px;">
      <el-col :span = "16" :offset = "4">
        <el-steps :active="active" finish-status="success" process-status = "finish" space = "40%" align-center>
            <el-step title="个人信息"  icon = "el-icon-time"></el-step>
            <el-step title="店铺信息" icon = "el-icon-time"></el-step>
            <el-step title="注册成功" icon = "el-icon-time"></el-step>
        </el-steps>

<el-col :span = "12" :offset = "5" style = "margin-top :20px">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" status-icon class="demo-ruleForm">
  <el-form-item label="主营类目" prop="businessDesc">
    <el-input v-model="ruleForm.businessDesc" v-on:blur = "categroyOut" ref = "businessDesc" clearable></el-input>
        <el-col class = "inputTip" v-if = "tip.businessDesc">* 请认真填写经营类目，信息不实会导致审核结果</el-col>
  </el-form-item>
    <el-form-item label="店铺名称" prop="name">
    <el-input v-model="ruleForm.name" v-on:blur = "shopNameOut" ref = "name" clearable></el-input>
        <el-col class = "inputTip" v-if = "tip.name">* 店铺名称不可修改，请谨慎填写</el-col>
  </el-form-item>
  <el-form-item label = "登陆账号" required>
      <el-input v-model="ruleForm.phone"  ref = "phone" :disabled="true" ></el-input>
  </el-form-item>
  <!-- <el-form-item label = "登陆密码" prop = "password" required  ref = "password" clearable>
      <el-input placeholder="请输入密码" type = "password" v-model="ruleForm.password" @blur = "passwordOut"/>
      <el-col class = "inputTip" v-if = "tip.password">8到20位，只能包含大写小写字母、数字以及符号</el-col>
  </el-form-item>
  <el-form-item label = "再次输入密码" prop = "checkpass"  clearable>
      <el-input placeholder="请再次输入密码" @blur = "checkpassfunc" type = "password" v-model="ruleForm.checkpassword"/>
       <el-col class = "inputTip" v-html="checkText"></el-col>
  </el-form-item> -->
 <el-form-item label="店铺头像" required>
     <uploadComp @imgReady = "imgicoReady" :actionUrl = "actionUrl"/>
   </el-form-item>


      <el-form-item label="是否有实体店" required prop = "isreal" >
    <el-radio-group v-model="ruleForm.isreal" size="medium" >
      <el-radio border label="1">是</el-radio>
       <el-radio border label="2">否</el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label = "店铺地址" required prop = "address" v-if = "entity==1">
        <el-input v-model="ruleForm.address" placeholder="请输入店铺地址"/>
    </el-form-item>

 <el-form-item label="营业执照" required v-if = "entity==1">
     <uploadComp @imgReady = "imgReady" :actionUrl = "actionUrl"/>
   </el-form-item>

    <el-form-item label = "联系地址" props = "address" required v-if = "entity==2">
        <el-input v-model="ruleForm.address" placeholder="请输入联系地址"/>
    </el-form-item>

    <el-row style = "margin-top:25px;text-align:center;">
             <el-button type ="danger" @click = "registration2Golast">
            上一步
        </el-button>
        <el-button type ="danger" @click = "registration2Click('ruleForm')">
            下一步
        </el-button>
   
        <el-col class = "inputTip" style = " margin-top:20px;text-align:center">
            * 注册店铺代表我已经同意<router-link to = "/xieyi" style = "color:blue">《拍乐网协议》</router-link>
        </el-col>
    </el-row>
 
</el-form>
</el-col>    
    </el-col>
  </el-row>
</template>

<script>
import uploadComp from "../viewcomp/upload";
import { ufload } from "../../../api/upyun";
import { promiseAjax } from "../../../api/ajax";
import { base_IP, base_port } from "../../../api/base";
export default {
  components: {
    uploadComp
  },
  data() {
    return {
      uploading: "",
      loadingText: "",
      color: "#f00",
      actionUrl: "http://v0.api.upyun.com/image-paile",
      actionData: {},
      //   提示
      tip: {
        businessDesc: true,
        name: true,
        password: true
      },
      active: 1,
      //表格里面的数据
      ruleForm: {
        // 主营描述
        businessDesc: "",
        //店铺名称
        name: "",
        city: "江苏省徐州市",
        //  password:"",
        //  checkpassword:"",
        //是否有店铺
        isreal: 0,
        //店铺地址/营业地址
        address: "",
        //营业执照url
        licenceUrl: "",
        shopperid: "",
        icon: "",
        latitude: "0",
        longitude: "0"
      },
      // 密码提示文字
      checkText: "",
      // 校验规则
      rules: {
        businessDesc: [
          { required: true, message: "请输入姓名", trigger: "blur" }
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
        checkpass: [
          { required: false, message: "请再次输入密码", trigger: "blur" }
        ],
        isreal: [
          { required: true, message: "请选择是否有店铺", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入店铺所在地", trigger: "blur" }
        ]
      },
      upfileName: "",
      imgicoAttr: ""
    };
  },
  mounted() {
    this.ruleForm.shopperid = JSON.parse(localStorage.getItem("datas")).id;
    console.log(this.ruleForm.shopperid);
  },
  computed: {
    entity() {
      return this.ruleForm.isreal;
    }
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
                      this.ruleForm.licenceUrl = JSON.parse(data).url;
                      ufload(this.imgicoAttr)
                        .then(data => {
                          if (JSON.parse(data).code == 200) {
                            this.ruleForm.icon = JSON.parse(data).url;
                            console.log(this.ruleForm);
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
                                  this.$router.push("/registration3");
                                } else {
                                  this.uploading.close();
                                  this.imgUpLoadErr();
                                }
                              })
                              .catch(err => {
                                console.log(err);
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
            } else if (this.ruleForm.isreal == "2") {
              //这里和上面重复  造成代码多余  将来优化的店
              if (typeof this.imgicoAttr == "object") {
                this.loadingText = "正在上传图片";
                this.loading();
                ufload(this.imgicoAttr)
                  .then(data => {
                    if (JSON.parse(data).code == 200) {
                      this.ruleForm.icon = JSON.parse(data).url;
                      console.log(this.ruleForm);
                      promiseAjax(
                        `http://${base_IP}:${base_port}/paile-service/api/shopsHandler/createShop`,
                        this.ruleForm
                      )
                        .then(data => {
                          if (data.code == "0") {
                            localStorage.setItem("token_three", data.code);
                            localStorage.setItem(
                              "datas2",
                              JSON.stringify(data.datas)
                            );
                            this.uploading.close();
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
                    } else {
                      this.uploading.close();
                      this.imgUpLoadErr();
                    }
                  })
                  .catch(err => {
                    this.uploading.close();
                    this.imgUpLoadErr();
                  });
              }
            }
          }
        } else {
          return false;
        }
      });
    },
    registration2Golast() {
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

.inputTip {
  color: $tipcolor;
  font-size: 12px;
  text-align: left;
  line-height: 15px;
}
</style>