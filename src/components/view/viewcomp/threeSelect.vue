
<template>

    <el-row style = "clear:both">
         
            <el-col :span = "7" :offset = "0" :style = "selectStyle">
                <ul style = "list-style : none;padding:0;text-align:center;" id = "type1">
                    <li v-for = "(goodType,index) in listData" @click = "change1Tag(index)" :key = "goodType.name" v-text = "goodType.name">

                    </li>
                </ul>
            </el-col>
            <el-col v-if = "type1Change" :span = "7" :offset = "1" :style = "selectStyle">
                <ul style = "list-style : none;padding:0;text-align:center;" id = "type2">
                    <li v-for = "(goodType,index) in data2Show" @click = "change2Tag(index)" :key = "goodType.name" v-text = "goodType.name">

                    </li>
                </ul>
            </el-col>
            <el-col v-if = "type2Change" :span = "7" :offset = "1" :style = "selectStyle">
                <ul style = "list-style : none;padding:0;text-align:center;" id = "type3">
                    <li v-for = "(goodType,index) in data3Show" @click = "change3Tag(index)" :key = "goodType.name" v-text = "goodType.name">

                    </li>
                </ul>
            </el-col>
            <el-col :span = "24" style = "text-align:center;">
                <slot name = "selectFooter"></slot>
            </el-col>


    </el-row>
</template>

<script>
/**
 * v1.0.0
 * 三级联动搜索
 * 需要传入一个listData的props 作为级联数组，格式为
 * listData:[{
 *      name:'xx',
 *      children:[{
 *          name:"",
 *          children:[
 *              {
 *                  name:'',
 *               }  
 *           ]
 *      }]
 *    },{
 *      name:'xx',
 *      children:[{
 *          name:"",
 *          children:[
 *              {
 *                  name:'',
 *               }  
 *           ]
 *      }]
 *    }
 * 
 * ]
 * 
 * 
 * 可选参数:
 * normalTextColor(arr/string) 列表默认的文字颜色
 * normalbgColor(arr/string) 列表默认的选择条的背景颜色
 * selectTextColor(arr/string) 列表选择的文字颜色
 * selectbgColor(arr/string) 列表选择的选择条的背景颜色
 * selectStyle （string） 联动表的样式
 * 可获取到的信息有：
 * 可以使用:v-on:gettypeChange可以获得一个数组 数组length为三，分别代表了三级联动是否选择，例如[true,false,false]表示选择了第一级联动，第二三级没有选中
 * 可以使用:v-on:getTypePosition 可以获得一个数组 数组length为三，分别代表了三级联动选择的内容
 */


import $ from 'jquery'
export default {
    props:[
        'selectStyle','listData','selectbgColor','selectTextColor','normalbgColor','normalTextColor'
    ],
    data(){
        return {
            type1Change : false,
            type2Change : false,
            type3Change : false,
            
            data2Show : [],
            data3Show : [],            
            Mark : 0,
            Mark2 : 0,
            typePosition1 : "",
            typePosition2 : "",
            typePosition3 : "",
        }
    },
    computed:{
        typePosition(){
            return [
                this.typePosition1,this.typePosition2,this.typePosition3
            ]
        },
        typeChange(){
            return [
                this.type1Change,this.type2Change,this.type3Change
            ]
        }

    },
     methods:{
         isArray(x){
            return Object.prototype.toString.call(x)=='[object Array]'
         },
         isString(x){
             return Object.prototype.toString.call(x)=='[object String]'
         },
        change1Tag(i){
            this.type1Change = true;
            this.type2Change = false;
             this.type3Change = false;
                        
            this.data2Show = this.listData[i].children;
            this.Mark = i;
            $('#type1 li').css({
                backgroundColor:this.isArray(this.normalbgColor)?this.normalbgColor[0]:this.isString(this.normalbgColor)?this.normalbgColor:"#fff",
                color:this.isArray(this.normalTextColor)?this.normalTextColor[0]:this.isString(this.normalTextColor)?this.normalTextColor:"#333"
                
            }).eq(i).css({
                backgroundColor:this.isArray(this.selectbgColor)?this.selectbgColor[0]:this.isString(this.selectbgColor)?this.selectbgColor:"#4d7df8",
                color:this.isArray(this.selectTextColor)?this.selectTextColor[0]:this.isString(this.selectTextColor)?this.selectTextColor:"#fff"
               
            })
            this.typePosition1 = this.listData[i].name;
            this.typePosition2 = '';
            this.typePosition3 = '';
            this.$emit('getTypePosition',this.typePosition)
             this.$emit('gettypeChange',this.typeChange)
        },
        change2Tag(i){
            this.type1Change = true;
            this.type2Change = true;
             this.type3Change = false; 
            this.data3Show = this.listData[this.Mark].children[i].children;
            this.typePosition2 = this.listData[this.Mark].children[i].name;
             this.typePosition3 = '';
            this.Mark2 = i;     
            $('#type2 li').css({
                  backgroundColor:this.isArray(this.normalbgColor)?this.normalbgColor[1]:this.isString(this.normalbgColor)?this.normalbgColor:"#fff",
                color:this.isArray(this.normalTextColor)?this.normalTextColor[1]:this.isString(this.normalTextColor)?this.normalTextColor:"#333"
                
            }).eq(i).css({
                backgroundColor:this.isArray(this.selectbgColor)?this.selectbgColor[1]:this.isString(this.selectbgColor)?this.selectbgColor:"#4d7df8",
                color:this.isArray(this.selectTextColor)?this.selectTextColor[1]:this.isString(this.selectTextColor)?this.selectTextColor:"#fff"
            })
             this.$emit('getTypePosition',this.typePosition)
             this.$emit('gettypeChange',this.typeChange)
             
        },
         change3Tag(i){
            this.type1Change = true;
            this.type2Change = true;    
            this.type3Change = true;        
            this.typePosition3 = this.listData[this.Mark].children[this.Mark2].children[i].name;
              this.$emit('getTypePosition',this.typePosition)
             this.$emit('gettypeChange',this.typeChange)
            $('#type3 li').css({
                 backgroundColor:this.isArray(this.normalbgColor)?this.normalbgColor[2]:this.isString(this.normalbgColor)?this.normalbgColor:"#fff",
                color:this.isArray(this.normalTextColor)?this.normalTextColor[2]:this.isString(this.normalTextColor)?this.normalTextColor:"#333"
                
            }).eq(i).css({
                backgroundColor:this.isArray(this.selectbgColor)?this.selectbgColor[2]:this.isString(this.selectbgColor)?this.selectbgColor:"#4d7df8",
                color:this.isArray(this.selectTextColor)?this.selectTextColor[2]:this.isString(this.selectTextColor)?this.selectTextColor:"#fff"    
            })
        }
     }
}
</script>

<style>

</style>
