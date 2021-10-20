import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import store from './store/modules/module.js'
import App from './App'
import uView from "uview-ui";
import Http from "./request/request.js"
Vue.prototype.Http = Http;
Vue.use(uView);
import buybox from "./components/buybox.vue"
Vue.component('buybox', buybox);
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';





let options = {
	SDKAppID: 1400528704 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
Vue.prototype.tim = tim;
// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// 注册腾讯云即时通信 IM 上传插件，即时通信 IM SDK 发送图片、语音、视频、文件等消息需要使用上传插件，将文件上传到腾讯云对象存储
tim.registerPlugin({
	'tim-upload-plugin': TIMUploadPlugin
});
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event=> {
	console.log(event.data);
	store.dispatch('getTalking', event.data);
  // store.dispatch('getMessage', event.data)
});
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, event => {
	console.log(event.data);
	store.dispatch('getGroup', event.data)
})
tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
});
tim.on(TIM.EVENT.MESSAGE_RECEIVED, event=> {
  store.dispatch('getMessage', event.data);
  console.log(event);
});





Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
