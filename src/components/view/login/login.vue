<template>
    <el-row class = "bgGray">
        <el-col :span = "12" :offset = "6"  style = "margin-top:10px">
              <el-row style = "margin-top:30px;padding-top:30px;background:#fff">
                  <el-col>
                      <h3 class = "c">商家登陆</h3>
                      <el-col :span = "14" :offset = "5">
                          <el-form 
                           style = "padding-top:10px;"
                      :model="infoFrom" 
                      status-icon 
                      label-position="left" 
                      label-width="80px" 
                      class="demo-ruleForm">
                        <el-form-item label="手机号">
                            <el-input type="text" v-model="infoFrom.phone" auto-complete="off" id = "phone"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span = "12">
                                <el-input v-model = "checkImgCode" id="code_input" placeholder="右侧验证码" @focus="Focuscode" type="text" auto-complete="off"></el-input>       
                            </el-col>
                            <el-col :span = "11" :offset = "1">
                                <div id="v_container" style="width: 100%;height: 50px;"></div>
                            </el-col>
                            <el-col v-html="checkT" :class="ifcheck?'txt_success':'txt_err'" :span = "24"></el-col>

                        </el-row>
                        <el-row>
                          <el-col :span = "12"><el-input id = "MsgCode" v-model="infoFrom.code" placeholder="短信验证码"></el-input>
                            </el-col>
                            <el-col :span = "11" :offset="1">
                                 <el-button type="danger" style = "width:100%" @click = "sengMsgCode" v-show="getMsgBtnShow">获取短信验证码</el-button>
                                  <el-button type="info" :loading="true"  style = "width:100%" v-show="!getMsgBtnShow">({{getMsgSurplusSec}}) 秒后重新获取</el-button>
                            </el-col>
                            
                        </el-row>
                        <el-row style = "margin-top :10px;">
                          <el-button type="danger" @click = "submit">登陆</el-button>
                        </el-row>
                        <el-row style = "margin-top:20px;"></el-row>
                      </el-form>
                      </el-col>
                  </el-col>
              </el-row>  
        </el-col>
    </el-row>
</template>
<script>
import checkCode from "../../../checkCode";
import { promiseAjax } from "../../../api/ajax";
import { base_IP, base_port } from "../../../api/base";

export default {
  data() {
    return {
      infoFrom: {
        phone: "",
        code: ""
      },
      checkCode: "",
      verifyCode: "",
      ifcheck: false,
      checkT:
        '<i class="el-icon-warning" style = "color:red;"></i>请输入验证码',
      checkImgCode: "",
      getMsgSurplusSec:60,
      getMsgBtnShow:true,
    };
  },
  watch: {
    checkImgCode() {
      this.checkCodefunc();
    }
  },
  methods: {
    Focuscode() {
      this.checkImgCode = document.getElementById("code_input").value;
    },
    // 验证码检测
    checkCodefunc() {
      if (this.checkImgCode.length == 0) {
        this.checkT =
          '<i class="el-icon-warning" style = "color:red;"></i>请输入验证码';
        this.ifcheck = false;

        return false;
      } else {
        var res = this.verifyCode.validate(this.checkImgCode);
        if (res) {
          this.checkT =
            '<i class="el-icon-circle-check" style = "color:#2fd508;"></i>验证码正确';
          this.ifcheck = true;
          return false;
        } else {
          this.checkT =
            '<i class="el-icon-circle-close" style = "color:red;"></i>验证码错误';
          this.ifcheck = false;
          return false;
        }
      }
    },
    initCheck() {
      //    生成验证码并且绑定到vue
      var verifyCode = new GVerify({
        id: "v_container",
        input: document.getElementById("code_input"),
        type: "number"
      });
      this.verifyCode = verifyCode;
    },
    checkPhone() {},
    alert(data,config){
      console.log(config)
      this.$alert(data,'拍乐网提示您',config);
    },
    sengMsgCode() {
      // 手机号正则 1开头   345789第二位 0-9 8位
      if (!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.infoFrom.phone)) {
        this.alert('请输入正确的手机号',{
           confirmButtonText: '知道了',
           callback:action=>{},
        })
        document.getElementById("phone").focus();
        return false;
      }
      if (!this.ifcheck) {
        this.alert("请输入正确的验证码后继续",{
           confirmButtonText: '知道了',
           callback:action=>{},
        });
        this.checkCode = "";
        document.getElementById("code_input").value = "";
        document.getElementById("code_input").focus();
        return false;
      }
      promiseAjax(
        `http://${base_IP}:${base_port}/paile-service/api/smsManage/sendMsg`,
        {
          phone: this.infoFrom.phone
        }
      ).then(res => {
        if (res.code == "0") {
          //更换新的验证码
           this.initCheck();
          this.getMsgBtnShow = !this.getMsgBtnShow;
          let time = setInterval(()=>{
              if(this.getMsgSurplusSec>0){
                this.getMsgSurplusSec = this.getMsgSurplusSec-1;
              }else{
                this.getMsgSurplusSec = 60;
                clearInterval(time);
                this.getMsgBtnShow = !this.getMsgBtnShow;
              }
          },1000)

          this.alert("已经发送验证码,请查看手机",{
           confirmButtonText: '知道了',
           callback:action=>{},
        });
        } else {
          this.alert("错误", {
           confirmButtonText: '知道了',
           callback:action=>{},
        });
        }
      });
    },
    submit() {
      if (!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.infoFrom.phone)) {
        this.alert("请输入正确的手机号",{
           confirmButtonText: '知道了',
           callback:action=>{},
        });
        document.getElementById("phone").focus();
        return false;
      }
      if (!this.ifcheck) {
        this.alert("请输入正确的图片验证码后继续",{
           confirmButtonText: '知道了',
           callback:action=>{},
        });
        this.checkCode = "";
        document.getElementById("code_input").value = "";
        document.getElementById("code_input").focus();
        return false;
      }
      if (this.infoFrom.code.length != 4) {
        this.alert("请输入正确的短信验证码后继续",{
           confirmButtonText: '知道了',
           callback:action=>{},
        });
        this.infoFrom.code = "";
        document.getElementById("MsgCode").value = "";
        document.getElementById("MsgCode").focus();
      }
      promiseAjax(
        `http://${base_IP}:${base_port}/paile-service/api/userHandler/salerLogin`,
        {
          phone: this.infoFrom.phone,
          code: this.infoFrom.code
        }
      )
        .then(res => {
          if (res.code == "0") {
            
            var token = {
              phone: res.datas.phone,
              code: res.code,
              isLogin:true,
            }
    
       
            window.localStorage.setItem("pailewang_token", JSON.stringify(token));
        

            this.$router.push("/home");
          } else {
            console.log("失败代码：" + res.code);
          }
        })
        .catch(err => {
          
        });
    }
  },
  mounted() {
    // 执行验证码的生成
    this.initCheck();
  }
};
</script>

<style lang="scss" scoped>
@import url("../../publicStyle/public.scss");
.bgGray {
  background: #ebecef;
  height: 700px;
}
.txt_success {
  color: #2fd508;
}
.txt_err {
  color: #f00;
}
</style>
