<template>
    <el-row>
        <el-row>
            <el-col :span = "20" :offset = "2">
                
                <el-col :span = "18" :offset="2">
                    
                    <el-menu class="el-menu-demo" @select="handleSelect"
                            router
                            background-color="#fff"
                            mode="horizontal"
                            text-color="#808080"
                            active-text-color="#ffd04b">
                            <el-col :span = "2"><img src="xxxx" alt="logo"></el-col>
                            
                            <el-menu-item index="/home">首页</el-menu-item>
                            <el-menu-item index="/registration">商家注册</el-menu-item>
                            <el-menu-item index="/registlogin">商家登陆</el-menu-item>
                            <el-menu-item index="/registration1">代理商</el-menu-item></el-menu-item>
                            <el-menu-item index="/registration2">帮助中心</el-menu-item>
                            <el-menu-item index="/registration3">举报中心</el-menu-item>
              
                            </el-menu>
                </el-col>

            </el-col>
            
        </el-row>
        <el-row>
            <el-col :span = "24">
                <router-view></router-view>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
export default {
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>

</style>
