<template>
	<div class="sellers-container">
		<div class="header">
			<div class="name">{{seller.name}}</div>
			<div class="score">
				<star :size="48" :score="seller.score"></star>
				<span class="count">
					月售{{seller.sellCount}}单
				</span>
			</div>
			<ul class="list">
				<li class="item">
					<p class="desc">起送价</p>
					<p class="number">{{seller.minPrice}}<span>元</span></p>
				</li>
				<li class="item">
					<p class="desc">商家配送</p>
					<p class="number">{{seller.deliveryPrice}}<span>元</span></p>
				</li>
				<li class="item">
					<p class="desc">送达时间</p>
					<p class="number">{{seller.deliveryTime}}<span>分钟</span></p>
				</li>
			</ul>
		</div>
		<split></split>
		<div class="introduction">
			<div class="title">公告与活动</div>
			<p class="desc">
				{{seller.bulletin}}
			</p>
			<ul class="support">
				<li class="item" v-for="(item,index) of seller.supports" :key="index">
					<div :class="typeArr[seller.supports[index].type]"></div>
					<div class="content">
						{{seller.supports[index].description}}
					</div>
				</li>
			</ul>
		</div>
		<split></split>
		<div class="img">
			<h4 class="title">商家实景</h4>
			<div ref="scroll">
				<ul class="img-list">
					<li class="img-item" v-for="(item,index) of seller.pics" :key="index">
						<img :src="item" alt="">
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="info">
			<h4 class="title">
				商家信息
			</h4>
			<p>{{seller.infos[0]}}</p>
			<p>品类:{{seller.infos[1]}}</p>
			<p>地址:{{seller.infos[2]}}</p>
			<p>{{seller.infos[3]}}</p>

		</div>

	</div>
</template>

<script>
	import star from '../star/star.vue'
	import split from './split.vue'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				scroll: '',
				typeArr: ['type-one', 'type-two', 'type-three', 'type-four', 'type-five'],
				"seller": {
					"name": "粥品香坊（回龙观）",
					"description": "蜂鸟专送",
					"deliveryTime": 38,
					"score": 4.2,
					"serviceScore": 4.1,
					"foodScore": 4.3,
					"rankRate": 69.2,
					"minPrice": 20,
					"deliveryPrice": 4,
					"ratingCount": 24,
					"sellCount": 90,
					"bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
					"supports": [{
							"type": 0,
							"description": "在线支付满28减5"
						},
						{
							"type": 1,
							"description": "VC无限橙果汁全场8折"
						},
						{
							"type": 2,
							"description": "单人精彩套餐"
						},
						{
							"type": 3,
							"description": "该商家支持发票,请下单写好发票抬头"
						},
						{
							"type": 4,
							"description": "已加入“外卖保”计划,食品安全保障"
						}
					],
					"avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
					"pics": [
						"http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
						"http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
						"http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
						"http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
					],
					"infos": [
						"该商家支持发票,请下单写好发票抬头",
						"品类:其他菜系,包子粥店",
						"北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
						"营业时间:10:00-20:30"
					]
				}
			}
		},
		components: {
			star,
			split
		},
		mounted() {
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.scroll, {
					click: true,
					scrollX: true,
					eventPassthrough: 'vertical'
				})
				console.log(console.log(this.scroll));
			})


		}

	}
</script>

<style>
	.sellers-container {
		border-top: 1px solid #f3f5f7;
		padding-bottom: .86rem;
	}

	.sellers-container .header {
		padding: .36rem;
	}

	.sellers-container .header .name {
		font-size: .28rem;
		color: rgb(7, 17, 27);
		line-height: .28rem;
	}

	.sellers-container .header .score {
		display: flex;
		padding: .16rem 0 .36rem 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}

	.sellers-container .header .star-container {
		width: 2rem;
		margin: -.2rem 0 .16rem 0;
	}

	.sellers-container .header .count {
		margin-top: .1rem;
		font-size: .24rem;

		line-height: .36rem;
		padding-left: .24rem;
	}

	.sellers-container .header .list {
		padding-top: .36rem;
		display: flex;
	}

	.sellers-container .header .list .item {
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
	}

	.sellers-container .header .list .item:last-child {
		border-right: none;
	}

	.sellers-container .header .list .item .desc {
		font-size: .2rem;
		color: rgb(147, 153, 159);
		line-height: .2rem;
		padding-bottom: .18rem;
	}

	.sellers-container .header .list .item .number {
		font-size: .48rem;
		font-weight: 500;
		color: rgb(7, 17, 27);
	}

	.sellers-container .header .list .item .number span {
		font-size: .24rem;
	}

	.sellers-container .introduction {
		padding: .36rem .24rem;
	}

	.sellers-container .introduction .title {
		padding-bottom: .16rem;
		font-size: .36rem;
	}

	.sellers-container .introduction .desc {
		font-size: .24rem;
		font-weight: 200;
		color: rgb(240, 20, 20);
		line-height: .48rem;
		padding: 0 .24rem .36rem .24rem;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}

	.sellers-container .support {}

	.sellers-container .support .item {
		display: flex;
		padding: .32rem;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}

	.sellers-container .support .item:last-child {
		border-bottom: none;
	}

	.sellers-container .support .item .content {
		flex: 1;
		font-size: .24rem;
		line-height: .32rem;
		padding-left: .12rem;
	}

	.sellers-container .img {
		padding: .36rem;
	}

	.sellers-container .img .title {
		padding-bottom: .24rem;
	}

	.sellers-container .img div {
		overflow: hidden;
	}

	.sellers-container .img .img-list {
		width: 145%;
		display: flex;
	}

	.sellers-container .img .img-list .img-item {
		margin-right: .12rem;
	}

	.sellers-container .img .img-list .img-item img {
		width: 2.4rem;
		height: 1.8rem;
	}

	.sellers-container .info{
		padding: .36rem;
	}
	.sellers-container .info .title{
		padding-bottom: .24rem;
	}
	.sellers-container .info p{
		padding: .32rem .24rem;
		border-top: 1px solid rgba(7,17,27,0.1);
		font-size: .24rem;
		line-height: .32rem;
	}
	/*
		<div class="info">
			<h4 class="title">
				商家信息
			</h4>
			<p>{{seller.infos[0]}}</p>
			<p>品类:{{seller.infos[1]}}</p>
			<p>地址:{{seller.infos[2]}}</p>
			<p>{{seller.infos[3]}}</p>
			
		</div> */






	/* 满减 */
	.sellers-container .type-one {
		width: .32rem;
		height: .32rem;
		background-size: .32rem .32rem;
		background-image: url('./decrease_2@3x.png');
	}

	/* 八折 */
	.sellers-container .type-two {
		width: .32rem;
		height: .32rem;
		background-size: .32rem .32rem;
		background-image: url('./discount_2@3x.png');
	}

	/* 套餐 */
	.sellers-container .type-three {
		width: .32rem;
		height: .32rem;
		background-size: .32rem .32rem;
		background-image: url('./special_2@3x.png');
	}

	/* 支持发票 */
	.sellers-container .type-four {
		width: .32rem;
		height: .32rem;
		background-size: .32rem .32rem;
		background-image: url('./invoice_2@3x.png');
	}

	/* ‘外卖保’ 计划 */
	.sellers-container .type-five {

		width: .32rem;
		height: .32rem;
		background-size: .32rem .32rem;
		background-image: url('./guarantee_2@3x.png');
	}
</style>
