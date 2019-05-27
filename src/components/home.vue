<template>
	<div class="main-contaienr">
		<v-header></v-header>
		<div class="tab-contaienr">
			<router-link tag='div' to='/home/goods' class="tab-item">商品</router-link>
			<router-link tag='div' to='/home/comments' class="tab-item">评论</router-link>
			<router-link tag='div' to='/home/sellers' class="tab-item">商家</router-link>
		</div>
		<router-view></router-view>
		<shopcar></shopcar>
	</div>
</template>

<script>
	import VHeader from './header/header'
	import shopcar from './goods/shopcar.vue'
	export default {
		name : 'home',
		data(){
			return {
				data : {}
			}
		},
		components: {
			VHeader,
			shopcar
		},
		methods : {
			getInfo(){
				this.$axios.get('/api/seller').then((res) => {
					console.log(res.data.data)
				})
			}
		},
		created(){
			this.getInfo()
		}
	}
</script>

<style scoped="scoped">
	.main-contaienr {
		overflow: hidden !important;
	}

	.main-contaienr .tab-contaienr {
		display: flex;
	}

	.main-contaienr .tab-contaienr .tab-item {
		flex: 1;
		text-align: center;
		height: .86rem;
		line-height: .86rem;
		font-size: .28rem;
		color: rgb(77, 85, 93);
	}

	.main-contaienr .tab-contaienr .active {
		color: rgb(240, 20, 20);
	}

	/* .v-enter {
		opacity: 0;
		transform: translateX(100%);
		position: fixed;
		overflow: hidden;
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: fixed;
		overflow: hidden;
	}
	.v-enter-active, .v-leave-to{
		transition: all 0.3s linear;
		overflow: hidden;
	} */
</style>
