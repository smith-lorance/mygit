<template>
	<view>
		<view class="ly-reg-main">
			<view class="ly-reg-title">
				<view>注册</view>
				<view>1/3</view>
			</view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="+86" prop="telNumber">
					<u-input v-model="form.telNumber" placeholder="请输入手机号"/>
				</u-form-item>
				<view><button @click="submit" value="" class="ly-login-btn">下一步</button></view>
				<view>同意<span>《用户协议》</span></view>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					telNumber: '',
				},
				rules: {
					telNumber: [{
						required: true,
						message: '请输入正确手机号',
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.goSetPwd();
						this.getphone();
					} else {
						console.log('验证失败');
					}
				});
			},
			// 跳转注册第二个
			goSetPwd() {
				uni.navigateTo({
					url: `./setpwd`
				});
			},
			getphone(){
				uni.setStorage({
				    key: 'phone',
				    data: this.form.telNumber,
				    success: function () {
				        console.log('success');
				    }
				});
				uni.getStorage({
				    key: 'phone',
				    success: function (res) {
				        console.log(res.data);
				    }
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
	}
</script>

<style lang="less" scoped>
	.ly-reg-main {
		padding: 20rpx;
		margin-top: 100rpx;
		span{
			color: #ff6600;
		}
		view:last-child{
			margin-top: 10rpx;
			text-align: center;
		}
	}

	.ly-reg-title {
		display: flex;
		justify-content: space-between;

		view:last-child {
			color: #eee;
			font-size: 0.8rem;
		}
	}
	.ly-login-btn {
		background-color: #ff6600;
		color: #fff;
	}
</style>
