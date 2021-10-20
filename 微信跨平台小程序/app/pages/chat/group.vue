<template>
	<view class="ly-chat-container">
		<u-navbar title="群昵称">
			<view class="slot-wrap" slot="right" v-if="personInfo==='teacher'" @click="goUrl('./invite')">
				...
			</view>
		</u-navbar>
		<view class="content">
			<view class="ly-chat-wrapper" v-for="(item,index) in messageList">
				<view class="ly-chat-you" v-if="item.flow==='in'">
					<view class="ly-chat-imgyou">
						<u-avatar :src="item.avatar" size="50"></u-avatar>
					</view>
					<view class="ly-chat-useryou">
						<view class="ly-chat-username">
							{{item.flow==='in'?item.from:''}}
						</view>
						<view class="ly-chat-usermessage" v-if="item.payload.text">
							{{item.payload.text}}
						</view>
						<view class="ly-chat-imgmessage" v-if="item.payload.imageInfoArray">
							<image :src="item.payload.imageInfoArray[0].imageUrl" mode="widthFix"></image>
						</view>
					</view>
				</view>
				
				<view class="ly-chat-me" v-if="item.flow==='out'">
					<view class="ly-chat-userme">
						<view class="ly-chat-username">
							{{item.from}}
						</view>
						<view class="ly-chat-usermessage" v-if="item.payload.text">
							{{item.payload.text}}
						</view>
						<view class="ly-chat-imgmessage" v-if="item.payload.imageInfoArray">
							<image :src="item.payload.imageInfoArray[0].imageUrl" mode="widthFix"></image>
						</view>
					</view>
					<view class="ly-chat-imgme">
						<u-avatar :src="item.avatar" size="50"></u-avatar>
					</view>
				</view>
			</view>
		</view>
	
		<view class="ly-chat-content">
			<view class="ly-content-left">
				<view class="ly-chat-img" @click="createimgMessage()">
					<u-icon name="photo" size="40"></u-icon>
				</view>
				<view class="ly-message-boxput">
					<textarea v-model="message" style="width: 220px;" class="ly-message-box" placeholder="请输入内容"
						auto-height />
				</view>
			</view>
			<view class="ly-message-btn" @click="createMessage()">发送</view>
		</view>
	</view>
</template>
<script>
	import TIM from 'tim-wx-sdk';
	import {
		mixins
	} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				message: '',
				groupId: '',
				messageList: [],
			};
		},
		created() {
			this.getStoreData({
				name: 'groupId',
				success: e => {
					this.groupId = e;
					this.getMessage();
				}
			});
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 10000,
					duration: 0
				}, 1000);
			})
		},
		methods: {
			createMessage() {
				let message = this.tim.createTextAtMessage({
					to: this.groupId,
					conversationType: TIM.TYPES.CONV_GROUP,
					payload: {
						text: this.message,
					}
				});

				let promise = this.tim.sendMessage(message);
				promise.then(imResponse => {
					// 发送成功
					this.message = '';
					this.getMessage()
				}).catch(function(imError) {
					// 发送失败
					console.warn('sendMessage error:', imError);
				});
			},
			createimgMessage() {
				// 1. 选择图片
				wx.chooseImage({
					sourceType: ['album'], // 从相册选择
					count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
					success: res => {
						// 2. 创建消息实例，接口返回的实例可以上屏
						let message = this.tim.createImageMessage({
							to: this.groupId,
							conversationType: TIM.TYPES.CONV_GROUP,
							payload: {
								file: res
							},
							onProgress: function(event) {
								console.log('file uploading:', event, res)
							}
						});
						// 3. 发送图片
						let promise = this.tim.sendMessage(message);
						promise.then(imResponse => {
							// 发送成功
							this.getMessage();
							console.log(imResponse);
						}).catch(function(imError) {
							// 发送失败
							console.warn('sendMessage error:', imError);
						});
					}
				})
			},
			getMessage() {
				console.log(this.groupId);
				let promise = this.tim.getMessageList({
					conversationID: `GROUP${this.groupId}`,
					count: 30
				});
				promise.then(imResponse => {
					console.log('asdsad');
					this.messageList = imResponse.data.messageList;
					console.log(this.messageList);
				});
			},
			

		}
	}
</script>

<style lang="less" scoped>
	.slot-wrap {
	}

	.content {
		padding-bottom: 60rpx;
	}

	.ly-chat-content {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 20rpx 0;
		align-items: center;
		padding: 10rpx 10rpx 50rpx;
	}

	.ly-chat-wrapper {
		padding: 40rpx 40rpx;
	}

	.ly-chat-you {
		display: flex;
		margin-bottom: 40rpx;
	}

	.ly-chat-imgyou {
		margin-right: 40rpx;
	}

	.ly-chat-imgme {
		margin-left: 40rpx;
	}

	.ly-chat-username {
		max-width: 50%;
		margin-bottom: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ly-chat-usermessage {
		padding: 20rpx;
		max-width: 80%;
		background-color: #1cdf7b;
		color: #fff;
		border-radius: 20rpx;
	}

	.ly-chat-imgmessage {
		padding: 20rpx;
		max-width: 80%;
		background-color: #1cdf7b;
		color: #fff;
		border-radius: 20rpx;

	}

	.ly-chat-imgmessage image {
		width: 200rpx;
	}

	.ly-chat-me {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 40rpx;
	}

	.ly-chat-useryou,
	.ly-chat-userme {
		max-width: 80%;
	}

	.ly-chat-userme {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.ly-content-left {
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.ly-chat-img {
		margin-right: 20rpx;
		vertical-align: middle;
	}

	.ly-message-box {
		padding: 0 10rpx;
		font-size: 35rpx;
	}

	.ly-message-btn {
		margin-right: 10rpx;
		font-size: 35rpx;
	}
</style>
