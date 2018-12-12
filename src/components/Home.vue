<template>
	<div id="home">
		<div class="content">
			<div class="home_head">
				<p>翻牌抽糖果</p>
				<span>您还有{{user.remained}}次翻牌机会，<span v-if='showmt'>明天再</span>试试运气吧</span>
			</div>
			<div class="home_content">
				<ul class="candyList">
					<li v-for="(item,index) in user.lastCardList" :key="index" @click="drawReversal(index)">
						<div class="mask" ref="mask">
							<img :src="mask" alt="这里是遮罩层">
						</div>
						<div class="cont">
							<span ref="spans">{{item.candyNum}}</span>
							<img :src="candy" alt="糖果" ref="candy_img" class="candyImg">
						</div>
						<!--<div :class="['tg','add'+index]"><img src='../assets/img/tg.png'/></div>-->
					</li>
				</ul>
			</div>
			<div class="light">
				<div class="divs" @click="exchange">
					<p>兑换</p>
				</div>
				<div class="candy">
					<b class="candy_numer">{{user.candyNum}}</b>
					<img :src="light" alt="">
				</div>
				<div class="divs" @click="strategy">
					<p>攻略</p>
				</div>
			</div>
		</div>
		<div class="zz" v-if="showhd"></div>
		<div class="hd" v-if="showhd">
			<div class="switch el-icon-close" @click="showhdbut"></div>
			<div class="hdimg">
				<img @click="imgbut(adUrl)" :src="adUrl" />
				<!--<img @click="imgbut(adUrl)" src="../assets/img/123png.png" />-->
			</div>
			<!--<div class="ewm">
			</div>-->
			<div class="fxbut" @click="share">一键分享 5倍🍬奖励</div>
		</div>
		<audio src="http://10.2.9.130/pic.ibaotu.com/00/62/35/17t888piCkDw.mp3" id="audio"></audio>
	</div>
</template>

<script>
	import config from '@/common/config.js'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				app: '',
				//				shoutg:false,
				adUrl: '',
				imgUrl: '',
				showmt: false,
				showhd: false,
				candy_basin: require('../assets/img/gaily.png'),
				mask: require('../assets/img/901281006303475701.png'), // 遮罩
				candy: require('../assets/img/2.png'), // 糖果
				light: require('../assets/img/3.png'), // 光
				cardList: [],
				candyNum: '糖果',
				candyNum2: ''
			}
		},
		created() {
			// 首页列表
			this.drawList();
			console.log(this.audit, 66666)
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
		computed: {
			...mapState(['store_candy_numer', 'uid', 'user', 'token', 'audit'])
		},
		//		mounted(){
		//			mui.back = function(){
		//			    /*函数体*/
		//			   alert(1)
		//			   let _this=this;
		//			   _this.$router.push({
		//					path: '/home',
		//					query: {}
		//				})
		//			};
		//		},
		methods: {
			// 首页列表
			...mapMutations(['candy_fn', 'user_new_fn']),
			drawList() { //活动列表
				this.$http.get(config.server_url + 'draw/cardList/' + this.token).then(res => {
					if(res.data.data.user.remained == 0) {
						this.showmt = true
					}
					this.user_new_fn(res.data.data.user);
					res.data.data.user.lastCardList.map((val, index) => {
						if(val.opened == true) {
							this.$refs.mask[index].className = 'active2'
						}
					})

				})
			},
			showhdbut() {
				this.showhd = false
			},
			// imgbut(url){
			// 	window.location.href=url;
			// },
			// 兑换
			exchange() {
				this.$router.push({
					path: '/Exchange',
					query: {}
				})
			},
			// 攻略
			strategy() {
				this.$router.push({
					path: '/Strategy',
					query: {
						id: 1
					}
				})
			},
			// 翻牌

			drawReversal(index, event) {

				//				var audio = document.querySelector('#audio')
				//				var width = document.body.clientWidth/2
				//				var e = event || window.event;
				//				var top = 500-e.clientY+80
				//				var left = width-e.clientX+50
				//
				//				var add = '.add'+index
				//				var item1 = document.querySelector(".item3");
				//				var item2 = document.querySelector(add);
				//				console.log(item2)
				//				item2.style.zIndex = '100';
				//				item2.style.top = top+'px';
				//				item2.style.left = left+'px';

				this.$http.get(config.server_url + 'draw/cardReversal/' + this.user.lastCardList[index].cid + '/' + this.token).then(res => {
					console.log(res)
					if(res.data.code == 200) {
						this.$refs.mask[index].className = 'active';
						//						setTimeout(function(){
						//							audio.play()
						//						},1000)
						//						item2.style.visibility = 'visible';
						this.user.lastCardList[index].candyNum = res.data.data.card.candyNum;
						this.user_new_fn(res.data.data.user);
						this.imgUrl = res.data.data.card.imgUrl
						this.adUrl = res.data.data.card.adUrl
						if(res.data.data.user.remained == 0) {
							this.showmt = true
						} else {
							this.showmt = false
						}
						if(res.data.data.card.adUrl) {
							this.showhd = true
						} else {
							this.showhd = false
						}

						// this.showhd = true
					} else {
						this.showhd = false
						if(res.data.msg) {
							this.toast({
								message: res.data.msg,
								duration: 1000
							})
							this.showmt = true
						}
					}
				})

			},
			//***************分享******************//
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
//				var msg = {
//					href: 'http://superlinks.io/appDown/',
//					title: actDate.title,
//					content: 'superlinks下载链接',
//				    thumbs: ['http://superlinks.io/appDown/images/icon_1.png'],
//					thumbs: ['http://pfedfy7kb.bkt.clouddn.com/1539352858526'],
//					pictures: ['http://pfedfy7kb.bkt.clouddn.com/1539352858526'],
//					extra: {
//						scene: ex
//					}
//				};
//				s.send(msg, function() {
//					_this.outLine("分享成功!");
//				}, function(e) {
//					_this.outLine("分享失败!");
//				});
				var add = {
					pictures: [_this.adUrl]
				}
				var pictures = [];
				//          var pic_unloaded = msg.pictures.length ;
				function onStateChanged(d, status) {
					switch(d.state) {
						case 4:
							if(status == 200) {
								console.log("图片下载完成：" + d.filename);
								pictures.push(plus.io.convertLocalFileSystemURL(d.filename));
								var msg = {
									pictures: pictures,
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
//                          pic_unloaded --;
//                          if(pic_unloaded == 0){
//                              copyToClip( msg.title + (msg.url_short || msg.href) + "\r\n" + msg.brief );
//                              mui.toast("标题已复制，请长按黏贴");
//                              console.log(JSON.stringify(pictures),88888);
//                              test_weixin_share_mul_pic(ex, pictures, msg.title + (msg.url_short || msg.href) + "\r\n" + msg.brief);
//                          }
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
				console.log(pictures)
			},
			//		/**
			//		 * 分享按钮点击事件
			//		 * 注意这里的这些id值
			//		 */
			share() {
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
										{
											id: "sinaweibo"  /*新浪微博*/
										}
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
		}
	}
</script>

<style lang="scss" scoped>
	.hd {
		position: fixed;
		width: 80%;
		min-height: 800px;
		background: #fff;
		top: 15%;
		z-index: 999;
		left: 10%;
		border: 1px solid;
		border-radius: 20px;
		.switch {
			width: 50px;
			height: 50px;
			background: #C0CCDA;
			border-radius: 50%;
			position: absolute;
			right: -10px;
			top: -15px;
			text-align: center;
			line-height: 50px;
			font-size: 40px;
			font-weight: 800;
		}
		.hdimg {
			width: 96%;
			min-height: 600px;
			margin: 10px;
			display: flex;
			vertical-align: middle;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding-bottom: 100px;
			img {
				flex: 1;
				width: 100%;
			}
		}
		.fxbut {
			width: 100%;
			height: 100px;
			text-align: center;
			background: #eee;
			position: absolute;
			bottom: 0;
			line-height: 100px;
			font-size: 40px;
			font-weight: 600;
			border-bottom-right-radius: 20px;
			border-bottom-left-radius: 20px;
		}
		.ewm {
			width: 200px;
			height: 200px;
			right: 0;
			top: 62%;
			border: 1px solid;
			position: absolute;
		}
	}
	
	.zz {
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
	
	#home {
		background: url("../assets/img/shouye.png") fixed center center no-repeat;
		background-size: cover;
		.content {
			width: 100%;
			padding-top: 20px;
			.home_head {
				width: 100%;
				text-align: center;
				margin-top: 13px;
				margin-bottom: 28px;
				p {
					font-size: 28px;
					font-weight: bold;
					line-height: 46px;
					color: #fff;
				}
				span {
					font-size: 24px;
					color: #fff;
				}
			}
			.home_content {
				width: 100%;
				padding: 10px 28px;
				overflow: hidden;
				ul {
					height: 850px;
					li {
						width: 33%;
						overflow: hidden;
						float: left;
						height: 9%;
						box-sizing: border-box;
						display: flex;
						position: relative;
						justify-content: center;
						align-items: center;
						border-radius: 12px;
						margin-bottom: 12px;
						margin-right: 2px;
						.mask {
							position: absolute;
							left: 0px;
							top: 0px;
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							z-index: 99;
							img {
								width: 100%;
								height: 100%;
							}
						}
						.tg {
							width: 50px;
							top: 0;
							left: 50px;
							visibility: hidden;
							/*border-radius: 50%;*/
							/*display: inline-block;*/
							position: absolute;
							z-index: 98;
							transition: top 1s ease-in 0.5s, left 1s linear 0.5s;
							img {
								width: 100%;
							}
						}
						.cont {
							height: 100%;
							position: relative;
							display: flex;
							align-items: center;
							justify-content: center;
							.candyImg {
								width: 100%;
								height: 100%;
								background-size: cover;
								position: relative;
							}
							span {
								position: absolute;
								right: 0;
								top: 0;
								margin-right: 50px;
								margin-top: 25px;
								color: #fff;
								font-size: 34px;
							}
						}
					}
				}
			}
		}
	}
	
	.active2 {
		display: none;
	}
	
	.active {
		position: absolute;
		background: #000;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: .5s ease-in-out;
		/*transition: opacity .5s;*/
		/*display: none;*/
		left: 100%;
		z-index: 999;
		img {
			width: 100%;
			height: 100%;
		}
	}
	
	.light {
		width: 100%;
		height: 120px;
		display: flex;
		align-items: flex-end;
		padding: 10px 42px;
		.candy {
			flex: 1;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
				height: 100%;
			}
			b {
				width: 100%;
				text-align: center;
				z-index: 100;
				color: #000000;
				line-height: 100%;
				font-size: 30px;
				position: absolute;
				left: 0;
				bottom: 0;
				margin-bottom: 15px;
			}
		}
		.divs {
			width: 140px;
			height: 50px;
			border-radius: 18px;
			display: flex;
			align-items: center;
			background: #7D44A3;
			p {
				width: 100%;
				text-align: center;
				color: #fff;
				line-height: 50px;
			}
		}
	}
	
	@-moz-keyframes hor-animation {
		0% {
			transform: translateX(0px);
		}
		100% {
			transform: translateX(400px);
		}
	}
	
	@-webkit-keyframes hor-animation {
		0% {
			transform: translateX(0px);
		}
		100% {
			transform: translateX(400px);
		}
	}
	
	@-moz-keyframes vertical-animation {
		0% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(400px);
		}
	}
	
	@-webkit-keyframes vertical-animation {
		0% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(400px);
		}
	}
</style>