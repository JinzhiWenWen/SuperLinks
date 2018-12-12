<template>
    <div id="attribute">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>属性</p >
            <p></p >
        </div>
        <div class="attribute_ul1">
            <ul>
                <li>
                    <div class="li_left">
                        <span>财富值</span>
                    </div>
                    <div class="li_right">
                        <span>{{user.wealth}}</span>
                    </div>
                </li>
                <li>
                    <div class="li_left">
                        <span>信用值</span>
                    </div>
                    <div class="li_right">
                        <span>{{user.credit}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <p class="attribute_title">财富值是按SLK数量和持有天数计算</p>
	        <div class="attribute_ul2" v-if='showlist'>
            <mt-loadmore
            :top-method="loadTop"
            :autoFill='false'
            :topDistance="30"
            :bottomDistance='30'
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            ref="loadmore">
	            <ul>
	                <li v-for="(item,index) in credit_list" :key="index">
	                    <div class="li_left">
	                        <b>{{item.act_name}}</b><br>
	                        <span class="attribute_score">总体评分&nbsp;<i>{{item.act_genmark}}</i>分&nbsp;&nbsp;&nbsp;信用值&nbsp;<em>{{item.act_credit}}</em></span>
	                        <span class="endTime">{{item.act_date}}</span>
	                    </div>
	                </li>
	            </ul>
        	</mt-loadmore>
	        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import { timestampToTime } from '@/common/commin.js'
import config from '@/common/config.js'
    export default {
         data(){
            return {
            	showlist:false,
            	allLoaded:true,
              ifList:false,
                Personal_inf:'',
                pageNo:1,
                credit_list:[]
            }
        },
        created(){
         this.getdetai()
        },
        mounted(){

        },
        computed:{
            ...mapState(['Personal_inf_x','user','token'])
        },
        methods:{
        	getdetai(){
		          this.$http.get(config.server_url+'users/personal/attribute/'+this.pageNo+'/'+this.token).then((res)=>{
		            console.log(res)
		            var datalist = res.data.data.credit_list
		            if(datalist.length>0){
		            	this.showlist=true
		            }
		            for(var i in datalist){
		            	datalist[i].act_date = timestampToTime(datalist[i].act_date)
		            }
		            this.credit_list = res.data.data.credit_list;
                for(let i in this.credit_list){
                  if(this.credit_list[i].act_credit>0){
                    this.credit_list[i].act_credit='+'+this.credit_list[i].act_credit
                  }
                }
		            if(datalist.length>=5){
                 		this.allLoaded = false
                 	}
		          })
        	},
        	getdetai2(){
        		this.pageNo++
		          this.$http.get(config.server_url+'users/personal/attribute/'+this.pageNo+this.token).then((res)=>{
		            console.log(res)
		            var datalist = res.data.data.credit_list
		            this.credit_list=this.activityList.concat(datalist);
		            if(res.data.data.length<5){
                		this.allLoaded = true;
                		this.pageNo = 1
                	}
		          })
        	},
        	loadTop() {
                this.getdetai()
                setTimeout(()=>{
                   this.$refs.loadmore.onTopLoaded();
                },1000)
			},
			loadBottom(){
//				this.allLoaded = true;// 若数据已全部获取完毕
				this.getdetai2()
				setTimeout(()=>{
					this.$refs.loadmore.onBottomLoaded();
        },1000)
			},
            Last_step(){
                this.$router.push({
                    path:'/Personal_information',
                    query:{

                    }
                })
            },



        }
    }
</script>

<style scoped lang="scss">
.basic_header{
    width: 100%;
    padding:26px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
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
.attribute_ul1{
  width: 94%;
  margin:0 auto;
  margin-top:23px;
  border-radius: 12px;
  box-shadow: 0px 0px 30px rgba(0,0,0,.2);
  overflow: hidden;
    ul{
      border-radius:12px;
        background: #fff;
        li:last-child{
          border-bottom:0;
        }
        li{
            height: 110px;
            line-height: 110px;
            border-bottom: 1px solid #ccc;
            font-size: 28px;
            padding-left:30px;
            font-size: 30px;
            .li_left{
                width: 70%;
                height: 100%;
                text-align: left;
                float: left;
                padding-left: 15px;
                overflow : hidden;
                text-overflow: ellipsis;
            }
            .li_right{
                width: 30%;
                float: left;
                text-align: right;
                padding-right: 25px;
                color:#999;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
.attribute_title{
  width:94%;
  margin:0 auto;
  margin-top:30px;
  padding-left:25px;
  font-size: 24px;
  color:#999;
}
.attribute_ul2{
    margin-top: 30px!important;
    width: 94%;
    /*min-height: 850px;*/
   background: #fff;
    margin:0 auto;
    border-radius:12px;
    box-shadow: 0px 10px 30px rgba(0,0,0,.2);
     ul{
     	margin-top: 20px;
     	margin-bottom: 20px;
        background: #fff;
        border-radius: 12px;
        li:last-child{
        	border:0;
        }
        li{
            height: 110px;
            line-height: 50px;
            font-size: 28px;
            position: relative;
            border-bottom: 1px solid #eee;
            b{
                font-weight: normal;
            }
            .li_left{
                text-align: left;
                padding-left: 15px;
                height: 50px;
                .attribute_score{
                  color:#999;
                  font-size: 22px;
                }
                .endTime{
                   font-size: 22px;
                   color:#999;
                   position: absolute;
                   right:3%;
                   bottom:6%;
                }
            }
            .li_right{
                height: 50px;
                text-align: right;
                padding-right: 25px;
                color:#bbb;
            }
        }
    }
}
</style>
