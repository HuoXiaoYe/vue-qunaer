<template>
	<div class="star-container">
		<ul class="star-list" :class='getSize'>
			<li v-for="(item, index) of starArr" :key='index' :class="item"></li>
		</ul>
	</div>
</template>

<script>
	export default{
		props: ['size','score'],
		computed: {
			getSize() {
				return  'star-' + this.size 
			},
			starArr(){
				var result = [];
				var hasHalf = Math.floor(this.score * 2) % 2;
				var number = Math.floor(this.score);
				
				for(var i=0; i<number; i++){
					result.push('on')
				}
				if(hasHalf){
					result.push('half')
				}
				while(result.length < 5){
					result.push('off')
				}
				return result
			}
		},
	}
</script>

<style scoped="scoped">
	.star-container{
		width: 60%;
		margin: 0 auto;
	}
	.star-container .star-list{
		display: flex;
		justify-content: space-between;
		margin-top: .32rem;
		line-height: .48rem;
	}
	.star-container .star-48{}
	.star-container .star-48 .on{
		width: .30rem;
		height: .30rem;
		background-size: .30rem .30rem;
		background-repeat: no-repeat;
		background-image: url('./star48_on@3x.png');
	}
	.star-container .star-48 .half{
		width: .30rem;
		height: .30rem;
		background-size: .30rem .30rem;
		background-repeat: no-repeat;
		background-image: url('./star48_half@3x.png');
	}
	.star-container .star-48 .off{
		width: .30rem;
		height: .30rem;
		background-size: .30rem .30rem;
		background-repeat: no-repeat;
		background-image: url('./star48_off@3x.png');
	}
	
	
	
	.star-container .star-36{}
	.star-container .star-36 .on{
		width: .22rem;
		height: .22rem;
		background-size: .22rem .22rem;
		background-repeat: no-repeat;
		background-image: url('./star36_on@3x.png');
	}
	.star-container .star-36 .half{
		width: .22rem;
		height: .22rem;
		background-size: .22rem .22rem;
		background-repeat: no-repeat;
		background-image: url('./star36_half@3x.png');
	}
	.star-container .star-36 .off{
		width: .22rem;
		height: .22rem;
		background-size: .22rem .22rem;
		background-repeat: no-repeat;
		background-image: url('./star36_off@3x.png');
	}
	
	
	
	.star-container .star-24{}
	.star-container .star-24 .on{
		width: .10rem;
		height: .10rem;
		background-size: .10rem .10rem;
		background-repeat: no-repeat;
		background-image: url('./star24_on@3x.png');
	}
	.star-container .star-24 .half{
		width: .10rem;
		height: .10rem;
		background-size: .10rem .10rem;
		background-repeat: no-repeat;
		background-image: url('./star24_half@3x.png');
	}
	.star-container .star-24 .off{
		width: .10rem;
		height: .10rem;
		background-size: .10rem .10rem;
		background-repeat: no-repeat;
		background-image: url('./star24_off@3x.png');
	}
	
	
</style>
