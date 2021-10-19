import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import Http from "./request/request.js"
// import payTips from "./components/components.vue"
// Vue.component('payTips', payTips);
import store from './store/modules/index.js'
import TIM from 'tim-wx-sdk'
import {mapActions} from 'vuex'
import TIMUploadPlugin from 'tim-upload-plugin'


let options = {
	SDKAppID: 1400528704
};
let tim = TIM.create(options);
tim.setLogLevel(0);
tim.registerPlugin({
	'tim-upload-plugin': TIMUploadPlugin
});
Vue.use(uView);
Vue.prototype.tim = tim;
Vue.prototype.Http = Http;
Vue.config.productionTip = false;

App.mpType = 'app'
//会话列表
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
   store.dispatch('getTalking', event.data);
});
// 群列表
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, event=> {
store.dispatch('getGroup', event.data);
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED,groupList,this)

const app = new Vue({
	store,
	...App
})
app.$mount()
function groupList(event){
	store.commit('modifyGroup',event.data);
};