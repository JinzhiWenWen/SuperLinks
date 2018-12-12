<template>
	<div id="More_people">
		<div class="box">
			<div class="basic_header">
				<img src="../../assets/img/返回.png" alt="" @click="Last_step">
				<p>更多参与者</p>
				<p></p>
			</div>
		</div>
		<div class="wrap">
				<mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill='false'>
				<div class="Detailed_div">
					<ul>
						<li v-for="(item,index) in Look_at_more" :key="index">
                            <img :src="item.avatar" alt="">
							<span>{{item.name}}</span>
							<em>抵押 {{item.pledge/10000}}w SLK</em>
							<i v-if="status >=3">{{item.checkIn | discount}}</i>
							<i v-if="status == 2">已参加报名</i>
						</li>
					</ul>
				</div>
				</mt-loadmore>
		</div>

	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import config from '@/common/config.js'
	import { Loadmore } from 'mint-ui';
	export default {
		data() {
			return {
				Look_at_more: [],

				aid: '',
				status:'',
			}
		},
		created() {;
			this.aid = this.$route.query.aid
			this.Look_more()
			this.status=this.$route.query.status
			console.log(this.status)
		},
		computed: {
			...mapState(['uid','token'])
		},
		methods: {
			Last_step() {
				this.$router.go(-1)
			},
			loadTop() {
				this.Look_more()
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000)

			},
			Look_more() {
				this.$http.get(config.server_url + 'activity/more/1/' + this.token + '/' + this.aid).then(res => {
					console.log(res,999)
					this.Look_at_more = res.data.data;
					console.log(this.Look_at_more)
				})
			}
		},
		filters:{//过滤器  用法 {{>{{ num | discount}}}}
			discount : function(value){
					if(value==true){
						return '已签到'
					}else if(value==false){
						return '未签到'
					}
			}
		}
	}
</script>

<style scoped lang="scss">
	// #More_people {}

	.box {
		height: 100px;
		position: fixed;
		top: 0;
	}
	.detail_review {
				width: 100%;
				height: 110px;
				border-bottom: 1px solid #ccc;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				dl {
					width: 100%;
					height: 110px;
					display: flex;
					align-items: center;
					dt {
						width: 56px;
						height: 56px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					dd {
						padding-left: 40px;
						flex: 1;
						.review_title {
							display: flex;
							justify-content: space-between;
							align-items: center;
							span {
								font-size: 24px;
								color: #000;
							}
						}
						p {
							margin-top: 12px;
							font-size: 20px;
							color: #999;
						}
					}
				}
			}
	.basic_header {
		width: 100%;
		height: 100px;
		padding: 26px 20px;
		display: flex;
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
	.wrap{
		width: 100%;
		top: 120px;
		bottom: 20px;
		overflow-y: scroll;
		position: absolute;
		-webkit-overflow-scrolling: touch;
	}
	.Detailed_div {
		width: 95%;
		flex: 1;
		margin-left: 2.5%;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, .2);
		border-radius: 12px;
		border: 1px solid #FFf;
		background: #fff;
		ul {
			li {
				line-height: 110px;
				height: 110px;
				border-bottom: 1px solid #ccc;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
				/*no*/
                img{
					width: 20%;
                    width: 80px;
                    height: 80px;
                }
				span {
					width: 30%;
					display: block;
					text-align: center;
					font-size: 30px;
					color: #000;
				}
				em {
					width: 35%;
					display: block;
					text-align: center;
					font-size: 24px;
				}
				i{
					width: 25%;
					text-align: center;
					font-size: 12px;
					// color:red;
				}
			}
		}
	}
</style>
