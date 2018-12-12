<template>
	<div id="sign_up">
		<div class="sign_up_alert" ref="sign_up_alert">
			<p>报名</p>
			<span>选择您在此次活动中的角色</span>
			<ul>
				<!-- <li v-for="(item,index) in arr4" :key="index" @click="checkRole(index)">
					{{item.duty}}
				</li> -->
				<li @click="cliOriginator()" v-show="isShenFaTop">
					发起人
				</li>
				<li v-show="isShenFa" style="color:#ffc8ff;" ref="refOriginator">
					发起人
					<span v-show="isShenFaBot" style="color:black;fontSize:14px;">(审核中)</span>
				</li>
				<li @click="cliSupporters()">支持者</li>
				<li @click="cliParticipants()"  v-show="isShenCanTop">
					参与者
				</li>
				<li style="color:#ffc8ff;" v-show="isShenCan" ref="refParticipants">
					参与者
					<span style="color:black;fontSize:14px;" v-show="isShenCanBot">(审核中)</span>
				</li>
			</ul>
		</div>
		<div class="box1">
			<div class="basic_header">
				<img src="../../assets/img/返回.png" alt="" @click="Last_step">
				<p>{{actDate.title}}</p>
				<img src="../../assets/img/多边形5.png" alt="" @click="shareHref">
			</div>
		</div>
		<div class="sing_box">
			<!-- 头部 -->
			<!-- 内容 -->
			<div class="content">
				<div class="active_img">
					<el-carousel trigger="click" autoplay :interval='2000'>
						<el-carousel-item v-for="(item,index) in actDate.activityImgs" :key="index">
							<img :src="item" alt="" @click="big_fn(item)">
						</el-carousel-item>
					</el-carousel>
				</div>
				<!-- 活动日期+地点 -->
				<div class="content_btn">
					<ul class="active_info">
						<li>
							<p>开始时间:</p>
							<span>{{actDate.startDate}}</span>
						</li>
						<li>
							<p>结束时间:</p>
							<span>{{actDate.endDate}}</span>
						</li>
						<li class="address">
							<p>活动地点:</p>
							<span @click="address_fn">{{actDate.address}}</span>
						</li>
					</ul>
					<div class="active_grade">
						<p>活动抵押{{actDate.min_num}}w~{{actDate.max_num}}w</p>
						<span>活动已抵押{{actDate.activityPledge/10000}}w SLK</span>
						<div class="progress">
							<div class="minimum" ref="minimum">
								<span>{{actDate.min_num}} w</span>
							</div>
							<p>0 w</p>
							<progress ref="progress" :value="actDate.activityPledge" :max="actDate.max_num*10000"></progress>
							<p>{{actDate.max_num}} w</p>
						</div>
					</div>
					<!-- 人 -->



					<div class="people">



						<div class="" style="borderBottom:1px solid #eee;">
							<dl>
								<dt>
										<img :src="actDate.activityData.creators.avatar" alt="">
								</dt>
								<dd>
									<p>{{actDate.activityData.creators.name}}<span>信用&nbsp;{{actDate.activityData.creators.credit}}&nbsp;&nbsp;TOP&nbsp;{{actDate.activityData.creators.rank}}</span></p>
									<b>抵押 {{actDate.activityData.creators.pledge}} slk</b>
								</dd>
							</dl>


							<dl v-for="(item,index) in actDate.activityData.enrollCreators" :key="index" class="shenFa">
								<dt>
									<img :src="item.avatar" alt="">
								</dt>
								<dd>
									<p>{{item.name}}<span>信用&nbsp;{{item.credit}}&nbsp;&nbsp;TOP&nbsp;{{item.rank}}</span></p>
									<b>抵押 {{item.pledge}} slk</b>
								</dd>
								<img src="../../assets/img/44.png" alt="" class="aaa">
							</dl>
						</div>




						<div class="people_box" style="borderBottom:1px solid #eee;">
							<!--支持者-->
							<dl v-for="(item,index) in actDate.activityData.supporters" :key="index">
								<dt>
										<img :src="item.avatar" alt="">
								</dt>
								<dd>
									<p><em>{{item.name}}</em></p>
									<b>抵押{{item.pledge}} SLK</b>
								</dd>
							</dl>
						</div>

<!--
						<div class="people_box">
							<dl v-for="(item,index) in enrollCreators" :key="index">
								<dt>
																	<img :src="item.avatar" alt="">
															</dt>
								<dd>
									<p><em>{{item.name}}</em></p>
									<b>抵押 {{item.pledge}} slk</b>
								</dd>
							</dl>
						</div> -->

					<!-- 	<div class="people_box">
							<dl v-for="(item,index) in organizers" :key="index">
								<dt>
																	<img :src="item.avatar" alt="">
															</dt>
								<dd>
									<p><em>{{item.name}}</em><i>{{item.role}}</i></p>
									<b>抵押 {{item.pledge}} slk</b>
								</dd>
							</dl>
						</div> -->



						<div class="people_box" style="borderBottom:1px solid #eee;">
							<dl v-for="(item,index) in participators" :key="index">
								<dt>
																	<img :src="item.avatar" alt="">
															</dt>
								<dd>
									<p>{{item.name}}<span></span></p>
									<i v-if="actDate.status >=3">{{item.checkIn | discount}}</i>
									<i v-if="actDate.status == 2">已报名<span v-show="item.pledge!=0">，已抵押{{item.pledge}}</span></i>
								</dd>
							</dl>
						</div>

						<div class="more">
							<p @click="more">查看更多</p>
						</div>
					</div>
					<!-- 活动激励分配 -->
					<div class="stimulate">
						<p>活动激励分配 <span>(总抵押数{{actDate.activityPledge}} SLK 总激励数{{actDate.stimulate}} SLK)</span></p>
						<ul>
							<li>
								<p>1.发起人 {{actDate.setting_allot[1]}}%</p>
								<div class="Basics" style="color:#999;">
									<!-- 抵押<em>{{actDate.stimulateData.creator.pledge}} SLK</em>， -->
									<b>{{actDate.stimulateData.creator.name}}</b>，可获得<strong>{{actDate.stimulateData.creator.slk}} SLK</strong>
								</div>
							</li>
							<li>
								<div v-for="(item,index) in stiEnrollCreator" :key="index" class="Basics" style="color:#999;">
									<!-- 抵押<em>{{item.pledge}} SLK</em>， -->
									<b>{{item.name}}，</b>可获得<strong>{{item.slk}}</strong> SLK
								</div>
							</li>
							<li>
								<p>2.支持者 {{actDate.setting_allot[2]}}%</p>
								<div v-for="(item,index) in actDate.stimulateData.supporter" :key="index" class="Basics"  style="color:#999;">
									<!-- 抵押<em>{{item.pledge}} SLK</em> -->
									<b>{{item.name}}</b>，可获得<strong>{{item.slk}}</strong> SLK
								</div>
							</li>
							<!--<li>
								<p>3.组织者 {{actDate.setting_allot[0]}}%</p>
								<div class="Basics" v-for="(item,index) in actDate.stimulateData.organizer" :key="index">
									<b>{{item.name}}：</b>抵押<em>{{item.pledge}} SLK</em>，可获得<strong>{{item.slk}}</strong>SLK
								</div>
							</li>-->
							<li>
								<p>3.参与者 {{actDate.setting_allot[3]}}%</p>
								<div class="Basics" v-for="(item,index) in actDate.stimulateData.participator" :key="index"  style="color:#999;">
									<!-- 抵押<em>{{item.pledge}} SLK</em> -->
									<b>{{item.name}}</b>，可获得<strong>{{item.slk}}</strong>SLK
								</div>
							</li>
						</ul>
					</div>
					<!-- 活动评分 -->
					<div class="activity_grade" v-if="actDate.reviewData">
						<p>活动评分</p>
						<div class="total_evaluate">
							<b>总体评价:</b>
							<span>{{this.actDate.reviewData.genMark}}</span>
						</div>
						<ul>
							<li>
								<i>{{this.actDate.reviewData.feaMark_inte}}</i>
								<p>有趣</p>
							</li>
							<li>
								<i>{{this.actDate.reviewData.feaMark_tone}}</i>
								<p>有品质</p>
							</li>
							<li>
								<i>{{this.actDate.reviewData.feaMark_rich}}</i>
								<p>有内容</p>
							</li>
							<li>
								<i>{{this.actDate.reviewData.feaMark_high}}</i>
								<p>有性价比</p>
							</li>
						</ul>
						<div class="detail_review">
							<dl v-for="(item,index) in actDate.reviewData.reviewers" :key="index" @click="show_review(item)">
								<dt>
										<img :src="item.avatar" alt="">
								</dt>
								<dd>
									<div class="review_title">
										<span>{{item.name}}</span>
										<span>总体评分 {{item.rv_total}}分</span>
									</div>
									<p>{{item.rv_des}}</p>
								</dd>
							</dl>
							<!-- <div class="more">
								<p>查看更多</p>
							</div> -->
						</div>
					</div>
					<!-- 活动号 -->
					<div class="activity_number">
						<p>活动号:</p>
						<input type="text" v-model="actDate.activityNo" id="copy_text" disable>
						<button ref="copy" data-clipboard-action="copy" data-clipboard-target="#copy_text" @click="copy">复制</button>
					</div>
				</div>

			</div>
			<div class="bottom_div" v-if="bottom_div">
			</div>
		</div>

		<div class="applyBox">
			<button @click="evaluate" v-if="pj">评价</button>
			<button @click="signIn" v-if="qd">签到</button>
			<button type="button" @click="apply" v-if="bm">报名</button>
			<p class="hasFa" v-if="fq">
				<button type="button"  name="button" @click="cliSupporters()">抵押</button>
				<button type="button"  name="button" @click="goShen()">审核报名信息</button>
				<span class="redPoint" v-show="hasBody"></span>
			</p>
			<button type="button" v-if="cy" name="button" @click="goDiYa()">参与者</button>

		</div>

		<div class="dialog" ref="dialog" @click="disappear_fn">

		</div>
		<div class="big_img" ref="big_img" @click="di_fn">
			<div>
				<img :src="img_url" alt="">
			</div>
		</div>
		<div class="pf_info" v-if="pf_show" @click="pf_show = false"></div>
		<div class="pf_content" v-if="pf_show">
			<div class="cont">
				<img :src="ps_list.avatar" alt="" /><span>{{ps_list.name}}</span><span>总体评分 {{ps_list.rv_total}}分</span>
			</div>
			<div class="cont2">
				{{ps_list.rv_des}}
			</div>
		</div>
	</div>
</template>

<script>
	import config from '@/common/config.js'
	import share from '@/assets/js/share.js'
	import wx from 'weixin-js-sdk';

	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import { timestampToTime } from '../../common/commin.js'
	import Clipboard from 'clipboard';
	export default {
		data() {
			return {
				hasBody:false,
				isShenFaTop:true,
				isShenCanTop:true,
				isShenCanBot:false,
				isShenFaBot:false,
				isShenFa:false,//发起人是否审核中
				isShenCan:false,//参与者是否审核中
				ps_list:'',
				pf_show:false,
				bm: false,
				qd: false,
				pj: false,
				fq:false,
				cy:false,
				bottom_div: false,
				minimum: 160,
				num: 100,
				img_url: '',
				actDate: {
					activityData: {
						creators: '',
						organizers: '',
						participators: '',
						supporters: ''
					},
					activityPledge: '',
					address: '',
					imgUrl: '',
					max_num: '',
					min_num: '',
					startDate: '',
					stimulate: '',
					title: '',
					setting_allot: [],
					stimulateData: {
						creator: {},
						organizer: {},
						participator: [{
							name: '',
							pledge: '',
							slk: ''
						}],
						supporter: [{
							name: '',
							pledge: '',
							slk: ''
						}]
					}
				},
				arr: [1, 1],
				arr3: [
					1, 2
				],
				arr4: [
					//					{
					//						"alert_router": "/organizer",
					//						"duty": "组织者"
					//					},
					{
						"alert_router": "/supporter",
						"duty": "支持者"
					},
					{
						"alert_router": "/participant",
						"duty": "参与者"
					},
					{
						"alert_router": "/Initiator",
						"duty": "发起者"
					},
				],
				_id: '',
				flag: false,
				config: '',
				needPledge: false,
				// people
				enrollCreators: [], // 发起人
				organizers: [], //组织者
				participators: [], //参与者
				// 激励分配
				stiEnrollCreator: [],
				// 活动评分
				reviewData: {},
				feaMark_high: 0,
				feaMark_tone: 0, // 品质
				feaMark_rich: 0, // 有性价比
				feaMark_inte: 0, // 有趣
				reviewers: [],
				status: '',
				shares: '',
				img: '../../assets/img/logo.png',
			}
		},
		created() {
			// this.config=config;
			this._id = this.$route.query._id;
			this.actDate._id = this.$route.query._id;
			this.getActDate();

			var Intent = null,
				File = null,
				Uri = null,
				main = null;
			var shareImageUrl = '';
			var _this = this
			mui.plusReady(function() {
				_this.updateSerivces();
				if(plus.os.name == "Android") {
					Intent = plus.android.importClass("android.content.Intent");
					File = plus.android.importClass("java.io.File");
					Uri = plus.android.importClass("android.net.Uri");
					main = plus.android.runtimeMainActivity();
				}
			})

		},
		mounted() {
			this.copyBtn = new Clipboard(this.$refs.copy);

		},
		watch: {
			isShenCanBot(val,oldVal){
				if(val){
					this.$refs.refParticipants.style.paddingLeft='52px'
				}
			},
			isShenFaBot(val,oldVal){
				if(val){
					this.$refs.refOriginator.style.paddingLeft='52px'
				}
			}
		},
		computed: {
			...mapState(['uid', 'token'])
		},
		methods: {
			show_review(data) {
				this.pf_show = true
				this.ps_list = data
			},
			// 上一级
			updateSerivces() {
				var _this = this

				plus.share.getServices(function(s) {
					_this.shares = {};
					for(var i in s) {
						var t = s[i];
						_this.shares[t.id] = t;
					}
					_this.outSet("获取分享服务列表成功");
				}, function(e) {
					_this.outSet("获取分享服务列表失败：" + e.message);
				});
			},
			//分享操作
			shareAction(id, ex) {
				var _this = this
				console.log('id = ' + id);
				console.log('ex = ' + ex);
				console.log('shares[id]' + _this.shares[id]);
				var s = null;
				if(!id || !(s = _this.shares[id])) {
					_this.outLine("无效的分享服务！");
					return;
				}
				if(s.authenticated) {
					_this.outSet("---已授权---");
					_this.shareMessage(s, ex);
				} else {
					_this.outSet("---未授权---");
					s.authorize(function() {
						_this.shareMessage(s, ex);
					}, function(e) {
						_this.outLine("认证授权失败");
					});
				}
			},
			//		/**
			//		 * 发送分享消息
			//		 */
			shareMessage(s, ex) {
				var _this = this
				if(s.id == 'sinaweibo') {
					var add = {
						pictures: [_this.actDate.activityImgs[0]]
					}
					var pictures = [];
					function onStateChanged(d, status) {
						switch(d.state) {
							case 4:
								if(status == 200) {
									console.log("图片下载完成：" + d.filename);
									pictures.push(plus.io.convertLocalFileSystemURL(d.filename));
									var msg = {
										pictures: pictures,
										content:'superlinks下载链接:http://superlinks.io/appDown/',
										extra: {
											scene: ex
										}
									};
									s.send(msg, function() {
										//									outLine("分享成功!");
										mui.toast("分享成功!")
									}, function(e) {
										//									outLine("分享失败!");
										mui.toast("分享失败!")

									});
								} else {
									mui.toast("下载图片失败");
								}
								break;
							case 1:
								console.log("下载开始");
								break;
							case 2:
								console.log("请求已响应");
								break;
							case 3:
								console.log("下载进行中");
								break;
							default:
								console.log("state: " + d.state);
								break;
						}
					}
					mui.toast("下载图片中，即将打开微信分享...");
					mui.each(add.pictures, function(i, n) {
						// 创建下载任务
						var dtask = plus.downloader.createDownload(n);
						console.log(dtask)
						dtask.addEventListener("statechanged", onStateChanged, false);
						dtask.start();
					});
				}else{
					var msg = {
//						http://superlinks.io/dist/index.html#/share_sign_up?_id=5bc99d8b63a3a31a17c4b089
						href: 'http://superlinks.io/dist/index.html#/share_sign_up?_id='+ _this._id,
						title: _this.actDate.title,
						content: '发起人-'+_this.actDate.activityData.creators.name+'; 信用值：'+_this.actDate.activityData.creators.credit+";Top:"+_this.actDate.activityData.creators.rank,
						thumbs: ['http://pfedfy7kb.bkt.clouddn.com/1539352858526'],
						pictures: ['http://pfedfy7kb.bkt.clouddn.com/1539352858526'],
						extra: {
							scene: ex
						}
					};

					s.send(msg, function() {
						_this.outLine("分享成功!");
					}, function(e) {
						_this.outLine("分享失败!");
					});
				}

			},
			//		/**
			//		 * 分享按钮点击事件
			//		 * 注意这里的这些id值
			//		 */
			shareHref() {
				var _this = this
				var ids = [{
							id: "weixin",
							ex: "WXSceneSession" /*微信好友*/
						}, {
							id: "weixin",
							ex: "WXSceneTimeline" /*微信朋友圈*/
						}, {
							id: "qq" /*QQ好友*/
						},
						{
							id: "sinaweibo" /*新浪微博*/
						}
					],
					bts = [{
							title: "发送给微信好友"
						}, {
							title: "分享到微信朋友圈"
						}, {
							title: "分享到QQ"
						},
						{
							title: "分享到新浪微博"
						}
					];
				plus.nativeUI.actionSheet({
						cancel: "取消",
						buttons: bts
					},
					function(e) {
						var i = e.index;
						console.log('i = ' + i);
						if(i > 0) {
							_this.shareAction(ids[i - 1].id, ids[i - 1].ex);
						}
					}
				);
			},
			// 控制台输出日志
			outSet(msg) {
				console.log(msg);
			},
			// 界面弹出吐司提示
			outLine(msg) {
				mui.toast(msg);
			},





			goDiYa(){
				this.$router.push({
					path:'/supBot',
					query:{
						aid: this.$route.query._id,
						setting_supporter: this.actDate.setting_supporter,
						setting_participator: this.actDate.setting_participator,
						setting_organizer: this.actDate.setting_organizer,
						haspledge:this.actDate.haspledge,
						hasfee:this.actDate.hasfee
					}
				})
			},
			goShen(){
				this.$router.push({
					path:'/Registration_information',
					query:{
						aid: this.$route.query._id,
						setting_supporter: this.actDate.setting_supporter,
						setting_participator: this.actDate.setting_participator,
						setting_organizer: this.actDate.setting_organizer,
						haspledge:this.actDate.haspledge
					}
				})
			},
			cliOriginator(){
				this.$router.push({
					path:'/Initiator',
					query: {
						aid: this.$route.query._id,
						setting_supporter: this.actDate.setting_supporter,
						setting_participator: this.actDate.setting_participator,
						setting_organizer: this.actDate.setting_organizer,
						haspledge:this.actDate.haspledge
					}
				})
			},
			cliSupporters(){
				this.$router.push({
					path:'/supporter',
					query: {
						aid: this.$route.query._id,
						setting_supporter: this.actDate.setting_supporter,
						setting_participator: this.actDate.setting_participator,
						setting_organizer: this.actDate.setting_organizer,
						haspledge:this.actDate.haspledge
					}
				})
			},
			cliParticipants(){
				this.$router.push({
					path:'/participant',
					query: {
						aid: this.$route.query._id,
						setting_supporter: this.actDate.setting_supporter,
						setting_participator: this.actDate.setting_participator,
						setting_organizer: this.actDate.setting_organizer,
						haspledge:this.actDate.haspledge
					}
				})
			},
			show_review(data){
				this.pf_show = true
				this.ps_list = data
			},
			// 上一级
			updateSerivces() {
				var _this = this

				plus.share.getServices(function(s) {
					_this.shares = {};
					for(var i in s) {
						var t = s[i];
						_this.shares[t.id] = t;
					}
					_this.outSet("获取分享服务列表成功");
				}, function(e) {
					_this.outSet("获取分享服务列表失败：" + e.message);
				});
			},
			//分享操作
			shareAction(id, ex) {
				var _this = this
				console.log('id = ' + id);
				console.log('ex = ' + ex);
				console.log('shares[id]' + _this.shares[id]);
				var s = null;
				if(!id || !(s = _this.shares[id])) {
					_this.outLine("无效的分享服务！");
					return;
				}
				if(s.authenticated) {
					_this.outSet("---已授权---");
					_this.shareMessage(s, ex);
				} else {
					_this.outSet("---未授权---");
					s.authorize(function() {
						_this.shareMessage(s, ex);
					}, function(e) {
						_this.outLine("认证授权失败");
					});
				}
			},
			//		/**
			//		 * 发送分享消息
			//		 */
			shareMessage(s, ex) {
				var _this = this
				var msg = {
					href: 'http://superlinks.io/appDown/',
					title: 'superlinks',
					content: 'superlinks下载链接',
					//				thumbs: ['http://superlinks.io/appDown/images/icon_1.png'],
					thumbs: ['http://pfedfy7kb.bkt.clouddn.com/1539352858526'],
					pictures: ['http://pfedfy7kb.bkt.clouddn.com/1539352858526'],
					extra: {
						scene: ex
					}
				};
				s.send(msg, function() {
					_this.outLine("分享成功!");
				}, function(e) {
					_this.outLine("分享失败!");
				});
			},
			//		/**
			//		 * 分享按钮点击事件
			//		 * 注意这里的这些id值
			//		 */
			shareHref() {
				var _this = this
				var ids = [{
							id: "weixin",
							ex: "WXSceneSession" /*微信好友*/
						}, {
							id: "weixin",
							ex: "WXSceneTimeline" /*微信朋友圈*/
						}, {
							id: "qq" /*QQ好友*/
						},
						//				{
						//					id: "tencentweibo"   /*腾讯微博*/
						//				},
						//				{
						//					id: "sinaweibo"  /*新浪微博*/
						//				}
					],
					bts = [{
							title: "发送给微信好友"
						}, {
							title: "分享到微信朋友圈"
						}, {
							title: "分享到QQ"
						},
						//				{
						//					title: "分享到腾讯微博"
						//				},
						//				{
						//					title: "分享到新浪微博"
						//				}
					];
				plus.nativeUI.actionSheet({
						cancel: "取消",
						buttons: bts
					},
					function(e) {
						var i = e.index;
						console.log('i = ' + i);
						if(i > 0) {
							_this.shareAction(ids[i - 1].id, ids[i - 1].ex);
						}
					}
				);
			},
			// 控制台输出日志
			outSet(msg) {
				console.log(msg);
			},
			// 界面弹出吐司提示
			outLine(msg) {
				mui.toast(msg);
			},

			///////////////////////////////
			Last_step() {
				if(this.$route.query.tz == 'hd') {
					this.$router.push('/activity');
				}else
				if(this.$route.query.tz == 'ap') {
					this.$router.push('/find/schedule');
				}else
				if(this.$route.query.tz == 'xq') {
					this.$router.push('/My_activities');
				}else{
					this.$router.push('/activity');
				}
			},
			address_fn() {
				this.$router.push({
					path: '/Sign_address',
					query: {
						address: this.actDate.address,
						location: this.actDate.location
					}
				})
			},
			more() {
				this.$router.push({
					path: '/more_people',
					query: {
						aid: this.$route.query._id,
						status: this.actDate.status
					}
				})
			},
			// 签到
			signIn() {
				let _this = this;
				if(window.navigator.geolocation) {
					window.navigator.geolocation.getCurrentPosition((position) => {
						console.log(position.coords)
						_this.getLongitude = position.coords.longitude; //经度
						_this.getLatitude = position.coords.latitude; // 纬度
						// alert('经度' + _this.getLongitude, '纬度' + _this.getLatitude)
						console.log(typeof(_this.getLongitude))
						console.log('经度' + _this.getLongitude, '纬度' + _this.getLatitude)
						_this.$http.post(config.server_url + 'activity/checkIn', {
							"uid": _this.uid,
							"aid": _this.actDate._id,
							"lo": _this.getLongitude,
							"la": _this.getLatitude,
							"token": _this.token
						}).then((res) => {
							console.log(res.data.code)
							console.log(res.data.msg)
							this.toast({
								message:res.data.msg,
								duration:1000
							})
							this.qd = false;
						})
					}, (error) => {
						let errorType = ['您拒绝共享位置信息！', '获取不到位置信息!', '获取位置信息超时！'];
						_this.toast({
							message:errorType[error.code - 1],
							duration:1000
						});
					})
				} else {
					_this.toast({
						message:'未知错误',
						duration:1000
					})
				}
			},
			// 评价
			evaluate() {
				this.$router.push({
					path: '/evaluate',
					query: {
						aid: this.actDate._id
					}
				})
			},
			di_fn() { //去掉大图
				this.$refs.big_img.className = 'display_none'
			},
			// 报名
			apply() {
				this.$refs.sign_up_alert.className = 'active_alert';
				this.$refs.dialog.className = 'dialog_act';
				// this.stop()
			},
			stop() {
				var mo = function(e) {
					e.preventDefault();
				};
				document.body.style.overflow = 'hidden';
				document.addEventListener("touchmove", mo, false); //禁止页面滑动
			},
			// 选择您在此次活动中的角色
			// checkRole(i) {
			// 	console.log()
			// 	this.$router.push({
			// 		path: this.arr4[i].alert_router,
			// 		query: {
			// 			aid: this.$route.query._id,
			// 			setting_supporter: this.actDate.setting_supporter,
			// 			setting_participator: this.actDate.setting_participator,
			// 			setting_organizer: this.actDate.setting_organizer,
			// 			haspledge:this.actDate.haspledge
			// 		}
			// 	})
			// 	this.$refs.sign_up_alert.className = 'sign_up_alert'
			// },
			// 删除
			close() {
				this.$refs.sign_up_alert.className = 'sign_up_alert'
				this.$refs.dialog.className = 'dialog';
			},
			big_fn(index) {
				this.$refs.big_img.className = 'img_alert';
				this.img_url = index;
			},
			disappear_fn() {
				this.$refs.dialog.className = 'dialog';
				this.$refs.big_img.className = 'display_none'
				this.$refs.sign_up_alert.className = 'display_none'
			},
			getActDate() { //活动详情
				//              this.$http.get(config.server_url+'activity/detail/'+this.uid+'/'+this._id).then(res=>{

				this.$http.get(config.server_url + 'activity/detail/' + this._id + '/' + this.token).then(res => {
					console.log(res)
					if(res.data.data.audit[0].status==='True'||res.data.data.audit[1].status==='True'){
						this.hasBody=true;
					}else{
						this.hasBody=false;
					}
					// signUpStatus  0未报名   1参与者审核中   2参与者通过审核    3发起者审核中    4发起者通过审核   5活动创建者
					if(res.data.data.signUpStatus==5){
						this.bm=false;
						this.qd=false;
						this.pj=false;
						this.fq=true;
					}else if(res.data.data.signUpStatus==0){
						this.bm=true;
						this.qd=false;
						this.pj=false;
						this.fq=false;
					}else if(res.data.data.signUpStatus==1){
						this.bm=true;
						this.qd=false;
						this.pj=false;
						this.fq=false;
						this.isShenCan=true;
						this.isShenCanTop=false;
						this.isShenCanBot=true;
						this.isShenFaTop=false;
						this.isShenFa=true;
						this.isShenFaBot=false;
					}else if(res.data.data.signUpStatus==3){
						this.bm=true;
						this.qd=false;
						this.pj=false;
						this.fq=false;
						this.isShenFaTop=false;
						this.isShenFa=true;
						this.isShenFaBot=true;
						this.isShenCanTop=false;
						this.isShenCan=true;
						this.isShenCanBor=false;
					}else if(res.data.data.signUpStatus==4){
						this.bm=false;
						this.qd=false;
						this.pj=false;
						this.fq=true;
					}else if(res.data.data.signUpStatus==2){
						this.bm=false;
						this.qd=false;
						this.pj=false;
						this.fq=false;
						this.cy=true;
					}
					if(res.data.data.stimulateData.creator.creatorItem == null) {
						res.data.data.stimulateData.creator.creatorItem = 0;
					}
					this.actDate = res.data.data; // 活动详情的数据
					console.log(this.actDate,1)
					this.status = this.actDate.status; // 活动状态
					let widMini = this.actDate.min_num * 10000 / (this.actDate.max_num * 10000);
					let leftMin = widMini * 256 + 2 + 30;
					this.$refs.minimum.style.left = leftMin + 'px';
					//判断是否显示选项
					//					if(res.data.data.setting_organizer.length == 0) {
					//						// console.log(312)
					//						this.arr4 = [{
					//								"alert_router": "/supporter",
					//								"duty": "支持者"
					//							},
					//							{
					//								"alert_router": "/participant",
					//								"duty": "参与者"
					//							},
					//							{
					//								"alert_router": "/Initiator",
					//								"duty": "发起者"
					//							},
					//						]
					//					}

					//激励数保留两位小数
					this.actDate.stimulateData.creator.slk = this.actDate.stimulateData.creator.slk.toFixed(2)
					this.actDate.stimulateData.enrollCreator.map((val) => {
						val.slk = val.slk.toFixed(2)
					})
					// this.actDate.stimulateData.organizer.map((val)=>{
					// 	val.slk=val.slk.toFixed(2)
					// })
					this.actDate.stimulateData.participator.map((val) => {
						val.slk = val.slk.toFixed(2)
					})
					this.actDate.stimulateData.supporter.map((val) => {
						val.slk = val.slk.toFixed(2)
					})

					//已抵押

					let wid = this.actDate.activityPledge / (this.actDate.max_num * 10000);
					let leftT = wid * 256 + 2 + 30;
					// people
					this.enrollCreators = this.actDate.activityData.enrollCreators; // 发起人
					this.organizers = this.actDate.activityData.organizers; // 组织者
					this.participators = this.actDate.activityData.participators; // 参与者

					// 激励分配
					this.stiEnrollCreator = this.actDate.stimulateData.enrollCreator; // 发起人
					// 改变开始时间的日期格式
					let dateS = new Date(this.actDate.startDate);
					let Y = dateS.getFullYear() + '/';
					let M = (dateS.getMonth() + 1 < 10 ? '0' + (dateS.getMonth() + 1) : dateS.getMonth() + 1) + '/';
					let D = dateS.getDate() + ' ';
					let h = (dateS.getHours() < 10 ? '0' + (dateS.getHours()) : dateS.getHours()) + ':';
					let m = (dateS.getMinutes() < 10 ? '0' + (dateS.getMinutes()) : dateS.getMinutes()) + ':';
					let s = (dateS.getSeconds() < 10 ? '0' + (dateS.getSeconds()) : dateS.getSeconds());
					this.actDate.startDate = Y + M + D + h + m + s;
					let dateE = new Date(this.actDate.endDate);
					let Ye = dateE.getFullYear() + '/';
					let Me = (dateE.getMonth() + 1 < 10 ? '0' + (dateE.getMonth() + 1) : dateE.getMonth() + 1) + '/';
					let De = dateE.getDate() + ' ';
					let he = (dateE.getHours() < 10 ? '0' + (dateE.getHours()) : dateE.getHours()) + ':';
					let me = (dateE.getMinutes() < 10 ? '0' + (dateE.getMinutes()) : dateE.getMinutes()) + ':';
					let se = (dateE.getSeconds() < 10 ? '0' + (dateE.getSeconds()) : dateE.getSeconds());
					this.actDate.endDate = Ye + Me + De + he + me + se;
					// this.actDate.startDate = timestampToTime(this.actDate.startDate)
					// this.actDate.endDate = timestampToTime(this.actDate.endDate)
					console.log(this.actDate)
					// 活动评分
					this.reviewData = this.actDate.reviewData;

					if(this.actDate.status == config.activityStatus.TOAUDIT) {
						//待审核
						this.qd = false
						this.pj = false
						this.bm = false
					}
					//执行中
					if(this.actDate.status == config.activityStatus.EXECUTION) { //签到
						this.qd = false
						this.pj = false
						this.bm = false
						this.cy=false
						this.fq=false
						console.log(this.actDate.role)
						if(this.actDate.role == 3) { //签到
							console.log(this.actDate.role,1111)
							this.qd = true;
							if(!this.actDate.checkIn) {
								this.qd = true;
							} else {
								this.qd = false;
							}
						}
					}
					//评价中
					if(this.actDate.status == config.activityStatus.REVIEW) { //评价
						this.qd = false
						this.pj = false
						this.bm = false
						if(this.actDate.role == 4) {
							this.pj = true
							if(this.actDate.reviewed == false) {
								this.pj = true;
							} else {
								this.pj = false
							}
						}
					}
					//筹备中
					// if(this.actDate.status == config.activityStatus.PREPARATION) { //报名
					// 	console.log(config.activityStatus.PREPARATION)
					// 	this.qd = false
					// 	this.pj = false
					// 	this.bm = false
					// 	// console.log(res.data.data.inActivity)
					// 	// if(res.data.data.inActivity == false) {
					// 	// 	this.bm = true
					// 	// }
					// }
					//已关闭
					if(this.actDate.status == config.activityStatus.CLOSED) {
						this.qd = false
						this.pj = false
						this.bm = false
						this.cy=false
						this.fq=false
					}
					// 已完成
					if(this.actDate.status == config.activityStatus.FINISHED) {
						this.qd = false
						this.pj = false
						this.bm = false
						this.cy=false
						this.fq=false
					}
					if(this.qd == true || this.pj == true || this.bm == true) {
						this.bottom_div = true
					}
				})
			},
			//复制
			copy() {
				let _this = this;
				this.copyBtn.on('success', function() {
					_this.toast({
						message:'复制成功',
						duration:1000
					})
				})
				this.copyBtn.on('error', function() {
					_this.toast({
						message:'复制失败，请手动复制',
						duration:1000
					})
				})
			},
		},
		filters: { //过滤器  用法 {{>{{ num | discount}}}}
			discount: function(value) {
				if(value == true) {
					return '已签到'
				} else if(value == false) {
					return '未签到'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pf_info{
		background: #000;
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		z-index: 100;
		filter: alpha(opacity=60);
		opacity: 0.5 !important;
	}
	.pf_content{
		position: fixed;
		width: 80%;
		min-height: 600px;
		background: #fff;
		top: 20%;
		z-index: 999;
		left: 10%;
		border: 1px solid;
		border-radius: 20px;
		.cont{
			border-bottom: 2px solid #eee;
			width: 100%;
			height: 100px;
			padding:10px;
			display:flex;
			justify-content: space-around;
			span{
				line-height: 100px;
			}
			img{
				width: 80px;
			}
		}
		.cont2{
			width: 90%;
			margin: 10px auto;
			min-height: 450px;
			border: 2px solid #eee;
			padding: 20px;
			border-radius: 20px;
		}
	}
	#sign_up {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.active_alert {
		display: block;
		position: absolute;
		width: 522px;
		border-radius: 12px;
		left: 50%;
		margin-left: -266px;
		top: 50%;
		margin-top: -266px;
		background: #fff;
		text-align: center;
		z-index: 102;
		/*i {
			position: fixed;
			right: -15px;
			top: -15px;
			display: block;
			width: 44px;
			height: 44px;
			border-radius: 50%;
			line-height: 44px;
			text-align: center;
			font-size: 36px;
			background: #000;
			color: #fff;
		}*/
		p {
			font-size: 32px;
			color: #000;
			font-size: 32px;
			padding: 28px 46px;
		}
		span {
			display: inline-block;
			font-size: 26px;
			color: #999;
			margin-top: 10px;
		}
		ul {
			width: 100%;
			li {
				line-height: 80px;
				border-bottom: 1px solid #ccc;
				font-size: 30px;
				color: #D95DFB;
				&:last-child {
					border: 0;
				}
			}
		}
	}

	.dialog_act {
		display: block;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 101;
	}

	.display_none {
		display: none;
	}

	.box1 {
		height: 100px;
		overflow: hidden;
	}

	// 头部
	.basic_header {
		width: 100%;
		padding: 26px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
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

	.sing_box {
		width: 100%;
		position: absolute;
		top: 100px;
		bottom: 10px;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	// 内容
	.content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		padding: 23px 25px;
		position: relative;
		.content_btn {
			width: 93.5%;
			position: absolute;
			top: 45%;
			z-index: 10;
			background: #f5f5f5;
		}
		.active_img {
			width: 100%;
			height: 1000px;
			img {
				width: 100%;
				height: auto;
				position: absolute;
				border-radius: 12px;
			}
		}
		// 日期+地点
		.active_info {
			width: 100%;
			background: #fff;
			margin-top: 24px;
			border-radius: 12px;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			li {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 30px 50px 36px 30px;
				border-bottom: 1px solid #eee;
				p {
					font-size: 30px;
					color: #999;
					padding-right: 40px;
					width: 30%;
				}
				span {
					font-size: 30px;
					color: #000;
					width: 70%;
				}
				&:last-child {
					border-bottom: 0;
				}
			}
		}
		// 等级
		.active_grade {
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			width: 100%;
			background: #fff;
			margin-top: 24px;
			border-radius: 12px;
			display: flex;
			flex-wrap: wrap;
			padding: 34px 30px;
			position: relative;
			.hasMortgage {
				margin-top: 60px;
			}
			.grade_title {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					font-size: 30px;
					color: #000;
				}
				span {
					font-size: 30px;
					color: #A4A4A4;
				}
			}
			p {
				width: 100%;
				font-size: 24px;
				color: #000;
			}
			.progress {
				width: 100%;
				height: 6px;
				display: flex;
				align-items: center;
				margin-top: 20px;
				position: relative;
				margin-bottom: 20px;
				.hadProgress {
					border-left: 2px solid #ccc;
					height: 30px;
					position: absolute;
					top: 0;
					span {
						position: absolute;
						right: -30px;
						bottom: -100%;
					}
				}
				.minimum {
					border-left: 2px solid #ccc;
					height: 30px;
					position: absolute;
					top: 0;
					span {
						position: absolute;
						right: -30px;
						bottom: -100%;
						width: 60x;
						text-align: center;
					}
				}
				p {
					width: 10%;
					font-size: 18px;
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
		}
		// 人
		.people {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			margin-top: 22px;
			background: #fff;
			border-radius: 12px;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			position: relative;
			.shenFa{
				position: relative;
				img{
					width: 100%;
					margin:0;
					height:100%;
				}
				.aaa{
					position: absolute;
					right: 0;
					top: 0;
					width: 96px;
					height: 96px;
				}
			}
			dl:nth-child(1){
				dt{
					img{
						width: 100%;
						height:100%;
						margin:0;
					}
				}
			}
			dl,
			.people_box dl {
				width: 100%;
				height: 110px;
				// border-bottom: 1px solid #ccc;
				display: flex;
				align-items: center;
				padding: 16px 32px;
				dt {
					width: 80px;
					height: 80px;
					img {
						margin-top:10px;
						margin-left:9px;
						width: 80%;
						height: 80%;
						border-radius:50%;
					}
				}
				dd {
					padding-left: 32px;
					p {
						font-size: 30px;
						color: #000;
						span {
							font-size: 24px;
							color: #000;
							padding-left: 12px;
						}
					}
					b {
						font-size: 20px;
						color: #333;
					}
				}
			}
			.people_box dl {
				border-bottom: 0;
				position: relative;
				&:last-child {
					border-bottom: 1px solid #ccc;
				}
				i {
					position: absolute;
					right: 10px;
					bottom: 20px;
					color: #b1b1b1;
				}
			}
			.more {
				width: 100%;
				line-height: 64px;
				text-align: center;
				p {
					font-size: 24px;
					color: #999;
				}
			}
			&::after {
				content: "";
				position: absolute;
				display: block;
				right: 0;
				top: 0;
				width: 96px;
				height: 96px;
				background: url('../../assets/img/44.png') no-repeat;
				background-size: cover;
			}
		}
		// 活动激励分配
		.stimulate {
			width: 100%;
			overflow: hidden;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			display: flex;
			flex-direction: column;
			margin-top: 22px;
			background: #fff;
			border-radius: 12px;
			padding: 36px 32px;
			.Basics {
				padding-left: 10px;
				line-height: 36px;
				font-size: 24px;
			}
			P {
				width: 100%;
				font-size: 30px;
				color: #000;
				span {
					font-size: 26px;
					color: #515151;
				}
			}
			ul {
				width: 100%;
				li {
					width: 100%;
					margin-top: 5px;
					font-size: 18px;
					color: #000;
					div {
						margin-top: 10px;
						font-size: 16px;
					}
				}
			}
		}
		// 活动评分
		.activity_grade {
			width: 100%;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);

			/*height: 524px;*/
			display: flex;
			flex-direction: column;
			margin-top: 22px;
			background: #fff;
			border-radius: 12px;
			padding: 36px 32px;
			p {
				width: 100%;
				font-size: 30px;
				color: #000;
			}
			.total_evaluate {
				width: 100%;
				display: flex;
				padding: 30px 4px;
				b {
					font-size: 28px;
					color: #666;
					font-weight: normal;
					padding-right: 20px;
				}
				span {
					font-size: 36px;
					color: #faa724;
				}
			}
			ul {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				li {
					width: 138px;
					height: 58px;
					background: #f0f0f0;
					border-radius: 8px;
					margin-right: 36px;
					position: relative;
					p {
						font-size: 26px;
						color: #666;
						line-height: 58px;
						text-align: center;
					}
					i {
						position: absolute;
						left: 0;
						top: 0;
						color: #FF5B5B;
					}
				}
			}
			.detail_review {
				width: 100%;
				margin-top: 20px;
				border-top: 1px solid #ccc;
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
							width: 500px;
							overflow: hidden;
							white-space:nowrap;
							text-overflow: ellipsis;
							margin-top: 12px;
							font-size: 20px;
							color: #999;
						}
					}
				}
			}
			.more {
				width: 100%;
				line-height: 64px;
				text-align: center;
				p {
					font-size: 24px;
					color: #999;
				}
			}
		}
		// 活动号
		.activity_number {
			width: 100%;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);

			height: 110px;
			background: #fff;
			border-radius: 12px;
			display: flex;
			padding: 0 32px;
			justify-content: space-between;
			align-items: center;
			margin-top: 22px;
			margin-bottom:100px;
			p {
				color: #000;
				font-size: 30px;
			}
			input {
				font-size: 24px;
				border: 0;
				color: #C5C5C5;
			}
			button {
				outline: none;
				border: none;
				display: inline-block;
				width: 120px;
				height: 44px;
				background: #FF4EE2;
				border-radius: 4px;
				color: #fff;
				text-align: center;
				line-height: 44px;
				font-size: 26px;
			}
		}
	}

	.sign_up_alert {
		display: none;
	}

	.activity_action {
		padding-bottom: 100px;
		button {
			width: 100%;
			height: 110px;
			color: #0a92fe;
			outline: none;
			border: none;
			background: #D95DFB;
			font-size: 32px;
			text-align: center;
			line-height: 110px;
			color: #fff;
		}
	}

	.applyBox {
		position: fixed;
		bottom: 0px;
		width: 100%;
		z-index: 1;
		border-radius: 12px;
		z-index: 99;
		button {
			width: 100%;
			height: 95px;
			color: #0a92fe;
			outline: none;
			border: none;
			background: rgba(255,78,225,1);
			font-size: 32px;
			text-align: center;
			line-height: 95px;
			color: #fff;
		}
		.hasFa{
			width: 100%;
			display: flex;
			position: relative;
			button{
				width: 50%;
			}
			button:nth-child(1){
				border-right:1px solid #ccc;
			}
		}
		.redPoint{
			width: 16px;
			height:16px;
			background: red;
			position: absolute;
			border-radius:50%;
			right:70px;
			top:22px;
		}
	}

	.dialog {
		display: none;
	}

	.address {
		width: 100%;
		span {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.active_grade {
		width: 100%;
		background: #fff;
		margin-top: 24px;
		border-radius: 12px;
		display: flex;
		flex-wrap: wrap;
		padding: 34px 30px;
		position: relative;
		.hasMortgage {
			margin-top: 60px;
		}
		.grade_title {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				font-size: 30px;
				color: #000;
			}
			span {
				font-size: 30px;
				color: #A4A4A4;
			}
		}
		p {
			width: 100%;
			font-size: 24px;
			color: #000;
		}
		.progress {
			width: 100%;
			height: 6px;
			display: flex;
			align-items: center;
			margin-top: 20px;
			position: relative;
			margin-bottom: 20px;
			.hadProgress {
				border-left: 2px solid #ccc;
				height: 30px;
				position: absolute;
				top: 0;
				span {
					position: absolute;
					right: -30px;
					bottom: -100%;
				}
			}
			.minimum {
				border-left: 2px solid #ccc;
				height: 30px;
				position: absolute;
				top: 0;
				span {
					position: absolute;
					right: -30px;
					bottom: -100%;
					width: 80px;
				}
			}
			.hasProgress {
				border-left: 2px solid #ccc;
				height: 30px;
				position: absolute;
				top: 0;
				span {
					position: absolute;
					right: -30px;
					bottom: -100%;
				}
			}
			p {
				width: 10%;
				font-size: 18px;
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
	}

	.img_alert {
		display: block;
		position: absolute;
		width: 100%;
		border-radius: 12px;
		left: 0;
		top: -200px;
		bottom: 0;
		right: 0;
		margin: auto;
		background: #fff;
		text-align: center;
		z-index: 999;
		div {
			display: flex;
			width: 100%;
			height: 100%;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
			}
		}
	}

	.bottom_div {
		height: 100px;
		width: 100%;
	}
</style>
