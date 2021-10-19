import {mapState} from 'vuex';
export default{
	created(){
		this.modifyGroupList();
	},
	methods:{
		// 获取modules定义的值
		groupList(){
			console.log(this.$store.state.groupList);
		},
		chatInfo(){
			console.log(this.$store.state.messageList);
		},
		// 修改modules定义的值
		modifyGroupList(){
			this.$store.dispatch('getGroup',imResponse.data.groupList);
		},
		modifyMessageList(){
		},
	},
	computed:{
		// 监听modules改变的值 
		 getGroupList(){
		        console.log(this.$store.getters.getGroupList) ;
		      }, 
		getMessageList(){
		        console.log(this.$store.getters.getMessageList) ;
		      },
	}
}