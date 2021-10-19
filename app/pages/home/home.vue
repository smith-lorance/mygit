<template>
	<view>
		<view class="ly-home-group" @click="goUrl('./list')">
			<view class="ly-group-img">
				<u-avatar src="../../static/group.png" size="50"></u-avatar>
			</view>
			<view>我的群聊</view>
		</view>
		<view class="ly-home-talking">
			<view class="ly-talking-wrapper" v-for="(item,index) of getTalkingList" :key="index" 
			@click="gotoGroup(item.toAccount,item.conversationID)" >
				<view class="ly-talking-img">
					<u-avatar :src="item.type!='@TIM#SYSTEM'?item.groupProfile.avatar:''" size="50"></u-avatar>
				</view>
				<view>
					<view>
						{{item.conversationID!="@TIM#SYSTEM"? item.groupProfile.name : '系统消息'}}
					</view>
					<view class="ly-last-message">
						{{item.lastMessage.type==="TIMTextElem" ? item.lastMessage.payload.text : item.lastMessage.messageForShow}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TIM from 'tim-wx-sdk'
	import {
		mixins
	} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {}
		},
		mounted() {
			this.getIm()
		},
		computed: {
			getTalkingList() {
				return this.$store.getters.getTalking;
			}
		},
		methods: {
			gotoGroup(id,system) {
				if(system!='@TIM#SYSTEM'){
					this.goUrl('./chat');
					this.storeData('groupId', id)
				}
			},
			// 删除回话列表
			deleteTalking(id){
				let promise = this.tim.deleteConversation(`GROUP${id}`);
				promise.then(imResponse=> {
				  //删除成功。
				  const { conversationID } = imResponse.data;// 被删除的会话 ID
				}).catch(function(imError) {
				  console.warn('deleteConversation error:', imError); // 删除会话失败的相关信息
				});
			},
			getIm() {
				this.Http({
					method: 'get',
					aip: `sys/tencentIM/genUserSig?userId=${this.personId}`,
				}).then(e => {
					let onMessageReceived = function(event) {
						store.dispatch('getGroup', event.data);
					};
					this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
					let promise = this.tim.login({
						userID: this.personId,
						userSig: e.result
					});
					promise.then(imResponse => {
						if (imResponse.data.repeatLogin === true) {
							console.log(imResponse.data);
						}
					}).catch(function(imError) {
						console.warn('login error:', imError);
					});
				})
			}
		},
	}
</script>
<style lang="less" scoped>
	.ly-home-group,
	.ly-talking-wrapper {
		margin: 20rpx 0;
		display: flex;
		padding: 30rpx 50rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #eee;
	}

	.ly-home-talking {
		background-color: #fff;
	}

	.ly-group-img,
	.ly-talking-img {
		margin-right: 40rpx;
		margin-top: 10rpx;
		vertical-align: middle;
	}

	.ly-last-message {
		font-size: 20rpx;
		color: #666;
		
		width: 500rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.ly-delete-talking{
		display: flex;
		align-items: center;
		width: 100rpx;
	}
</style>
