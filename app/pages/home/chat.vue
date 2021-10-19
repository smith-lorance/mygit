<template>
	<view class="ly-chat-container">
		<u-navbar title="群昵称">
			<view class="slot-wrap" slot="right"  @click="goUrl('./invite')">
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
						<view class="ly-chat-usermessage">
							<view v-if="item.type==='TIMImageElem'">
								{{item.payload.text}}
							</view>
							<view v-if="item.type==='TIMTextElem'" class="ly-img-box">
								<image :src="item.payload.imageInfoArray[0].imageUrl" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="ly-chat-me" v-if="item.flow==='out'">
					<view class="ly-chat-userme">
						<view class="ly-chat-username">
							{{item.from}}
						</view>
						<view class="ly-chat-usermessage">
							 <view v-if="item.type==='TIMTextElem'">
								{{item.payload.text}}
							</view>
							<view v-if="item.type==='TIMImageElem'" class="ly-img-box" >
								<image :src="item.payload.imageInfoArray[0].imageUrl" @click="setImg(item.payload.imageInfoArray[0].imageUrl)" mode="widthFix"></image>
							</view>
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
				<view class="ly-chat-img" @click="createImage()">
					<u-icon name="photo" size="40"></u-icon>
				</view>
				<view class="ly-message-boxput">
					<textarea v-model="message" style="width: 220px;" class="ly-message-box" placeholder="请输入内容"
						auto-height />
				</view>
			</view>
			<view class="ly-message-btn" @click="createMessage()">发送</view>
		</view>
		<u-mask :show="show" @click="show = false">
				<view class="warp">
					<view class="rect" @tap.stop>
						<image :src="imageSrc" mode=""></image>
					</view>
				</view>
			</u-mask>
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
				file: '',
				show:false,
				imageSrc:'',
			};
		},
		mounted() {
			this.getStore({
				name: 'groupId',
				success: e => {
					this.groupId = e
				}
			});
			this.getMessage();
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 999999999999,
					duration: 0
				}, 500);
			})
		},
		methods: {
			/**
			 * creareMessage()发送消息
			 * getMessage()获取消息列表
			 * createImage()小程序发送图片
			 */
			ge(){
				let promise = this.tim.searchGroupByID('@TGS#3SFPLWMHD');
				promise.then(function(imResponse) {
				  const group = imResponse.data.group; // 群组信息
				}).catch(function(imError) {
				  console.warn('searchGroupByID error:', imError); // 搜素群组失败的相关信息
				});
			},
			setImg(src){
				this.show=true;
				this.imageSrc=src;
			},
			createImage(){
			wx.chooseImage({
			  sourceType: ['album'], 
			  count: 1, 
			  success:res=> {
			    let message = this.tim.createImageMessage({
			      to: this.groupId,
			      conversationType: TIM.TYPES.CONV_GROUP,
			      payload: { file: res },
			      onProgress: event=> { console.log('file uploading:', event,res)}
			    });
			    let promise = this.tim.sendMessage(message);
			    promise.then(imResponse=> {
				 this.getMessage();
			    }).catch(function(imError) {
			    });
			  }
			})
			},
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
			getMessage() {
				let promise = this.tim.getMessageList({
					conversationID: `GROUP${this.groupId}`,
					count: 15
				});
				promise.then(imResponse => {
					this.messageList = imResponse.data.messageList;
					console.log(this.messageList);
				});
			},
		}
	}
</script>

<style lang="less">
	.slot-wrap {
		position: relative;
		margin-right: 50rpx;
		font-weight: 600;
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
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
		margin-bottom: 40rpx;
	}

	.ly-chat-you {
		display: flex;
		margin-bottom: 20rpx;
	}

	.ly-chat-imgyou {
		margin-right: 40rpx;
	}

	.ly-chat-imgme {
		margin-left: 40rpx;
	}
	.ly-chat-username {	
		max-width: 80%;
		margin-bottom: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
    .ly-img-box{
		width: 200rpx;
	}
	.ly-chat-usermessage {
		padding: 20rpx;
		max-width: 80%;
		background-color: #1cdf7b;
		color: #fff;
		border-radius: 10rpx;
		word-break: break-word;
		word-wrap: break-word;
	}

	.ly-chat-usermessage image {
		max-width: 100%;
	}

	.ly-chat-me {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20rpx;
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
