<template>
    <div id="Player_details">
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
        <div class="but" @click="add">
        	超链内打开
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
        	add(){
        		var _this = this
        		if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
					var loadDateTime = new Date();
					window.setTimeout(function() {
						var timeOutDateTime = new Date();
						if(timeOutDateTime - loadDateTime < 5000) {
							window.location = "http://superlinks.io/appDown/"; //ios下载地址
						} else {
							window.close();
						}
					}, 2000);
					window.location = "links://grxx"+'/id='+_this._id;
				} else if(navigator.userAgent.match(/android/i)) {
					var state = null;
					try {
						window.location = 'links://grxx'+'/id='+_this._id;
						setTimeout(function() {
							window.location = "http://superlinks.io/appDown/"; //android下载地址
						}, 1000);
					} catch(e) {}
				}
        	},
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
        }
    }
</script>

<style scoped lang="scss">
#Player_details{
    /*position: relative;*/
    display: flex;
    flex-direction: column;
}
.content{
	margin-top: 20px;
    width: 100%;
    padding:0 25px;
    overflow:hidden;
	position: absolute;
	top: 0px;
	bottom: 110px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.but{
	width: 100%;
	height: 100px;
	position: fixed;
	bottom: 0;
	background: #D95DFB;
	color: #fff;
	text-align: center;
	line-height: 100px;
	font-size: 32px;
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
