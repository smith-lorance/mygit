<template>
	<view>
		<u-navbar title="个人中心" :is-back="false" title-color="#000" title-size="35" title-weight="600">
			<view class="slot-wrap" slot="right" style="margin-right: 20rpx;" @click="setInfo()">
				<u-icon name="setting-fill" size="40"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="ly-person-content">
				<view class="ly-person-header">
					<view class="ly-header-top" @click="goUrl('./persondata')">
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
						<view class="ly-top-right" v-if="personInfo!='teacher'">
							<u-icon name="arrow-right" color="#ddd" size="40"></u-icon>
						</view>
					</view>
					<view class="ly-header-bottom" v-if="personInfo!='teacher'">
						<view>
							学习时长
						</view>
						<view>
							<view>
								0
							</view>
							<view>
								分钟
							</view>
						</view>
					</view>
				</view>
				<view class="ly-person-main" v-if="personInfo!='teacher'">
					<view class="ly-main-wrapper" @click="goUrl('./consume')">
						<view class="ly-main-content">
							<view class="ly-content-box">
								<view>
									<text class="test" style="color: #FF9900">&#xe634;</text>
							    </view>
								<view>消费记录</view>
							</view>
							<view>
								<u-icon name="arrow-right" color="#ddd" size="40"></u-icon>
							</view>
						</view>
						<view class="ly-main-info">
							点击查看详细的消费记录
						</view>
					</view>	
					<view class="ly-main-wrapper" @click="goUrl('./database')">
						<view class="ly-main-content">
							<view class="ly-content-box">
								<view>
									<text class="test" style="color: #007AFF;">&#xe60d;</text>
							    </view>
								<view>课程库</view>
							</view>
							<view>
								<u-icon name="arrow-right" color="#ddd" size="40"></u-icon>
							</view>
						</view>
						<view class="ly-main-info">
							查看详情学习情况
						</view>
					</view>
					<view class="ly-main-wrapper" @click="goUrl('./children')" v-if="personInfo==='parent'">
						<view class="ly-main-content">
							<view class="ly-content-box">
								<view>
									<text class="test" style="color: #007AFF;">&#xe60d;</text>
							    </view>
								<view>我的孩子</view>
							</view>
							<view>
								<u-icon name="arrow-right" color="#ddd" size="40"></u-icon>
							</view>
						</view>
						<view class="ly-main-info">
							查看相关情况
						</view>
					</view>
				</view>
				<view class="ly-personInfo-teacher" v-if="personInfo==='teacher'">
					<view class="ly-teacher-section">
						<view >
							账号状态
						</view>
						<view>正常</view>
					</view>
					<view class="ly-teacher-section">
						<view >
							绑定优惠码
						</view>
						<view>已绑定</view>
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
				<view class="ly-sign-out" v-if="personInfo==='teacher'">
					退出登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mixins} from '../../mixins/mixins.js'
	export default {
		mixins: [mixins],
		data() {
			return {
			}
		},
		mounted(){
			 this.getMyInfo();
		},
		computed:{
			getPersonInfo(){
				return this.$store.getters.getPersonInfo;
			}
		},
		methods:{
			setInfo(){
				this.goUrl('./setinfo')
			},
			getHomePage(){
				if(this.personInfo!='teacher'){
					this.goUrl('./homepage');
				}
			},
			getMyInfo(){
				this.Http({
					aip:`sys/user/queryById?id=${this.userId}`
				}).then(e=>{
					console.log(e);
					this.$store.dispatch('getPersonInfo', e.result);
				})
			},
		},
	}
</script>

<style lang="less">
	@font-face {
  font-family: 'iconfont';  /* Project id 2751129 */
  src: url('//at.alicdn.com/t/font_2751129_kpleoayqt89.woff2?t=1630500171388') format('woff2')
}

	.test {
		font-family: iconfont;
		font-size: 60rpx;
	}

	.content {
		padding: 50rpx 40rpx;
	}

	.ly-person-header {
		background-color: #fff;
		padding: 0 30rpx;
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
	
	.ly-person-subtitle {
		font-size: 30rpx;
	}

	.ly-header-bottom {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;

		>view:nth-child(2) {
			display: flex;
			grid-gap: 20rpx;
		}
	}

	
	// main
	.ly-person-main{
		padding: 50rpx 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, .1);
	}
	.ly-main-wrapper{
		margin-bottom: 80rpx;
	}
	
	.ly-main-content,.ly-content-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ly-main-content{
		margin-bottom: 20rpx;
	}
	.ly-content-box{
		>view:first-child{
			margin-right: 10rpx;
		}
	}
	.ly-main-info{
		position: relative;
		padding:40rpx 50rpx ;
		box-shadow: 0 -4rpx  30rpx #ddd;
		border-radius: 10rpx;
		background-color: #fff;
		transform-style: preserve-3d;
	}
	.ly-main-info::before{
		content: '';
		position: absolute;
		width: 90%;
		height: 40rpx;
		left: 0;
		bottom: 0;
		margin-bottom: -40rpx;
		margin-left: 5%;
		border: 4rpx solid #eee;
		border-top: none;
		border-radius: 10rpx;
		transform: translateZ(-1px);	
	}
	// teacher
	.ly-personInfo-teacher{
		padding: 0 40rpx;
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
	.ly-sign-out{
		padding: 20rpx;
		background-color: rgba(0,0,0,.5);
		text-align: center;
		margin-top: 40rpx;
		border-radius: 10rpx;
	}
</style>
