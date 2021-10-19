<template>
	<view>
		<view class="ly-children-content">
			<view class="ly-content-section" v-for="(item,index) in childrenList">
				<view class="ly-content-title">
					<view>
						<u-avatar :src="item.avatar" size="100"></u-avatar>
					</view>
					<view class="ly-content-info">
						<view>
							{{item.realname}}
						</view>
						<view>
							{{item.school}}
						</view>
					</view>
				</view>
				
				<view class="ly-content-btn">
					<view @click="relieve()">
						解绑
					</view>
					<view>
						详情
					</view>
				</view>
			<u-mask :show="show">
				<view class="warp">
					<view class="rect" @tap.stop>
						<view class="ly-relieve">
							<view>
								<view>
									提示
								</view>
								<view>
									是否解除绑定
								</view>
							</view>
							<view>
								<view style="color: #007AFF;" @click="updateChildren(item.id)">
									确定
								</view>
								<view @click="show=false">
									取消
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-mask>
			</view>
			<view class="ly-children-btn" @click="bingding()">
				+绑定孩子
			</view>
		</view>
		<view>
				<u-toast ref="uToast" />
			</view>
			<u-mask :show="shower">
				<view class="warp">
					<view class="rect" @tap.stop>
						<view class="ly-relieve">
							<view>
								<input placeholder="请输入孩子账号" v-model="username" />
							</view>
							<view>
								<view style="color: #007AFF;" @click="getMyChildren()">
									确定
								</view>
								<view @click="shower=false">
									取消
								</view>
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
				childrenList: [],
				show: false,
				shower:false,
				type:0,
				username:'',
			};
		},
		mounted() {
			 this.getChildren();
		},
		methods: {
			/**
			 * bingding()绑定孩子
			 * relieve()解除绑定
			 * getChildren()获取绑定孩子列表
			 * getMychildren()搜索孩子
			 * updateChildren()接触绑定列表
			 */
			bingding(){
				this.shower=true;
				this.type=1;
				this.username='';
			},
			relieve(){
				this.show=true;
				this.type=0;
			},
			getChildren() {
				this.Http({
					method: 'get',
					aip: `sys/user/list?selectChildren=true`
				}).then(e => {
					this.childrenList = e.result.records;
				})
			},
			getMyChildren() {
				this.Http({
					method: 'get',
					aip: `sys/user/list?selectChildren=false&username=${this.username}`
				}).then(e => {
					    this.updateChildren(e.result.records[0].id,this.type);
				})
			},
			updateChildren(childrenId) {
				this.Http({
					method: 'get',
					aip: `sys/user/bindStudent?studentId=${childrenId}&type=${this.type}`
				}).then(e => {
					this.$refs.uToast.show({
										title: e.message,
									})
					this.show=false;
					this.shower=false;
                    this.getChildren();
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 300rpx;
		background-color: #fff;
		text-align: center;
		border-radius: 20rpx;
		.ly-relieve{
			>view{
				padding: 20rpx 0;
			}
			>view:first-child{
				border-bottom: 2rpx solid #eee;
				>view{
					padding: 20rpx 0;
				}
			}
			>view:last-child {
				padding: 20rpx 40rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}

	.ly-children-content {
		padding: 0 30rpx;
	}

	.ly-content-section {
		padding: 30rpx;
		margin-top: 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx #eee;
		display: flex;
		justify-content: space-between;

		.ly-content-title {
			display: flex;
			align-items: center;
		}
	}

	.ly-content-info {
		margin-left: 20rpx;

		>view:first-child {
			margin-bottom: 20rpx;
			font-size: 35rpx;
		}

		>view:last-child {
			font-size: 20rpxs;
		}
	}

	.ly-content-btn {
		view {
			padding: 5rpx 15rpx;
		}

		>view:first-child {
			border: 2rpx solid #ff6600;
			color: #ff6600;
		}

		>view:last-child {
			border: 2rpx solid #666;
			color: #666;
			margin-top: 20rpx;
		}
	}

	.ly-children-btn {
		padding: 25rpx 0;
		text-align: center;
		background-color: #ff6600;
		color: #fff;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}
</style>
