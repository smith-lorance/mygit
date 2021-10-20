<template>
	<view>
		<view class="ly-reg-main">
			<view class="ly-reg-title">
				<view>选择身份</view>
				<view>2/3</view>
			</view>
			<view v-for="(item,index) of dataList" :key='index'
				:class="[activeIndex === index ? 'select activeSelect' : 'select']" @click="getidentity(index,item.roleCode)">{{item.name}}</view>
			<view class="selec-buttom"><button @click="goReg()" value="" class="ly-login-btn">下一步</button></view>
			<view><button @click="gologin()" value="" class="selec-login">登录</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
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
				activeCode:'student',
			}
		},
		methods:{
			goReg() {
				uni.navigateTo({
					url: `./reg`
				});
				uni.setStorage({
				    key: 'code',
				    data: this.activeCode,
				    success: e => {
				        console.log(this.activeCode);
				    }
				});
			},
			gologin() {
				uni.navigateTo({
					url: `./login`
				});
				},
			getidentity(index,Code){
				this.activeIndex = index;
				this.activeCode = Code;
				// uni.setStorage({
				//     key: 'code',
				//     data: this.form.telNumber,
				//     success: function () {
				//         console.log('success');
				//     }
				// });
			}
				
		}
	}
</script>

<style lang="less" scoped>
	.ly-login-btn {
		background-color: #ff6600;
		color: #fff;
	}
	.ly-reg-main {
		padding: 20rpx;
		margin-top: 100rpx;

		.select {
			margin-top: 45rpx;
			text-align: center;
			border-radius: 5px;
			background-color: #FFFFFF;
			font-size: 1.3rem;
			padding: 20rpx;
			box-sizing: border-box;
			color: #545454;
		}

		.activeSelect {
			background-color: #f3b807;
		}

		.selec-buttom {
			margin-top: 100rpx;
			color: #fcfcfc;
			background-color: #ffcf0e;
			border-radius: 5px;
		}

		.selec-login {
			margin-top: 60rpx;
			background-color: #ffffff;
			color: #616161;
		}
	}

	.ly-reg-title {
		display: flex;
		justify-content: space-between;

		view:last-child {
			margin-top: 10rpx;
			text-align: center;
			color: #a2a2a2;
			font-size: 0.8rem;
		}

		view:first-child {
			font-size: 40rpx;
			color: #2d2d2d;
		}
	}

	
</style>
