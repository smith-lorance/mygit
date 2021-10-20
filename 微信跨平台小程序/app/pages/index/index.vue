<template>
	<view class="ly-index-content">
		<view class="ly-index-imgbox">
			<u-swiper :list="list" :effect3d="true"></u-swiper>
		</view>
		<view class="ly-index-object">
			<view v-for="(item,index) of objectList" :key="index"
				:style="{color:item.color,backgroundImage:'url('+item.coverImage+')'}">
				<view class="ly-index-sutdy">
					<view>{{item.name}}</view>
					<view>{{item.studyNum}}</view>
				</view>
				<view @click="getListcontent(item.id)">去学习</view>
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
		<!-- 弹窗课程 -->
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view>
						选择学期
					</view>
					<view class="name">
						<view v-for="(item,index) of listContent"
							:class="[activeIndex === index ? 'choice active':'choice']" :key="index"
							@click="getIndex(index,item.id)">
							{{item.name}}
						</view>
					</view>

				</view>
			</view>
		</u-mask>
		<view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				show: false,
				list: [],
				objectList: [],
				listContent: [],
				courseCatalogId: '',
				choiceList:[],
				token:'',
			}
		},

		created() {
			uni.getStorage({
				key: 'token',
				success: res => {
					this.token = res.data;
					this.getData();
					this.getData();
					this.getObject();	
				}
			});
			
		},
		onLoad(){
			
		},
		/**
		 * getData()获取轮播图
		 * getObject()学科数据
		 */
		methods: {
			getIndex(index, code) {
				this.activeIndex = index;
				this.courseCatalogId = code;
				console.log(this.activeIndex);
				uni.setStorage({
					key: 'courseCatalogId',
					data: this.courseCatalogId,
					success: e => {
						console.log(this.courseCatalogId);
					}
				});
				uni.navigateTo({
					url: './course'
				});

			},
			getData() {
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/sysManage/banner/list`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.list = res.data.result.records;
					},
				});
			},
			getObject() {
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/course/courseCatalog/list`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.objectList = res.data.result.records;
					},
				});
			},
			getListcontent(id) {
				this.show = true;
				this.activeIndex = 0;
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/course/course/list?courseCatalogId=${id}`,
					header: {
						'x-access-token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.listContent = res.data.result.records;
						console.log(this.listContent);
					},
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;

		.rect {
			width: 600rpx;
			background-color: #fff;

			view {
				margin: 40rpx 80rpx;
				text-align: center;
			}

			.choice {
				background-color: #d8d8d8;
				margin: 40rpx auto;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 10rpx;
			}

			.active {
				background-color: #F0AD4E;
				color: #F8F8F8;
			}
		}
	}

	.ly-index-imgbox {
		margin-bottom: 70rpx;
	}

	.ly-index-object {
		box-sizing: border-box;
		padding: 0 70rpx;

		>view {
			background-color: #ffaaff;
			padding: 60rpx 40rpx;
			border-radius: 20rpx;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			.ly-index-sutdy {
				view:first-child {
					font-size: 40rpx;
				}

				view:last-child {
					margin-top: 10rpx;
					font-size: 24rpx;
				}
			}

			>view:last-child {
				padding: 20rpx 30rpx;
				background-color: #fff;
				color: #55ffff;
				border-radius: 50rpx;
			}
		}
	}
</style>
