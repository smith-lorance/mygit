<template>
	<view class="contact page-pagination" :class="size=='large'?'size-large':size=='small'?'size-small':''">
		<view class="page-con">
			<view class="page-scroll">
				<view class="page-scroll-child">
					<!-- 首页 -->
					<view class="pag-btn start" :style="{color}" :class="[nowPage==1?'btn-ban':'',btnText?'btn-text':'']" v-if="showAround && !numAround" @click="clickStart">
						<text v-if="btnText">首页</text>
						<text v-else class="icon icon-left1"></text>
					</view>
					<!-- 上页 -->
					<view class="pag-btn prev" :style="{color}" :class="[nowPage==1?'btn-ban':'',btnText?'btn-text':'']" @click="clickPrev">
						<text v-if="btnText">上页</text>
						<text v-else class="icon icon-left"></text>
					</view>
					<!-- 简单模式 -->
					<view v-if="mode=='simple'" class="page-num simple"><text :style="{color}" style="margin-right: 10rpx;">{{nowPage}}</text>/ {{pageNum}}</view>
					<!-- 复杂模式 -->
					<view class="page-num" v-else>
						<template v-if="pageNum <= showPageSize">
							<view v-for="page in pageNumArr" :key="page" class="pag-btn" :style="{color, backgroundColor:(page==nowPage?color:'')}" :class="page==nowPage?'active':''" @click="clickPage(page)">{{page}}</view>
						</template>
						<template v-else>
							<!-- 第一页页码 -->
							<view class="pag-btn" :style="{color, backgroundColor:(nowPage==1?color:'')}" v-if="numAround" :class="nowPage==1?'active':''" @click="clickPage(1)">1</view>
							<!-- 左侧省略号 -->
							<view class="pag-btn ellipsis-btn" :style="{color}" v-show="(forceEllipses && getFirstPage != 1) || (numAround && getFirstPage != 2)"><text class="icon icon-more"></text></view>
							<template v-for="(p, i) in showPageSize">
								<template v-if="i<showPageSize-2">
									<!-- 中间页码 -->
									<view :key="i" class="pag-btn"
										:style="{color, backgroundColor:((getFirstPage+i)==nowPage?color:'')}"
										:class="(getFirstPage+i)==nowPage?'active':''"
										@click="clickPage(getFirstPage+i)">
										{{getFirstPage+i}}
									</view>
								</template>
								<template v-else>
									<!-- 若显示省略号，则页码只显示 showPageSize-2 页 -->
									<view :key="i" v-show="!forceEllipses && !numAround" class="pag-btn"
										:style="{color, backgroundColor:((getFirstPage+i)==nowPage?color:'')}"
										:class="(getFirstPage+i)==nowPage?'active':''"
										@click="clickPage(getFirstPage+i)">
										{{getFirstPage+i}}
									</view>
								</template>
							</template>
							<!-- 右侧省略号 -->
							<view class="pag-btn ellipsis-btn" :style="{color}" v-show="(forceEllipses && getFirstPage<pageNum-(showPageSize-3)) || (numAround && getFirstPage < pageNum-(showPageSize-2))">
								<text class="icon icon-more"></text>
							</view>
							<!-- 最后一页页码 -->
							<view class="pag-btn" :style="{color, backgroundColor:(nowPage==pageNum?color:'')}" v-if="numAround" v-show="getFirstPage < pageNum-(showPageSize-3)" :class="nowPage==pageNum?'active':''" @click="clickPage(pageNum)">{{pageNum}}</view>
						</template>
					</view>
					<!-- 下页 -->
					<view class="pag-btn next" :style="{color}" :class="[pageNum<=nowPage?'btn-ban':'',btnText?'btn-text':'']" @click="clickNext">
						<text v-if="btnText">下页</text>
						<text v-else class="icon icon-right"></text>
					</view>
					<!-- 尾页 -->
					<view class="pag-btn end" :style="{color}" :class="[pageNum<=nowPage?'btn-ban':'',btnText?'btn-text':'']" v-if="showAround && !numAround" @click="clickEnd">
						<text v-if="btnText">尾页</text>
						<text v-else class="icon icon-right1"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="page-info">
			<slot />
			<view class="page-info-con" v-if="showPageInfo">
				<view>共 {{total}} 条，</view>
				<view>每页 {{pageSize}} 条，</view>
				<view>当前页 {{nowPage}}/{{pageNum}}<text v-if="showGoPage">，</text></view>
			</view>
			<view class="page-go" v-if="showGoPage">前往第
				<template v-if="trigger=='blur'">
					<input class="page-input" type="text" v-model="inputPage" @blur="goPage" @input="onInput" />页
				</template>
				<template v-else>
					<input class="page-input" type="text" v-model="inputPage" @input="onInput" />页
					<text v-if="trigger=='click'" class="page-input-btn" @click="goPage">跳转</text>
				</template>
			</view>
		</view>
	</view>
</template>
<script>
	/**
	 * @property {Number} total 总条数，默认0
	 * @property {Number} pageSize 每页条数，默认10
	 * @property {Number} currentPage 当前页，默认1
	 * @property {Number} showPageSize 显示的页码个数，默认5
	 * @property {String} mode=['multi'|'simple'] 显示模式，默认multi
	 * @property {Boolean} forceEllipses=[true|false] 是否显示省略号，默认false
	 * @property {Boolean} btnText=[true|false] 是否显示汉字，默认false
	 * @property {Boolean} showAround=[true|false] 是否显示首页和尾页，默认false
	 * @property {Boolean} numAround=[true|false] 是否用页码表示首尾页，默认false
	 * @property {String} size=['large'|'normal'|'small'] 按钮大小，默认normal
	 * @property {Boolean} showPageInfo=[true|false] 是否显示分页信息，如总页数等，默认false
	 * @property {Boolean} showGoPage=[true|false] 是否显示input输入框，默认false
	 * @property {String} trigger=['blur'|'click'] 跳转页码触发方式，默认blur
	 */
	export default {
		name: 'PagePagination',
		props: {
			//总条数
			total: {
				type: Number,
				default: 0
			},
			//每页条数
			pageSize: {
				type: Number,
				default: 10
			},
			//当前页
			currentPage: {
				type: Number,
				default: 1
			},
			//显示的页码个数
			showPageSize: {
				type: Number,
				default: 5
			},
			//显示模式
			mode: {
				type: String,
				default: "multi"
			},
			//是否显示省略号
			forceEllipses: {
				type: Boolean,
				default: false
			},
			//是否显示汉字
			btnText: {
				type: Boolean,
				default: false
			},
			//是否显示首页和尾页
			showAround: {
				type: Boolean,
				default: false
			},
			//是否用页码表示首尾页
			numAround: {
				type: Boolean,
				default: false
			},
			//按钮大小
			size: {
				type: String,
				default: "normal"
			},
			//页码颜色
			color: {
				type: String,
				default: "#1989FA"
			},
			//是否显示页面信息
			showPageInfo: {
				type: Boolean,
				default: false
			},
			//是否显示前往跳转页
			showGoPage: {
				type: Boolean,
				default: false
			},
			//跳转页码触发方式
			trigger: {
				type: String,
				default: "blur"
			}
		},
		data() {
			return {
				nowPage: 1, //当前页
				inputPage: 1 //input输入框绑定值
			}
		},
		watch: {
			currentPage(val) {
				this.nowPage = val > this.pageNum ? this.pageNum : val;
				this.inputPage = val > this.pageNum ? this.pageNum : val;
			}
		},
		computed: {
			//总页数
			pageNum() {
				console.log("总页数：" + JSON.parse(JSON.stringify(Math.ceil(this.total / this.pageSize))));
				return Math.ceil(this.total / this.pageSize)
			},
			pageNumArr() { //解决uni-app中存在v-for中循环数字从0开始
				var pageNumArr = [];
				for (let i = 0; i < this.pageNum; i++) {
					pageNumArr.push(i + 1);
				}
				return pageNumArr;
			},
			//计算显示的第一个页码
			getFirstPage() {
				let firstPage = 0;
				let a = Math.floor((this.showPageSize - 1) / 2);
				let b = Math.floor(this.showPageSize / 2) - 1;
				if (this.nowPage <= a) {
					if (!this.numAround) firstPage = 1;
					else firstPage = 2;
				} else if (this.nowPage >= this.pageNum - b) {
					if (this.forceEllipses || this.numAround) firstPage = this.pageNum - this.showPageSize + 3;
					else firstPage = this.pageNum - this.showPageSize + 1;
				} else {
					if (this.forceEllipses || this.numAround) firstPage = this.nowPage - a + 1;
					else firstPage = this.nowPage - a;
				}
				return firstPage;
			}
		},
		methods: {
			//选择页码
			clickPage(page) {
				if (this.nowPage != page) {
					this.nowPage = page;
					this.change(page, 'page');
				}
			},
			//点击上页
			clickPrev() {
				if (this.nowPage > 1) {
					let nowPage = this.nowPage - 1;
					this.nowPage = nowPage;
					this.change(nowPage, 'prev');
				}
			},
			//点击下页
			clickNext() {
				if (this.nowPage < this.pageNum) {
					let nowPage = this.nowPage + 1;
					this.nowPage = nowPage;
					this.change(nowPage, 'next');
				}
			},
			//点击首页
			clickStart() {
				if (this.nowPage != 1) {
					let nowPage = 1;
					this.nowPage = nowPage;
					this.change(nowPage, 'homePage');
				}
			},
			//点击尾页
			clickEnd() {
				if (this.nowPage != this.pageNum) {
					let nowPage = this.pageNum;
					this.nowPage = nowPage;
					this.change(nowPage, 'endPage');
				}
			},
			//页码改变时触发
			change(nowPage, type) {
				this.inputPage = nowPage;
				this.$emit('change', nowPage, type);
			},
			onInput(event) {
				let self = this;
				let val = parseInt(event.target.value.replace(/[^\d]/g, ''));
				setTimeout(function() {
					self.inputPage = val ? (val > self.pageNum ? self.pageNum : val) : '';
				}, 10)
			},
			goPage() {
				this.nowPage = parseInt(this.inputPage ? this.inputPage : '1');
				this.inputPage = parseInt(this.inputPage ? this.inputPage : '1');
				this.change(parseInt(this.inputPage), 'goPage');
			}
		}
	}
</script>

<style>
	@import 'icon/iconfont.css';

	.page-pagination {
		width: 100%;
	}

	.page-pagination .page-con {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.page-pagination .page-con .page-scroll {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		margin: 0 auto;
	}

	.page-pagination .page-con .page-scroll-child {
		display: flex;
		white-space: nowrap;
		height: 62rpx;
		line-height: 62rpx;
	}

	.page-pagination .page-con .page-scroll-child .pag-btn {
		background-color: #FFF;
		color: #1989FA;
		font-size: 24rpx;
		border: 1px solid #EBEEF5;
		border-left: none;
		padding: 0 22rpx;
	}

	.page-pagination .page-con .page-scroll-child .pag-btn.start,
	.page-pagination .page-con .page-scroll-child .pag-btn.prev,
	.page-pagination .page-con .page-scroll-child .pag-btn.next,
	.page-pagination .page-con .page-scroll-child .pag-btn.end {
		padding: 0 14rpx;
	}

	.page-pagination .page-con .page-scroll-child .ellipsis-btn {
		padding: 0 10rpx;
		color: #999999 !important;
	}

	.page-pagination .page-con .page-scroll-child .pag-btn:has(> .icon-more) {
		padding: 0 14rpx;
	}

	.page-pagination .page-con .page-scroll-child .pag-btn:first-child {
		border-left: 1px solid #EBEEF5;
	}

	.page-pagination .page-con .page-scroll-child .pag-btn.active {
		background-color: #1989FA;
		color: #FFFFFF !important;
	}

	.page-pagination .page-con .page-scroll-child .pag-btn.btn-ban {
		color: #C0C4CC !important;
		cursor: not-allowed;
	}

	.page-pagination .page-con .page-scroll-child .page-num {
		display: flex;
	}

	.page-pagination .page-con .page-scroll-child .page-num.simple {
		padding: 0 80rpx;
		line-height: 68rpx;
		color: #303133;
		font-size: 32rpx;
	}

	.page-pagination .page-con .page-scroll-child .icon-right,
	.page-pagination .page-con .page-scroll-child .icon-left {
		font-size: 26rpx;
	}

	.page-pagination .page-info {
		display: flex;
		justify-content: center;
		line-height: 56rpx;
		margin-top: 10rpx;
		color: #606266;
		font-size: 28rpx;
		text-align: center;
	}

	.page-pagination .page-info .page-info-con {
		display: flex;
	}

	.page-pagination .page-info .page-go {
		position: relative;
		top: -2rpx;
	}

	.page-pagination .page-info .page-go .page-input {
		display: inline-block;
		width: 80rpx;
		height: 52rpx;
		line-height: 52rpx;
		border: 1px solid #dcdfe6;
		border-radius: 8rpx;
		background-color: #FFF;
		padding: 0px 10rpx;
		margin: 0 10rpx;
		font-size: 28rpx;
		overflow: inherit;
		box-sizing: border-box;
	}

	.page-pagination .page-info .page-go .page-input-btn {
		height: 52rpx;
		line-height: 52rpx;
		padding: 4rpx 14rpx;
		border-width: 1px;
		border-style: solid;
		border-radius: 3px;
		border-color: #DCDFE6;
		color: #303133;
		margin-left: 10rpx;
		opacity: 0.8;
		background-color: #FFF;
	}

	// 大号按钮
	.page-pagination.size-large .page-con .page-scroll-child {
		height: 78rpx;
		line-height: 78rpx;
	}

	.page-pagination.size-large .page-con .page-scroll-child .pag-btn {
		padding: 0 30rpx;
		font-size: 30rpx;
	}

	.page-pagination.size-large .page-con .page-scroll-child .pag-btn.start,
	.page-pagination.size-large .page-con .page-scroll-child .pag-btn.prev,
	.page-pagination.size-large .page-con .page-scroll-child .pag-btn.next,
	.page-pagination.size-large .page-con .page-scroll-child .pag-btn.end,
	.page-pagination.size-large .page-con .page-scroll-child .ellipsis-btn {
		padding: 0 24rpx;
	}

	.page-pagination.size-large .page-con .page-scroll-child .pag-btn.btn-text {
		padding: 0 12rpx;
	}

	// 小型按钮
	.page-pagination.size-small .page-con .page-scroll-child {
		height: 52rpx;
		line-height: 52rpx;
	}

	.page-pagination.size-small .page-con .page-scroll-child .pag-btn {
		padding: 0 14rpx;
	}

	.page-pagination.size-small .page-con .page-scroll-child .pag-btn.start,
	.page-pagination.size-small .page-con .page-scroll-child .pag-btn.prev,
	.page-pagination.size-small .page-con .page-scroll-child .pag-btn.next,
	.page-pagination.size-small .page-con .page-scroll-child .pag-btn.end {
		padding: 0 10rpx;
	}

	.page-pagination.size-small .page-con .page-scroll-child .ellipsis-btn {
		padding: 0 10rpx;
	}

	//解决nvue页面下不能正常显示问题
	[nvue-dir-column] .page-pagination uni-label,
	[nvue-dir-column] .page-pagination uni-swiper-item,
	[nvue-dir-column] .page-pagination uni-view {
		flex-direction: initial;
	}
</style>
