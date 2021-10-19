<template>
	<view>
		<u-mask :show="show" @click="changeShow()">
				<view class="warp">
					<view class="rect" @tap.stop>
						<view class="ly-parent-box" :style="{display:change}">
							<view>选择孩子</view>
							<view v-for="(item,index) of studentsList" :key="index"
							 @click="goPay(item.buy)">{{item.username}}{{item.buy ?'已购买':'未购买'}}</view>
						</view>
						<view class="ly-course-pay" :style="{display: pay}">
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
			<view>
				<u-toast ref="uToast" />
			</view>
	</view>
</template>

<script>
	export default {
	props:{
		pay:{
			type:String,
			default:"none",
		},
		change:{
			type:String,
			default:"block",
		},
		show:{
			type:Boolean,
			default:false,
		},
		studentsList:{
			type:Array,
		}
	},
		data() {
			return {
				
			};
		},
		methods:{
			changeShow(){
				this.$emit('getShow',false);
			},
			changeBuy(){
				this.$emit('getBuy',["none","block"]);
			},
		
			goPay(data) {
				if (data) {
					this.$refs.uToast.show({
						title: '已购买',
					})
				} else {
					this.changeBuy();
				}
			},
		},
	}
</script>
<style lang="less">
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
		.ly-parent-box{
			padding: 30rpx 40rpx;
			>view:nth-child(n+2){
				margin-top: 20rpx;
				padding:10rpx 120rpx ;
				background-color: #ff6600;
				border-radius: 10rpx;
				color: #fff;
			}
		}
		.ly-course-pay{
			width: 350rpx;
			padding: 20rpx 40rpx;
			>view:first-child{
				font-size: 30rpx;
				font-weight: 550;
				margin-bottom: 20rpx;
			}
			>view:nth-child(2){
				font-size: 40rpx;
				color: #ff6600;
				margin-bottom: 20rpx;
			}
			>view:nth-child(3),>view:nth-child(4){
				padding: 10rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #eee;
				font-size: 20rpx;
				font-weight: 550;
				margin-bottom: 20rpx;
			}
			>view:last-child{
				color: #fff;
				background-color: #ff6600;
				padding: 10rpx 0;
				border-radius: 10rpx;
			}
		}
</style>