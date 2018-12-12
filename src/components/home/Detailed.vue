<template>
	<div id="Detailed1">
		<div class="basic_header">
			<img src="../../assets/img/返回.png" alt="" @click="Last_step">
			<p>明细</p>
			<p></p>
		</div>
		<div class="webb">
				<mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill='false' :maxDistance='100'>
					<ul class="dul">
						<li class="dli" v-for="(item,index) in arr" :key="index">
							<span>{{item.name}}</span>
							<i>{{item.candyNum}}</i>
							<i v-if="!item.candyNum">0</i>
							<em>{{item.drawTime}}</em>
						</li>
					</ul>
				</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import config from '@/common/config.js'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import { timestampToTime } from '../../common/commin.js'
	import { Loadmore } from 'mint-ui';
	export default {
		data() {
			return {
				arr: [

				],
				a: '',
			}
		},
		created() {
			if(this.a !== this.$route.query.a) {
				this.$destroy();
				this.detailed_fn();
			}
			this.a = this.$route.query.bo
		},
		mounted() {

		},
		computed: {
			...mapState(['uid','token'])
		},
		methods: {
			Last_step() {
				this.$router.go(-1)
			},
			loadTop() {
				this.detailed_fn()
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000)

			},
			//明细调取
			detailed_fn() {
				this.$http.get(config.server_url + 'draw/candyHistory/' + this.token).then(res => {
					console.log(res)
					res.data.data.candyHistory.map(val => {
						val.drawTime = timestampToTime(val.drawTime);
					})
					this.arr = res.data.data.candyHistory;
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	#Detailed1 {
		width: 100%;
		.basic_header {
			width: 100%;
			padding: 26px 20px;
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 100;
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
		.webb {
			width: 100%;
			position: absolute;
	        top: 120px;  
	        bottom: 30px;
	        overflow-y: scroll;
	        -webkit-overflow-scrolling:touch;
				.dul {
					margin-left: 3% ;
					width: 94%;
					box-shadow: 0px 0px 30px rgba(0, 0, 0, .2);
					border-radius: 12px;
					background: #fff;
					overflow: hidden;
					.dli {
						line-height: 110px;
						height: 110px;
						border-bottom: 1px solid #ccc;
						span {
							width: 23%;
							display: block;
							float: left;
							text-align: left;
							font-size: 30px;
							color: #000;
							padding-left: 36px;
						}
						i {
							width: 33%;
							display: block;
							float: left;
							font-size: 30px;
							color: #000;
						}
						em {
							width: 43%;
							display: block;
							float: left;
							text-align: right;
							padding-right: 32px;
							font-size: 24px;
						}
					}
				}
			}
	}
</style>