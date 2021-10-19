<template>
	<view class="ly-course-container">
		<view>
			<view>初一数学在线学习</view>
			<view v-html="description"></view>
			<view class="ly-course-buy">
				<view>已有200人购买</view>
				<view @click="getBuy()" :style="{display:buy}">购买</view>
			</view>
		</view>
		<view class="wrap">
			<view class="ly-course-content item u-border-bottom" v-for="(item,index) of classList" :key="index">
				<view class="ly-cuorse-img">
					<image :src="item.coverImage" mode="aspectFit"></image>
				</view>
				<view>
					<view>{{item.name}}</view>
					<view>{{item.introduction}}</view>
					<view @click="getLook(item.file,item.id,index)">立即观看</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-color='#ff6600' />
		</view>
		<payTips  :show="show" :change="change" :pay="pay" @getShow="setShow" @getBuy="setBuy" :studentsList="studentsList"></payTips>
	<payTips></payTips>
	</view>
</template>
<script>
	import {
		mixins
	} from '../../mixins/mixins.js';
	import payTips from '../../components/components.vue';
	export default {
		components:{
		          payTips
		      },
		mixins: [mixins],
		data() {
			return {
				status: 'loadmore',
				list: 0,
				page: 5,
				count: 0,
				buy: 'block',
				change: 'none',
				pay: 'none',
				show: false,
				description: '',
				classList: [],
				studentsList: [],
			};
		},
		//下拉刷新
		onReachBottom() {
			this.count = this.list - this.page;
			this.page += 3;
			this.status = 'loading';
			setTimeout(() => {
				if (this.count <= 0) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
					this.getClassList(this.page);
				}
			}, 1000)
		},
		mounted() {
			this.getCourse();
			this.getClassList(this.page);
			this.getClassCount();
			if (this.personInfo === 'teacher') {
				this.buy = "none";
			};
		},
		/**
		 * getCourse()获取课程
		 * goPay()支付
		 * getCourse获取课程
		 * goBuy()支付请求
		 * getClassList()获取课程列表
		 * getCountList()获取课程列数
		 */
		methods: {
			setShow(data){
				this.show=data;
			},
			setBuy(data){
				this.change="none";
				this.pay="block";
			},
			getLook(file, id,videoIndex) {
				this.goUrl('../details/details');
				this.storeData('file', file);
				this.storeData('videoId', id);
				this.storeData('videoIndex',videoIndex);
			},
			getCoupon() {
				this.Http({
					method: 'get',
					aip:`sys/user/getStudentDiscountAmount?studentId=${this.courseId}`,
				})
			},
			goPay(data) {
				if (data) {
					this.$refs.uToast.show({
						title: '已购买',
					})
				} else {
					this.change = "none";
					this.pay = "block";
				}
			},
			getCourse() {
				this.Http({
					method:'get',
					aip:`course/course/queryById?id=${this.courseId}`
				}).then(e=>{
					this.description = e.result.description;
				})
			},
			getBuy() {
				this.pay = 'none',
					uni.request({
						method: 'get',
						url: `https://shkeduwlkj.com/api/course/userBuyCourse/getBuyStatus?courseId=${this.courseId}`,
						header: {
							'x-access-token': this.token,
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							if (this.personInfo === 'student') {
								if (res.data.result === 0) {
									this.show = true;
									this.pay = "block";
								} else {
									this.$refs.uToast.show({
										title: '已购买',
									})
								}
							} else if (this.personInfo === 'parent') {
								uni.request({
									method: 'get',
									url: `https://shkeduwlkj.com/api/platform/user/listChildren?courseId=${this.courseId}`,
									header: {
										'x-access-token': this.token,
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									success: (res) => {
										this.studentsList = res.data.result.records;
									}
								});
								this.show = true;
								this.change = "block";
							}
						}
					});
			},
			getClassList(page) {
				this.Http({
					method:'get',
					aip:`course/courseVideo/list?courseId=${this.courseId}&pageSize=${page}`
				}).then(e=>{
					this.classList = e.result.records;
				});
			},
			getClassCount() {
				this.Http({
					method:'get',
					aip:`course/courseVideo/list?courseId=${this.courseId}`
				}).then(e=>{
					this.list = e.result.records.length;
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.ly-course-container {
		padding: 0 40rpx;

		>view:first-child {
			background-color: rgba(252, 145, 145, .2);
			border-radius: 20rpx;
			padding: 60rpx 40rpx;

			>view:first-child {
				font-size: 35rpx;
				font-weight: 600;
				margin-bottom: 20rpx;
				color: rgba(0, 0, 0, .8);
			}

			>view:nth-child(2) {
				color: rgba(0, 0, 0, .6);
				margin-bottom: 40rpx;
			}
		}

	}

	.ly-course-buy {
		display: flex;
		justify-content: space-between;
		align-items: center;

		>view:first-child {
			color: rgba(0, 0, 0, .5);
			font-size: 25rpx;
		}

		>view:last-child {
			padding: 15rpx 35rpx;
			background-color: #ff6600;
			color: #FFFFFF;
			border-radius: 10rpx;
		}
	}

	.ly-course-content {
		padding: 50rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		grid-gap: 20rpx;

		>view:first-child {
			width: 30%;
			height: 200rpx;
			border-radius: 20rpx;
			border: 1px solid #eee;
		}

		>view:nth-child(2) {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			grid-gap: 10rpx;
			width: 70%;

			>view:first-child {
				font-size: 40rpx;
				font-weight: 550;
			}

			>view:nth-of-type(2) {
				color: rgba(0, 0, 0, .8);
				font-weight: 400;
				font-size: 20rpx;
				height: 64rpx;
				overflow: hidden;
			}

			>view:last-child {
				padding: 10rpx 20rpx;
				border-radius: 10rpx;
				border: 1px solid #ff6600;
				color: #ff6600;
				align-self: flex-end;
			}
		}
	}

	.ly-cuorse-img image {
		width: 100%;
		height: 100%;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		background-color: #fff;
		border-radius: 10rpx;
		text-align: center;
	}

	.ly-parent-box {
		padding: 30rpx 40rpx;

		>view:nth-child(n+2) {
			margin-top: 20rpx;
			padding: 10rpx 40rpx;
			background-color: #ff6600;
			border-radius: 10rpx;
			color: #fff;
		}
	}

	.ly-course-pay {
		width: 350rpx;
		padding: 20rpx 40rpx;

		>view:first-child {
			font-size: 30rpx;
			font-weight: 550;
			margin-bottom: 20rpx;
		}

		>view:nth-child(2) {
			font-size: 40rpx;
			color: #ff6600;
			margin-bottom: 20rpx;
		}

		>view:nth-child(3),
		>view:nth-child(4) {
			padding: 10rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #eee;
			font-size: 20rpx;
			font-weight: 550;
			margin-bottom: 20rpx;
		}

		>view:last-child {
			color: #fff;
			background-color: #ff6600;
			padding: 10rpx 0;
			border-radius: 10rpx;
		}
	}
</style>
