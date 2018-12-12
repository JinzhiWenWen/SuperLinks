<template>
	<div id="Next_step2">
		<div class="basic_header">
			<img src="../../assets/img/返回.png" alt="" @click="Last_step">
			<p>设置支持者限制</p>
			<p></p>
		</div>
		<ul class="mortgage">
			<li>
				<span>每个支持者最少抵押数</span>
				<input type="number" placeholder="｜请输入最少抵押数" v-model="activity_x.setting_supporter.minPledge" onkeyup="value=value.replace(/[^\d]/g,'')">
			</li>
			<li>
				<span>每个支持者最多抵押数</span>
				<input type="number" placeholder="｜请输入最多抵押数" v-model="activity_x.setting_supporter.maxPledge" onkeyup="value=value.replace(/[^\d]/g,'')">
			</li>
		</ul>
		<div class="notes">
			可不填写即没有限制
		</div>
		<div class="basic_footer" @click="Next_step">
			<button>
                 下一步
             </button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				//    setting_supporter_x:{
				//         maxPledge:'',
				//         minPledge:''
				//    },
				Third_groups: {}
			}
		},
		created() {
			this.$store.state.title = '设置支持者限制'
		},
		computed: {
			...mapState(['status', 'activity_x'])
		},
		methods: {
			...mapMutations(['Next_step2_fn']),
			Reply_fn() {
				this.setting_supporter_x = {
					maxPledge: '',
					minPledge: ''
				}
			},
			Last_step() {
//				this.$router.push({
//					path: '/next_step',
//					query: {
//
//					}
//				})
				this.$router.push({
					path: '/basic',
					query: {

					}
				})
			},
			Next_step() {

				if(this.activity_x.setting_supporter.minPledge == '') {
					this.activity_x.setting_supporter.minPledge = 0
				}

				this.$router.push({
					path: '/next_step3',
					query: {

					}
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	.basic_header {
		width: 100%;
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

	.mortgage {
		background: #fff;
		li {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88px;
			border-bottom: 1px solid #eee;
			padding: 0 25px;
			span {
				width: 50%;
				color: #000;
				font-size: 28px;
			}
			input {
				flex: 1;
				outline: none;
				border: none;
				color: #C5C5C5;
				font-size: 28px;
			}
		}
	}

	.notes {
		margin-left: 15px;
		font-size: 24px;
		line-height: 88px;
		color: #ccc;
	}

	.basic_footer {
		width: 100%;
		padding: 52px 20px 20px 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			width: 700px;
			height: 100px;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			border: none;
			outline: none;
			border-radius: 12px;
			background: white;
			color: rgba(252,52,220,1);
			font-size: 30px;
		}
	}
</style>
