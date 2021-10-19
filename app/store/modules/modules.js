
export default {
    namespaced: true,
    state: {
        groupList:[],
        messageList:[],
    },
    getters: {
       getGroupList(state){
		   return state.groupList;
	   },
	   getChatInfo(state){
		   return state.getmessageList;
	   }
    },
    mutations: {
		modifyGroup(state,data){
			return state.groupList=data;
		},
		modifyMessage(state,data){
			return state.messageList=data;
		} 
    },
    actions: {
       getGroup(context,data){
		   context.commit('modifyGroup',data);
	   },
	   getMessage(context,data){
		   context.commit('modifyMessage',data);
	   },
    }
}

