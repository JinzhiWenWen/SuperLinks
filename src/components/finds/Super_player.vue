<template>
	<div id="Super_player">
		<div class="basic_header">
			<img src="../../assets/img/返回.png" alt="" @click="Last_step">
			<p>超级玩家</p>
			<p></p>
		</div>
		<div class="content" ref="aaaa">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!-- 财富榜 -->
				<el-tab-pane label="财富榜" name="0">
					<mt-loadmore
					:top-method="loadTop1"
					ref="loadmore1"
					:autoFill='false'
					:bottom-method="loadBottom1"
					>
						<div class="box">
							<dl v-for="(item,key) in richList"  ref="bbb" :key="key" @click="goDetail(item._id,item.name)">
								<dt>
                                <img :src="item.avatar" alt="">
                            </dt>
								<dd>
									<p>{{item.name}}</p>
									<span>财富值</span>
									<span> Top{{item.rank}}</span>
									<p>{{item.wealth}}</p>
								</dd>
							</dl>
						</div>
					</mt-loadmore>
					<div class="last">全社区各个属性前100名入榜</div>

				</el-tab-pane>
				</mt-loadmore>
				<!-- 信用榜 -->
				<el-tab-pane label="信用榜" name="1">
					<mt-loadmore
					:top-method="loadTop2"
					:topDistance="30"
					:bottomDistance='30'
					:bottom-method="loadBottom2"
					:autoFill='false'
					:bottom-all-loaded="allLoaded"
					ref="loadmore2">
						<div class="box">

							<dl v-for="(item,key) in this.creditList" :key="key" @click="goDetail(item._id,item.name)">
								<dt>
                                <img :src="item.avatar" alt="">
                            </dt>
								<dd>
									<p>{{item.name}}</p>
									<span>信用值</span>
									<span> Top{{item.rank}}</span>
									<p>{{item.credit}}</p>
								</dd>
							</dl>

						</div>
						</mt-loadmore>
						<div class="last">全社区各个属性前100名入榜</div>

				</el-tab-pane>
			</el-tabs>

		</div>
	</div>
</template>

<script>
	import config from '@/common/config.js'
	import { Loadmore } from 'mint-ui'
	import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				search: '',
				activeName: 0,
				richList: [],
				creditList: [],
				pageNum:1,
				pageNumT:1,
				allLoaded:false,
				scrollTop:null
			}
		},
		computed:{
			...mapState(['token'])
		},
		created() {
			// this.N()
			if(window.sessionStorage.getItem('namePlayer')){
				this.activeName=window.sessionStorage.getItem('namePlayer');
				console.log(this.activeName)
			}else{
				this.activeName=0;
			}
			if(window.sessionStorage.getItem('num')){
				this.pageNum=window.sessionStorage.getItem('num');
			}else{
				this.pageNum=1;
			}
			if(window.sessionStorage.getItem('numT')){
				this.pageNumT=window.sessionStorage.getItem('numT');
			}else{
				this.pageNumT=1;
			}
			if(window.sessionStorage.getItem('top')){
				// $('.content').scrollTop(window.sessionStorage.getItem('top'));
					this.$nextTick(()=>{
						$('.content').scrollTop(327);
					})
			}
		},
		mounted(){
			this.handleClick()
		},
		methods: {
			loadTop1() {
				this.getRichList()
				setTimeout(() => {
					this.$refs.loadmore1.onTopLoaded();
				}, 1000)

			},
			loadBottom2(){
				// alert('111')
				// console.log('123')
				this.pageNumT++;
				setTimeout(()=>{
					this.$refs.loadmore2.onBottomLoaded();
					this.getCreditList()
          },1000)
			},
			loadBottom1(){
				this.pageNum++;
				setTimeout(()=>{
					this.$refs.loadmore1.onBottomLoaded();
					this.getRichList()
          },1000)
			},
			loadTop2() {
				this.getCreditList()
				setTimeout(() => {
					this.$refs.loadmore2.onTopLoaded();
				}, 1000)

			},
			Last_step() {
				this.$router.go(-1);
			},
			handleClick(tab) {
				if(this.activeName == 0) {
					this.getRichList()

				}
				if(this.activeName==1){
					this.getCreditList()
				}
			},
			// 财富榜
			getRichList() {
				this.$http.get(config.server_url + 'users/superUser/richlist/'+this.pageNum).then(res => {
					this.richList = res.data.data;
					console.log("财富帮", this.richList)
				})
			},
			//信用榜
			getCreditList() {
				this.$http.get(config.server_url + 'users/superUser/creditlist/'+this.pageNumT).then(res => {
					this.creditList = res.data.data;
					console.log("信用帮", this.creditList)
				})
			},
			// 超级玩家详情
			N(){
				if(window.sessionStorage.getItem('top')){
					alert(1)
					// $('.content').scrollTop(window.sessionStorage.getItem('top'));
						$('.content').scrollTop(327);


				}
			},
			goDetail(id, name,event) {
				this.scrollTop=this.$refs.aaaa.scrollTop;
				window.sessionStorage.setItem('namePlayer',this.activeName);
				window.sessionStorage.setItem('top',this.scrollTop);
				window.sessionStorage.setItem('num',this.pageNum);
				window.sessionStorage.setItem('numT',this.pageNumT);
				// namePlyer:this.activeName,
				// top:this.scrollTop,
				// num:this.pageNum,
				// numT:this.pageNumT
				// $('.content').scrollTop(327);

				this.$router.push({
					path: '/Card',
					query: {
						_id: id,
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	#Super_player {
		.basic_header {
			width: 100%;
			padding: 26px 20px;
			position: fixed;
			display: flex;
			z-index: 100;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			img {
				width: 36px;
				height: 46px;
			}
			p {
				font-size: 34px;
				color: #000;
				font-weight: bold;
			}
		}
		.content {
			width: 100%;
			position: absolute;
			top: 120px;
			bottom: 20px;
			overflow-y: scroll;
			-webkit-overflow-scrolling:touch;
			.box {
							padding: 10px 25px 18px 25px;

				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				dl {
					width: 338px;
					height: 462px;
					background: #fff;
					border-radius: 12px;
					margin-bottom: 24px;
					dt {
						width: 100%;
						height: 340px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					dd {
						padding: 12px 34px;
						p {
							width: 100%;
							color: #000000;
							font-size: 24px;
						}
						span {
							width: 100%;
							color: #000;
							font-size: 24px;
							line-height: 42px;
						}
						.num {
							width: 100%;
							color: #FE73E8;
							font-size: 26px;
						}
					}
				}

			}
			.el-tabs__item {
				color: #000000;
			}
		}
		.last {
			font-size: 24px;
			color: #C5C5C5;
			padding: 28px 0;
			margin-left: 20px;
		}
	}
</style>
