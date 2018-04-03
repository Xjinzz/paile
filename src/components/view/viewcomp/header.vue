<template>
    <el-row>

 
        <el-dialog title = "温馨提示" :visible.sync="exitBoxShow" width = "30%">
            <span>
                确定退出拍乐网后台管理系统么？（我们将会清空您的登陆信息，保证您的安全）
            </span>
            <span slot = "footer" class = "dialog-footer">
                <el-button @click = "exitBoxShow=false;">
                    取消
                </el-button>
                <el-button @click = "exit" type = "danger">
                    退出
                </el-button>
            </span>
        </el-dialog>

        <el-row>
           
                <el-row style = "background:#fff;">
                    <div style = "width:1200px;background:#fff;color:#666;margin:0 auto;height:90px;">
                        <div style = "margin-top:10px;height:90px;width:432px;float:left;">
                            <img src="@/assets/logo.png" alt="" width = "432px">
                        </div>
                        <div style = "float:right;margin-right:30px;line-height:100px;" >
                            <img src="../../../assets/exit.png" width = "24px" height = "24px" @click.self = "showexitbox"  alt="退出商户平台" style = "cursor:pointer;">
                        </div>
                    </div>
                </el-row>
        </el-row>

    </el-row>
</template>

<script>
export default {
 data(){
        return {
            exitBoxShow:false,
        }
    },
    created(){
     
    },
    computed:{
  
    },
    methods:{
        showexitbox(){
            this.exitBoxShow = true;
        },
        exit(){
           this.exitBoxShow = false;
           localStorage.clear();
           this.isLogin = false;
           this.$router.push('/login');
        },
    },
}
</script>

<style>

</style>
