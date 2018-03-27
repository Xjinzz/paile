<template>
    <el-col >
       <el-col class = "paper" >
            <el-col :span = "22" :offset = "1" style = "margin-top:20px;">
           <el-row class = "lineH ">
                <el-col :span = "4" style = "text-align:right" class = "Text_title">法人 : </el-col>
                <el-col :span = "16" :offset = "1">{{legalRep}}</el-col>
            </el-row>
             <el-row class = "lineH">
                <el-col :span = "4" style = "text-align:right" class = "Text_title">法人邮箱 : </el-col>
                <el-col :span = "16" :offset = "1">{{email}}</el-col>
            </el-row>
              <el-row class = "lineH">
                <el-col :span = "4" style = "text-align:right" class = "Text_title">法人手机号 : </el-col>
                <el-col :span = "16" :offset = "1">{{phone}}</el-col>
            </el-row>
               <el-row class = "lineH">
                <el-col :span = "4" style = "text-align:right" class = "Text_title">法人身份证 : </el-col>
                <el-col :span = "16" :offset = "1">{{cardId}}</el-col>
            </el-row>
               <el-row class = "lineH">
                <el-col :span = "4" style = "text-align:right" class = "Text_title">证件有效期 : </el-col>
                <el-col :span = "16" :offset = "1">{{cardNumber}}</el-col>
            </el-row>
            <el-col :span = "23" :offset = "1">
                <el-col :span = "8">
                    <el-form>
                        <el-form-item label="法人身份证正面 : " required>
                             <el-col :span = "24"><uploadComp @imgReady = "cardPositiveReady" :actionUrl = "actionUrl"/>
                             </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span = "8"  :offset = "1">
                    <el-form>
                        <el-form-item label="法人身份证背面 : " required>
                             <el-col :span = "24"><uploadComp @imgReady = "cardBackReady" :actionUrl = "actionUrl"/>
                             </el-col>
                        </el-form-item>
                    </el-form>
                 </el-col>
                 <el-col :span = "8">
                <el-form>
                     <el-form-item label="法人身份证半身照 : " required>
                        <el-col :span = "24"><uploadComp @imgReady = "cardBodyReady" :actionUrl = "actionUrl"/></el-col>
                     </el-form-item>
                </el-form>
                </el-col>
                <el-col :span = "8" :offset="1">
                <el-form>
                     <el-form-item label="营业执照 : " required>
                         <el-col :span = "24"><uploadComp @imgReady = "imgReady" :actionUrl = "actionUrl"/></el-col>
                     </el-form-item>
                </el-form>
                 </el-col>
                 <el-col :span = "24" style = "text-align:center;">
                     <el-button type="danger" @click = "save">保存</el-button>
                 </el-col>
            </el-col>
            </el-col>
       </el-col>

    </el-col>
</template>

<script>
import uploadComp from '@/components/view/viewcomp/upload'
import { ufload } from "@/api/upyun";
import { base_IP, base_port, base_uploadUrl } from "@/api/base";

export default {
    data(){
        return {
            legalRep:'阿什顿',
            email:'123@123.com',    
            phone:'15127633458',  
            cardId:"131028199505102019"  ,
            cardNumber:"2088-03-30",
            actionUrl:"http://www.paile8.com",
            //营业执照图片的节点
            chartered:"",
            cardPositive:"",
            cardBack:"",
            cardBody:"",
            uploading:"",
            loadingText:"",
            formData:{
                cardBack:"",
                cardBody:"",
                chartered:"",
                cardPositive:"",
            }
        }
    },
    methods:{
           loading() {
                this.uploading = this.$loading({
                    lock: true,
                    text: this.loadingText,
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
            },
        cardPositiveReady(attr){
            this.cardPositive = attr;
        },
        cardBodyReady(attr){
            this.cardBody = attr;
        },
        cardBackReady(attr){
            this.cardBack = attr;
        },
        imgReady(attr){
            this.chartered = attr;
        },
          imgUpLoadErr() {
      this.$message({
        type: "error",
        message: "上传图片失败",
        showClose: true,
        center: true
      });
    },
        save(){

            if(typeof (this.chartered) =="object" && typeof (this.cardPositive) == "object" &&
            typeof this.cardBack == "object" &&typeof this.cardBody == "object"){
               
                this.loadingText = "正在上传图片"; 
                this.loading();
                ufload(this.chartered).then((data)=>{
                   
                    if(JSON.parse(data).code == "200"){
                        this.formData.chartered = `${base_uploadUrl}${JSON.parse(data).url}`;
                        
                        ufload(this.cardPositive).then((data)=>{
                            if(JSON.parse(data).code == "200"){
                                this.formData.cardPositive = `${base_uploadUrl}${JSON.parse(data).url}`;
                                ufload(this.cardBack).then((data)=>{
                                    if(JSON.parse(data).code == "200"){
                                            this.formData.cardBack = `${base_uploadUrl}${JSON.parse(data).url}`;
                                            ufload(this.cardBody).then((data)=>{
                                                 if(JSON.parse(data).code == "200"){
                                                   
                                                    this.formData.cardBody = `${base_uploadUrl}${JSON.parse(data).url}`;
                                                   
                                                     this.uploading.close();
                                                     this.loadingText = "上传成功,整理中...";
                                                       this.loading();
                                                     setTimeout(()=>{
                                                        this.uploading.close();     
                                                        //在这里请求接口
                                                     },1000)
                                                 }else{
                                                    this.uploading.close();
                                                    this.imgUpLoadErr();
                                                 }
                                            }).catch((err)=>{
                                                this.uploading.close();
                                                 this.imgUpLoadErr();
                                            })
                                    }else{
                                         this.uploading.close();
                                    this.imgUpLoadErr();
                                    }
                                }).catch((err)=>{
                                    this.uploading.close();
                                    this.imgUpLoadErr();
                                })
                            }else{
                            this.uploading.close();
                             this.imgUpLoadErr();
                            }

                        }).catch((err)=>{
                             this.uploading.close();
                             this.imgUpLoadErr();
                        })

                    }else{
                         console.log(3);
                         this.uploading.close();
                             this.imgUpLoadErr();
                    }
                }).catch((err)=>{
                    this.uploading.close();
                    this.imgUpLoadErr();
                })

            } else {
                return false;
            }
        }
    },
    components:{
        uploadComp
    }
}
</script>

<style lang = "scss" scoped>
    $lineH:30px;
    .paper{
        height: 680px;
        background:#ecf1f5;
    }
    .lineH{
        line-height: $lineH;
    }
    .el-upload--picture-card{
        width:120px;
        height:120px;
        background-color: #ecf1f5;
    }
    .Text_title{
        font-weight: 800;
        font-size:16px;
        
    }
</style>
