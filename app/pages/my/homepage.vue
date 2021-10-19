<template>
	<view>
		<view class="ly-homepage-wrapper">
			<view class="ly-homepage-info">
				<view class="ly-info-box">
					<view class="ly-info-text">
						姓名:
					</view>
					<view class="ly-info-name">
						这是一条测试数据
					</view>
				</view>
				<view class="ly-info-box">
					<view class="ly-info-text">
						性别:
					</view>
					<view class="ly-info-name">
						男
					</view>
				</view>
				<view class="ly-info-box">
					<view class="ly-info-text">
						学校:
					</view>
					<view class="ly-info-name">
						成都七中
					</view>
				</view>
				<view class="ly-info-box">
					<view class="ly-info-text">
						班级:
					</view>
					<view class="ly-info-name">
						四班
					</view>
				</view>


			</view>
			<view class="ly-homepage-buy">
				<view class="ly-buy-title">
					已购买课程情况
				</view>
				<view class="ly-buy-count">
					<view>
						七年级数学
					</view>
					<view class="ly-count-num">
						<view>
							11/
						</view>
						<view>
							31
						</view>
					</view>
				</view>
				<view>
					<u-line-progress active-color="#2979ff" :percent="34"></u-line-progress>
				</view>
			</view>
			<view class="ly-homepage-study">
				<view class="ly-study-wrapper">
					<view class="ly-study-content">
						<view class="ly-study-box">
							<view class="ly-study-num">
								1
							</view>
							<view class="ly-study-title">
								正数和负数
							</view>
						</view>
						<view class="ly-study-count">
							<view>
								<text class="test">&#xe676;</text>228s
							</view>
							<view>
								学习2次
							</view>
						</view>
					</view>
					<view class="ly-study-content">
						<view class="ly-study-box">
							<view class="ly-study-num">
								2
							</view>
							<view class="ly-study-title">
								正数和负数
							</view>
						</view>
						<view class="ly-study-count">
							<view>
								<text class="test">&#xe676;</text>228s
							</view>
							<view>
								学习2次
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	@font-face {
		font-family: 'iconfont';
		/* Project id 2751129 */
		src: url('//at.alicdn.com/t/font_2751129_kpleoayqt89.woff2?t=1630500171388') format('woff2'),
			url('//at.alicdn.com/t/font_2751129_kpleoayqt89.woff?t=1630500171388') format('woff'),
			url('//at.alicdn.com/t/font_2751129_kpleoayqt89.ttf?t=1630500171388') format('truetype');
	}

	.test {
		font-family: iconfont;
		font-size: 20rpx;
	}

	.ly-homepage-wrapper {
		padding: 0 30rpx;
	}

	.ly-homepage-info,
	.ly-homepage-buy,
	.ly-homepage-study {
		padding: 40rpx;
		background-color: #fff;
		font-size: 30rpx;
		font-weight: 540;
		margin-top: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 40rpx #ddd;
	}

	.ly-info-box {
		display: flex;
		margin-bottom: 40rpx;

		.ly-info-text {
			margin-right: 20rpx;
		}
	}

	.ly-info-box:nth-last-of-type(1) {
		margin: 0;
	}

	.ly-buy-title {
		margin-bottom: 40rpx;
		font-size: 40rpx;
		text-align: center;
	}

	.ly-buy-count {
		display: flex;
		justify-content: space-between;
		.ly-count-num {
			display: flex;
			margin-bottom: 20rpx;
		}
	}

	.ly-study-content {
		margin-bottom: 30rpx;
	}

	.ly-study-box {
		display: flex;
		align-items: center;

		.ly-study-num {
			font-size: 40rpx;
			margin-right: 50rpx;
		}

		.ly-study-title {
			font-size: 20rpx;
			font-weight: 550;
		}
	}

	.ly-study-count {
		display: flex;
		margin-left: 56rpx;

		>view {
			padding: 4rpx 20rpx;
		}

		>view:first-child {
			border-right: 4rpx solid #ddd;
		}
	}
</style>
