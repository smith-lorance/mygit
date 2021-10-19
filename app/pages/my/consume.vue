<template>
	<view>
		<view class="ly-consume-content">
			<view class="ly-consume-table">
				<view class="ly-consume-header">
					<view>
						商品名称
					</view>	 
					<view>
						时间
					</view>	 
					<view>
						姓名
					</view>	 
					<view>
						金额
					</view>		
				</view>
				<view class="ly-consume-main" v-for="(item,index) of consumeData">
					<view>
						{{item.course.name}}
					</view>	 
					<view>
						{{item.createTime}}
					</view>	 
					<view>
						{{item.buyUserName}}
					</view>	 
					<view>
						￥{{item.orderInfo.districtMoney}}
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
				consumeData:[],
			};
		},
		mounted(){
			this.getConsumeData();
		},
		methods:{
			getConsumeData(selectMyChildren){
				this.Http({
					method:'get',
					aip:`course/userBuyCourse/list?buyStatus=1&&${this.personInfo==='student'? 'userId':'buyerId'}=${this.personId}&&selectMyChildren=${this.personInfo==='parent'?true:false}`,
				}).then(e=>{
					this.consumeData=e.result.records;
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.ly-consume-content{
		padding: 10rpx;
	}
	.ly-consume-table{
		background-color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
	}
	u-tr{
		background-color: #ff6600;
	}
	.ly-consume-header,.ly-consume-main{
		display: flex;
		background-color: #FAB6B6;
		border-radius: 10rpx;
		box-shadow: 0 0  10rpx #eee;
		>view{
			width: 25%;
			color: #fff;
			padding: 20rpx 0;
			text-align: center;
		}
	}
	.ly-consume-main{
	background-color: #fff;
	border: 2rpx solid #eee;
	margin-top: 20rpx;
	>view{
		color: #333;
	}
	}
</style>
