<template>
	<view>
		<view class="ly-serinfo-container">
			<view class="ly-setinfo-content">
				<view class="ly-content-text">
					头像
				</view>
				<view class="ly-setinfo-photo" @click="setPhoto()">
					<image :src="form.avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="ly-setinfo-content">
				<view class="ly-content-text">
					姓名
				</view>
				<view class="ly-content-info">
					<input type="text" v-model="form.realname" />
				</view>
			</view>
			<view class="ly-setinfo-content">
				<view class="ly-content-text">
					性别
				</view>
				<view class="ly-content-info">
					{{form.sex==='1'?'男':'女'}} <u-icon name="arrow-down" @click="show=true" style="margin-left: 10rpx;"></u-icon>
					<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback">
					</u-action-sheet>
				</view>
			</view>
			<view class="ly-setinfo-content">
				<view class="ly-content-text">
					学校
				</view>
				<view class="ly-content-info">
					<input type="text" v-model="form.school" />
				</view>
			</view>
			<view class="ly-setinfo-content">
				<view class="ly-content-text">
					班级
				</view>
				<view class="ly-content-info">
					<input type="text" v-model="form.className" />
				</view>
			</view>
			<view class="ly-setinfo-content" @click="editPersonInfo()">
				<button class="ly-setinfo-btn">提交</button>
			</view>
		</view>
		<view>
				<u-toast ref="uToast" />
			</view>
	</view>
</template>

<script>
	import {mixins} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				form: {
					avatar: '',
					realname: '',
					school: '',
					className: '',
					sex: '女',
				},
				show: false,
				actionSheetList: [{
						text: '男',
						value:'1',
					},
					{
						text: '女',
						value:'2',
					},
				],
			};
		},
		mounted(){
			this.getMyInfo();
		},
		methods: {
			// 获取下拉框的值
			actionSheetCallback(index) {
				this.form.sex = this.actionSheetList[index].value;
				console.log(this.form.sex);
			},
			getMyInfo(){
				this.Http({
					aip:`sys/user/queryById?id=${this.userId}`
				}).then(e=>{
					this.form=e.result
				})
			},
			setPhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'], //从相册选择
					success: res => {
						this.form.avatar = res.tempFilePaths[0];
					}
				});
			},
			editPersonInfo(){
				this.Http({
					method:'put',
					  aip:'sys/user/editMyInfo',
					data:this.form,
				}).then(e=>{
					this.getMyInfo();
					this.uploadImg();
					 this.$store.dispatch('getPersonInfo', this.form);
					 setTimeout(e=>this.goTabBar('./my'),1000);
					this.$refs.uToast.show({
										title: e.message	
									})
				})
			},
			uploadImg(){
				this.Http({
					method:'post',
					aip:'sys/common/upload',
					data:this.form.avatar
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.ly-serinfo-container {
		padding: 0 30rpx;
		margin-bottom: 20rpx;
	}

	.ly-setinfo-content {
		padding: 32rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.ly-content-info {
		text-align: right;
	}

	.ly-setinfo-photo {
		width: 100rpx;
		height: 100rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.ly-setinfo-btn {
		width: 100%;
		background-color: #ff6600;
		color: #fff;
		border-radius: 5rpx;
	}
</style>
