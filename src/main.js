// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import store from './store/store.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//axios注入vue原型中 因为已经引入jquery 故而直接使用jq的ajax，如果后期需要优化  可以改为axios 所以删除了 base文件已经修改
// Vue.prototype.$http = axios.create({
//                         baseURL: '/apitest',
//                         timeout: 30000
//                       });
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */



let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window.onbeforeunload = function(){
  if(event.clientX<=0 && event.clientY<=0) { 
    localStorage.removeItem('isRefer')
  } else  { 
      
  } 
};