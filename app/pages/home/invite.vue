<template>
	<view class="ly-invite-wrapper">
		<view class="ly-invite-container">
			<view class="ly-group-user" v-for="(item,index) of groupUser" :key="index" @click="deleteUser(item.userID)">
				<view class="ly-user-img">
					<image :src="item.avatar"></image>
				</view>
				<view class="ly-user-name">
					{{item.role}}
				</view>
			</view>
			<view class="ly-invite-icon" @click="goUrl('./inviteUser')">
				<u-icon name="plus" size="50" color="#eee"></u-icon>
			</view>
		</view>
	</view>
</template>
<script>
	import {mixins} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				show:true,
				groupUser:[],
				userID:[],
			};
		},
		mounted(){
			this.getUserCount();
		},
		methods:{
			deleteUser(userID){
				let promise = this.tim.deleteGroupMember({groupID: this.groupId, userIDList:[userID], reason: '你违规了，我要踢你！'});
				promise.then(imResponse=>{
				  console.log(imResponse.data.group); 
				  console.log(imResponse.data.userIDList); 
				  this.getUserCount();
				}).catch(function(imError) {
				  console.warn('deleteGroupMember error:', imError); 
				});
			}, 
			getUserCount(){
				let promise = this.tim.getGroupMemberList({ groupID: this.groupId, count: 30, offset:0 });
				promise.then(imResponse=> {
					this.groupUser=imResponse.data.memberList;
					console.log(this.groupUser);
					for(let i=0;i<this.groupUser.length;i++){
						this.userID.push(this.groupUser[i].userID)
					}
				}).catch(function(imError) {
				  console.warn('getGroupMemberList error:', imError);
				});
			},
		}
		
		
	}
</script>
<style lang="less">
	.content {
			padding: 24rpx;
			text-align: center;
		}
	.ly-invite-wrapper{
		padding: 0 40rpx;
		background-color: #fff;
	}
	.ly-invite-container{
		display: flex;
		padding: 20rpx 20rpx;
		margin-bottom: 20rpx;
	}
	.ly-group-user{
		margin-right: 40rpx;
	}
.ly-user-img{
	width: 100rpx;
	height: 100rpx;
}
.ly-user-img image{
	width: 100%;
	height: 100%;
}
.ly-user-name{
	text-align: center;
}
.ly-invite-icon{
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px dashed #ddd;
	width: 100rpx;
	height: 100rpx;
	
}
</style>
