<template>
    <el-upload action="http://www.paile.com" ref = "uploadComp"
                :on-change = "changeImg"
                list-type="picture-card"
                :auto-upload = "false"
                :limit = "1"
                :multiple = "false" 
                >
                <i class="el-icon-plus" v-if = "uploaded"></i>
                <img :src="imgUrl" alt="" v-else width = "100%" height="100%"/>
    </el-upload>
</template>
<script>
export default {
    data(){
        return {
            imgUrl:"",
            uploaded:true,
            
        }
    },
    methods:{
      changeImg(file, fileList){
       //验证上传的格式以及文件大小

        this.$store.dispatch('imgTypeTest',{
            file
        }).then(()=>{
                this.$refs.uploadComp.clearFiles();
                    this.uploaded = false;
                    this.imgUrl = file.url;
                
                    this.$emit('imgReady',file.raw)
        }).catch((errMessage)=>{
           
            if (!errMessage.isJPG) {
              this.$message.error('上传头像图片只能是 JPG/JPEG 格式!');
            }
            if (!errMessage.isLt1M) {
              this.$message.error('上传头像图片大小不能超过 1MB!');
            }
             // 清空上传的列表,保证只有一
          this.$refs.uploadComp.clearFiles();

          
        })
    
      },

    }
}
</script>

<style>

</style>
