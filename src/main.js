// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex);

import Axios from 'axios'

Vue.prototype.$axios = Axios


// 添加请求拦截器
Axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	if (config.method == 'post') {
		config.data = qs.stringify(config.data)
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});



var store = new Vuex.Store({
	state: {
		selectFood: []
	},
	mutations: {
		addFood(state, obj) {
			var flag = false;
			state.selectFood.some((item) => {
				if (item.id == obj.id) {
					item.sonCount += 1;
					flag = true;
					return true
				}
			})
			if (!flag) {
				state.selectFood.push(obj)
			}
			/* console.log(state.selectFood) */
		},
		empty(state) {
			state.selectFood.splice(0);
		}
	},
	getters: {
		more20(state) {
			var totalMoney = 0;
			state.selectFood.forEach((item) => {
				totalMoney += item.price * item.sonCount
			})
			if (totalMoney < 20) {
				var left = 20 - totalMoney;
				return `还需￥${left}元起送`
			} else {
				return "免运费"
			}
		},
		totalMoney(state) {
			var totalMoney = 0;
			state.selectFood.forEach((item) => {
				totalMoney += item.price * item.sonCount
			})
			return totalMoney
		},
		totalCount(state) {
			var totalCount = 0;
			state.selectFood.forEach((item) => {
				totalCount += item.sonCount
			})
			return totalCount
		},
		showCount(state) {
			var obj = {};
			state.selectFood.forEach((item) => {
				obj[item.id] = item.sonCount
			})
			return obj
		}
	}
})

import './common/fonts/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.filter('dataformat',function(msg){
	let time = new Date(msg);
	let yy = time.getFullYear();
	let mm = (time.getMonth() + 1);
	let dd = time.getDate()
	
	let h = time.getHours();
	let m = time.getMinutes();
	let s = time.getSeconds()
	
	return `${yy}/${mm}/${dd} ${h}:${m}:${s}`
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>',
	store
})
