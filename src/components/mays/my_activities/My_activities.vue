<template>
	<div id="My_activities">
		<div class="basic_header">
			<img src="../../../assets/img/返回.png" alt="" @click="Last_step">
			<p>我的活动</p>
			<p></p>
		</div>
		<div class="content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="我发起的" name="0">
					<div class="clist">
						<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :autoFill='false' :bottom-all-loaded="allLoaded" ref="loadmore">
							<ul class="list">
								<li v-for="(item,key) in this.CreateList" :key="key">
									<div class="title">{{item.title}}</div>
									<p>{{item.activityNo}}</p>
									<p>已抵押{{item.pledgedSlk}} SLK</p>
									<div v-if="item.status ==2 || item.status ==3 || item.status ==4" class="progress">
										<p>0 w</p>
										<progress :value="item.pledgedSlk" :max="item.max_num/1*10000"></progress>
										<p>{{item.max_num}} w</p>
									</div>
									<div v-if="item.status ==0 || item.status ==3 || item.status ==4 || item.status ==5 || item.status ==6" class="detail" @click="See_fn(item._id)">查看详情</div>
									<div v-if="item.status ==1" class="detail" @click="edit_fn(item._id)">编辑</div>
									<div class="last" v-if="item.status ==2">
										<span @click="mortgage_fn(item)">抵押</span>
										<span @click="Toexamine_fn(item._id)">审核报名信息<i v-if="item.audit[0].status=='True' || item.audit[1].status=='True' ? true : false"></i></span>
									</div>
									<div class="typeImg" v-if="item.status ==0">
										<img src="../../../assets/img/247850351496126400.png" alt="">
									</div>
									<div class="typeImg" v-if="item.status ==1">
										<img src="../../../assets/img/组1_19.png" alt="">
									</div>
									<div class="typeImg" v-if="item.status ==2">
										<img src="../../../assets/img/组1_17.png" alt="">
									</div>
									<div class="typeImg" v-if="item.status ==3">
										<img src="../../../assets/img/组1_12.png" alt="">
									</div>
									<div class="typeImg" v-if="item.status ==4">
										<img src="../../../assets/img/组1_27.png" alt="">
									</div>
									<div class="typeImg" v-if="item.status ==5">
										<img src="../../../assets/img/组13.png" alt="">
									</div>
									<div class="typeImg" v-if="item.status ==6">
										<img src="../../../assets/img/501154011339508098.png" alt="">
									</div>
								</li>
							</ul>
						</mt-loadmore>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我参与的" name="1">
					<mt-loadmore :top-method="loadTop2" :bottom-method="loadBottom2" :autoFill='false' :bottom-all-loaded="allLoaded2" ref="loadmore2">
						<ul class="list">
							<li v-for="(item,key) in this.JoinList" :key="key">
								<div class="title">{{item.title}}</div>
								<p>{{item.activityNo}}</p>
								<p>活动已抵押{{item.pledgedSlk}} SLK</p>
								<div v-if="item.status ==2 || item.status ==3 || item.status ==4" class="progress">
									<p>0 w</p>
									<progress :value="item.pledgedSlk" :max="item.max_num/1*10000"></progress>
									<p>{{item.max_num}} w</p>
								</div>
								<div v-if="item.status ==0 || item.status ==3 || item.status ==4 || item.status ==5 || item.status == 6" class="detail" @click="See_fn(item._id)">查看详情</div>
								<!-- <div v-if="item.status ==1" class="detail" >编辑</div> -->
								<div class="last" v-if="item.status ==2">
									<span @click="mortgage_fn(item)">抵押</span>
									<!-- <span @click="Toexamine_fn(item._id)">审核报名信息</span> -->
								</div>
								<div class="typeImg" v-if="item.status ==0">
									<img src="../../../assets/img/247850351496126400.png" alt="">
								</div>
								<div class="typeImg" v-if="item.status ==1">
									<img src="../../../assets/img/组1_19.png" alt="">
								</div>
								<div class="typeImg" v-if="item.status ==2">
									<img src="../../../assets/img/组1_17.png" alt="">
								</div>
								<div class="typeImg" v-if="item.status ==3">
									<img src="../../../assets/img/组1_12.png" alt="">
								</div>
								<div class="typeImg" v-if="item.status ==4">
									<img src="../../../assets/img/组1_27.png" alt="">
								</div>
								<div class="typeImg" v-if="item.status ==5">
									<img src="../../../assets/img/组13.png" alt="">
								</div>
								<div class="typeImg" v-if="item.status ==6">
									<img src="../../../assets/img/501154011339508098.png" alt="">
								</div>
							</li>
						</ul>
					</mt-loadmore>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import { Loadmore } from 'mint-ui';
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				showsign:false,
				pageNo: 1,
				pageNo2: 1,
				allLoaded: true,
				allLoaded2: true,
				activeName: 0,
				CreateList: [], //我发起的
				JoinList: [], //我参与的
			}
		},
		created() {
			this.getCreateList();
			this.getJoinList()
			console.log(this.audit)
			 for(var i in this.audit){
            	if(this.audit[i].status == 'True'){
            		this.showsign = true
            	}
            }
		},
		computed: {
			...mapState(['uid', 'activity_x', 'user','token','audit'])
		},
		methods: {
			loadTop() {
				this.getCreateList()
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000)
			},
			loadTop2() {
				this.getJoinList()
				setTimeout(() => {
					this.$refs.loadmore2.onTopLoaded();
				}, 1000)
			},
			loadBottom() {
				this.allLoaded = true; // 若数据已全部获取完毕
				this.getCreateList2()
				setTimeout(() => {
					this.$refs.loadmore.onBottomLoaded();
				}, 1000)
			},
			loadBottom2() {
				this.allLoaded = true; // 若数据已全部获取完毕
				this.getJoinList2()
				setTimeout(() => {
					this.$refs.loadmore2.onBottomLoaded();
				}, 1000)
			},
			Last_step() {
//				this.$router.go(-1)
				this.$router.push('/my');
			},
			See_fn(_id) { //查看
				console.log(_id)
				this.$router.push({
					path: '/sign_up',
					query: {
						_id: _id,
						uid: this.uid,
						tz:'xq'
					}
				})
			},
			edit_fn(id) { //编辑
				console.log(id)
				this.$http.get(config.server_url + 'activity/detailForEdit/' + id).then(res => {
					console.log(res.data)
					this.activity_x.title = res.data.data.title
					this.activity_x.uid = this.uid
					this.activity_x.location = res.data.data.location;
					this.activity_x.address = res.data.data.address;
					this.activity_x.imgUrl = res.data.data.imgUrl;
					this.activity_x.activityImgs = res.data.data.activityImgs;
					this.activity_x.startDate = res.data.data.startDate;
					this.activity_x.endDate = res.data.data.endDate;
					this.activity_x.creator.name = this.user.name
					this.activity_x.creator._id = this.user._id
					this.activity_x.creator.pledge = this.user.pledgedSlk
					this.activity_x.setting_organizer = res.data.data.setting_organizer
					this.activity_x.setting_supporter = res.data.data.setting_supporter
					this.activity_x.setting_participator = res.data.data.setting_participator
					this.activity_x.setting_allot = res.data.data.setting_allot
					this.$router.push({
						path: '/basic',
					})
				})
			},
			handleClick() {
				if(this.activeName == 0) {
					this.getCreateList() //我发起的
				} else {
					this.getJoinList() //我参与的
				}
			},
			//我发起的
			getCreateList() {
				this.$http.get(config.server_url + 'users/list/started/' + this.pageNo + '/' + this.token).then(res => {
					this.CreateList = res.data.data;
					if(res.data.data.length >= 5) {
						this.allLoaded = false
					}
					console.log(res.data)
				})
			},
			getCreateList2() {
				this.pageNo++
					this.$http.get(config.server_url + 'users/list/started/' + this.pageNo + '/' + this.token).then(res => {
						this.CreateList = this.CreateList.concat(res.data.data);
						if(res.data.data.length < 5) {
							this.allLoaded = true;
							this.pageNo = 1
						}
						console.log(res.data)
					})
			},
			//我参与的
			getJoinList() {
				this.$http.get(config.server_url + 'users/list/participant/' + this.pageNo2 + '/' + this.token).then(res => {
					this.JoinList = res.data.data
					if(res.data.data.length >= 5) {
						this.allLoaded2 = false
					}
				})
			},
			getJoinList2() {
				this.pageNo2++
					this.$http.get(config.server_url + 'users/list/participant/' + this.pageNo2 + '/' + this.token).then(res => {
						this.JoinList = this.JoinList.concat(res.data.data);
						if(res.data.data.length < 5) {
							this.allLoaded2 = true;
							this.pageNo2 = 1
						}
					})
			},
			 //抵押
            mortgage_fn(item){
                console.log(item)
                this.$router.push({
                    path:'/Mortgage',
                    query:{
                        item:item
                    }
                })
            },//审核
			Toexamine_fn(aid) {
				this.$router.push({
					path: '/Registration_information',
					query: {
						aid: aid,
						uid: this.uid,
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.basic_header {
		width: 100%;
		padding: 26px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		position: fixed;
		z-index: 100;
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

	// #My_activities {
	// }

	.content {
		width: 100%;
		position: absolute;
		top: 130px;
		bottom: 20px;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
	}

	.list {
		padding: 18px 25px;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		li {
			width: 100%;
			// height: 220px;
			padding: 30px 34px;
			background: #fff;
			margin-top: 24px;
			border-radius: 12px;
			-moz-box-shadow: 2px 2px 10px #DADADA;
			-webkit-box-shadow: 2px 2px 10px #DADADA;
			box-shadow: 2px 2px 10px #DADADA;
			position: relative;
			.title {
				font-size: 32px;
				color: #000;
			}
			p {
				font-size: 22px;
				color: #000;
				padding: 15px 0 0 0;
			}
			.progress {
				width: 100%;
				height: 6px;
				display: flex;
				margin-top: 20px;
				align-items: center;
				p {
					width: 10%;
					font-size: 24px;
					color: #e5e5e5;
					text-align: center;
				}
				progress {
					flex: 1;
					height: 100%;
					color: #f00;
					background: #EFEFF4;
					border-radius: 3px;
					border: 0;
					margin-top: 20px;
					margin-left: 10px;
					margin-right: 10px;
				}
				/* 表示总长度背景色 */
				progress::-webkit-progress-bar {
					background-color: #f0f0f0;
					border-radius: 3px;
				}
				/* 表示已完成进度背景色 */
				progress::-webkit-progress-value {
					background: #ffc801;
					border-radius: 3px;
				}
			}
			.detail {
				margin-top: 30px;
				height: 58px;
				line-height: 58px;
				width: 100%;
				text-align: center;
				font-size: 24px;
				color: #999;
				border-top: 1px solid #f0f0f0;
			}
			.last {
				margin-top: 20px;
				width: 100%;
				height: 58px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				span {
					flex: 1;
					text-align: center;
					border-right: 1px solid #f0f0f0;
					font-size: 24px;
					color: #999;
					i{
						width: 15px;
				    	height: 15px;
				    	background: red;
				    	border-radius: 50%;
				    	position: absolute;
					}
					&:last-child {
						border-right: 0;
					}
				}
			}
			.typeImg {
				position: absolute;
				right: 0;
				top: 0;
				img {
					width: 96px;
					height: 96px;
				}
			}
		}
	}
</style>
