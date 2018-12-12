<template>
    <div id="Registration_information">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>报名信息</p >
            <p></p >
        </div>
        <div class="content">
        	<div class="sign1" v-if="showsign1"></div>
        	<div class="sign2" v-if="showsign2"></div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="发起人" name="0">
                <mt-loadmore :top-method="loadTop" ref="loadmore">
                        <ul class="list">
                            <li v-for="(item,index) in this.enrollCreators" :key="index">
                                <div class="box_left">
                                    <img :src="item.avatar" alt="">
                                </div>
                                <div class="" style="position:absolute;top:7px;left:85px;">
                                  <p style="fontSize:16px;color:black;">{{item.name}}</p>
                                  <p style="color:#999;fontSize:12px;marginTop:2px;">抵押&nbsp;{{item.pledge}}&nbsp;slk</p>
                                </div>
                                <p @click="state_fn(item)" ref="is" :class="{addC:item.status==0}">{{item.status | discount}}</p>
                            </li>
                        </ul>
                </mt-loadmore>
                    </el-tab-pane>
                <!--<el-tab-pane label="组织者" name="1">
                <mt-loadmore :top-method="loadTop2" ref="loadmore2">
                    <ul class="list">
                        <li v-for="(item,index) in this.organizers" :key="index">
                            <div class="box_left">
                                <img :src="item.avatar" alt="">
                                <p>{{item.name}}</p>
                            </div>
                            <p>抵押{{item.pledge}}slk</p>
                            <p @click="state_fn(item)" ref="is">{{item.status | discount}}</p>
                        </li>
                    </ul>
                </mt-loadmore>
                </el-tab-pane>-->
                <el-tab-pane label="参与者" name="2">
                <mt-loadmore :top-method="loadTop3" ref="loadmore3">
                    <ul class="list">
                        <li v-for="(item,index) in this.participators" :key="index">
                            <div class="box_left">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="" style="position:absolute;top:10px;left:85px;">
                              <p style="fontSize:16px;color:black;">{{item.name}}</p>
                              <p style="color:#999;fontSize:12px;marginTop:2px;">抵押{{item.pledge}}slk</p>
                            </div>
                            <p @click="state_fn(item)" ref="is" :class="{addC:item.status==0}">{{item.status | discount}}</p>
                        </li>
                    </ul>
                </mt-loadmore>
                </el-tab-pane>
             </el-tabs>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
            	showsign1:false,
            	showsign2:false,
                aid:'',
                activeName:0,
                status:0,
                enrollCreators:[],// 发起人
                organizers:[],// 组织者
                participators:[]// 参与者
            }
        },
        mounted(){
            this.aid=this.$route.query.aid;
            this.getList();

        },
        computed:{
            ...mapState(['uid','token','audit'])
        },
        methods:{
            handleClick(tab, event) {
                this.getList()
            },
            Last_step(){
                this.$router.go(-1)
            },
            loadTop() {
                console.log(this)
                this.getList()
                setTimeout(()=>{
                   this.$refs.loadmore.onTopLoaded();
                },1000)

            },
            loadTop2() {
                console.log(this)
                this.getList()
                setTimeout(()=>{
                   this.$refs.loadmore2.onTopLoaded();
                },1000)

            },
            loadTop3() {
                console.log(this)
                this.getList()
                setTimeout(()=>{
                   this.$refs.loadmore3.onTopLoaded();
                },1000)

			},
            getList(){
                this.$http.get(config.server_url+'activity/info/list/'+this.aid+'/'+this.token).then(res=>{
                	console.log(res)
                    this.enrollCreators=res.data.data.enrollCreators;//发起人
                    this.organizers=res.data.data.organizers;// 组织者
                    this.participators=res.data.data.participators;// 参与者
                    //
                    // for(let i in this.enrollCreators){
                    //   console.log(this.enrollCreators[i].status)
                    //   if(this.enrollCreators[i].status==0){
                    //     for(let x in this.$refs.isTop){
                    //       console.log(this.$refs.isTop[x],111)
                    //       this.$refs.isTop[i].style.color='rgba(252,52,220,1)'
                    //     }
                    //   }
                    // }
                    if(res.data.audit[0].status == 'True'){
		            	this.showsign2 = true
		            }
		            if(res.data.audit[1].status == 'True'){
		            	this.showsign1 = true
		            }
                })
            },
            state_fn(item){
                console.log(this.activeName)
                if(item.status == 0){
                    this.$router.push({
                        path:'/Toexamine',
                        query:{
                            aid:this.aid,
                            item:item,
                            state:this.activeName
                        }
                    })
                }
            }
        },
        filters: {
            discount : function(value){
                if(value==0){
                    return '待审核'
                }else if(value==1){
                    return '已通过'
                }else if(value==-1){
                    return '已拒绝'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.addC{
  color:rgba(252,52,220,1)!important;
}
.content{
	position: relative;
	.sign1{
    	width: 16px;
    	height: 16px;
    	background: red;
    	border-radius: 13px;
    	position: absolute;
    	top: 10px;
    	left: 35%;
    }
    .sign2{
    	width: 16px;
    	height: 16px;
    	background: red;
    	border-radius: 13px;
    	position: absolute;
    	top: 10px;
    	right: 20%;
    }
}

.basic_header{
    width: 100%;
    padding:26px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
    /*position: fixed;
    z-index: 100;*/
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
/*.content{
    width: 100%;
	position: absolute;
	top: 130px;
	bottom: 20px;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
}*/
.list{
    width: 94%;
    margin:0 auto;
    // height: 100%;
    min-height: 500px;
    li{
        width: 100%;
        box-shadow: 0px 0px 25px rgba(0,0,0,.15);
        border-radius:12px;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        align-items:center;
        background:#fff;
        padding:15px 32px;
        font-size:28px;
        margin-top:20px;
        position: relative;
        .box_left{
        	width: 200px;
            display:flex;
            align-items:center;
            img{
                width: 80px;
                height: 80px;
                border-radius:50%;
            }
            p{
                padding-left:30px;
            }
        }
    }
}
</style>
