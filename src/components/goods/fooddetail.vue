<template>
	<!-- <div class="scroll-detail"> -->
	<div class="detail-wrapper" ref='detailwrapper'>
		<div>
			<span class="iconfont" @click="close">&#xe606;</span>
			<div class="img-wrapper" :v-show="food.image">
				<img :src="food.image">
			</div>
			<div class="info">
				<div class="name">{{food.name}}</div>
				<div class="sell">
					<span>月售{{food.sellCount}}份&nbsp;&nbsp;&nbsp;&nbsp;</span><span>好评率{{food.rating}}%</span>
				</div>
				<div class="price-buy">
					<div class="price">
						<div class="now">￥{{food.price}}</div>
						<div class="old" v-if="food.oldprice">￥{{food.oldprice}}</div>
					</div>
					<add v-show="$store.getters.showCount[food.id]" :food='food' :index='food.id' :count="$store.getters.showCount[food.id]"></add>
					<div v-show="!$store.getters.showCount[food.id]" class="buy" @click="add">
						加入购物车
					</div>
				</div>
			</div>
			<split v-if="food.info"></split>
			<div class="desc" v-if="food.info">
				<h1 class="title">商品介绍</h1>
				<p class="content">{{food.info}}</p>
			</div>
			<split></split>
			<div class="comment-wrapper">
				<div class="title">商品评论</div>
				<comment :comments='food.ratings'></comment>
			</div>
		</div>
	</div>
	<!-- </div> -->
</template>

<script>
	import split from './split.vue'
	import add from './addFood.vue'
	import Vue from 'vue'
	import comment from '../comments/comment'
	import BScroll from 'better-scroll'
	export default {
		props: {
			food: {
				type: Object,
				default () {
					return {
						image: '',
						name: '',
						price: ""
					}
				}
			},
		},
		components: {
			split,
			add,
			comment
		},
		data() {
			return {
				scroll: ''
			}
		},
		methods: {
			close() {
				this.$emit('func')
			},
			add() {
				var obj = {
					id: this.food.id,
					name: this.food.name,
					price: this.food.price,
					sonCount: 1
				};
				this.$store.commit('addFood', obj)
			}
		},
		mounted() {
			this.sccroll = new BScroll(this.$refs.detailwrapper, {
				click: true
			})
		}
	}
</script>

<style scoped="scoped">
	.detail-wrapper {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 1.12rem;
		background-color: #fff;
		overflow: hidden;
	}

	.detail-wrapper .iconfont {
		position: fixed;
		z-index: 999;
		top: .1rem;
		left: .1rem;
		padding: .2rem;
		font-size: .36rem;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		color: #fff;
	}

	.detail-wrapper .img-wrapper {
		width: 100%;
	}

	.detail-wrapper .img-wrapper img {
		width: 100%;
	}

	.detail-wrapper .info {
		padding: .36rem;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}

	.detail-wrapper .info .name {
		margin-bottom: .16rem;
		color: rgb(7, 17, 27);
		font-size: .28rem;
		line-height: .28rem;
	}

	.detail-wrapper .info .sell {
		margin-bottom: .36rem;
		line-height: .2rem;
		font-size: .2rem;
		color: rgb(147, 152, 159);
	}

	.detail-wrapper .info .price-buy {
		display: flex;
		justify-content: space-between;
		margin-bottom: .1rem;
	}

	.detail-wrapper .info .price-buy .price .now {
		line-height: .48rem;
		font-size: .28rem;
		color: red
	}

	.detail-wrapper .info .price-buy .price .old {
		line-height: .48rem;
		text-decoration: line-through;
		color: rgb(147, 153, 159);
		padding-left: .16rem;
		font-size: .2rem;
	}

	.detail-wrapper .info .price-buy .buy {
		width: 1.48rem;
		height: .48rem;
		border-radius: .24rem;
		text-align: center;
		line-height: .48rem;
		font-size: .2rem;
		color: #fff;
		background-color: rgb(0, 160, 220);
	}

	.detail-wrapper .desc {
		padding: .36rem;
	}

	.detail-wrapper .desc .title {
		margin-bottom: .12rem;
		font-size: .28rem;
	}

	.detail-wrapper .desc .content {
		padding: 0 .16rem;
		line-height: .48rem;
		font-size: .24rem;
		color: rgb(77, 85, 93);
	}


	.detail-wrapper .comment-wrapper {
		padding-top: .36rem;

	}

	.detail-wrapper .comment-wrapper .title {
		padding-bottom: .36rem;
		margin: 0 .36rem;
		font-size: .28rem;
		/* font-weight: 700; */

	}

	/* <div class="info">
		<div class="name">{{food.name}}</div>
		<div class="sell">
			<span>月售{{food.sellCount}}份&nbsp;&nbsp;&nbsp;&nbsp;</span><span>好评率{{food.rating}}%</span>
		</div>
		<div class="price-buy">
			<div class="price">
				<div class="now">￥{{food.price}}</div>
				<div class="old" v-if="food.oldprice">￥{{food.oldprice}}</div>
			</div>
			<div class="buy">
				加入购物车
			</div>
		</div>
	</div> */
</style>
