<template>
	<view>
		<view class="ly-wrapper">
			<view class="ly-invite-serch">
				<u-search placeholder="搜索" shape="round" :show-action='false' v-model="keyword" bg-color="#fff"
					height="100" :clearabled='false' @change="getUser()"></u-search>
			</view>
		</view>
		<view>
			<view>
				<view class="list-cell" v-for="(item,index) of studentsList" :key="index">
					<u-checkbox-group>
						<u-checkbox @change="checkboxChange" v-model="item.checked" shape="circle"
							active-color="#ff6600" :name="item.id">
							{{item.realname.length?item.realname:item.username}}
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>
		<view class="ly-btn-box">
			<view class="ly-invite-btn" @click="checkedUser()">
				确定
			</view>
		</view>
		<!-- 提示框 -->
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>
<script>
	import TIM from 'tim-wx-sdk';
	import {
		mixins
	} from '../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				studentsList: [],
				keyword: '',
				checkedList: [],
			};
		},
		mounted() {
			this.getUser();
		},
		methods: {
		/**
		 * checkedUser()选择用户列表添加成员
		 * 
		 */
			checkedUser() {
				let promise = this.tim.addGroupMember({
					type: TIM.TYPES.GRP_WORK,
					groupID: this.groupId,
					userIDList: [...this.checkedList]
				});
				promise.then(imResponse => {
					console.log(imResponse.data.successUserIDList); // 添加成功的群成员 userIDList
					console.log(imResponse.data.failureUserIDList); // 添加失败的	群成员 userIDList
					console.log(imResponse.data.existedUserIDList); // 已在群中的群成员 userIDList
					console.log(imResponse.data.group); // 添加后的群组信息
					console.log(imResponse.data);
					setTimeout(e=>this.setUrl('./invite'),100);
				}).catch(function(imError) {
					console.warn('addGroupMember error:', imError);
				});
			},
			checkboxChange(e) {
				if (e.value === true) {
					this.checkedList.push(e.name);
				} else {
					for (let i = 0; i < this.studentsList.length; i++) {
						if (this.checkedList[i] == e.name) {
							this.checkedList.splice(i, 1);
							break;
						}
					}
				}
			},
			getUser() {
				this.Http({
					method: 'get',
					aip: `sys/user/list?keyword=${this.keyword}`
				}).then(e => {
					this.studentsList = e.result.records;
					// this.studentsList.forEach((item,index)=>{
					// 	item["checked"] = false;
					// })
					console.log('成员信息')
					console.log(this.studentsList)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.ly-wrapper {
		background-color: #fff;
	}

	.ly-btn-box {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		padding-bottom: 100rpx;
		padding-top: 20rpx;
		width: 100%;
		justify-content: flex-end;
	}

	.ly-invite-btn {
		padding: 10rpx 20rpx;
		color: #999;
		background-color: #eee;
		margin: 20rpx 20rpx 0 0;
		border-radius: 10rpx;
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.anchor-text {
		color: red;
	}
</style>
