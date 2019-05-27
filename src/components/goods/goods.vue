<template>
	<div class="goods-container">
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul class="list">
				<li class="item" v-for="(item,index) of goods" @click="changeActive(index)" :class="{myactive : active == index}"
				 :key='index'>{{item.name}}
				 </li>
			</ul>
		</div>
		<div class="food-wrapper" ref="foodWrapper">
			<ul class="food-list" ref="foodList">
				<li class="food-items" v-for="(item,index) of goods" :key='index'>
					<h1 class="title">{{item.name}}</h1>
					<ul class="items-list">
						<li class="item-food" @click="showDetail(food)" v-for="(food, index) of item.foods" :key='index'>
							<div class="img-wrapper">
								<img :src="food.icon">
							</div>
							<div class="info">
								<div class="title">{{food.name}}</div>
								<div class="desc">{{food.description}}</div>
								<div class="sell">
									<p>月售{{food.sellCount}}份&nbsp;&nbsp;&nbsp;&nbsp;</p>
									<p>好评率{{food.rating}}%</p>
								</div>
								<div class="price">
									<div>
										<div class="now">￥{{food.price}}</div>
										<div class="old" v-if="food.oldprice">￥{{food.oldprice}}</div>
									</div>
									<add :food='food' :index='food.id' :count="$store.getters.showCount[food.id]"></add>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		
		<transition>
			<fooddetail v-show="detailShow" @func='showDetail' :food='foodinfo'></fooddetail>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcar from './shopcar.vue'
	import add from './addFood.vue'
	import fooddetail from './fooddetail.vue'
	export default {
		data() {
			return {
				foodinfo : {},
				detailShow : false,
				selectedFood : [
					
				],
				heightArr: [],
				scrollY: 0,
				foodList: '',
				foodScroll: '',
				menuScroll: '',
				"goods": [{
						"name": "热销榜",
						"type": -1,
						"foods": [{
								"id" : 1,
								"name": "皮蛋瘦肉粥",
								"price": 10,
								"oldPrice": "",
								"description": "咸粥",
								"sellCount": 229,
								"rating": 100,
								"info": "一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "很喜欢的粥",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 1,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 2,
								"name": "扁豆焖面",
								"price": 14,
								"oldPrice": "",
								"description": "",
								"sellCount": 188,
								"rating": 96,
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 1,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"info": "",
								"icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 3,
								"name": "葱花饼",
								"price": 10,
								"oldPrice": "",
								"description": "",
								"sellCount": 124,
								"rating": 85,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 1,
										"text": "没啥味道",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 1,
										"text": "很一般啊",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 4,
								"name": "牛肉馅饼",
								"price": 14,
								"oldPrice": "",
								"description": "",
								"sellCount": 114,
								"rating": 91,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 1,
										"text": "难吃不推荐",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 5,
								"name": "招牌猪肉白菜锅贴/10个",
								"price": 17,
								"oldPrice": "",
								"description": "",
								"sellCount": 101,
								"rating": 78,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 1,
										"text": "不脆,不好吃",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 6,
								"name": "南瓜粥",
								"price": 9,
								"oldPrice": "",
								"description": "甜粥",
								"sellCount": 91,
								"rating": 100,
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 8,
								"name": "红豆薏米美肤粥",
								"price": 12,
								"oldPrice": "",
								"description": "甜粥",
								"sellCount": 86,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 9,
								"name": "八宝酱菜",
								"price": 4,
								"oldPrice": "",
								"description": "",
								"sellCount": 84,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 10,
								"name": "红枣山药糙米粥",
								"price": 10,
								"oldPrice": "",
								"description": "",
								"sellCount": 81,
								"rating": 91,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 11,
								"name": "糊塌子",
								"price": 10,
								"oldPrice": "",
								"description": "",
								"sellCount": 80,
								"rating": 93,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					},
					{
						"name": "单人精彩套餐",
						"type": 2,
						"foods": [{
							"id" : 12,
							"name": "红枣山药粥套餐",
							"price": 29,
							"oldPrice": 36,
							"description": "红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注",
							"sellCount": 17,
							"rating": 100,
							"info": "",
							"ratings": [{
								"username": "2******3",
								"rateTime": 1469271264000,
								"rateType": 0,
								"text": "",
								"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
							}],
							"icon": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114",
							"image": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750"
						}]
					},
					{
						
						"name": "冰爽饮品限时特惠",
						"type": 1,
						"foods": [{
							"id" : 13,
							"name": "VC无限橙果汁",
							"price": 8,
							"oldPrice": 10,
							"description": "",
							"sellCount": 15,
							"rating": 100,
							"info": "",
							"ratings": [{
									"username": "3******c",
									"rateTime": 1469281964000,
									"rateType": 0,
									"text": "还可以",
									"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
								},
								{
									"username": "2******3",
									"rateTime": 1469271264000,
									"rateType": 0,
									"text": "",
									"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
								}
							],
							"icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
							"image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
						}]
					},
					{
						"name": "精选热菜",
						"type": -1,
						"foods": [{
							"id" : 14,
								"name": "娃娃菜炖豆腐",
								"price": 17,
								"oldPrice": "",
								"description": "",
								"sellCount": 43,
								"rating": 92,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "菜量还可以,味道还可以",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 15,
								"name": "手撕包菜",
								"price": 16,
								"oldPrice": "",
								"description": "",
								"sellCount": 29,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 16,
								"name": "香酥黄金鱼/3条",
								"price": 11,
								"oldPrice": "",
								"description": "",
								"sellCount": 15,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					},
					{
						"name": "爽口凉菜",
						"type": -1,
						"foods": [{
							"id" : 17,
								"name": "八宝酱菜",
								"price": 4,
								"oldPrice": "",
								"description": "",
								"sellCount": 84,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 18,
								"name": "拍黄瓜",
								"price": 9,
								"oldPrice": "",
								"description": "",
								"sellCount": 28,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					},
					{
						"name": "精选套餐",
						"type": -1,
						"foods": [{
							"id" : 19,
								"name": "红豆薏米粥套餐",
								"price": 37,
								"oldPrice": "",
								"description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
								"sellCount": 3,
								"rating": 100,
								"info": "",
								"ratings": [{
									"username": "2******3",
									"rateTime": 1469271264000,
									"rateType": 0,
									"text": "",
									"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
								}],
								"icon": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 20,
								"name": "皮蛋瘦肉粥套餐",
								"price": 31,
								"oldPrice": "",
								"description": "",
								"sellCount": 12,
								"rating": 100,
								"info": "",
								"ratings": [{
									"username": "2******3",
									"rateTime": 1469271264000,
									"rateType": 0,
									"text": "",
									"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
								}],
								"icon": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					},
					{
						"name": "果拼果汁",
						"type": -1,
						"foods": [{
							"id" : 21,
								"name": "蜜瓜圣女萝莉杯",
								"price": 6,
								"oldPrice": "",
								"description": "",
								"sellCount": 1,
								"rating": "",
								"info": "",
								"ratings": [],
								"icon": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 22,
								"name": "加多宝",
								"price": 6,
								"oldPrice": "",
								"description": "",
								"sellCount": 7,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 23,
								"name": "VC无限橙果汁",
								"price": 8,
								"oldPrice": 10,
								"description": "",
								"sellCount": 15,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "还可以",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					},
					{
						"name": "小吃主食",
						"type": -1,
						"foods": [{
							"id" : 24,
								"name": "扁豆焖面",
								"price": 14,
								"oldPrice": "",
								"description": "",
								"sellCount": 188,
								"rating": 96,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 1,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 25,
								"name": "葱花饼",
								"price": 10,
								"oldPrice": "",
								"description": "",
								"sellCount": 124,
								"rating": 85,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 1,
										"text": "没啥味道",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 1,
										"text": "很一般啊",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 26,
								"name": "牛肉馅饼",
								"price": 14,
								"oldPrice": "",
								"description": "",
								"sellCount": 114,
								"rating": 91,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 1,
										"text": "难吃不推荐",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 27,
								"name": "招牌猪肉白菜锅贴/10个",
								"price": 17,
								"oldPrice": "",
								"description": "",
								"sellCount": 101,
								"rating": 78,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 1,
										"text": "不脆,不好吃",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 28,
								"name": "糊塌子",
								"price": 10,
								"oldPrice": "",
								"description": "",
								"sellCount": 80,
								"rating": 93,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					},
					{
						"name": "特色粥品",
						"type": -1,
						"foods": [{
							"id" : 29,
								"name": "皮蛋瘦肉粥",
								"price": 10,
								"oldPrice": "",
								"description": "咸粥",
								"sellCount": 229,
								"rating": 100,
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "很喜欢的粥",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 1,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 30,
								"name": "南瓜粥",
								"price": 9,
								"oldPrice": "",
								"description": "甜粥",
								"sellCount": 91,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 31,
								"name": "红豆薏米美肤粥",
								"price": 12,
								"oldPrice": "",
								"description": "甜粥",
								"sellCount": 86,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 32,
								"name": "红枣山药糙米粥",
								"price": 10,
								"oldPrice": "",
								"description": "",
								"sellCount": 81,
								"rating": 91,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 33,
								"name": "鲜蔬菌菇粥",
								"price": 11,
								"oldPrice": "",
								"description": "咸粥",
								"sellCount": 56,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": ""
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
							},
							{
								"id" : 34,
								"name": "田园蔬菜粥",
								"price": 10,
								"oldPrice": "",
								"description": "咸粥",
								"sellCount": 33,
								"rating": 100,
								"info": "",
								"ratings": [{
										"username": "3******c",
										"rateTime": 1469281964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "2******3",
										"rateTime": 1469271264000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									},
									{
										"username": "3******b",
										"rateTime": 1469261964000,
										"rateType": 0,
										"text": "",
										"avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
									}
								],
								"icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
								"image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
							}
						]
					}
				]
			}
		},
		computed: {
			active() {
				for (var i = 0; i < this.heightArr.length; i++) {
					let height1 = this.heightArr[i];
					let height2 = this.heightArr[i + 1];
					if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
						return i;
					}
				}
				return 0;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initScroll()
			});
			this.computedHeight()
		},
		methods: {
			showDetail(food) {
				this.detailShow = !this.detailShow;
				this.foodinfo = food;
			},
			changeActive(index) {
				this.foodScroll.scrollToElement(this.foodList.children[index], 300)
			},
			initScroll() {
				this.foodList = this.$refs.foodList;
				var el = this.$refs["menuWrapper"];
				this.menuScroll = new BScroll(el, {
					click: true
				});
				el = this.$refs["foodWrapper"];
				this.foodScroll = new BScroll(el, {
					click: true,
					probeType: 3
				});
				this.foodScroll.on('scroll', (location) => {
					this.scrollY = Math.abs(Math.floor(location.y))

				})
			},
			computedHeight() {
				var height = 0;
				this.heightArr.push(height);
				var liArr = document.getElementsByClassName("food-items");
				for (var i = 0; liArr[i]; i++) {
					height += liArr[i].clientHeight;
					this.heightArr.push(height);
				}
			}
		},
		components: {
			add,
			fooddetail,
			shopcar
		}
	}
</script>

<style scoped="scoped">
	
	
	.v-enter-active,
	.v-leave-active {
		transition: all 0.33s linear;
	}
	
	
	.v-enter,
	.v-leave-to {
		transform: translateX(100%);
	}
	
	
	.goods-container {
		width: 100%;
		display: flex;
		position: absolute;
		top: 3.7rem;
		bottom: 1.26rem;
		overflow: hidden;
		border-top: 1px solid rgba(7, 17, 27, .1);
	}

	.goods-container .menu-wrapper {
		width: 1.6rem;
		/* padding: 0 .24rem; */
		background-color: #f3f5f7;
	}

	.goods-container .menu-wrapper .list {}

	.goods-container .menu-wrapper .list .item {
		padding: .3rem .24rem;
		border-bottom: 2px solid rgba(7, 17, 27, 0.1);
		line-height: .28rem;
		font-size: .24rem;
		text-align: center;
		border-right: 2px solid rgba(7, 17, 27, 0.1);
	}

	.goods-container .menu-wrapper .list .myactive {
		background-color: #fff;
		color: rgb(240, 20, 20);
		font-size: .24rem;
	}

	.goods-container .food-wrapper {
		flex: 1;
	}

	.goods-container .food-list {}

	.goods-container .food-list h1.title {
		width: 100%;
		height: .52rem;
		background-color: #f3f5f7;
		line-height: .52rem;
		font-size: .24rem;
		color: rgb(147, 153, 159);
		padding-left: .28rem;
		/* border-left: 2px solid #d9dde1; */
	}

	.goods-container .food-list .items-list {}

	.goods-container .food-list .items-list .item-food {
		margin: .36rem .36rem 0 .36rem;
		padding-bottom: .36rem;
		display: flex;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}

	.goods-container .food-list .items-list .item-food .img-wrapper {
		width: 1.2rem;
	}

	.goods-container .food-list .items-list .item-food .img-wrapper img {
		width: 100%;
	}

	.goods-container .food-list .items-list .item-food .info {
		margin-left: .2rem;
		font-size: .2rem;
		flex: 1;
	}

	.goods-container .food-list .items-list .item-food .info .title {
		margin-top: .04rem;
		margin-bottom: .16rem;
		line-height: .28rem;
		color: rgb(7, 17, 27);
	}

	.goods-container .food-list .items-list .item-food .info .desc,
	.goods-container .food-list .items-list .item-food .info .sell {
		margin-bottom: .16rem;
		color: rgb(147, 153, 159);
		line-height: .2rem;
	}

	.goods-container .food-list .items-list .item-food .info .sell {
		display: flex;
	}

	.goods-container .food-list .items-list .item-food .info .price {
		display: flex;
		justify-content: space-between;
	}

	.goods-container .food-list .items-list .item-food .info .price .now {
		line-height: .28rem;
		font-size: .28rem;
		color: red
	}

	.goods-container .food-list .items-list .item-food .info .price .old {
		line-height: .28rem;
		text-decoration: line-through;
		color: rgb(147, 153, 159);
		padding-left: .16rem;
		font-size: .2rem;
	}

	/* <ul class="food-list">
				<li class="food-items">
					<h1 class="title">热销榜</h1>
					<ul class="items-list">
						<li class="item-food">
							<div class="img-wrapper">
								<img src="http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750" alt="">
							</div>
							<div class="info">
								<div class="title">皮蛋瘦肉粥</div>
								<div class="desc">咸粥</div>
								<div class="sell">
									<p>月售1132份</p>
									<p>好评率100%</p>
								</div>
								<div class="price">
									<div class="now">￥24</div>
									<div class="old">￥28</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul> */
</style>
