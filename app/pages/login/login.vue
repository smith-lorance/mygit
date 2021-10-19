<template>
	<view>
		<view class="ly-login-wrapper">
			<u-form :model="form" ref="uForm">
				<u-form-item label="+86" prop="username">
					<u-input v-model="form.username" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="form.password" type="password" :password-icon="true" placeholder="请输入密码" />
				</u-form-item>
				<view><button @click="submit" value="登录" class="ly-login-btn">登录</button></view>
				<view class="ly-login-text">
					<view>忘记密码?</view>
					<view @click="goUrl('./reg')">注册</view>
				</view>
			</u-form>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	//定义提交样式

	import {
		mixins
	} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				rules: {
					telNumber: [{
						required: true,
						message: '请输入正确手机号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			/**
			 * submit校验提交
			 * goreg跳转祖册
			 * getUserData数据请求
			 */
			submit() {
				uni.clearStorage();
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.getUserData();
					} else {
						console.log('验证失败');
					}
				});
			},
			// 数据请求
			getUserData() {
				uni.request({
					method: 'post',
					url: 'https://shkeduwlkj.com/api/sys/mLogin',
					data: this.form,
					header: {
						'Content-Type': 'application/json' 
					},
					success: (res) => {
						console.log(res);
						this.$refs.uToast.show({
							title: res.data.message,
							type: 'success',
						});
						if (res.data.code === 200) {
							this.storeData('token', res.data.result.token);
							this.storeData('personInfo', res.data.result.roleInfo.roleCode);
							this.storeData('personId', res.data.result.roleInfo.id);
							this.storeData('userId',res.data.result.userInfo.id);
							setTimeout(e => this.goTabBar('/pages/index/index'), 2000);
						};
					},
				});
			},
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
	}
</script>

<style lang="less" scoped>
	.ly-login-wrapper {
		height: 100%;
		margin-top: 200rpx;
		padding: 20rpx;

		.ly-login-text {
			display: flex;
			justify-content: space-between;

			view:first-child {
				color: #ff6600;
			}
		}
	}

	.ly-login-btn {
		background-color: #ff6600;
		color: #fff;
	}
</style>
