<template>
    <div id="activeity">
    	 <div class="activeity_search1">
                <div class="launch" @click="createAct">发起活动</div>
                <div class="search">
                    <span class="el-icon-search"></span>
                    <input type="text" placeholder="请输入活动关键字" @click="Search">
                </div>
         </div>
            <el-tabs v-model="filterType" @tab-click="handleClick" class="back">
                <el-tab-pane v-for="(item1,key) in this.list" :key="key"   :label="item1">
                	<mt-loadmore :top-method="loadTop" style="color:#fff" :autoFill='false' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                         <div class="activity_list">
                            <dl v-for="(item,index) in activityList" :key="index">
                                <dt @click="Last_step(item._id)">
                                    <img :src="item.imgUrl" alt="">
                                </dt>
                                <dd>
                                    <div class="list_left">
                                        <img :src="item.creator.avatar" alt="">
                                        <ul>
                                            <li>{{item.creator.name}}</li>
                                            <li>信用{{item.creator.credit}}</li>
                                            <li>TOP{{item.creator.rank}}</li>
                                        </ul>
                                    </div>
                                    <div class="list_right">
                                        <img :src="item.love_img" alt="" @click="love(item.love_img,item._id,item.follow)">
                                        <p>{{item.followCount}}</p>
                                        <img src="../assets/img/多边形5.png" alt="" @click="shareHref(item.imgUrl)">
                                    </div>
                                </dd>
                            </dl>
                    </div>
                    </mt-loadmore>
                </el-tab-pane>
            </el-tabs>
    </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus.js'
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import { Loadmore } from 'mint-ui';
    export default {
       data() {
            return {
            	allLoaded:true,
                list:["筹备中","执行中","我关注的","所有活动"],
                filterType:0,// 活动类型
                pageNo:1,// 页数
                activityList:[],// 列表数据
                followCount:'',
                love_img_true:require('../assets/img/29.png'),
                love_img_false:require('../assets/img/love_false.png'),
                a:1
            }
        },
        computed:{
          ...mapState(['uid','user','status','position_x','token','actiListOne','avtiListTwo',
          'avtiListThree','avtiListFour'
          ]),

        },
        created() {
            //获取活动列表
            this.handleClick()
            // console.log(window.scrollY)
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
		mounted(){
//			mui.back = function(){
//			    /*函数体*/
//			   history.go(1)
//			};
		},
        methods: {
            ...mapMutations(['audit_fn','actiListOne_fn','avtiListTwo_fn','avtiListThree_fn','avtiListFour_fn']),

        	loadTop() {
                let _this=this;
                if(_this.filterType==0){
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      console.log(res,'Initiator')
                      _this.activityList=res.data.data;
                      _this.actiListOne_fn(res.data.data);
                      console.log(_this.actiListOne,'22222')
                      console.log(_this.activityList,'22333333333')
                      // console.log(_this.actiListOne,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }else if(_this.filterType==1){
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.avtiListTwo_fn(res.data.data);
                      // console.log(_this.actiListOne,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }else if(_this.filterType==2){
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.avtiListThree_fn(res.data.data);
                      // console.log(_this.actiListOne,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }else{
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.avtiListFour_fn(res.data.data);
                      // console.log(_this.actiListOne,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }
                setTimeout(()=>{
                   this.$refs.loadmore[_this.filterType].onTopLoaded();
                },1000)
			},
			loadBottom(){
//				this.allLoaded = true;// 若数据已全部获取完毕
				this.handleClick2()
				setTimeout(()=>{
					this.$refs.loadmore[this.filterType].onBottomLoaded();
                },1000)
			},
             Last_step(_id){
                this.$router.push({
                    path:'/sign_up',
                    query:{
                        _id:_id,
                        tz:'hd'
                    }

              })
            },
            //获取活动列表
            handleClick(tab, event) {
        	  this.allLoaded = false
              var _this=this;
              // console.log(this.filterType)
              _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then((res)=>{
                _this.activityList=res.data.data;
                _this.activityList.map(val=>{
                  if(val.follow == false){
                    val.love_img=_this.love_img_false
                  }else{
                    val.love_img=_this.love_img_true
                  }
                })
              })
              if(_this.filterType==0){
                // alert('筹备中')
                console.log(_this.actiListOne,'1')

                if(_this.actiListOne.length>0){
                  _this.activityList=_this.actiListOne;
                }else{
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.actiListOne_fn(res.data.data);
                      // console.log(_this.actiListOne,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }
              }else if(_this.filterType==1){
                if(_this.avtiListTwo.length>0){
                  _this.activityList=_this.avtiListTwo;
                }else{
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.avtiListTwo_fn(res.data.data);
                      // console.log(_this.avtiListTwo,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }
              }else if(_this.filterType==2){
                if(_this.avtiListThree.length>0){
                  _this.activityList=_this.avtiListThree;
                }else{
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.avtiListThree_fn(res.data.data);
                      // console.log(_this.avtiListThree,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }
              }else{
                if(_this.avtiListFour.length>0){
                  _this.activityList=_this.avtiListFour;
                }else{
                  _this.$http.get(config.server_url+'activity/list/'+_this.pageNo+'/'+_this.filterType+'/'+_this.token).then(res=>{
                      _this.activityList=res.data.data;
                      _this.avtiListFour_fn(res.data.data);
                      // console.log(_this.avtiListFour,'下边')
  	                    // console.log(res.data)
  	                    if(res.data.audit){
  	                      	_this.audit_fn(res.data.audit)
  	                      }
                       	if(res.data.data.length>=5){
                       		_this.allLoaded = false
                       }
                    _this.activityList.map(val=>{
                      if(val.follow == false){
                        val.love_img=_this.love_img_false
                      }else{
                        val.love_img=_this.love_img_true
                      }
                    })
                  })
                }
              }

            },
            handleClick2(tab, event) {
            	this.pageNo++
                this.$http.get(config.server_url+'activity/list/'+this.pageNo+'/'+this.filterType+'/'+this.token).then(res=>{
                    this.activityList=this.activityList.concat(res.data.data);
                    	if(res.data.data.length<5){
                    		this.allLoaded = true;
                    		this.pageNo = 1
                    	}
                        this.activityList.map(val=>{
                            if(val.follow == false){
                               val.love_img=this.love_img_false
                            }else{
                               val.love_img=this.love_img_true
                            }
                        })

                })
            },
            //发起活动
            createAct(){
                 this.a++
                  this.$router.push({
                    path:'/basic',
                    query:{
                    }
                })
            },
            // 搜索关键字
            Search(){
                 this.$router.push({
                    path:'/search',
                    query:{id:1}
                })
            },
            love(love_img,id,follow){
                if(follow == true){
                      love_img=this.love_img_false;
                    this.$http.get(config.server_url+'activity/follow/'+id+'/0/'+this.token).then(res=>{
                        if(res.data.code == 200){
                            follow=res.data.data.follow;
                            this.handleClick();
                            this.toast({
                              message:'取消成功',
                              duration:1000
                            })
                        }else{
                             this.toast({
                               message:res.data.msg,
                               duration:1000
                             })
                        }
                    })
                }else{
                    // 关注
                    love_img=this.love_img_true
                    this.$http.get(config.server_url+'activity/follow/'+id+'/1/'+this.token).then(res=>{
                          if(res.data.code == 200){
                            follow=res.data.data.follow;
                             this.handleClick()
                             this.toast({
                               message:'关注成功',
                               duration:1000
                             })
                        }else{
                            this.toast({
                              message:res.data.msg,
                              duration:1000
                            })
                        }

                    })
                }
                // 活动列表
                this.handleClick()
            },
             ///*******************分享************************//
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
						pictures: [_this.fximg]
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
				}
				
			},
			//		/**
			//		 * 分享按钮点击事件
			//		 * 注意这里的这些id值
			//		 */
			shareHref(data) {
				this.fximg = data
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
        }
    }
</script>

<style lang="scss" scoped>
.back{
    width: 100%;
	position: absolute;
	top: 130px;
	bottom: 140px;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
}
#activeity{
    background: url("../assets/img/shouye.png");
    background-size: cover;
    padding-top: 20px;
}
.activeity_search1{
    padding: 10px 20px 20px 0;
    width: 100%;
    position: fixed;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background: #0F1A47;
    z-index: 100;
    .launch{
        width:174px;
        height: 80px;
        font-size: 24px;
        background: #FF4EE2;
        border-radius: 12px;
        line-height: 80px;
        text-align: center;
        color:#FFFEFF;
        margin-left:30px;
    }
    .search{
        flex: 1;
        height: 80px;
        margin-left: 20px;
        background:#572974;
        border-radius:12px;
        display:flex;
        align-items:center;
        padding:0 38px;
        span{
            display:inline-block;
            width: 30px;
            height: 30px;
            margin-top: 10px;
            color:#fff;
        }
        input{
            font-size:24px;
            border:0;
            color:#C5C5C5;
            padding-left:12px;
            background:#572974;
            width: 100%;
            height: 100%;
        }
        input::-webkit-input-placeholder {
            color:#fff;
        }
    }
}
.activity_list{
    width: 95%;
    height: 100%;
    overflow-y: scroll;
    display:flex;
    flex-wrap:wrap;
    margin-top: 10px;
    margin-left: 20px;
    dl{
       width: 100%;
       height:400px;
       margin-top: 10px;
       dt{
           width: 100%;
           height: 300px;
           img{
               width: 100%;
               height: 100%;
               border-top-right-radius: 20px;
               border-top-left-radius: 20px;
               background-size:100% no-repeat;
           }
       }
       dd{
           width:100%;
           height: 100px;
           border-bottom-left-radius: 20px;
           border-bottom-right-radius: 20px;
           display:flex;
           justify-content:space-between;
           align-items:center;
           padding:0 32px;
           background:#fff;
           .list_left{
                height: 100%;
                display:flex;
                align-items:center;
                img{
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                }
                ul {
                    display:flex;
                    padding:0 22px;
                    li{
                        padding:0 14px;
                        height: 100px;
                        line-height: 100px;
                        font-size:24px;
                        color:#000;
                    }
                }
           }
           .list_right{
               display:flex;
               img{
                   width: 36px;
                   height: 36px;
                   margin-top: 30px;
               }
               p{
               line-height: 100px;
                   font-size:22px;
                   height: 100px;
                   color:#000;
                   padding:0 20px 0 10px;
               }
           }
       }
    }
}

.mint-loadmore{
width: 100%;
}
</style>
