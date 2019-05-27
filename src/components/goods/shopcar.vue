<template>
	<div class="shopcar-container" @click.stop.prevent="showDetail">
		<transition name='fade'>
			<div class="food-detail" v-show="detailShow">
				<transition name='animate'>
					<div class="food-wrapper" v-show="detailShow">
						<div class="header">
							<p class="name">购物车</p>
							<p class="empty" @click="empty">清空</p>
						</div>
						<div class="scrollwrapper" ref='scrollwrapper'>
							<ul class="food-item" v-show="$store.state.selectFood.length">
								<li class="item" v-for="item of $store.state.selectFood" v-if='item.sonCount' :key='item.id'>
									<p class="name">{{item.name}}</p>
									<p class="info">
										<span class='price'>￥{{item.price}}元</span>
										<span class="count">
											<addfood :food="item" :index="item.id" :count='item.sonCount'></addfood>
										</span>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>
		</transition>
		<div class="content-left">
			<div class="icon-wrapper-outter">
				<div id='badge' class="iconfont icon-wrapper-inner" :class="{activeColor : $store.getters.totalCount>0}">
					&#xe60d;
				</div>
				<span class="badge" v-show="$store.getters.totalCount>0">{{$store.getters.totalCount}}</span>
			</div>
			<div class="price">￥{{$store.getters.totalMoney}}</div>
			<div class="desc">
				{{$store.getters.more20}}
			</div>
		</div>
		<div class="content-right" :class="{payIt : $store.getters.totalMoney>=20}" @click.stop="eat">
			<div class="pay">去结算</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import addfood from './addFood.vue'
	export default {
		data() {
			return {
				detailShow: false,
				scroll: ''
			}
		},
		mounted() {
			console.log(this.$refs.scrollwrapper)

		},
		props: ['food'],
		components: {
			addfood
		},
		methods: {
			empty() {
				this.$store.commit("empty");
				this.detailShow = !this.detailShow
			},
			showDetail() {
				if (this.$store.state.selectFood && this.$store.state.selectFood.length) {
					this.detailShow = !this.detailShow;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.scrollwrapper, {
							click: true
						})
					})
				}
			},
			eat() {
				if (this.$store.getters.totalMoney < 20) {
					return
				} else {
					alert("您需要支付" + this.$store.getters.totalMoney + '元')
				}
			}
		},
	}
</script>

<style scoped="scoped">
	.shopcar-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: .96rem;
		background-color: #141d27;
		display: flex;
		color: rgba(255, 255, 255, .4);
		/* z-index: 999; */
	}

	.shopcar-container .content-left {
		/* position: relative; */
		/* z-index: 999; */
		flex: 1;
		display: flex;
	}

	.shopcar-container .content-left .icon-wrapper-outter {
		margin-left: .36rem;
		position: relative;
		/* z-index: 999; */
		top: -.2rem;
		width: 1.12rem;
		height: 1.12rem;
		border-radius: 50%;
		background-color: #141d27;
	}

	.shopcar-container .content-left .icon-wrapper-outter .badge {
		position: absolute;
		z-index: 999;
		top: -.06rem;
		left: .7rem;
		/* z-index: 999; */
		width: .48rem;
		height: .32rem;
		border-radius: .16rem;
		background-color: red;
		text-align: center;
		font-size: .28rem;
		font-weight: 700;
		line-height: .32rem;
		color: #fff;

	}

	.shopcar-container .content-left .icon-wrapper-inner {
		position: relative;
		top: .12rem;
		left: .12rem;
		width: .88rem;
		height: .88rem;
		border-radius: 50%;
		z-index: 99;
		background-color: #2b343c;
		text-align: center;
		line-height: .88rem;
		font-size: .48rem;
		/* z-index: 999; */
	}

	.shopcar-container .content-left .activeColor {
		background-color: #00a0dc;
		color: #fff;
		/* position: relative; */
		/* z-index: 999; */
	}

	.shopcar-container .content-left .price {
		margin: .24rem 0;
		padding: 0 .24rem;
		font-weight: 700;
		line-height: .48rem;
		font-size: .32rem;
		border-right: 1px solid rgba(255, 255, 255, .1);
		/* position: relative;
		z-index: 999; */
	}


	.shopcar-container .content-left .desc {
		padding: .24rem 0 .24rem .24rem;
		line-height: .48rem;
		font-size: .28rem;
		position: relative;
		z-index: 999;
	}

	.shopcar-container .content-right {
		width: 2rem;
		background-color: #2b333b;
		text-align: center;
		line-height: .96rem;
		/* 		position: relative;
		z-index: 999; */
	}

	.shopcar-container .payIt {
		background-color: #00a0dc;
		color: #fff;
	}

	.shopcar-container .food-detail {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 1.26rem;
		background-color: rgba(7, 17, 27, .8);
		overflow: hidden;
		/* background-color: red; */
	}

	.shopcar-container .food-detail .food-wrapper {
		/* height: 4rem; */
		position: absolute;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		background-color: #FFF;
		/* background-color: red; */
	}

	.shopcar-container .food-detail .header {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		height: .8rem;
		width: 100%;
		line-height: .8rem;
		padding: 0 .36rem;
		background-color: #eee;
	}

	.shopcar-container .food-detail .header .name {
		font-size: .28rem;
		font-weight: 500;
		color: rgb(7, 17, 27);
	}

	.shopcar-container .food-detail .header .empty {
		font-size: .24rem;
		color: rgb(0, 160, 220);
	}

	.shopcar-container .food-detail .scrollwrapper {
		height: 5rem;
		overflow: hidden;
	}

	.shopcar-container .food-detail .food-item {
		height: .96rem;
		padding: 0 .36rem .4rem;
		line-height: .96rem;
		background-color: #FFF;
		/* border-bottom: 1px solid rgba(7,17,27,0.1); */
		color: rgb(7, 17, 27);
	}

	.shopcar-container .food-detail .food-item .item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}

	.shopcar-container .food-detail .food-item .item .name {
		/* width: 100%; */
	}

	.shopcar-container .food-detail .food-item .item .info {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	.shopcar-container .food-detail .food-item .item .info .count {
		width: 2rem;
		padding-top: .24rem;
	}


	.shopcar-container .animate-enter,
	.shopcar-container .animate-leave-to {
		position: absolute;
		transform: translateY(300px);
		z-index: -1;
	}

	.animate-enter-active,
	.animate-leave-active {
		transition: transform .3s linear;
		position: absolute;
		z-index: -10;
	}

	/* 	.fade-enter-active,
	.fade-leave-active {
		opacity: 1 !important;
		transition: all 0.1s linear;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0 !important;
	} */
</style>
