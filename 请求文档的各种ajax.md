# 请求的各种ajax
 ## 验证码
    // sendMsg(`http://${base_IP}:${base_port}/paile-service/api/smsManage/sendMsg`,{
    //    'phone':'17695518131',
    // }).then((res)=>{
    //   if(res.code == "0"){
    //       console.log('已经发送验证码');
    //   }
    //   else{
    //       console.log('错误代码:',res.code);
    //   } 
    // })

## 登陆接口
    // login(`http://${base_IP}:${base_port}/paile-service/api/userHandler/login`,{
    //   'phone':'17695518131',
    //   'code':'9756',
    // }).then((res)=>{
    //   if(res.code == '0'){
    //     let token = {
    //       'nickName':res.datas.nickname,
    //       'head_icon':res.datas.head_icon,
    //       'phone':res.datas.phone,
    //       'sex':res.datas.sex
    //     }
    //     window.localStorage.setItem('token',JSON.stringify(token));
    //   }
    // })
##更新信息
// user_updata(`http://${base_IP}:${base_port}/paile-service/api/userHandler/update
//  `,{
//       'phone':'17695518131',
//       'nickName':'金振宗',
//       'headIcon':'',
//       'sex':'男'
//     }).then((res)=>{
//       console.log(res);
//       if(res.code == '0'){
//           console.log('更新成功');
//       }
//     })
## 获取收货列表

   getAllDeliverAddress(`http://${base_IP}:${base_port}/paile-service/api/userHandler/getAllDeliverAddress
 `,{
      'phone':JSON.parse(window.localStorage.token).phone,
    }).then((res)=>{
      console.log(res);
      if(res.code == '0'){
          console.log('获取收货列表');
      }
    })

