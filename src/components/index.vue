<template>
    <el-row>
        <!-- exitbox -->
   <headers></headers>
        <el-row>
            <el-col :span = "24">
                <router-view ></router-view>
            </el-col>
        </el-row>
    </el-row>
</template>


<script>
// 还缺少一个新进入怎么判断 不可以通过history判断  因为这样用户如果先输入  一个网页  在打开我网站依旧会有问题  等想好在修改
import headers from './view/viewcomp/header'
// window.localStorage.setItem("isRefer",'true');
export default {
    data(){
        return {
        }
    },
    components:{
headers,
    },
    created(){
        
    },
    methods:{

        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
     beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    // 是刷新
        // if(window.localStorage.getItem('isRefer')=="true"){
        //     next();
        // }
        // else{
        // next(vm=>{
        //     // 回调拿到this
        //     vm.$router.push('/home')
        // })
        if(to.path == "/"){
            next(vm=>{
            // 回调拿到this
                vm.$router.push('/home')
            })
        }else{
            next();
        }
        // }

  },
}
</script>

<style>
html{
    background:#ebecef;
}
img{
    -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;
}
</style>
