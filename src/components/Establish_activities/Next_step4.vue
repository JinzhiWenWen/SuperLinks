<template>
	<div id="next_step4">
		<div class="basic_header">
			<img src="../../assets/img/返回.png" alt="" @click="Last_step">
			<p>选择激励分配比例</p>
			<p></p>
		</div>
		<div class="content">
			<div class="title">
				<span>当前活动参与人数{{activity_x.setting_participator.maxPeople}}，可抵押额度为{{activity_x.setting_participator.maxPeople*5000/10000}}w～{{activity_x.setting_participator.maxPeople*50000/10000}}w，
                  活动完成后可得激励
									{{hasJ}}
									～{{hasMj}}
                </span>
			</div>
			<div class="change_mor">
				<div class="change_mor_top" @click="changeMorTop()">
					<span :class="{active:color==1}">
                  <img src="../../assets/img/yes_icon.png" alt="">
                </span>
					<p>发起人50%、参与者20%、支持者30%</p>
				</div>
				<div class="change_mor_bottom" @click="changeMorBot()">
					<span :class="{active:color==2}">
                  <img src="../../assets/img/yes_icon.png" alt="">
                </span>
					<p>发起人80%、参与者20%、</p>
				</div>
			</div>
			<div class="title_bottom">
				<span>活动审核通过后需要抵押一定数量的SLK才能执行，系统会根据抵押的数量和活动执行天数计算当前活动结束后可得到的
                  激励，这部分激励的分配由您来决定。
                </span>
			</div>
			<div class="title_bottom">
				<span>注：所有已签到的参与者评价完成后，活动状态自动变成已完成，根据评分执行奖惩制度。记得活动后体香参与者评价哦～
                </span>
			</div>
			<!-- <ul class="list">
                <li>
                    <span>组织者占比</span>
                    <input type="number" v-model="activity_x.setting_allot[0]" onkeyup="value=value.replace(/[^\d]/g,'')">
                </li>
                <li>
                    <span>发起人占比</span>
                    <input type="number" v-model="activity_x.setting_allot[1]" onkeyup="value=value.replace(/[^\d]/g,'')">
                </li>
                <li>
                    <span>支持者占比</span>
                    <input type="number" v-model="activity_x.setting_allot[2]" onkeyup="value=value.replace(/[^\d]/g,'')">
                </li>
                <li>
                    <span>参与者占比</span>
                    <input type="number" v-model="activity_x.setting_allot[3]" onkeyup="value=value.replace(/[^\d]/g,'')">
                </li>
            </ul> -->
			<!-- <div class="rule_cont">
                 此活动参与总人数<span>{{total_number}}</span>,期限<b>{{Excitation_x.term}}</b>天,需抵押SLK数量
                 <b>{{Excitation_x.Scope_of_mortgage_min}}</b>~<b>{{Excitation_x.Scope_of_mortgage_max}}</b>
                 共可获得
                 <b>{{Excitation_x.Scope_of_acquisition_min}}</b>~<b>{{Excitation_x.Scope_of_acquisition_max}}</b>
                 的激励 (根据抵押数得日{{dailyRate}}的激励)
            </div> -->
			<!-- <ul class="rule_floor">
                <li>发起人：所有发起人评分该占比的激励</li>
                <li>组织者：所有组织者评分该占比的激励</li>
                <li>支持者：根据抵押数量按比例分配该占比的激励</li>
                <li>参与者：所有参与者平分该占比的激励</li>
            </ul> -->
		</div>
		<div class="basic_footer" @click="Next_step">
			<button>
                 确认提交审核
             </button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				hasJ:null,
				hasMj:null,
				color: 1,
				zt: true, //点击次数
				min: '',
				max: '',
				Scope_of_mortgage: {
					max: "",
					min: ''
				}, //抵押范围
				Scope_of_acquisition: {
					max: '',
					min: ''
				}, //获得范围
				setting_allot_x: [], //比例
				Fifth_groups: {},
				activity: {
					"uid": '',
					"title": "",
					"location": "",
					"address": "",
					"imgUrl": "",
					"activityImgs": [],
					"startDate": '',
					"endDate": '',
					"creator": {
						"_id": '',
						"name": "",
						"pledge": "0"
					},
					"setting_organizer": [

					],
					"setting_supporter": {
						"minPledge": '',
						"maxPledge": ''
					},
					"setting_participator": {
						"maxPeople": '',
						"condition": "",
						"needPledge": ''
					},
					"setting_allot": []
				},
				term: '',
				total_number: '',
				Scope_of_mortgage_max: '',
				Scope_of_mortgage_min: '',
				Scope_of_acquisition_max: '',
				Scope_of_acquisition_min: '',
				dailyRate: '',
				trem:null
			}

		},
		mounted(){
			console.log(this.Excitation_x,22)
			var endDate=this.activity_x.endDate;
			var startDate=this.activity_x.startDate;
			var allTime=endDate-startDate;
			this.trem=allTime/24/60/60/1000;
			if(this.trem.toFixed(0) <= 1){
					this.trem= 1;
			}else{
					this.trem.toFixed(0)
			}
			this.hasJ=this.activity_x.setting_participator.maxPeople*5000*this.trem*0.01;
			console.log(this.trem,'111')
			console.log(this.hasJ)
			this.hasJ=this.hasJ.toFixed(2);
			this.hasMj=this.activity_x.setting_participator.maxPeople*50000*this.trem*0.01;
			this.hasMj=this.hasMj.toFixed(2);
		},
		created() {

			console.log(this.activity_x)
			this.$store.state.title = '选择激励分配比例';
			this.getActMaxMin_fn();
			this.dailyRate = this.$route.query.dailyRate * 100 + '%';
			// console.log(this.activity_x)
			// this.term=this.$route.query.term;
			// this.total_number=this.$route.query.total_number;
			// this.Scope_of_mortgage_max=this.$route.query.Scope_of_mortgage_max;
			// this.Scope_of_mortgage_min=this.$route.query.Scope_of_mortgage_min;
			// this.Scope_of_acquisition_max=this.$route.query.Scope_of_acquisition_max;
			// this.Scope_of_acquisition_min=this.$route.query.Scope_of_acquisition_min;
		},
		computed: {
			...mapState(['activity_x', 'user', 'status', 'uid', 'Excitation_x', 'token']),
			//  term(){//时间范围
			//     let endDate=this.activity_x.endDate;
			//     let startDate=this.activity_x.startDate;
			//     let allTime=endDate-startDate;
			//     let term=allTime/24/60/60/1000;

			//     if(term.toFixed(0) <= 1){
			//         return 1;
			//     }else{
			//         return term.toFixed(0)
			//     }
			//  },
			//  total_number(){//人数
			//     return this.activity_x.setting_organizer.length/1+this.activity_x.setting_participator.maxPeople/1;
			//  },
			 // Scope_of_mortgage_max(){//最多抵押
			 //    let Scope_of_mortgage_max=this.activity_x.setting_supporter.maxPledge * this.max/1;
			 //     return Scope_of_mortgage_max.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
			 // },
			 // Scope_of_mortgage_min(){//最少抵押
			 //    let Scope_of_mortgage_min=this.activity_x.setting_supporter.minPledge * this.min/1;
			 //     return Scope_of_mortgage_min.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
			 // },
			//  Scope_of_acquisition_max(){//最多获得
			//        console.log("最多获得",this.max)
			//        let Scope_of_acquisition_max1=this.activity_x.setting_supporter.maxPledge/1 * 0.01/1 *this.term/1 * this.activity_x.setting_participator.maxPeople/1 * this.max/1;
			//        let Scope_of_acquisition_max2=Scope_of_acquisition_max1.toFixed(0)
			//        return Scope_of_acquisition_max2.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
			//  },
			//  Scope_of_acquisition_min(){//最少获得
			//       let Scope_of_acquisition_min1=this.activity_x.setting_supporter.minPledge/1 * 0.01/1 * this.term/1 * this.activity_x.setting_participator.maxPeople/1 *this.min/1;
			//       let Scope_of_acquisition_min2 =Scope_of_acquisition_min1.toFixed(0)
			//       return Scope_of_acquisition_min2.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
			//  }
		},
		methods: {
			...mapMutations(['Next_step4_fn', 'activity_x_uid', 'activity_x_fn']),
			changeMorTop() { //选择发起人50%选项
				this.color = 1;
			},
			changeMorBot() { //  选择发起人80%选项
				this.color = 2;
			},
			Last_step() {
				this.$router.push({
					path: '/next_step3',
					query: {}
				})
			},
			Next_step() {
				if(this.color == 1){
					this.setting_allot = [0,50,30,20]
				}
				if(this.color == 2){
					this.setting_allot = [0,80,0,20]
				}
				this.activity_x.setting_allot = this.activity_x.setting_allot.map((value, index) => {
					return parseInt(value);

				})
				if(this.activity_x.setting_participator.needPledge == '') {
					this.activity_x.setting_participator.needPledge = false
				}
				this.zt = false //请求之前
				if(this.zt == false) {
					console.log(this.activity_x)
					this.$http.post(config.server_url + 'activity/create', {
							token: this.token,
							activity: this.activity_x,
							setting_allot:this.setting_allot
						})
						.then(res => {
							if(res.data.code == 200) {
								this.toast({
									message:res.data.msg,
									duration:1000
								})
								this.activity_x_fn(this.activity)
								this.zt = true //请求成功之后
								this.$router.push({
									path: '/activity',
									query: {

									}
								})
							} else {
								this.toast({
									message:res.data.msg,
									duration:1000
								})
								this.zt = true
							}
						})
				}

			},
			getActMaxMin_fn() {
				this.$http.get(config.server_url + 'activity/getActMaxMin/' + this.token).then(res => {
					this.min = res.data.data.min
					this.max = res.data.data.max
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		background: #027bfe!important;
		border: 0!important;
	}

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

	.content {
		width: 96%;
		margin: 0 auto;
		.title {
			width: 96%;
			margin: 0 auto;
			color: #000;
			font-size: 28px;
			margin-top: 24px!important;
			margin-bottom: 24px!important;
			text-align: justify;
		}
		.title_bottom {
			width: 96%;
			margin: 0 auto;
			color: #666;
			font-size: 28px;
			margin-top: 40px!important;
			margin-bottom: 24px!important;
			text-align: justify;
		}
		.change_mor {
			width: 100%;
			height: auto;
			.change_mor_top {
				width: 100%;
				height: 110px;
				background: white;
				border-radius: 12px;
				box-shadow: 0px 0px 30px rgba(0, 0, 0, .12);
				position: relative;
				span {
					position: absolute;
					height: 45px;
					width: 45px;
					border-radius: 50%;
					background: white;
					border: 2px solid #999;
					left: 5%;
					top: 50%;
					margin-top: -22.5px;
					text-align: center;
					img {
						width: 80%;
						height: 80%;
						margin-top: 5px;
					}
				}
				p {
					height: 100%;
					line-height: 110px;
					padding-left: 15%;
					box-sizing: border-box;
					font-size: 32px;
				}
			}
			.change_mor_bottom {
				width: 100%;
				height: 110px;
				background: white;
				border-radius: 12px;
				margin-top: 30px;
				box-shadow: 0px 0px 30px rgba(0, 0, 0, .12);
				position: relative;
				span {
					position: absolute;
					height: 45px;
					width: 45px;
					border-radius: 50%;
					background: white;
					border: 2px solid #999;
					left: 5%;
					top: 50%;
					margin-top: -22.5px;
					text-align: center;
					img {
						width: 80%;
						height: 80%;
						margin-top: 5px;
					}
				}
				p {
					height: 100%;
					line-height: 110px;
					padding-left: 15%;
					box-sizing: border-box;
					font-size: 32px;
				}
			}
		}
		// .list{
		//     width: 100%;
		//     height: 440px;
		//     display:flex;
		//     flex-wrap:wrap;
		//     padding:0 32px;
		//     background:#fff;
		//     border-radius:12px;
		//     -moz-box-shadow:2px 2px 10px #D8D8D8;
		//     -webkit-box-shadow:2px 2px 10px #D8D8D8;
		//     box-shadow:2px 2px 10px #D8D8D8;
		//     li{
		//         width: 100%;
		//         display:flex;
		//         justify-content:space-between;
		//         align-items:center;
		//         span{
		//             width: 30%;
		//             color:#000;
		//             font-size:30px;
		//         }
		//         input{
		//             flex:1;
		//             outline: none;
		//             border: none;
		//             color:#C5C5C5;
		//         }
		//     }
		// }
		// .rule_cont{
		//     margin-top:55px;
		//     font-size:28px;
		//     color:#000;
		//     margin-bottom:36px;
		// }
		// .rule_floor{
		//     li{
		//         font-size:24px;
		//         color:#666;
		//     }
		// }
	}

	.basic_footer {
		width: 96%;
		margin: 0 auto;
		margin-top: 30px!important;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			width: 100%;
			height: 100px;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			border: none;
			outline: none;
			border-radius: 12px;
			background: white;
			color:rgba(252,52,220,1);
			font-size: 30px;
		}
	}
</style>
