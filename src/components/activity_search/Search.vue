<template>
	<div id="search">
		<div class="warp">
			<div class="select">
				<el-select v-model="unitName" placeholder="请选择">
					<el-option v-for="(item, index) in dataList" :key="index" :label="item.value" :value="item.type">
					</el-option>
				</el-select>
			</div>
			<div class="inp">
				<el-input placeholder="请输入关键字" v-model="searchData" clearable @focus="hasIn()" @blur="hasBack()"   style='width: 80%; margin-left: 5%;' ref="searchInp"></el-input>
			</div>
			<!--<el-button type="text" style="margin-left: 20px; margin-top: 5px;"@click='Last_step1()'>取消</el-button>-->
			<div class="but" @click='Last_step1()' v-show="noFocus">取消</div>
			<div class="but" @click="turnSearch()" v-show="hasFocus">搜索</div>
		</div>
		<div class="box_text">
			<p>历史搜索</p>
			<div class="Contitle">
				<span v-for="(i,index) in searchList" @click="spbut(i)" :key="index">{{i}}</span>
			</div>
		</div>

		<div class="activity_list">
			<dl v-for="(item,index) in activityList" :key="index">
				<dt @click="Last_step(item._id)">
                <img :src="item.imgUrl" alt="">
            </dt>
				<dd>
					<div class="list_left">
						<img :src="item.creator.avatar" alt="">
						<ul class="list_left_cont">
							<li>{{item.creator.name}}</li>
							<li>信用{{item.creator.credit}}</li>
							<li>TOP{{item.creator.rank}}</li>
						</ul>
					</div>
					<div class="list_right">
						<img :src="item.love_img" alt="" @click="love(item.love_img,item._id,item.follow)">
						<p>{{item.followCount}}</p>
						<img src="../../assets/img/多边形5.png" alt="">
					</div>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
	import config from '@/common/config.js'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				activityList: [],
				splist: ['山西'],
				unitName: 3,
				pageNo: 1, // 页数
				love_img_true: require('../../assets/img/29.png'),
				love_img_false: require('../../assets/img/love_false.png'),
				isShowSelect: false,
				noFocus:true,
				hasFocus:false,
				dataList: [{
						type: 3,
						value: '全部'
					},
					{
						type: 0,
						value: '筹备中'
					},
					{
						type: 1,
						value: '执行中'
					},
					//					{
					//						type: 2,
					//						value: '我关注的'
					//					},
					{
						type: 4,
						value: '评价中'
					},
					{
						type: 5,
						value: '已完成'
					},
				],
				unitModel: '',
				searchData: ''
			}
		},
		computed: {
			...mapState(['uid', 'user', 'status', 'position_x','token','searchList'])
		},
		created() {},
		mounted(){
			// setTimeout(()=>{
			// 	// this.$refs.searchInp.focus()
			// },50)
		},
		methods: {
			search() {
				// this.handleClick()
				if(this.searchData) {
					this.searchList.unshift(this.searchData)
					console.log(this.searchList.length)
					if(this.searchList.length>8){
						alert('1')
						this.searchList.pop()
					}
				}
			},
			turnSearch(){
				this.handleClick()
				if(this.searchData) {
					this.searchList.unshift(this.searchData)
					console.log(this.searchList.length)
					if(this.searchList.length>8){
						this.searchList.pop()
					}
				}
			},
			hasBack(){
				this.noFocus=true;
				this.hasFocus=false;
			},
			hasIn(){
				// alert('1')
				this.noFocus=false;
				this.hasFocus=true;
			},
			Last_step1() {
				this.$router.push({
					path: '/activity',
					query: {}
				})
			},
			Last_step(_id) {
				this.$router.push({
					path: '/sign_up',
					query: {
						_id: _id
					}

				})
			},
			spbut(name) {
				this.searchData = name
				this.search()
			},
			handleClick(tab, event) {
				this.$http.get(config.server_url + 'activity/list/' + this.pageNo + '/' + this.unitName + '/' + this.token+'/'+this.searchData).then(res => {
					console.log(res)

					this.activityList = res.data.data;
					this.activityList.map(val => {
						if(val.follow == false) {
							val.love_img = this.love_img_false
						} else {
							val.love_img = this.love_img_true
						}
					})
				})
			},
			arrowDown() {
				this.isShowSelect = !this.isShowSelect;
			},
			select(item, index) {
				this.isShowSelect = false;
				this.unitModel = index;
				this.unitName = item.value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		/*border: 8px solid #eee;*/
		overflow: hidden;
		padding: 20px;
		.select {
			width: 150px;
			height: 70px;
			background: #fff;
			border-radius: 15px;
			line-height: 70px;
			float: left;
			box-shadow: 10px 10px 3px #eee;
		}
		.inp {
			float: left;
			width: 420px;
			height: 70px;
			margin-left: 25px;
			background: #fff;
			border-radius: 15px;
			line-height: 70px;
			box-shadow: 10px 10px 5px #eee;
		}
		.but{
			width: 100px;
			height: 70px;
			line-height: 70px;
			text-align: right;
			font-size: 35px;
			float: left;
		}
	}

	.box_text {
		width: 100%;
		padding: 0 16px;
		p {
			line-height: 76px;
			color: #9F9F9F;
		}
		.Contitle {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			span {
				margin-left: 10px;
				margin-top: 10px;
				display: inline-block;
				padding: 20px 30px;
				background: #fff;
				border-radius: 20px;
				color: #707070;
				font-size: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 10px 10px 5px #eee;
			}
		}
	}

	.activity_list {
		width: 95%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		margin-left: 20px;
		dl {
			width: 100%;
			height: 500px;
			margin-top: 10px;
			dt {
				width: 100%;
				height: 400px;
				img {
					width: 100%;
					height: 100%;
					border-top-right-radius: 20px;
					border-top-left-radius: 20px;
					background-size: 100% no-repeat;
				}
			}
			dd {
				width: 100%;
				height: 100px;
				border-bottom-left-radius: 20px;
				border-bottom-right-radius: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 32px;
				background: #fff;
				.list_left {
					height: 100%;
					display: flex;
					align-items: center;
					img {
						width: 70px;
						height: 70px;
						border-radius: 50%;
					}
					ul {
						display: flex;
						padding: 0 22px;
						li {
							padding: 0 14px;
							height: 100px;
							line-height: 100px;
							font-size: 24px;
							color: #000;
						}
					}
				}
				.list_right {
					display: flex;
					img {
						width: 36px;
						height: 36px;
						margin-top: 30px;
					}
					p {
						line-height: 100px;
						font-size: 22px;
						height: 100px;
						color: #000;
						padding: 0 20px 0 10px;
					}
				}
			}
		}
	}
</style>
