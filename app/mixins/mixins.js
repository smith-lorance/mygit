export const mixins = {
	data() {
		return {
			token: '',
			courseId: '',
			personInfo: '',
			personId:'',
			videoIndex:null,
			gruopId:'',
			userId:'',
		}
	},
	created() {
		this.getStore({name:'token',success:e=>{this.token=e}});
		this.getStore({name:'videoIndex',success:e=>{this.videoIndex=e}});
		this.getStore({name:'courseId',success:e=>{this.courseId=e}});
		this.getStore({name:'personInfo',success:e=>{this.personInfo=e}});
		this.getStore({name:'personId',success:e=>{this.personId=e}});
		this.getStore({name:'groupId',success:e=>{this.groupId=e}});
		this.getStore({name:'userId',success:e=>{this.userId=e}});
	},
	methods: {
		// 跳转保留页面
		goUrl(url) {
			uni.navigateTo({
				url: url
			});
		},
		// 跳转bar
		goTabBar(url) {
			uni.switchTab({
				url: url,
			});
		},
		// 关闭当前页面
		setUrl(url){
			uni.redirectTo({
			    url: url
			});
		},
		
		// 存储缓存
		storeData(name, data) {
			uni.setStorage({
				key: name,
				data: data,
			});
		},
		// 获取缓存
         getStore({name,success}){
			 uni.getStorage({
			 	key: name,
			 	success: res => {
					success(res.data);
			 	}
			 });
			 
		 }
	},
}
