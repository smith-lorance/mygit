<template>
	<view>
		<view class="ly-details-video">
			<video :src="vedioFile"></video>
		</view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false">
			</u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" :style="{height:swiperheight}"
			@animationfinish="animationfinish" class="q-swiper">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%;height: 100%;" @scrolltolower="onreachBottom">
					<view class="ly-details-container">
						<!-- 课程 -->
						<view class="classbox">
							<view class="ly-container-title">
								{{vedioList.name}}
							</view>
							<view class="ly-container-iconbox">
								<view class="ly-container-icon">
									<u-icon name="thumb-up" size="30"></u-icon>{{vedioList.favoritesNum}}
								</view>
								<view class="ly-container-icon">
									<u-icon name="eye" size="30"></u-icon>{{vedioList.visitNum}}
								</view>
								<view class="ly-container-icon">
									<u-icon name="chat" size="30"></u-icon>{{vedioList.completeNum}}
								</view>
							</view>
							<view class="ly-container-message">
								{{vedioList.introduction}}
							</view>
						</view>
						<view class="ly-container-person">
							<view class="ly-person-head">
								<u-avatar :src="src" mode="circle" size="80"></u-avatar>
							</view>
							<view class="ly-person-info">
								<view class="ly-person-name">
									用户名
								</view>
								<view class="ly-person-message">
									评价
								</view>
							</view>
						</view>
						<!-- 评论 -->
						<view class="ly-container-comment">
							<view class="ly-comment-title">
								评论
							</view>
							<view class="ly-comment-text">
								<view class="ly-comment-user" v-for="(item,index) of commentList" :key="index">
									<view class="ly-comment-userinfo">
										<view class="ly-comment-username">
											{{item.createBy}}
										</view>
										<view class="ly-comment-info">
											{{item.content}}
										</view>
									</view>
									<view class="ly-comment-time">
										{{item.createTime}}
									</view>
								</view>
							</view>
						</view>
						<view class="ly-input-wrapper">
							<view class="ly-input-box">
								<input type="text" v-model="message" class="ly-input-comment"
									placeholder="请输入你的评论..." />
							</view>
							<view class="ly-comment-iconbox" @click="postMessage()">
								<view class="ly-comment-icon">
									<image src="../../static/pingjia.png"></image>
								</view>
								<view class="ly-comment-text-info">
									评论
								</view>
							</view>
							<view class="ly-comment-iconbox">
								<view class="ly-comment-icon">
									<image src="../../static/tuijianpengyou.png"></image>
								</view>
								<view class="ly-comment-text-info">
									分享
								</view>
							</view>

						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%;height: 100%;" @scrolltolower="onreachBottom">
					<view :style="{opacity:index>2?fontBg:''}"
						:class="[activeIndex === index ? classactive : 'ly-class-wrapper']"
						v-for="(item,index) in classList" :key="index" @click="getactiveIndex(index)">
						<view class="ly-class-content">
							<view class="classbox-number">
								{{item.orderNum}}
							</view>
							<view class="classbox-mid">
								<view class="mid-text">
									{{item.name}}
								</view>
								<view class="class-time">
									<view class="time-icon">
										<u-icon name="clock" size="28"></u-icon>
									</view>
									<view class="time-text">
										30:00
									</view>

								</view>
							</view>

						</view>
						<view class="play">
							<view class="play-l">
								<u-icon name="lock-fill" size="28" v-if="index>2"></u-icon>
							</view>
							<view class="play-r" @click="changevedioNum(item.file,item.id)">
								<u-icon name="play-circle" size="28" v-if="index!=activeIndex"></u-icon>
								<u-icon name="fingerprint" size="28" v-else></u-icon>
							</view>

						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view>
			<u-toast ref="uToast" />
		</view>
		<!-- 购买选项弹框 -->
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
				list: [{
					name: '详情'
				}, {
					name: '课表'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				vedioId: '',
				token: '',
				vedioList: [],
				studentNum: '',
				teacherNum: '',
				studentsList: [],
				buy: 'block',
				pay: 'none',
				change: 'none',
				classactive: "ly-class-wrapper active",
				vedioFile: '',
				courseCatalogId: '',
				commentList: [],
				classList: [],
				message: '',
				activeIndex: '',
				swiperheight: 0,
				fontBg: 0.5,
				show: false,
				lock: Infinity,
				personInfo: '',
				src: 'https://kedu.obs.cn-east-3.myhuaweicloud.com:443/temp/2021/6/29/dcbbb2e1-bb26-4913-8aea-ab8a090c261b.jpg',
			}
		},
		mounted() {
			this.getSystemInfo();

		},
		methods: {
			getBuycondition() {
				this.pay = 'none',
					uni.request({
						method: 'get',
						url: `https://shkeduwlkj.com/api/course/userBuyCourse/getBuyStatus?courseId=${this.courseCatalogId}`,
						header: {
							'x-access-token': this.token,
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							this.studentNum = res.data.result;
							if (this.personInfo === "student" && this.studentNum === 0) {
								if (this.activeIndex > 2) {
									this.show = true;
									this.pay = "block";
									this.vedioFile = '';
									this.$refs.uToast.show({
										title: '购买后可观看',
									});
								}
								this.lock = 2;
								this.fontBg = 0.5;
							} else {
								this.lock = Infinity;
							};
							if (this.personInfo === 'parent') {
								uni.request({
									method: 'get',
									url: `https://shkeduwlkj.com/api/platform/user/listChildren?courseId=${this.courseId}`,
									header: {
										'x-access-token': this.token,
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									success: (res) => {
										this.studentsList = res.data.result.records;
										this.lock = 2;
										this.fontBg = 0.5;
										if (this.activeIndex > 2) {
											this.show = true;
											this.change = "block";
											this.vedioFile = '';
											this.$refs.uToast.show({
												title: '购买后可通过学生账号观看',
											});
										}
									}
								})
							};
							if (this.personInfo === 'teacher') {
								uni.request({
									method: 'get',
									url: `https://shkeduwlkj.com/api/sys/user/list?id=${this.personId}`,
									header: {
										'x-access-token': this.token,
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									success: (res) => {
										this.teacherNum = res.data.result.records.length
										if (this.teacherNum === 0) {
											this.$refs.uToast.show({
												title: '请先去个人中心绑定优惠即可观看',
											});
											this.vedioFile = '';
										}
									}
								})
							}
						}
					});
			},

			//获取视频
			getVedio() {
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/course/courseVideo/queryById?id=${this.vedioId}`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.vedioList = res.data.result;
					},
				});
			},
			//点击播放图标更改file内容,并且更改评论
			changevedioNum(file, id) {
				this.vedioFile = file;
				this.vedioId = id;
				this.getVedio();
			},
			//判断身份，并且在没有购买前只能观看前三个视频
			getactiveIndex(index) {
				this.pay = "none";
				this.activeIndex = index;
				if (this.personInfo === "student" && this.studentNum === 0 && index > 2) {
					this.show = true;
					this.pay = "block";
					index = this.activeIndex;
				} else {
					this.activeIndex = index;
				}
				if (this.personInfo === "parent") {
					if (index > 2) {
						index = this.activeIndex;
						this.show = true;
						this.change = "block";
					} else {
						this.activeIndex = index;
					}
				};
				if (this.personInfo === 'teacher' && this.teacherNum === 0) {
					this.file = '';
					this.$refs.uToast.show({
						title: '请先去个人中心绑定优惠即可观看',
					})
					this.activeIndex = index;
				}
			},
		
		//发送评论
		postMessage() {
			if (this.message === '') {
				this.$refs.uToast.show({
					title: '请输入内容',
				})
			} else {
				uni.request({
					method: 'post',
					data: {
						content: this.message,
						courseVideoId: this.vedioId,
					},
					url: `https://shkeduwlkj.com/api/course/courseVideoComment/add`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/json'
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.message = '';
							this.getComment();
						}
					},
				})
			}
		},
		//获取评论
		getComment() {
			uni.request({
				method: 'get',
				url: `https://shkeduwlkj.com/api/course/courseVideoComment/list?courseVideoId=${this.vedioId}`,
				header: {
					'x-access-token': this.token,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					this.commentList = res.data.result.records;

				},
			});
		},
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多
		onreachBottom() {

		},
		//获取swiper到显示器顶部的高度并且将剩下的高度赋予swiper
		getSystemInfo() {
			const [vm] = [this];

			uni.getSystemInfo({
				success: (resu) => { // resu 可以获取当前屏幕的高度

					const query = uni.createSelectorQuery()
					query.in(vm).select('.q-swiper')
						.boundingClientRect() //  .swiper 是swiper类名 可以获取当前swiper距离顶部的位置
					query.exec(function(res) {
						vm.swiperheight = resu.windowHeight - res[0].top +
							'px'; //屏幕的高度减去当前swiper距离顶部的高度就是剩余屏幕的高度 然后动态赋值给swiper
					})
				},
				fail: (res) => {}
			})
		},
		getClassList() {
			uni.request({
				method: 'get',
				url: `https://shkeduwlkj.com/api/course/courseVideo/list?courseId=${this.courseCatalogId}`,
				header: {
					'x-access-token': this.token,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					this.classList = res.data.result.records;
					console.log(this.classList)
				}
			});
		},
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
						uni.getStorage({
							key: 'Id',
							success: res => {
								this.vedioId = res.data;
								this.getVedio();
								this.getBuycondition();
							}
						});
						uni.getStorage({
							key: 'file',
							success: res => {
								this.vedioFile = res.data;

							}
						});
						uni.getStorage({
							key: 'vediochoice',
							success: res => {
								this.activeIndex = res.data;
							}
						});
						uni.getStorage({
							key: 'courseCatalogId',
							success: res => {
								this.courseCatalogId = res.data;
								this.getClassList();
								this.getComment();
							}
						});

					}
				});
			}
		});
	}

	}
</script>

<style lang="less" scoped>
	.ly-details-video video {
		width: 100%;
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
			padding: 10rpx 120rpx;
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

	.clearfix::after {
		content: '';
		display: block;
		clear: both;
	}

	.q-swiper {

		.ly-container-title {
			font-size: 35rpx;
			font-weight: 550;
			margin-bottom: 20rpx;
			margin-top: 30rpx;
		}

		.ly-container-icon {
			position: relative;
		}

		.ly-container-icon::after {
			content: '';
			display: block;
			position: absolute;
			top: 0px;
			right: -60rpx;
			height: 40rpx;
			width: 4rpx;
			background-color: #C0C0C0;
		}

		.ly-container-icon:last-child::after {
			content: none;
		}

		.ly-container-iconbox {
			margin-bottom: 50rpx;
			display: flex;
			grid-gap: 120rpx;
		}

		.ly-container-message {
			position: relative;
			font-size: 30rpx;
			opacity: .9;
			font-weight: bold;
			margin-bottom: 50rpx;
		}

		.ly-container-person {
			display: flex;
			padding: 40rpx 40rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 6rpx rgba(0, 0, 0, .7);
			margin-bottom: 50rpx;
		}

		.ly-details-container {
			padding: 0 20rpx;
		}

		.ly-comment-title {
			position: relative;
			text-align: center;
			font-size: 40rpx;
			font-weight: 550;
			padding: 20rpx 0;
		}

		.ly-comment-title::after {
			content: '';
			position: absolute;
			height: 4rpx;
			width: 200rpx;
			background-color: #ff6600;
			top: 0;
			left: 50%;
			margin-left: -100rpx;
		}

		.ly-container-message::after {
			content: '';
			position: absolute;
			height: 4rpx;
			width: 200rpx;
			background-color: #ff6600;
			top: -20rpx;
			left: 50%;
			margin-left: -100rpx;
		}

		.ly-comment-text {
			padding-bottom: 200rpx;
		}

		.ly-comment-user {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 2rpx solid #eee;
			justify-content: space-between;
		}

		.ly-comment-username {
			font-size: 30rpx;
			font-weight: 550;
		}

		.ly-person-name {
			margin-left: 20rpx;
			font-size: 35rpx;
			font-weight: 550;
		}

		.ly-person-message {
			margin-left: 20rpx;
			opacity: .8;
		}

		.ly-comment-info {
			margin-top: 10rpx;
			font-size: 20rpx;
			opacity: .8;
			width: 500rpx;
			overflow: hidden;
			white-space: nowrap;
			display: block;
			text-overflow: ellipsis;
		}

		.ly-comment-time {
			font-size: 24rpx;
			opacity: .8;
		}
	}

	.ly-input-wrapper {
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 40rpx 20rpx 0;
		display: flex;
		width: 100%;
		justify-content: space-between;
		border-top: 2rpx solid #eee;
	}

	.ly-input-box {
		width: 70%;
	}

	.ly-input-comment {
		background-color: #eee;
		padding-left: 40rpx;
		border-radius: 40rpx;
		height: 80rpx;
	}

	.ly-comment-icon {
		width: 50rpx;
		height: 50rpx;

		image {
			vertical-align: middle;
			width: 100%;
			height: 100%;
		}
	}

	.ly-class-wrapper {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		grid-gap: 30rpx;

		.ly-class-content {
			display: flex;
			grid-gap: 20rpx;
			vertical-align: middle;
		}

		.class-time,
		.play {
			display: flex;
			grid-gap: 20rpx;
			margin-top: 10rpx;
			font-size: 20rpx;
		}
	}

	.active {
		color: #ff6600;
	}

	// .classbox{
	// 	font-size: 0px;
	// 	vertical-align: bottom;
	// 	.classbox-number{
	// 		float: left;
	// 		font-size: 1.1rem;
	// 	}
	// }
</style>
