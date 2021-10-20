export const mixins = {
	data(){
		return{
			token:'',
			courseId:'',
			personInfo:'',
			personId:'',
			groupId:'',
		}
	},
	created(){
		uni.getStorage({
			key: 'token',
			success: res => {
				this.token = res.data;
			}
		});
		
		uni.getStorage({
			key: 'courseId',
			success: res => {
				this.courseId = res.data;
			}
		});uni.getStorage({
			key: 'personInfo',
			success: res => {
				this.personInfo = res.data;
			}
		});
		this.getStoreData({name:'personId',success:e=>{this.personId=e}});
		this.getStoreData({name:'groupId',success:e=>{this.groupId=e}});
		// uni.getStorage({
		// 	key: 'personId',
		// 	success: res => {
		// 		this.personId = res.data;
		// 	}
		// });
	},
      methods:{ 
		  // 跳转
			 goUrl(url){
				 uni.navigateTo({
				 	url: url
				 });
			 },
			 goTabBar(url){
				 uni.switchTab({
					 url:url,
				 });
			 },
			 // 关闭当前页面
			 setUrl(url){
			 	uni.redirectTo({
			 	    url: url
			 	});
			 },
			 // 存储缓存
			 storeData(name,data){
				 uni.setStorage({
				     key:name,
				     data: data,
				 });
			 },
			 // 获取缓存
			 getStoreData({name,success}){
				 uni.getStorage({
				 	key: name,
				 	success: res => {
				 		success(res.data);
				 	}
				 });
			 }
			
      },
}