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
				<view @click="mask(item.id)">去学习</view>
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
		<!-- 弹出层 -->
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view>选择学期</view>
					<view class="ly-choice" v-for="(item,index) of choiceList" :key="index"
						:class="activeIndex==index?'ly-choive choiceActive':'ly-choice'"
						@click="getChoice(index,item.id)">{{item.name}}</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>
<script>
	import {
		mixins
	} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				show: false,
				list: [],
				objectList: [],
				choiceList: [],
				token: '',
				activeIndex: 0,
			}
		},
		mounted() {
			this.getData();
			this.getObject();
		},

		methods: {
			/**
			 * getData()获取轮播图
			 * getObject()学科数据
			 * getchoice()添加高亮状态和重置选择状态
			 * mask()获取列表页数据
			 */
			getChoice(index, id) {
				this.id = id;
				this.activeIndex = index;
				this.show = false;
				this.goUrl('../course/course');
				this.storeData('courseId', this.id);
			},
			mask(id) {
				this.show = true;
				this.activeIndex = 0;
				this.Http({
					method:'get',
					aip:`course/course/list?courseCatalogId=${id}`
				}).then(e=>{
					this.choiceList=e.result.records;
				});
			},
			getData() {
				this.Http({
					method:'get',
					aip:`sysManage/banner/list`,
				}).then(e=>{
					this.list = e.result.records;
				})
			},
			getObject() {
				this.Http({
					method:'get',
					aip:`course/courseCatalog/list`,
				}).then(e=>{
					this.objectList = e.result.records;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.ly-index-imgbox {
		margin-bottom: 100rpx;
	}

	.ly-index-object {
		box-sizing: border-box;
		padding: 0 100rpx;

		>view {
			background-color: #ff6600;
			padding: 40rpx 40rpx;
			border-radius: 20rpx;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 50rpx;

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
				padding: 10rpx 30rpx;
				background-color: #fff;
				color: #ff6600;
				border-radius: 50rpx;
			}
		}
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		background-color: #fff;
		padding: 40rpx 50rpx;
		border-radius: 40rpx;
		text-align: center;
		>view:first-child {
			margin-bottom: 20rpx;
		}


	}

	.ly-choice {
		margin-bottom: 20rpx;
		padding: 10rpx 100rpx;
		background-color: #eee;
		border-radius: 10rpx;
	}

	.ly-choice.choiceActive {
		background-color: #ff6600;
		color: #fff;
	}
</style>
