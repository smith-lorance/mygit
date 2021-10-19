<template>

	<view class="ly-reg-main">
		<view class="ly-reg-title">
			<view>设置密码</view>
			<view>3/3</view>
		</view>
		<view class="ly-setpwd-from">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="key">
					<u-input v-model="form.key" placeholder="电话号码" />
				</u-form-item>
				<u-form-item prop="smsCode" class="ly-input">
					<u-input v-model="form.smsCode" placeholder="验证码" />
					<view class="wrap" slot="right">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code seconds='60' @end="end" @start="start" ref="uCode" @change="codeChange">
						</u-verification-code>
						<u-button @click="getCode">{{tips}}</u-button>
					</view>
				</u-form-item>

				<u-form-item prop="password">
					<u-input v-model="form.password" type="password" :password-icon='true' placeholder="请设置密码" />
				</u-form-item>
				<!-- 提示框 -->

				<view class="ly-set-btn">
					<button @click="submit" class="ly-login-btn">提交</button>
					<button @click="goUrl('./login')">登录</button>
				</view>
			</u-form>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
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

				// 倒计时
				tips: '',
				// 输入框校验
				form: {
					key: '',
					smsCode: '',
					password: '',
					roleCode: '',
					username: '',
				},
				rules: {
					key: [{
						message: '电话号码',
					}],
					smsCode: [{
						required: true,
						message: '请输入验证码',
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

		/**
		 * submit()提交按钮函数
		 * getcodeData()获取验证码
		 * getPhone获取缓存手机号
		 * gologin()跳转登录页面
		 * showToast()提示框
		 */

		created() {
			// 获取手机号
			uni.getStorage({
				key: 'phone',
				success: res => {
					this.form.key = res.data;
					this.form.username = res.data;
				}
			});
			// 获取身份
			uni.getStorage({
				key: 'personInfo',
				success: res => {
					this.form.roleCode = res.data;
				}
			});
		},

		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.postReg();
					} else {
					}
				});
			},
			// 验证码
			getCodeData() {
				this.Http({
					method:''
				})
				uni.getStorage({
					key: 'phone',
					success: res => {
						this.phoneNumber = res.data;
						this.Http({
							method:'get',
							aip:`sys/sendSMSCode?phone=${this.phoneNumber}`
						});
						/* uni.request({
							method: 'get',
							url: `https://shkeduwlkj.com/api/sys/sendSMSCode?phone=${this.phoneNumber}`,
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								console.log(this.data);
							},
						}); */
					},
				});
			},
			// 注册
			postReg() {
				this.Http({
					method:'post',
					aip:'sys/user/register',
					data:this.form,
				}).then(e=>{
					this.$refs.uToast.show({
						title: e.message,
						type: 'success',
					});
					if (e.code===200) {
						uni.clearStorage();
						setTimeout(e=>this.goUrl('./login'),2000);
					};
				})
			},
			codeChange(text) {
				this.tips = text;
			},
 // 验证码计时器
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						this.$refs.uCode.start();
					}, 1000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('获取验证码结束');
			},
			start() {
				this.$u.toast('获取验证码成功');
				this.getCodeData();
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

		u-form-item {
			margin-bottom: 20rpx;
		}

		;
	}

	.ly-reg-title {
		display: flex;
		justify-content: space-between;

		view:first-child {
			font-size: 1.5rem;
		}

		view:last-child {
			color: #eee;
			font-size: 0.8rem;
		}
	}

	.ly-login-btn {
		background-color: #ff6600;
		color: #fff;
		margin-bottom: 20rpx;
		border: none;
	}

	.ly-input {
		position: relative;


		.ly-code-btn {
			button {
				color: #999999;
				background-color: #eee;
			}
		}
	}

	.ly-set-btn {
		button:last-child {
			background-color: #fff;
			color: #999;
			border: none;
		}
	}
</style>
