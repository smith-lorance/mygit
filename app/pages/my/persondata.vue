<template>
	<view>
		<view class="ly-person-main">
			<view class="ly-person-header">
				<view class="ly-top-left">
					<view class="ly-img-box">
						<u-avatar :src="getPersonInfo.avatar" size='100'></u-avatar>
					</view>
					<view class="ly-top-title">
						<view class="ly-person-title">
							{{getPersonInfo.username}}
						</view>
						<view class="ly-person-subtitle">
							{{getPersonInfo.realname}}
						</view>
					</view>
				</view>
			</view>
			<view class="ly-person-content">
				<view class="ly-teacher-section">
					<view >
						账号状态
					</view>
					<view>正常</view>
				</view>
				<view class="ly-teacher-section">
					<view >
						关于我们
					</view>
					<view><u-icon name="arrow-right" color="#ddd" size="40"></u-icon></view>
				</view>
				<view class="ly-teacher-section">
					<view >
						修改密码
					</view>
					<view><u-icon name="arrow-right" color="#ddd" size="40"></u-icon></view>
				</view>
			</view>
			<view class="ly-sign-out">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			getPersonInfo(){
				return this.$store.getters.getPersonInfo;
			}
		},
	}
</script>

<style lang="less" scoped>
	.ly-person-main{
		padding: 0 30rpx;
		margin-top: 30rpx;
	}
	.ly-person-header {
		background-color: #fff;
		padding: 30rpx 30rpx;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, .1);
		margin-bottom: 20rpx;
	}
	
	.ly-header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 2rpx solid #eee;
		
	}
	
	.ly-top-left {
		display: flex;
		align-items: center;
	}
	
	.ly-top-title {
		margin-left: 20rpx;
	}
	
	.ly-person-title {
		font-size: 40rpx;
	}
	.ly-person-content{
		padding: 0 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, .1);
	}
	.ly-person-subtitle {
		font-size: 30rpx;
	}
	.ly-personInfo-teacher{
		padding: 0 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,.2);
		
	}
	.ly-teacher-section{
		padding: 40rpx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #eee;
	}
	.ly-teacher-section:nth-last-of-type(1){
		border: none;
	}
	.ly-sign-out{
		padding: 20rpx;
		background-color: rgba(0,0,0,.5);
		text-align: center;
		margin-top: 40rpx;
		border-radius: 10rpx;
	}

</style>
