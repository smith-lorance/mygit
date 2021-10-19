<template>
	
	<view class="">
		<payTips  :show="show" :change="change" :pay="pay" @getShow="setShow" @getBuy="setBuy" :studentsList="studentsList"></payTips>
		<view @click="get()">
			你在点什么
		</view>
		<view>
			又不能点了
		</view>
	</view>

</template>


<script>
	import {mixins} from '../../../mixins/mixins.js';
	export default {
		mixins: [mixins],
		data() {
			return {
				show:false,
				pay:'none',
				change:'none',
				studentsList:[],
			}
		},
		methods:{
			get(){
				this.getBuy();
				this.show=true;
				this.change="block"
			},
			setShow(data){
				this.show=data;
			},
			setBuy(data){
				this.change="none";
				this.pay="block";
			},
			getBuy() {
				this.pay = 'none',
					uni.request({
						method: 'get',
						url: `https://shkeduwlkj.com/api/course/userBuyCourse/getBuyStatus?courseId=${this.courseId}`,
						header: {
							'x-access-token': this.token,
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							if (this.personInfo === 'student') {
								if (res.data.result === 0) {
									this.show = true;
									this.pay = "block";
								} else {
									this.$refs.uToast.show({
										title: '已购买',
									})
								}
							} else if (this.personInfo === 'parent') {
								uni.request({
									method: 'get',
									url: `https://shkeduwlkj.com/api/platform/user/listChildren?courseId=${this.courseId}`,
									header: {
										'x-access-token': this.token,
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									success: (res) => {
										this.studentsList = res.data.result.records;
										console.log(this.studentsList);
									}
								});
								this.show = true;
								this.change = "block";
							}
						}
					});
			}, 
		}
		
	}
</script>
<style lang="less" scoped>
	
	
</style>
