<template>
        <el-select v-model="optionSelect">
             <el-option v-for="(item,index) in options" :key = "index" :label = "item.label" :value="item.value"></el-option>
        </el-select>
</template>

<script>
export default {
        props:['options','index'],
        data(){
            return {
                optionSelect:"",
            }
        },
        watch:{
            optionSelect(){
                this.$emit('changeSelect',{
                    optionSelect : this.optionSelect,
                    index:this.index,
                })
            }
        }
}
</script>

<style>

</style>
