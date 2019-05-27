<template>
	<div class="comment">
		<ul class="comment-type">
			<li class="block" @click="changeType('all')" :class="{active : selectedType === 'all'}">{{commentDesc.all}} <span>{{comments.length}}</span></li>
			<li class="block" @click="changeType('positive')" :class="{active : selectedType === 'positive'}">{{commentDesc.positive}} <span>{{count.positive}}</span></li>
			<li class="block" @click="changeType('negative')" :class="{active : selectedType === 'negative'}">{{commentDesc.negative}}<span>{{count.negative}}</span></li>
		</ul>
		<div class="switch">
			<div class="iconfont" @click="changeColor" :class="{on : onlyContent}">&#xe605;</div>
			<p class="content">只看有内容的评价</p>
		</div>
		<ul class="comment-list">
			<li class="item" v-for="(item,index) of comments" :key="index" v-show="isShow(item.rateType,item.text)">
				<div class="header">
					<div class="time">{{item.rateTime | dataformat}}</div>
					<div class="avatar">
						<div class="username">{{item.username}}</div>
						<img :src="item.avatar">
					</div>
				</div>
				<div class="content">
					<span class="iconfont good" v-if="item.rateType == 0">&#xe64c;</span>
					<span class="iconfont bad" v-if="item.rateType == 1">&#xe8c8;</span>
					{{item.text}}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			comments: {
				type : Array,
				default(){
					return []
				}
			},
			commentDesc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		data() {
			return {
				onlyContent: false,
				selectedType: 'all'
			}
		},
		computed: {
			count() {
				let obj = {
					positive : 0,
					negative : 0
				};
				this.comments.forEach((item)=>{
					if(item.rateType == 0){
						obj.positive += 1;
					}
					if(item.rateType == 1){
						obj.negative += 1;
					}
				})
				return obj
			}
		},
		methods: {
			isShow(type, text) {
				if(this.selectedType == 'all'){
					if(this.onlyContent){
						return text
					}else{
						return true
					}
					
				}
				if(this.selectedType == 'positive'){
					if(this.onlyContent){
						return text&&type == 0
					}else{
						return type == 0
					}
					
				}
				if(this.selectedType == 'negative'){
					
					if(this.onlyContent){
						return text&&type == 1
					}else{
						return type == 1
					}
				}
			},
			changeType(type) {
				this.selectedType = type
			},
			changeColor() {
				this.onlyContent = !this.onlyContent
			}
		}
	}
</script>

<style>
	.comment {
		padding-top: .36rem;
		padding-bottom: 1.26rem;
	}

	.comment .comment-type {
		display: flex;
		padding-bottom: .36rem;
		margin: 0 .36rem;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}

	.comment .comment-type .block {
		padding: .16rem .24rem;
		background-color: rgba(0, 120, 220, .2);
		margin-right: .16rem;
		font-size: .24rem;

	}

	.comment .comment-type .block:last-child {
		background-color: rgba(77, 85, 93, .2);
	}

	.comment .comment-type .active {
		background-color: rgb(0, 160, 220) !important;
		color: #fff;
	}

	.comment .switch {
		padding: .36rem .36rem;
		display: flex;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
		color: rgb(147, 153, 159);
	}

	.comment .switch .iconfont {
		margin-right: .08rem;
		font-size: .48rem;
		line-height: .48rem;
	}

	.comment .switch .on {
		color: seagreen;
	}

	.comment .switch .content {
		line-height: .48rem;
		font-size: .24rem;
	}

	.comment .comment-list {
		padding: 0 .36rem;
	}

	.comment .comment-list .item {
		padding: .28rem 0;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}

	.comment .comment-list .item .header {
		display: flex;
		justify-content: space-between;
		color: rgb(147,153,159);
		font-size: .2rem;
		line-height: .24rem;
	}
	.comment .comment-list .item .header .avatar{
		display: flex;
	}
	.comment .comment-list .item .header .avatar img{
		width: .24rem;
		height: .24rem;
		border-radius: 50%;
		margin-left: .12rem;
	}
	.comment .comment-list .item .content {
		padding-top: .2rem;
		line-height: .48rem;
	}
	.comment .comment-list .item .content .iconfont{
		color: rgb(147,153,159);
	}
	.comment .comment-list .item .content .iconfont.good{
		color: rgb(0,160,220);
	}



	/* <ul class="comment-list">
		<li class="item" v-for="(item,index) of comments" :key="index">
			<div class="header">
				<div class="time">{{item.rateTime}}</div>
				<div class="avatar">
					<div class="username">{{item.username}}</div>
					<img :src="item.avatar">
				</div>
				<div class="content">
					{{item.text}}
				</div>
			</div>
			
		</li>
	</ul> */
</style>
