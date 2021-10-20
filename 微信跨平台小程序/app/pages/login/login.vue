<template>
	<view>
		<view class="ly-login-wrapper">
			<u-form :model="form" ref="uForm">
				<u-form-item label="+86" prop="username">
					<u-input v-model="form.username" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="form.password" :type="type" :password-icon="passwordIcon" placeholder="请输入密码" />
				</u-form-item>
				<view><button @click="submit" value="登录" class="ly-login-btn">登录</button></view>
				<view class="ly-login-text">
					<view>忘记密码?</view>
					<view @click="goReg()">注册</view>
				</view>
			</u-form>
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>
</template>

<script>
	//定义提交样式
	import {
		mixins
	} from '../../mixins/mixins.js';
	export default {
		mixins:[mixins],
		data() {
			return {
				mes: '',
				password: '',
				type: 'password',
				passwordIcon: true,
				form: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
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
			showToast() {
				this.$refs.uToast.show({
					title: this.title,
					type: 'success',
				})
			},
			showToast2() {
				this.$refs.uToast.show({
					title:this.title,
					type: 'warning',
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.getUserData();

					} else {
						console.log('验证失败');
					}
				});
			},
			goIndex() {
				setTimeout(function() {
					uni.switchTab({
						url: '../index/index'
					});
				}, 2000)
			},
			goReg() {
				uni.navigateTo({
					url: './identity'
				});
				// uni.navigateBack({
				// 	delta: 2
				// });
			},
			// 数据请求
			getUserData() {
				uni.request({
					method: 'post',
					url: 'https://shkeduwlkj.com/api/sys/mLogin',
					data: this.form,
					header: {
						'Content-Type': 'application/json', //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						this.title = res.data.message;
						if (res.data.code === 200) {
							this.goIndex();
							this.storeData('personId', res.data.result.roleInfo.id);
							uni.setStorage({
							    key: 'personInfo',
							    data: res.data.result.roleInfo.roleCode,
							    success: function () {
									console.log(res.data.result.roleInfo.roleCode)
							    },
							});
							uni.setStorage({
								key: 'token',
								data: res.data.result.token,
								success: e => {
									console.log('携带token');
									this.showToast();
								}
							});
						}else{
							this.showToast2()
						}
						
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

		;
	}

	.ly-login-btn {
		background-color: #ff6600;
		color: #fff;
	}
</style>
