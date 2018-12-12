<template>
	<div id="Schedule">
		<div class="box">
			<div class="basic_header">
			<img src="../../assets/img/返回.png" alt="" @click="Last_step">
			<p>日程安排</p>
			<p></p>
			</div>
		</div>

		<div class="content">
			<div class="content_box">
				<!-- 年份 月份 -->
				<div class="checkDate">
					<span class="el-icon-arrow-left icon" @click="pickPre(currentYear,currentMonth)"></span>
					<span class="choose-month">{{ currentMonth }}月</span>
					<span class="el-icon-arrow-right icon" @click="pickNext(currentYear,currentMonth)"></span>
				</div>
				<div class="list">
					<ul class="dayList">
						<li @click="getActivityItem(day.time)" v-for="(day,index) in days" :key="index" class="dataArea">
							<!--本月-->
							<span v-if="day.time.getMonth()+1 != currentMonth" class="other-month">
                            	<span  :class="day.color">{{ day.time.getDate() }}</span>
							</span>
							<span v-else>
                            <!--今天-->
                            <span v-if="day.time.getFullYear() == new Date().getFullYear() && day.time.getMonth() == new Date().getMonth() && day.time.getDate() == new Date().getDate()" class="active">{{ day.time.getDate() }}</span>
							<span v-else :class="day.color">{{ day.time.getDate() }}</span>
							</span>
							<div class="hd" v-if="day.show"></div>
						</li>
					</ul>
				</div>
			</div>
			<ul class="activity_list">
				<li v-for="(item,key) in this.List" :key="key" @click="Schedule_fn(item._id)">
					<div class="top">
						<p>{{item.title}}</p>
						<span>{{item.startDate}}-{{item.endDate}}</span>
					</div>
					<img src="../../assets/img/组6.png" alt="">
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import { getDate } from '../../common/commin.js'
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				currentDay: 1,
				currentMonth: 1,
				currentYear: 1970,
				currentWeek: 1,
				days: [],
				List: [], // 点击获取任务列表
				rwsllist: [], // 点击获取任务列表
				bacol: 'active',
			}
		},
		created() {
			this.initData();
			this.getActivityItem(new Date())
			this.getActivityList()
		},
		computed: {
			...mapState(['uid','token'])
		},
		methods: {
			Last_step() {
				this.$router.push({
					path: '/find',
					query: {
					}
				})
			},
			Schedule_fn(_id) {
				this.$router.push({
					path: '/sign_up',
					query: {
						_id: _id,
						zt:1,
						tz:'ap'
					}
				})
			},
			initData(cur) {
				var date;
				if(cur) {
					date = new Date(cur);
				} else {
					date = new Date();
				}
				this.currentDay = date.getDate();
				this.currentYear = date.getFullYear();
				this.currentMonth = date.getMonth() + 1;
				this.currentWeek = date.getDay(); // 1...6,0
				if(this.currentWeek == 0) {
					this.currentWeek = 7;
				}
				var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
				this.days.length = 0;
				// 今天是周日，放在第一行第7个位置，前面6个
				for(var i = this.currentWeek - 1; i >= 0; i--) {
					var d = new Date(str);
					d.setDate(d.getDate() - i);
					this.days.push({
						time: d,
						color: 'ba1',
						show: false
					});
				}
				for(var i = 1; i <= 35 - this.currentWeek; i++) {
					var d = new Date(str);
					d.setDate(d.getDate() + i);
					this.days.push({
						time: d,
						color: 'ba1',
						show: false
					});
				}

			},
			// 上个月
			pickPre(year, month) {
				// setDate(0); 上月最后一天
				// setDate(-1); 上月倒数第二天
				// setDate(dx) 参数dx为 上月最后一天的前后dx天
				var d = new Date(this.formatDate(year, month, 1));
				d.setDate(0);
				this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
				this.getActivityList()
			},
			// 下个月
			pickNext(year, month) {
				var d = new Date(this.formatDate(year, month, 1));
				d.setDate(35);
				this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
				this.getActivityList()
			},
			//返回 类似 2016-01-02 格式的字符串
			formatDate(year, month, day) {
				var y = year;
				var m = month;
				if(m < 10) m = "0" + m;
				var d = day;
				if(d < 10) d = "0" + d;
				return y + "-" + m + "-" + d
			},
			// 点击获取任务列表
			getActivityItem(date) {
				for(var i in this.days) {
					if(this.days[i].time.getMonth() + 1 != this.currentMonth) {
						this.days[i].color = 'active3'
					}
					if(this.days[i].time == date) {
						this.days[i].color = 'active2'
					} else if(this.days[i].time.getMonth() + 1 != this.currentMonth) {
						this.days[i].color = 'active3'
					} else {
						this.days[i].color = 'ba1'
					}
				}
				var time = new Date(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()));
				var time2 = time.getTime();
				this.$http.get(config.server_url + 'users/detail/calendar/' + time2+'/'+this.token).then(res => {
					console.log(res)
					this.List = res.data.data;
					this.List.map((item) => {
						item.startDate = getDate(item.startDate)
						item.endDate = getDate(item.endDate)
					})
				})
			},
			getActivityList() {
				var sj1 = this.days[0].time.getTime()
				var sj2 = this.days[34].time.getTime()
				this.$http.get(config.server_url + 'users/actCount/calendar/' + sj1 + '/' + sj2 +'/' + this.token ).then(res => {
					this.rwsllist = res.data.data;
//					console.log(this.days)
//					console.log(this.rwsllist)
					for(var i in this.rwsllist) {
						for(var j in this.days) {
							if(this.rwsllist[i].date == this.days[j].time.getTime()) {
								this.days[j].show = true
							}
						}
					}

				})
			}
		}
	}
</script>

<style scoped lang="scss">
	#Schedule {
		  position: relative;
    display: flex;
    flex-direction: column;
	}
	.box{
		 height: 100px;
    overflow: hidden;
	}
	.basic_header {
		width: 100%;
		padding: 26px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		position: fixed;
		z-index: 10000;
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
		padding: 24px;
		background: #F0F0F0;
		.content_box {
			width: 100%;
			background: #fff;
			.checkDate {
				width: 100%;
				height: 70px;
				display: flex;
				padding: 24px;
				justify-content: space-between;
				align-items: center;
				.choose-month {
					font-size: 34px;
					color: #ff4137;
				}
				.icon {
					color: #8D8988;
					font-size: 34px;
				}
			}
			.list {
				width: 100%;
				display: flex;
				padding: 0 52px;
				.dayList {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					li {
						width: 14%;
						height: 116px;
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						border-bottom: 1px solid #ABABAB;
						span {
							display: flex;
							align-items: center;
							span {
								text-align: center;
								font-size: 30px;
								color: #000;
							}
						}
					}
				}
			}
		}
		.activity_list {
			margin-top: 24px;
			border-radius: 12px;
			width: 100%;
			height: auto;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			-moz-box-shadow: 2px 2px 10px #D8D8D8;
			-webkit-box-shadow: 2px 2px 10px #D8D8D8;
			box-shadow: 2px 2px 10px #D8D8D8;
			li {
				width: 100%;
				height: 110px;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 33px;
				.top {
					p {
						font-size: 30px;
						color: #000;
					}
					span {
						font-size: 22px;
						color: #999;
					}
				}
				img {
					width: 19px;
					height: 31px;
				}
			}
		}
	}

	.dataArea {
		position: relative;
		span {
			margin: 0 auto;
		}
		.other-month {
			text-align: center;
			font-size: 30px;
			color: #B1B1B1;
		}
		.hd {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: #D74747;
			top: 80%;
			left: 45%;
			position: absolute;
		}
	}

	.active {
		text-align: center;
		display: inline-block !important;
		line-height: 72px;
		background: #ff3a31;
		width: 72px;
		height: 72px;
		color: #FCFCFE;
		font-size: 30px;
		border-radius: 50%;
	}

	.active2 {
		text-align: center;
		display: inline-block !important;
		line-height: 72px;
		background: #F0C78A;
		width: 72px;
		height: 72px;
		color: #FCFCFE;
		font-size: 30px;
		border-radius: 50%;
	}

	.active3 {
		text-align: center;
		display: inline-block !important;
		line-height: 72px;
		background: #fff;
		width: 72px;
		height: 72px;
		color: #B1B1B1 !important;
		font-size: 30px;
	}
</style>
