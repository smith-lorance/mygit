import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		groupList: [],
		messageList: [],
		talkingList:[],
	},
	getters: {
		getGroupList(state) {
			return state.groupList;
		},
		getChatInfo(state) {
			return state.getmessageList;
		},
		getTalking(state) {
			return state.talkingList;
		}
	},
	mutations: {
		modifyGroup(state, data) {
			 state.groupList = data;
		},
		modifyMessage(state, data) {
			 state.messageList = data;
		},
		modifyTalking(state, data) {
			 state.talkingList = data;
		}
	},
	actions: {
		getGroup(context, data) {
			context.commit('modifyGroup', data);
		},
		getMessage(context, data) {
			context.commit('modifyMessage', data);
		},
		getTalking(context, data) {
			context.commit('modifyTalking', data);
		},
	}
})
