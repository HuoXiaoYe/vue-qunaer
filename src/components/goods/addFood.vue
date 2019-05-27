<template>
	<div class="add-container">
		<transition>
			<div class="decrease" v-show="sonCount" @click.prevent.stop="decrease">-</div>
		</transition>
		<div class="text" v-show="sonCount">{{sonCount}}</div>
		<div class="increase" @click.prevent.stop="increase()">+</div>
		<transition @before-enter='beforeEnter'
		@enter='enter'
		@after-enter='afterEnter'>
			<div class="ball" v-show="ballFlag"></div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ballFlag : false,
				sonCount : 0
			}
		},
		props: {
			food: {
				type: Object
			},
			index : {
				type : Number
			},
			count : {
				type : Number,
				default : 0
			}
		},
		/* mounted(){
			this.sonCount = this.sonCount
		}, */
		watch: {
			count() {
				this.sonCount = this.count
			}
		},
		mounted(){
			this.sonCount = this.count
		},
		methods: {
			increase() {
				/* console.log(this.sonCount) */
				this.ballFlag = !this.ballFlag
				this.sonCount += 1
				var obj = {
					id: this.food.id,
					name: this.food.name,
					price: this.food.price,
					sonCount: 1
				};
				this.$store.commit('addFood', obj)
			},
			decrease(){
				this.sonCount--
				this.$store.state.selectFood.some((item) => {
					if (item.id == this.index) {
						item.sonCount -= 1;
						return true
					}
				})
			},
			beforeEnter(el){
				el.style.transform = 'translate(0,0)';
			},
			enter(el,done){
				el.offsetHeight;
				let ballPosition = el.getBoundingClientRect();
				let carPosition = document.getElementById('badge').getBoundingClientRect();
				
				let difX = carPosition.left - ballPosition.left;
				let difY = Math.abs(ballPosition.top - carPosition.top);
				el.style.transform = `translate(${difX}px,${difY}px)`;
				el.style.transition = 'all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
				done()
				
			},
			afterEnter(el){
				this.ballFlag = !this.ballFlag
			}
		}
	}
</script>

<style scoped="scoped">
	.v-enter, .v-leave-to{
		transform: translateX(20px) rotate(360deg);
		transform-origin: center;
	}
	.v-enter-active, .v-leave-active{
		transition: all 0.4s ease;
	}
	.add-container {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: flex-end;
		margin-right: .36rem;
		
	}

	.add-container .increase,
	.add-container .decrease {
		width: .48rem;
		height: .48rem;
		background-color: #00a0dc;
		border-radius: 50%;
		text-align: center;
		line-height: .48rem;
		font-size: .48rem;
		color: #fff;
	}

	.add-container .text {
		width: .48rem;
		line-height: .48rem;
		text-align: center;
		font-size: .2rem;
		color: rgb(147, 153, 159);
	}

	.add-container .decrease {
		box-sizing: border-box;
		border: 2px solid #00a0dc;
		background-color: #fff;
		line-height: .34rem;
		font-size: .64rem;
		color: #00a0dc;
	}


	.add-container .ball{
		position: absolute;
		width: .4rem;
		height: .4rem;
		right: .04rem;
		top: .04rem;
		border-radius: 50%;
		background-color: red;
	}

</style>
