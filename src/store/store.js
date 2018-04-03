import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
//s商品管理模块
const goodsMd = {
    state : {
        goodsList:[
            {
                goodId : '1000',
                goodName : "i7电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
                goodUrl:'/goods/goodsList/1000'
            },
            {
                goodId : '1001',
                goodName : "i7电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },
            {
                goodId : '1002',
                goodName : "i8电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 3,
            },
            {
                goodId : '1003',
                goodName : "i9电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 4,
            },
            {
                goodId : '1004',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },
            {
                goodId : '1005',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },
            {
                goodId : '1006',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },
            {
                goodId : '1007',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },{
                goodId : '1008',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },{
                goodId : '1009',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },{
                goodId : '1010',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },{
                goodId : '1011',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            },{
                goodId : '1012',
                goodName : "i10电脑",
                goodPrice : 12900,
                goodTeamPrice : 500,
                goodSurplus: 3000,
                goodSales : 6666,
                goodType : 2,
            }
        ],
        goodTypeList : [
            {
                name : '女装',
                children :[
                {
                    name:'女装1',
                    children : [{
                        name : "女装1-1"
                    },{
                        name : "女装1-2"
                    },{
                        name : "女装1-3"
                    }]
                },{
                    name:'女装2',
                    children : [{
                        name : "女装2-1"
                    },{
                        name : "女装2-2"
                    }]
                }
                ]
            },
            {
                name : '男装',
                children :[
                {
                    name:'男装1',
                    children : [{
                        name : "男装1-1"
                    },{
                        name : "男装1-2"
                    },{
                        name : "男装1-3"
                    }]
                },{
                    name:'男装2',
                    children : [{
                        name : "男装2-1"
                    },{
                        name : "男装2-2"
                    }]
                }
                ]
            }
        ]
    },
    mutations: {
        goodTypeChange(state,data){
            
           for(let i = 0 ; i<state.goodsList.length;i++){
               if(state.goodsList[i].goodId == data.index){
                    state.goodsList[i].goodType =data.goodTypeCode;
               }
              
           }
        }
    },
    actions:{
        goodTypeChangeAjax(state,data){
           
            return new Promise((resolve,reject)=>{
                store.commit('goodTypeChange',{
                    index:data.index,
                    goodTypeCode:data.goodTypeCode,
                })
                resolve();
            })

        }
    }
};


const publicFunc = {
    actions:{
        imgTypeTest(store,data){
           
            return new Promise((resolve,reject)=>{
             
                const isJPG = data.file.raw.type === 'image/jpg';
               
                const isJPEG = data.file.raw.type === 'image/jpeg';
                const isPNG = data.file.raw.type === 'image/png'; 
                const isLt1M = data.file.raw.size / 1024 / 1024 < 1;
           
                const imgType = isJPG || isJPEG || isPNG;
                
                if(isLt1M && imgType){
                    resolve();
                }else{
                    reject({isLt1M,imgType});
                }
            })
        }
    }
}

const login = {
    state :{
        isLogin:localStorage.getItem('pailewang_token')
    }
}

const store =  new vuex.Store({

    modules:{
        goodsMd,publicFunc,login
    }
})
export default store;
