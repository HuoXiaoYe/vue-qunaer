import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import main from '../components/home.vue'
import goods from '../components/goods/goods'
import comments from '../components/comments/comments'
import sellers from '../components/sellers/sellers'
/* import food from '../components/food/food' */
export default new Router({
	routes: [{
			path: '/',
			redirect: '/home/goods'
		}, {
			path: '/home',
			component: main,
			redirect: '/home/goods',
			children: [{
					path: 'goods',
					component: goods
				},
				{
					path: 'comments',
					component: comments
				},
				{
					path: 'sellers',
					component: sellers
				},
			]
		}
	],
	linkActiveClass: 'active'
})
