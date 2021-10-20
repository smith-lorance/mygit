<template>
	<view>
		<u-navbar title="群列表">
			<view class="slot-wrap" slot="right" v-if="personInfo==='teacher'" @click="show = true">
				<!-- #ifdef MP-WEIXIN -->
				<u-icon name="plus" class="icon-wx"></u-icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<u-icon name="plus" class="icon-H5"></u-icon>
				<!-- #endif -->
			</view>
		</u-navbar>
		<view class="content">
			<view class="ly-list-group" v-for="(item,index) of getGroupList" :key="index"
				@click="gotoGroup(item.groupID)">
				<view class="ly-group-wrapper">
					<view class="ly-group-img">
						<u-avatar src="../../static/index.png" size="50"></u-avatar>
					</view>
					<view class="ly-froup-name">{{item.name}}</view>
				</view>
				<view class="ly-look-group">
					<view>查看群号</view>
					<view>进入群聊</view>
				</view>
			</view>
		</view>
		<!-- 创建群聊弹出层 -->
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="ly-establish-wrapper">
						<view class="ly-establish-group">
							创建群聊
						</view>

						<view class="ly-btn-box">
							<view class="ly-establish-name">
								<input v-model="groupName" type="text" class="ly-establish-input" />
							</view>
							<view class="ly-establish-btn" @click="CreateallGroup()">
								确定
							</view>
						</view>
					</view>
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
				show: false,
				groupName: '',
			};
		},
		computed: {
			getGroupList() {
				// console.log(this.$store.getters.getGroupList)
				return this.$store.getters.getGroupList;
			},
		},
		methods: {
			gotoGroup(id) {
				this.storeData('groupId',id)
				this.goUrl('./group');
			},
			CreateallGroup() {
				// 创建好友工作群
				let promise = this.tim.createGroup({
					type: TIM.TYPES.GRP_WORK,
					name: this.groupName,
				});
				promise.then(imResponse => {
					this.groupName = '';
					this.show = false;
					console.log(imResponse.data.group);
					console.log(imResponse.data.overLimitUserIDList);
				}).catch(function(imError) {
					console.warn('createGroup error:', imError);
				});
			}
		},
	}
</script>

<style lang="less" scoped>
	// 弹出层样式
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		background-color: #fff;
		padding: 20rpx 20rpx;
		text-align: center;
		width: 300rpx;
	}

	.ly-establish-wrapper {
		display: flex;
		flex-direction: column;
	}

	.ly-establish-group {
		margin-bottom: 20rpx;
	}

	.ly-btn-box {
		display: flex;
		padding: 5rpx 10rpx;
		flex-wrap: wrap;
	}

	.ly-establish-input {
		border: 2rpx solid #eee;
		border-radius: 10rpx;
		padding: 10rpx 10rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 0 2rpx rgba(0, 0, 0, .7);
	}

	.ly-establish-btn {
		background-color: #ff6600;
		color: #fff;
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		margin: 0 auto;
	}

	// 导航栏
	.slot-wrap {
		position: relative;
		margin-left: 600rpx;
		.icon-wx{
			position: absolute;
			right: 180rpx;
			top:-10rpx
		}
		.icon-H5{
			position: absolute;
			right: 20rpx;
			top:-10rpx;
		}
	}

	

	// main
	.ly-list-group {
		padding: 30rpx 50rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ly-group-wrapper {
		display: flex;
		align-items: center;
	}

	.ly-group-img {
		margin-right: 40rpx;
	}

	.ly-froup-name {
		font-weight: 550;
		font-size: 35rpx;
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ly-look-group {
		display: flex;
		color: #666;
		font-size: 20rpx;

		>view:first-child {
			margin-right: 20rpx;
			background-color: #eee;
			padding: 10rpx;
			border-radius: 20rpx;
		}

		view:last-child {
			background-color: #eee;
			padding: 10rpx;
			border-radius: 20rpx;
		}
	}
</style>
