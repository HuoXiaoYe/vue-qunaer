<template>
	<div class="header-container">
		<div class="bgImg">
			<img :src="seller.avatar" alt="">
		</div>
		<div class="header-top">
			<div class="img-wrapper">
				<img :src="seller.avatar">
			</div>
			<div class="introduction">
				<div class="title">
					<div class="brand"></div>
					<p class="name">{{seller.name}}</p>
				</div>
				<div class="deliver">
					{{seller.description}}&nbsp;/&nbsp;{{seller.deliveryTime}}送达
				</div>
				<div class="discount">
					<div class="content-box">
						<div :class="typeArr[seller.supports[0].type]"></div>
						<div class="content">
							{{seller.supports[0].description}}
						</div>
					</div>
					<div class="icon-box" @click="isShow = !isShow">
						<div class="number">{{seller.supports.length}}个</div>
						<div class="iconfont arrow">&#xe61f;</div>
					</div>


				</div>
			</div>
		</div>
		<div class="header-bottom" @click="isShow = !isShow">
			<div class="bottom-img">
				<img src="./bulletin@2x.png" alt="">
			</div>
			<div class="info">
				{{seller.bulletin}}
			</div>
			<div class="iconfont arrow">&#xe61f;</div>

		</div>
		<transition name="fade">
			<div class="mask" @click="isShow = !isShow" v-if="isShow">
				<div class="mask-wrapper">
					<div class="header">
						<h3 class="name">{{seller.name}}</h3>
						<div class="star">
							<star :size="48" :score='seller.score'></star>
						</div>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="list">
						<li class="item" v-for="(item,index) of seller.supports" :key="index">
							<div class="icon" :class="typeArr[item.type]"></div>
							<div class="content">{{item.description}}</div>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p>{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from '../star/star.vue'
	export default {
		components: {
			star
		},
		data() {
			return {
				isShow: false,
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
							"description": "在线支付满28减5 , 满50减10"
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
		}
	}
</script>

<style scoped="scoped">
	
	.fade-enter-active, .fade-leave-active{
		opacity: 1 !important;
		/* background-color: rgba(7, 17, 27, .8) !important; */
		transition: all 0.4s linear;
	}
	
	.fade-enter, .fade-leave-to{
		opacity: 0 !important;
	}
	
	
	
	
	.header-container {
		background-color: rgba(7, 17, 27, .5);
		color: #fff;
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.header-container .bgImg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.header-container .bgImg img{
		width: 100%;
		height: 100%;
		filter: blur(4px);
	}

	.header-container .header-top {
		padding: .48rem .24rem .36rem .48rem;
		display: flex;
	}

	.header-container .header-top .img-wrapper {
		width: 1.28rem;
		height: 1.28rem;
	}

	.header-container .header-top .img-wrapper img {
		width: 100%;
		height: 100%;
		border-radius: .2rem;
	}

	.header-container .header-top .introduction {
		padding-left: .32rem;
		flex: 1;
	}

	.header-container .header-top .introduction .title {
		display: flex;
		line-height: .36rem;
		padding-bottom: .16rem;
		font-size: .32rem;
		font-weight: bold;
	}

	.header-container .header-top .introduction .title .brand {
		width: .5rem;
		height: .32rem;
		background-image: url('./brand@3x.png');
		background-size: .5rem .32rem;
		margin-right: .12rem;
	}

	.header-container .header-top .introduction .deliver {
		line-height: .50rem;
		font-weight: 200;
		font-size: .24rem;
	}
	.header-container .header-top .introduction .discount {
		display: flex;
		justify-content: space-between;
	}
	.header-container .header-top .introduction .discount .content-box{
		display: flex;
	}

	.header-container .header-top .introduction .discount .type-one {
		margin: 0.12rem .08rem .04rem 0;
	}

	.header-container .header-top .introduction .discount .content{
		line-height: .50rem;
		font-size: .2rem;
	}
	
	/* <div class="icon-box">
		<div class="number">{{seller.supports.length}}</div>
		<div class="iconfont arrow">&#xe61f;</div>
	</div> */
	.header-container .header-top .introduction .discount .icon-box{
		width: 1rem;
		height: .5rem;
		line-height: .5rem;
		border-radius: .2rem;
		display: flex;
		justify-content: space-around;
		background-color: rgba(7, 17, 27, .2);
	}
	.header-container .header-top .introduction .discount .icon-box .number{
		flex: 4;
		line-height: .5rem;
		text-align: right;
		font-size: .2rem;
	}
	.header-container .header-top .introduction .discount .icon-box .arrow{
		flex: 3;
		text-align: center;
		line-height: .5rem;
		font-size: .2rem;
	}
	
	

	/* 满减 */
	.header-container .type-one {
		width: .2rem;
		height: .2rem;
		background-size: .2rem .2rem;
		background-image: url('./decrease_2@3x.png');
	}

	/* 八折 */
	.header-container .type-two {
		width: .2rem;
		height: .2rem;
		background-size: .2rem .2rem;
		background-image: url('./discount_2@3x.png');
	}

	/* 套餐 */
	.header-container .type-three {
		width: .2rem;
		height: .2rem;
		background-size: .2rem .2rem;
		background-image: url('./special_2@3x.png');
	}

	/* 支持发票 */
	.header-container .type-four {
		width: .2rem;
		height: .2rem;
		background-size: .2rem .2rem;
		background-image: url('./invoice_2@3x.png');
	}

	/* ‘外卖保’ 计划 */
	.header-container .type-five {

		width: .2rem;
		height: .2rem;
		background-size: .2rem .2rem;
		background-image: url('./guarantee_2@3x.png');
	}

	.header-container .header-bottom {
		background-color: rgba(7, 17, 27, .2);
		height: .56rem;
		line-height: .56rem;
		padding: 0 .24rem;
		display: flex;
	}

	.header-container .header-bottom .bottom-img {
		width: 2rem;
		/* height: .25rem; */
		margin-right: .08rem;
		margin-top: -0.04rem;
	}

	.header-container .header-bottom .bottom-img img {
		width: 100%;
		/* height: 100%; */
	}

	.header-container .header-bottom .info {
		line-height: .56rem;
		font-size: .2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.header-container .header-bottom .arrow {
		font-size: .2rem;
		padding-left: .08rem;
	}

	.header-container .mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		height: 100%;
		background-color: rgba(7, 17, 27, .8);
	}

	/* .header-container .show {
		display: none;
	} */
	.header-container .mask .mask-wrapper{
		margin: 1.28rem .72rem .64rem .72rem
	}
	.header-container .mask .mask-wrapper .header{}
	.header-container .mask .mask-wrapper .header .name{
		text-align: center;
		line-height: .32rem;
		font-size: .32rem;
		font-weight: 700;
	}
	.header-container .mask .mask-wrapper .header .star{}
	
	.header-container .mask .mask-wrapper .title{
		margin-top: .56rem;
		margin-bottom: .48rem;
		display: flex;
	}
	.header-container .mask .mask-wrapper .title .line{
		flex: 1;
		position: relative;
		top: -.06rem;
		border-bottom: 1px solid rgba(255,255,255,.8);
	}
	.header-container .mask .mask-wrapper .title .text{
		padding: 0 .24rem;
		line-height: .13rem;
		font-size: .13rem;
	}
	.header-container .mask .mask-wrapper .list .item{
		display: flex;
		margin-bottom: .24rem;
	}
	.header-container .mask .mask-wrapper .list .item .content{
		padding-left: .12rem;
		line-height: .2rem;
		font-size: .2rem;
	}
	.header-container .mask .mask-wrapper .bulletin{}
	
	.header-container .mask .mask-wrapper .bulletin p{
		line-height: .48rem;
		font-size: .24rem;
		font-weight: 200;
		text-indent: 2em;
	}
	/* 
			<div class="title">
				<div class="line"></div>
				<div class="text">优惠信息</div>
				<div class="line"></div>
			</div>
			<div class="bulletin">
				<p>{{seller.bulletin}}</p>
			</div>
		</div>
	</div> */
	
</style>
