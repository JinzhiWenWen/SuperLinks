<template>
    <div id="Player_details">
        <div class="box">
            <div class="basic_header">
                <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
                <p>{{detailData.name}}</p>
                <img src="../../../assets/img/多边形5.png" alt="" @click="shareHref">
            </div>
        </div>
        <div class="content">
            <div class="card_top">
                <div class="topBox">
                    <p>财富值 <span>{{detailData.wealth}}</span></p>
                    <b v-if="detailData.wealthRank >100">未上榜</b>
                    <b v-else>Top{{detailData.wealthRank}}</b>
                </div>
                <div class="topBox">
                    <p>信用值 <span>{{detailData.credit}}</span></p>
                    <b v-if="detailData.creditRank >100">未上榜</b>
                    <b v-else>Top{{detailData.creditRank}}</b>
                </div>
            </div>
            <div class="card_center">
                 <p>个人简介：</p>
                <span>{{detailData.intro.txt}}</span>
                <div v-for="(item,index) in detailData.intro.imgs" :key="index" class="img_div">
                    <img :src="item" alt="">
                </div>
            </div>
            <div class="card_echarts">
                <div id="myChart" :style="{ height: '280px',padding:'3px'}"></div>
            </div>
            <div class="card_echarts2">
                <div id="myChart2" :style="{ height: '280px'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {timestampToTime,getDate,Typeface_date} from '../../../common/commin.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import config from '@/common/config.js'
    export default {
        name: '',
        _id:'',
         data(){
            return {
            	fximg:'',
                detailData:{
                    intro:{
                        txt:'',
                        imgs:[]
                    }
                },
                feaMark_high:0,
                feaMark_inte:0,
                feaMark_tone:0,
                feaMark_rich:0,
                myChart:null,
                myChart2:null,
                c_acts:[],// 参与
                dataList:[],// 时间数据
                cList:[],// 参与 getmark
                pList:[],// 发起 getmark
                specialData:[],// 特色统计
            }
        },
        created(){
            if(this._id !== this.$route.query._id) {
                this.$destroy();
            }
            this._id=this.$route.query._id;
            this.name=this.$route.query.name;
            this.information_fn();
            //获取分享数据
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
            setTimeout(val=>{
                this.drawLine();
                this.drawLine2();
            },100)
        },
        computed:{
            ...mapState(['uid','token'])
        },
        methods:{
            Last_step(){
                 this.$router.go(-1)
            },
            // 请求数据
            information_fn(){
                this.$http.get(config.server_url+'users/superUser/detail/'+this._id).then(res=>{
                	this.fximg = res.data.data.avatar
                    this.detailData = res.data.data;
					console.log(res)
                    // 得到特色统计
                    for(var i = 0;i<this.detailData.features.length;i++){
                        var arr = [];
                        arr.push(this.detailData.features[i].feaMark_inte,this.detailData.features[i].feaMark_tone,this.detailData.features[i].feaMark_rich,this.detailData.features[i].feaMark_high)
                        this.specialData= arr;
                    }
                    //参与 趋势图
                    this.c_acts = this.detailData.c_acts;
                    this.c_acts.map((val,index)=>{
                        val.startDate=getDate(val.startDate)
                        this.dataList.push(new Date(val.startDate).getTime())
                        this.cList.push(val.genMark)
                    })
                    //发起 趋势图
                    this.p_acts = this.detailData.p_acts;
                    this.p_acts.map((val,index)=>{
                        val.startDate=getDate(val.startDate)
                        this.dataList.push(new Date(val.startDate).getTime())
                        this.pList.push(val.genMark)
                    })

                    this.dataList.sort((a,b)=>{
                        return a-b;
                    })
                    this.dataList.map((val,index)=>{
                          this.dataList[index]=Typeface_date(val)
                    })
                    console.log('时间=》', this.dataList)
                })
            },
            // 活动趋势
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                this.myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                this.myChart.setOption({
                    title: { text: '活动统计趋势图' },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['发起的','参与的'],
                        x:"200px"
                    },
                    toolbox: {
                        show: true,
                        orient: 'horizontal',
                        x:"100px",
                        y:"24px"
                    },
                    axisLabel :{
                        interval:0
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:Array.from(new Set(this.dataList))
                    },
                    yAxis: {
                            type: 'value',
                            min:0,
                            max:100,
                            interval: 20
                    },
                    series: [
                        {
                            name:'发起的',
                            type:'line',
                            data:Array.from(this.pList),
                        },
                        {
                            name:'参与的',
                            type:'line',
                            data:Array.from(this.cList),
                        }
                    ]
                });
            },
            // 特色统计
            drawLine2(){
                this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
                this.myChart2.setOption({
                   title: { text: '发起活动特色图' },
                    xAxis: {
                        type: 'category',
                        data: ['有趣', '有品质', '有内容', '有性价比']
                    },
                    yAxis: [
                        {
                            type: 'value',
                            max:100,
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                            },
                            min:0,
                            max:100,
                            boundaryGap: [0.05, 0.05],
                            show: true,
                        }
                    ],
                    textStyle:"blue",
                    series: [{
                        data: Array.from(this.specialData),
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}%'
                                },
                                color: function(params) {
                                    var colorList = [
                                        '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }]
                })
            },
            //***************************分享***************************//
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
										content:'财富值：'+_this.detailData.wealth+' Top'+_this.detailData.wealthRank+'； 信用值：'+_this.detailData.credit+' Top'+_this.detailData.creditRank+'； superlinks下载链接:http://superlinks.io/appDown/',
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
						href: 'http://superlinks.io/dist/index.html#/Share_card?_id='+ _this._id,
						title: _this.detailData.name,
						content: '财富值：'+_this.detailData.wealth+' Top'+_this.detailData.wealthRank+'； 信用值：'+_this.detailData.credit+' Top'+_this.detailData.creditRank,
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
        }
    }
</script>

<style scoped lang="scss">
#Player_details{
    position: relative;
    display: flex;
    flex-direction: column;
}
.box{
    height: 100px;
    overflow: hidden;
}
.basic_header{
    position: fixed;
    width: 100%;
    padding:26px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
     z-index: 1000000;
    img{
        width: 36px;
        height: 46px;
    }
    p{
        font-size:34px;
        color:#000;
        font-weight:bold;
    }
}
.content{
	margin-top: 20px;
    width: 100%;
    padding:0 25px;
    overflow:hidden;
}
.card_top{
    flex: 1;
    background: #fff;
    padding:25px 32px;
    -moz-box-shadow:2px 2px 10px #DADADA;
    -webkit-box-shadow:2px 2px 10px #DADADA;
    box-shadow:2px 2px 10px #DADADA;
    border-radius:12px;
    .topBox{
        width: 100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:26px;
        p{
            color:#000;
            span{
                color:#FF52E2;
                padding-left:30px;
            }
        }
        &:last-child{
            margin-top:25px;
        }
        b{
            color:#9B9B9B;
        }
    }

}
.card_center{
    padding: 30px 20px;
    width: 100%;
    background: #fff;
    margin-top: 15px;
    font-size:30px;
    -moz-box-shadow:2px 2px 10px #DADADA;
    -webkit-box-shadow:2px 2px 10px #DADADA;
    box-shadow:2px 2px 10px #DADADA;
    border-radius:12px;
    overflow : hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    .img_div{
        img{
            width: 30%;
            height: 200px;
            float: left;
            margin: 10px;
        }
    }
    span{
        padding-left: 15px;
    }

}
.card_echarts{
    width: 100%;
    margin-top: 15px;
    background: #fff;
    -moz-box-shadow:2px 2px 10px #DADADA;
    -webkit-box-shadow:2px 2px 10px #DADADA;
    box-shadow:2px 2px 10px #DADADA;
    border-radius:12px;
}
.card_echarts2{
    width: 100%;
    padding-left:20px;
    margin-top: 15px;
    background: #fff;
    -moz-box-shadow:2px 2px 10px #DADADA;
    -webkit-box-shadow:2px 2px 10px #DADADA;
    box-shadow:2px 2px 10px #DADADA;
    border-radius:12px;
}
</style>
