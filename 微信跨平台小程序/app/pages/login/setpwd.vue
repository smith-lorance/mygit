<template>

	<view class="ly-reg-main">
		<view class="ly-reg-title">
			<view>设置密码</view>
			<view>2/3</view>
		</view>
		<view class="ly-setpwd-from">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="invitation">
					<u-input v-model="form.telNumber" placeholder="请输入邀请码" />
				</u-form-item>

				<u-form-item prop="smsCode" class="ly-input">
					<u-input v-model="form.smsCode" placeholder="验证码" />
					<view class="wrap" slot="right">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode"
							@change="codeChange"></u-verification-code>
						<u-button @click="getCode()">{{tips}}</u-button>
					</view>
				</u-form-item>

				<u-form-item prop="password">
					<u-input v-model="form.password" :type="type" :password-icon="passwordIcon" placeholder="请设置密码" />
				</u-form-item>
				<view class="ly-set-btn">
					<button @click="goIndex()" class="ly-login-btn">提交</button>
					<button @click="gologin()">登录</button>
				</view>
			</u-form>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				
				tips: '',
				// refCode: null,
				seconds: 10,
				password: '',
				type: 'password',
				passwordIcon: true,
				form: {
					invitation: '',
					smsCode: '',
					key:"",
					password: '',
					roleCode:"student",	
				},
				rules: {
					invitation: [{
						message: '邀请码',
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
		methods: {
			gologin() {
				uni.navigateTo({
					url: `./login`
				});
				},
			// goIndex(){
			// 	uni.setStorage({
			// 	    key: 'storage_key',
			// 	    data: 'hello',
			// 	    success: function () {
			// 	        console.log('success');
			// 	    }
			// 	});
			// },
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				console.log(this.phone)
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			goIndex(){
				this.getuser();
			},
			getuser(){
				uni.request({
					method: 'post',
					url: 'https://shkeduwlkj.com/api/sys/user/register',
					data:this.form,
					header: {
						'Content-Type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
					},
				});
				
			},
			getPass() {
				uni.request({
					method: 'get',
					url: `https://shkeduwlkj.com/api/sys/sendSMSCode?phone=${this.form.key}`,
					success: (res) => {
						console.log(res);
					},
				});
			},

			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('已发送验证码');
				this.getPass()
			},

			onReady() {
				this.$refs.uForm.setRules(this.rules);
				this.refCode = this.$refs.uCode;
			},
		},
		created(){
			uni.getStorage({
			    key: 'phone',
			    success: e => {
			        console.log(e.data);
					this.form.key =e.data;
					this.form.username = e.data;
					console.log(this.form.key);
			    }
			});
			uni.getStorage({
				key: 'code',
				success: e=> {
					this.form.roleCode = e.data;
					console.log(this.form.roleCode);
				}
			});
			
		}
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
		.wrap{
			// position: absolute;
			// right:2px;
			// top:10px;
		}

		.ly-code-btn {
			position: absolute;
			bottom: 0;
			right: 0;

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
