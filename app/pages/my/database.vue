<template>
	<view>
		<view class="ly-database-content">
			<view class="ly-content-wrapper" v-for="(item,index) in consumeData">
				<view class="ly-content-title">
					<view>
						{{item.course.name}}
					</view>
					<view>
						<view>
							<u-avatar :src="item.userInfo.avatar" size="50"></u-avatar>
						</view>
						<view>
							{{item.userInfo.username}}
						</view>
					</view>
				</view>
				<view>
					{{item.course.studyNum}}
				</view>
				<view class="ly-content-data">
					<view>
						<u-line-progress active-color="#ff6600" :percent="(item.course.completeVideoNum)*3.2"></u-line-progress>
					</view>
					<view>
						<view>
							学习进度
						</view>
						<view>
							{{item.course.completeVideoNum}}/{{item.course.courseVideoNum}}
						</view>
					</view>
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
                    src:'',
					consumeData:[],
			}
		},
		mounted() {
			this.getConsumeData();
		},
		methods: {
			getConsumeData(selectMyChildren) {
				this.Http({
					method: 'get',
					aip: `course/userBuyCourse/list?buyStatus=1&${this.personInfo==='student'? 'userId':'buyerId'}=${this.userId}&selectMyChildren=${this.personInfo==='parent'?true:false}`,
				}).then(e => {
					this.consumeData = e.result.records;
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.ly-database-content {
		padding: 0 30rpx;
		margin-top: 40rpx;

		.ly-content-wrapper {
			padding: 30rpx 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			box-shadow: 0 0 10rpx #eee;

			>view:nth-child(2) {
				color: #666;
			}
		}
	}

	.ly-content-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;

		>view:first-child {
			font-size: 40rpx;
		}

		>view:last-child {
			display: flex;
			grid-gap: 30rpx;
			align-items: center;
		}
	}

	.ly-content-data {
		margin-top: 40rpx;

		>view:nth-child(2) {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;
			font-size: 25rpx;
			color: #666;

			>view:last-child {
				color: #ff6600;
			}
		}
	}
</style>
