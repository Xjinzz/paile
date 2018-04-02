<template>
    <el-row>
        <el-row>
            <el-col :span = "22" :offset = "1">
                
                <el-col :span = "18" :offset="2">
                    
                   
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
