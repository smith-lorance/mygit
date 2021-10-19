<template>
	<view class="ly-info-main">
		<view class="ly-reg-title">
			<view>选择身份</view>
			<view>2/3</view>
		</view>
		<view class="ly-info-container">
			<view class="ly-info-change" v-for="(item,index) of infoName" :key="index"
				:class="activeIndex==index?'ly-info-change changeActive':'ly-info-change'" @click="getBg(index,item.roleCode)">
				{{item.name}}</view>
		</view>
		<view class="ly-set-btn">
			<button  class="ly-info-btn" @click="getData()">提交</button>
			<button @click="goUrl('./login')">登录</button>
		</view>
	</view>
</template>
<script>
	 import {mixins} from '../../mixins/mixins.js';
	export default {
    mixins: [mixins],
		data() {
			
			return {
				infoName: [{
					name: '我是学生',
					roleCode:'student',
				}, {
					name: '我是老师',
					roleCode:'teacher',
				}, {
					name: '我是家长',
					roleCode:'parent',
				}, ],
				activeIndex: 0,
				activeCode:'',
			}
		},
		methods: {
			
			getData(){
				uni.navigateTo({
				    url: './setpwd'
				});
				this.storeData('personInfo',this.roleCode)
			},
	
			getBg(index,code) {
				this.activeIndex = `${index}`
				this.roleCode=`${code}`
			},
		}
	}
</script>

<style lang="less" scoped>
	.ly-info-main {
		padding: 20rpx;
		margin-top: 100rpx;
	}

	.ly-reg-title {
		display: flex;
		justify-content: space-between;

		view:first-child {
			font-size: 1.5rem;
		}

		view:last-child {
			color: #eee;
			font-size: 0.8rem;
		}
	}

	.ly-info-container {
		text-align: center;
		margin: 100rpx 0;

		view {
			padding: 30rpx;
			color: #666;
			background-color: #eee;
			border-radius: 15rpx;
			margin-top: 50rpx;
		}
	}

	.ly-info-change.changeActive {
		background-color: #ffb3e9;
	}
	.ly-info-btn {
		background-color: #ff6600;
		color: #fff;
		margin-bottom: 40rpx;
	}
</style>
