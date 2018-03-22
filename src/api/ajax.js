import $ from 'jquery'
// 封装版
export let promiseAjax = (url, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url,
      data,
      success: (res) => {
        resolve(res)
      },
      error: (err) => {
        reject(err);
      },
      dataType: 'json'
    });
  })
}



//老版本，觉得还是封装起来好
// //登陆接口
// export let login = (url,data)=>{

//     return new Promise((resolve, reject)=>{ 
//                 $.ajax({
//                   type:'POST',
//                   url,
//                   data,
//                   success: (res)=>{
//                     resolve(res)
//                   },
//                   error:(err)=>{
//                     reject(err);
//                   },
//                   dataType: 'json'
//                 });
//     })
// };
// //用户信息更新
// export let user_updata = (url,data)=>{
//   return new Promise((resolve,reject)=>{
//     $.ajax({
//       type : "post",
//       url,data,
//       success:(res)=>{
//         resolve(res);
//       },
//       error : (err)=>{
//         reject(err);
//       },
//       dataType:'json'
//     })
//   })
// }
// //获取收货列表
// export let getAllDeliverAddress = (url,data)=>{
//   return new Promise((resolve,reject)=>{
//     $.ajax({
//       type : "post",
//       url,data,
//       success:(res)=>{
//         resolve(res);
//       },
//       error : (err)=>{
//         reject(err);
//       },
//       dataType:'json'
//     })
//   })
// }
// //新增收货列表
// export let addDeliverAddress = (url,data)=>{

//   return new Promise((resolve,reject)=>{
//     $.ajax({
//       type : "post",
//       url,data,
//       success:(res)=>{
//         resolve(res);
//       },
//       error : (err)=>{
//         reject(err);
//       },
//       dataType:'json'
//     })
//   })
// }
