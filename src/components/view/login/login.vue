<template>
    <el-row class = "bgGray">
      <div class = "background">
        <div style = "width:1200px;margin:0 auto;height:600px;">
          <div style = "width:425px;margin-top:140px;float:left;">
              <img src="../../../assets/index.png" width = "425px" alt="test">
          </div>
       <div style= "width:520px;margin-right:50px;float:right">
         <div style = "height:100px;"></div>
              <el-row style = "border-radius:2%;background:#fff">
                  <el-col>
                    <div style = "height:20px;"></div>
                      <h3 class = "c" style = "font-size:25px;">账号登陆</h3>
                      <el-col :span = "14" :offset = "5">
                          <el-form 
                           style = "padding-top:10px;"
                      :model="infoFrom" 
                      status-icon 
                      label-position="left" 
                      label-width="80px" 
                      class="demo-ruleForm">
                     <el-row style = "margin-bottom:20px;">
                            <el-input type="text" v-model="infoFrom.phone" auto-complete="off" id = "phone" placeholder="请输入手机号"></el-input>
                    </el-row>
                        <el-row>
                            <el-col :span = "12">
                                <el-input v-model = "checkImgCode" id="code_input" placeholder="右侧验证码" @focus="Focuscode" type="text" auto-complete="off"></el-input>       
                            </el-col>
                            <el-col :span = "11" :offset = "1">
                                <div id="v_container" style="width: 100%;height: 40px;"></div>
                            </el-col>
                                     <el-col v-html="checkT" style = "margin-top:10px;" :class="ifcheck?'txt_success':'txt_err'" :span = "24"></el-col>
                       

                        </el-row>
                        <el-row style = "margin-top:10px;">
                          <el-col :span = "12"><el-input id = "MsgCode" v-model="infoFrom.code" placeholder="短信验证码"></el-input>
                            </el-col>
                            <el-col :span = "11" :offset="1">
                               
                                  <div class = "login-btn"  @click = "sengMsgCode" v-show="getMsgBtnShow">获取短信验证码</div> 
                                  <el-button type="info" :loading="true"  style = "width:100%" v-show="!getMsgBtnShow">({{getMsgSurplusSec}}) 秒后重新获取</el-button>
                            </el-col>
                            
                        </el-row>
                        <el-row style = "margin-top :20px;">
                          <div class = "login-btn" @click = "submit">登陆</div> 
                          <el-col style = "text-align:right;font-size:12px;">
                            还没有账号？
                            <el-button type = "text" @click = "goRegistration" style  = "color:#9a0000 ;font-size:12px;text-decoration:underline">点击注册</el-button>
                          </el-col>
                        </el-row>
                        <el-row style = "margin-top:20px;"></el-row>
                      </el-form>
                      </el-col>
                  </el-col>
              </el-row>  
          </div>
          </div>
                  <div style ="margin-top : 40px;">
            <ul class = "footerMenu" style = "background:#fff;">
              <li>联系我们</li>
              <li>关于我们</li>
              <li>人才招聘</li>
              <li>商家入驻 </li>
              <li>广告服务</li>
              <li>代理加盟</li>
              <li>举报中心</li>
            </ul>


        </div>
        <div style = "background:#fff;height:50px;clear:both;"></div>

        </div>
        <div style = "font-size:16px;line-height:40px;background:#fff;text-align:center;clear:both;">
           <div style = "background:#fff;height:50px;clear:both;"></div>
客服电话：400-826-1533
        </div>

 <div style = "font-size:14px;line-height:40px;background:#fff;text-align:center;clear:both;">
© CopyRight 2017 拍乐网 浙ICP备17033779号
        </div>

  <div style = "background:#fff;height:80px;clear:both;"></div>

        </div>










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
    goRegistration(){
      this.$router.push('/registration');
    },
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
.background{
width:100%; 
height:600px; 

    background: -moz-linear-gradient(top, #bb0707 0%, #620202 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bb0707), color-stop(100%,#620202));
    background: -webkit-linear-gradient(top,  #bb0707 0%,#620202 100%);
    background: -o-linear-gradient(top,  #bb0707 0%,#620202 100%);
    background: -ms-linear-gradient(top,  #bb0707 0%,#620202 100%);
    background: linear-gradient(to bottom,  #bb0707 0%,#620202 100%);
}
.bgGray {
  background: #fff;
  
  
}
.txt_success {
  color: #2fd508;
}
.txt_err {
  color: #f00;
}
.login-btn{
  width:100%;
      display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    // color: #606266;
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
.login-btn:hover{
  background:#f78989
}
.footerMenu{
  width:722px;
  margin:0 auto;
}
.footerMenu li {
   width:100px;
   text-align:center;
   font-size:16px;
   border-right: 1px solid #333;
   float: left;;
   line-height: 10px;
   list-style : none;

}
</style>
