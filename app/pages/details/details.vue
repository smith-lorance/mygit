<template>
	<view>
		<view class="ly-details-video">
			<video :src="file"></video>
		</view>
		<view>
			<view class="ly-swiper-title">
				<u-tabs-swiper bar-width="200" ref="uTabs" active-color="#ff6600" :list="list" :current="current"
					@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="ly-swiper" :style="{height: swiperheight}" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height:100%; width: 100%;" @scrolltolower="onreachBottom">
						<view class="ly-details-container">
							<view class="ly-container-title">
								{{messageList.name}}
							</view>
							<view class="ly-container-iconbox">
								<view class="ly-container-icon">
									<uni-icons class="ly-icon-num" type="hand-thumbsup" size="15"></uni-icons>
									{{messageList.completeNum}}
								</view>
								<view class="ly-container-icon">
									<uni-icons class="ly-icon-num" type="eye" size="15"></uni-icons>
									{{messageList.visitNum}}
								</view>
								<view class="ly-container-icon">
									<uni-icons class="ly-icon-num" type="chatboxes" size="15"></uni-icons>
									{{messageList.favoritesNum}}
								</view>
							</view>
							<view class="ly-container-message">
								用户的用户的用户用户的用户的用户的用户
								的的用户的用户的用户的用户的用户的用户的用户的
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
										讲的不粗，继续女里
									</view>
								</view>
							</view>
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
								<view class="ly-input-wrapper">
									<view class="ly-input-box">
										<input type="text" v-model="message" class="ly-input-comment"
											placeholder="请输入你的评论..." />
									</view>
									<view class="ly-comment-iconbox" @click="postMessage()">
										<view class="ly-comment-icon">
											<image src="../../static/evaluate.png"></image>
										</view>
										<view class="ly-comment-text-info">
											评论
										</view>
									</view>
									<view class="ly-comment-iconbox">
										<view class="ly-comment-icon">
											<image src="../../static/join.png"></image>
										</view>
										<view class="ly-comment-text-info">
											分享
										</view>
									</view>

								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
						<view class="ly-class-table">
							<view class="ly-class-wrapper" :style="{opacity:index>2?fontBg:''}"
								:class="videoIndex==index?Classactive : 'ly-class-wrapper'"
								v-for="(item,index) of classList" :key="index" @click="getVideoData(index)">
								<view class="ly-class-content">
									<view class="ly-class-num">
										{{item.orderNum}}
									</view>
									<view class="ly-class-info">
										<view class="ly-class-title">
											{{item.name}}
										</view>
										<view class="ly-class-time">
											<view class="ly-time-icon">
												<text class="test" style="font-size: 20rpx;">&#xe676;</text>
											</view>
											<view class="ly-class-playtime">
												20:00
											</view>
										</view>
									</view>
								</view>
								<view class="ly-play-box">
									<view class="ly-play-lock" v-if="index>lock">
										<u-icon name="lock" size="38" v-if="index!=videoIndex"></u-icon>
									</view>
									<view class="ly-play-icon">
										<u-icon name="play-circle" size="38" v-if="index!=videoIndex"></u-icon>
										<u-icon name="list-dot" size="38" v-if="index==videoIndex"></u-icon>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
		<payTips :show="show" :change="change" :pay="pay" @getShow="setShow" @getBuy="setBuy"
			:studentsList="studentsList"></payTips>
	</view>
</template>
<script>
	import {
		mixins
	} from "../../mixins/mixins.js";
	import payTips from '../../components/components.vue'
	export default {
		  components:{
		            payTips
		        },
		mixins: [mixins],
		data() {
			return {
				messageList: [],
				src: '../../static/index.png',
				file: '',
				commentList: [],
				list: [{
					name: '详情'
				}, {
					name: '课表'
				}],
				swiperCurrent: 0,
				current: 0,
				message: '',
				swiperheight: 0,
				classList: [],
				Classactive: "ly-class-wrapper active",
				studentNum: null,
				studentsList: [],
				lock: Infinity,
				buy: 'block',
				change: 'none',
				pay: 'none',
				show: false,
				fontBg: 1,
				teacherNum: null,
				resId: '',
			};
		},
		mounted() {
			try {
				const file = uni.getStorageSync('file');
				const videoId = uni.getStorageSync('videoId');
				if (file && videoId) {
					this.file = file;
					this.videoId = videoId;
				}
			} catch (e) {
				this.$refs.uToast.show({
					title: '获取失败',
				})
			}
			this.getClassList();
			this.getComment(this.videoId);
			this.getMessage(this.videoId);
			this.getSystemInfo();
			this.getBuy();
			this.resId = this.videoId;
		},
		/**
		 * getComment()获取评论
		 * postMessage()发送评论
		 * getSystemInfo()获取swiper高度
		 * getVideoData()获取视频没有购买时只能观看前三个
		 * gopay()选择孩子购买
		 * getVideoFile()获取视频文件地址
		 * getVideoData()点击列表判断身份切购买情况
		 * setshow(),setBuy()获取子组件的传值
		 * getClassList()获取视频列表
		 * getBuy()mounted后执行判断身份和购买情况
		 */
		methods: {
			setShow(data) {
				this.show = data;
			},
			setBuy(data) {
				this.change = "none";
				this.pay = "block";
			},
			getMessage(id) {
				this.Http({
					method: 'get',
					aip: `course/courseVideo/queryById?id=${id}`
				}).then(e => {
					this.messageList = e.result
				})
			},
			getVideoData(index) {
				this.pay = "none";
				if (this.personInfo === "student" && this.studentNum === 0) {
					if (index > 2) {
						this.show = true;
						this.pay = "block";
						index = this.videoIndex;
						this.Classactive = "ly-class-wrapper active";
					} else {
						this.Classactive = "ly-class-wrapper active";
						this.getVideoFile(index);
						this.videoIndex = index;
					}
				};
				if (this.personInfo === "parent") {
					if (index > 2) {
						index = this.videoIndex;
						this.Classactive = "ly-class-wrapper active";
						this.show = true;
						this.change = "block";
					} else {
						this.Classactive = "ly-class-wrapper active";
						this.getVideoFile(index);
						this.videoIndex = index;
					}
				};
				if (this.personInfo === 'teacher' && this.teacherNum === 0) {
					this.file = '';
					this.Classactive = "ly-class-wrapper active";
					this.$refs.uToast.show({
						title: '请先去个人中心绑定优惠即可观看',
					})
					this.videoIndex = index;
				} else {
					this.getVideoFile(index);
				}
			},
			getVideoFile(index) {
				this.Http({
					method: 'get',
					aip: `course/courseVideo/list?courseId=${this.courseId}`,
				}).then(e => {
					this.file = e.result.records[index].file;
					this.resId = e.result.records[index].id;
					this.getComment(this.resId);
					this.getMessage(this.resId);
				})
			},
			getSystemInfo() {
				const [vm] = [this]
				uni.getSystemInfo({
					success: (resu) => { // resu 可以获取当前屏幕的高度
						const query = uni.createSelectorQuery()
						query.in(vm).select('.ly-swiper')
						.boundingClientRect() //  .swiper 是swiper类名 可以获取当前swiper距离顶部的位置
						query.exec(function(res) {
							vm.swiperheight = resu.windowHeight - res[0].top +
							'px'; //屏幕的高度减去当前swiper距离顶部的高度就是剩余屏幕的高度 然后动态赋值给swiper
						})
					},
					fail: (res) => {}
				})
			},
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			onreachBottom() {},
			getComment(id) {
				this.Http({
					method: 'get',
					aip: `course/courseVideoComment/list?courseVideoId=${id}`,
				}).then(e => {
					this.commentList = e.result.records;
				})
			},
			postMessage() {
				if (this.message === '') {
					this.$refs.uToast.show({
						title: '请输入内容',
					})
				} else {
					this.Http({
						method: 'post',
						data: {
							content: this.message,
							courseVideoId: this.resId
						},
						aip: `course/courseVideoComment/add`
					}).then(e => {
						if (e.code === 200) {
							this.message = '';
							this.getComment(this.resId);
						}
					})
				}
			},
			getClassList() {
				this.Http({
					method: 'get',
					aip: `course/courseVideo/list?courseId=${this.courseId}`
				}).then(e => {
					this.classList = e.result.records;
				})
			},
			getBuy() {
				this.pay = "none";
				this.Http({
					method: 'get',
					aip: `course/userBuyCourse/getBuyStatus?courseId=${this.courseId}`,
				}).then(e => {
					this.studentNum = e.result;
					if (this.personInfo === "student" && this.studentNum === 0) {
						if (this.videoIndex > 2) {
							this.show = true;
							this.pay = "block";
							this.file = '';
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
						this.Http({
							method: 'get',
							aip: `platform/user/listChildren?courseId=${this.courseId}`,
						}).then(e => {
							this.studentsList = e.result.records;
							this.lock = 2;
							this.fontBg = 0.5;
							if (this.videoIndex > 2) {
								this.show = true;
								this.change = "block";
								this.file = '';
								this.$refs.uToast.show({
									title: '购买后可通过学生账号观看',
								});
							}
						})
					};
					if (this.personInfo === 'teacher') {
						this.Http({
							method: 'get',
							aip: `sys/user/list?id=${this.personId}`
						}).then(e => {
							this.teacherNum = e.result.records.length
							if (this.teacherNum === 0) {
								this.$refs.uToast.show({
									title: '请先去个人中心绑定优惠即可观看',
								});
								this.file = '';
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@font-face {
		font-family: 'iconfont';
		/* Project id 2751129 */
		src: url('http://at.alicdn.com/t/font_2751129_r1wdx10boza.woff2?t=1629857790040') format('woff2'),
	}

	.test {
		font-family: iconfont;
		font-size: 40rpx;
	}

	.ly-details-video {
		video {
			width: 100%;
		}
	}

	.ly-swiper-title {
		margin-bottom: 50rpx;
	}

	.ly-details-container {
		padding: 0 20rpx;
	}

	.ly-container-title {
		font-size: 35rpx;
		font-weight: 550;
		margin-bottom: 20rpx;
	}

	.ly-container-iconbox {
		margin-bottom: 50rpx;
		display: flex;
	}

	.ly-container-icon {
		margin-right: 50rpx;
	}

	.ly-icon-num {
		margin-right: 20rpx;
	}

	.ly-container-message {
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

	.ly-person-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.ly-person-name {
		font-size: 35rpx;
		font-weight: 550;
	}

	.ly-person-message {
		opacity: .8;
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

	.ly-input-wrapper {
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 40rpx 20rpx 20rpx;
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

	.ly-comment-text-info {
		width: 50rpx;
		font-size: 20rpx;
	}

	.ly-class-wrapper {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.ly-class-wrapper.active {
		color: #ff6600;
	}

	/* .ly-class-wrapper:nth-of-type(n+4){
	opacity: .5;
} */
	.ly-class-content,
	.ly-play-box {
		display: flex;
		grid-gap: 20rpx;
		vertical-align: middle;
	}

	.ly-class-time {
		margin-top: 10rpx;
	}

	.ly-class-time {
		display: flex;
		grid-gap: 10rpx;
		font-size: 20rpx;
	}

	.ly-class-num {
		font-size: 35rpx;
	}

	.ly-time-icon {
		width: 30rpx;
		height: 30rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.ly-play-icon,
	.ly-play-lock {
		width: 40rpx;
		height: 40rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.ly-play-btn {
		width: 100%;
		height: 100%;
		background-image: url(../../static/playing.png);
		background-size: cover;
	}

	// 支付款
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
</style>
