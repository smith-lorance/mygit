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
					<view @click="govedio(item.id,item.file,index)">立即观看</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-color='#ff6600' />
		</view>
		<!-- 提示框 -->
		<view>
			<u-toast ref="uToast" />
		</view>
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="ly-parent-box" :style="{display:change}">
						<view>选择孩子</view>
						<view v-for="(item,index) in studentsList" :key="index" @click="goPay(item.buy)">
							{{item.username}}{{item.buy ?'已购买':'未购买'}}
						</view>
					</view>
					<view class="ly-course-pay" :style="{display:pay}">
						<view>购买课程</view>
						<view>2元</view>
						<view>
							<view>优惠</view>
							<view>1</view>
						</view>
						<view>
							<view>购买内容</view>
							<view>8年级上册</view>
						</view>
						<view>
							确定支付
						</view>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				courseCatalogId: '',
				description: '',
				personInfo: '',
				buy: 'block',
				pay: 'none',
				change: 'none',
				show: false,
				classList: [],
				studentsList: [],
				status: 'loadmore',
				list: 0,
				page: 4,
			}
		},
		/**
		 * courseCatalogId:首页存储的学期id
		 * getCourse:课程描述
		 * onReachBottom:下拉刷新
		 * */
		onReachBottom() {
			this.page += 5;
			this.status = 'loading';
			setTimeout(() => {
				if (this.page >= this.list) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
					this.getClassList(this.page)
				}
			}, 2000)
		},

		created() {
			uni.getStorage({
				key: 'personInfo',
				success: res => {
					this.personInfo = res.data;

				}
			});
			uni.getStorage({
				key: 'token',
				success: res => {
					this.token = res.data;
					uni.getStorage({
						key: 'courseCatalogId',
						success: res => {
							this.courseCatalogId = res.data;
							this.getCourse();
							this.getClassList(this.page);
							this.getClassCount();
						}
					});
				}
			});
		},
		methods: {
			govedio(id, file, index) {
				uni.setStorage({
					key: 'Id',
					data: id,
					success: e => {
						uni.setStorage({
							key: 'file',
							data: file,
							success: e => {
								uni.navigateTo({
									url: './vedio'
								});
							}
						});
						uni.setStorage({
							key: 'vediochoice',
							data: index,
							success: e => {
								console.log('OK');
							}
						});

					},
				});
			},
			getCourse() {
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/course/course/queryById?id=${this.courseCatalogId}`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.description = res.data.result.description;
					},
				});
			},
			getBuy() {
				this.pay = 'none',
					uni.request({
						method: 'get',
						url: `https://shkeduwlkj.com/api/course/userBuyCourse/getBuyStatus?courseId=${this.courseCatalogId}`,
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
									url: `https://shkeduwlkj.com/api/platform/user/listChildren?courseId=${this.courseCatalogId}`,
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
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/course/courseVideo/list?courseId=${this.courseCatalogId}&pageSize=${page}`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.classList = res.data.result.records;
					}
				});
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
			getClassCount() {
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/course/courseVideo/list?courseId=${this.courseCatalogId}`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.list = res.data.result.records.length;
					}
				});
			}
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
				height: 116rpx;
				overflow: hidden;
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
		margin-top: 50rpx;
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
