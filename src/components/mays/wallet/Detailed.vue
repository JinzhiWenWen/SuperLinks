<template>
    <div id="Detailed">
        <div class="box">
            <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>明细</p >
            <p></p >
            </div>
        </div>

         <mt-loadmore :top-method="loadTop" ref="loadmore"  :maxDistance='100'>
            <div class="Detailed_list">
                <ul>
                    <li v-for="(item,index) in this.list" :key="index">
                        <p>{{item.des}}</p>
                        <div class="info">
                          <span><i>{{item.Symbol}} </i>{{item.num}}slk</span>
                            <span>{{item.extra}}</span>
                        </div>
                        <div class="activityNum">{{item.date}}</div>
                    </li>
                </ul>
            </div>
         </mt-loadmore>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import {timestampToTime} from '../../../common/commin.js'
    export default {
        data(){
            return{
                  pageNo:1,
                  list:[]
            }
        },
        created(){
            this.$store.state.title = '明细'
            this.Detailed_fn()
        },
        computed:{
            ...mapState(['uid',"token"])
        },
        methods:{
            Last_step(){
                 this.$router.go(-1)
            },
             loadTop() {
				this.Detailed_fn()
				setTimeout(()=>{
                    this.$refs.loadmore.onTopLoaded();
				},1000)

			},
            Detailed_fn(){
                this.$http.get(config.server_url+'users/wallet/history/'+this.pageNo+'/'+this.token).then(res=>{
                  console.log(res)
                    var list = res.data.data
                    console.log(list)
                	for(var i in list){
                		if(list[i].type == 1){
                            if(list[i].num > 0 ){
                                list[i].des = '转账';
                                list[i].Symbol='+'
                            }else{
                                list[i].des = '转账';
                            }

                		}else
                		if(list[i].type == 2){
                            list[i].des = '创建节点'
                            list[i].Symbol=' '
                		}else
                		if(list[i].type == 3){
                            list[i].des = '注销节点'
                            list[i].Symbol=' '
                		}else
                		if(list[i].type == 4){
                            list[i].des = '加入共识'
                            list[i].Symbol=' '
                		}else
                		if(list[i].type == 5){
                            list[i].des = '退出共识'
                            list[i].Symbol=' '
                		}else
                		if(list[i].type == 6){
                            list[i].des = '共识奖励'
                            list[i].Symbol=' '
                		}else
                		if(list[i].type == 7){
                            list[i].des = '活动抵押'
                            list[i].Symbol=''
                		}else
                		if(list[i].type == 8){
                            list[i].des = '活动激励'
                            list[i].Symbol='+'
                		}else
                		if(list[i].type == 9){
                            list[i].des = '充值'
                            list[i].Symbol='+'
                		}else
                		if(list[i].type == 10){
                            list[i].des = '糖果兑换'
                            list[i].Symbol='+'
                		}else
                		if(list[i].type == 11){
                            list[i].des = '冻结惩罚'
                            list[i].Symbol=''
                		}else
                		if(list[i].type == 12){
                            list[i].des = '活动抵押退出'
                            list[i].Symbol='+'
                        }else
                        if(list[i].type == 13){
                            list[i].des = '提现'
                            list[i].Symbol=''
                        }else
                        if(list[i].type == 14){
                            list[i].des = '冻结退回'
                            list[i].Symbol='+'
                        }else if(list[i].type==15){
                            list[i].des = '报名缴纳'
                            list[i].Symbol=''
                		}else if(list[i].type==16){
                      list[i].des = '退回缴纳'
                      list[i].Symbol='+'
                    }else if(list[i].type==17){
                      if(list[i].name){
                        list[i].des = '报名收取'+'('+list[i].name+')'
                        list[i].Symbol='+'
                      }else{
                        list[i].des = '报名收取'
                        list[i].Symbol='+'
                      }

                    }else{
                      list[i].des = '其他'
                      list[i].Symbol=' '
                    }
                    }

                    res.data.data.map((val,index)=>{
                        val.date=timestampToTime(val.date)
                    })
                    this.list = res.data.data;
                })
            },

        }

    }
</script>
<style scoped lang="scss">
.box{
    height: 100px;
}
.basic_header{
    width: 100%;
    padding:26px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
    overflow: hidden;
    position: fixed;
    z-index: 100000;
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
.Detailed_list{
    min-height: 200px;
    ul{
      width:95%;
      margin:0 auto;
      margin-top:24px!important;
        li{
          background: #fff;
            margin-bottom: 24px;
            padding:20px 30px;
            height:220px;
            border-radius:12px;
            -moz-box-shadow:2px 2px 10px #DADADA;
            -webkit-box-shadow:2px 2px 10px #DADADA;
            box-shadow:2px 2px 10px #DADADA;
            position: relative;
            p{
                font-size:32px;
                color:#000;
            }
            .info{
                width: 50%;
                height: 100px;
                display:flex;
                flex-direction: column;
                span{
                    width: 100%;
                    font-size:30px;
                    color:#000;
                    display: flex;
                    font-size: 48px;
                    margin-top: 24px;
                }
                span:nth-child(2){
                  font-size: 26px;
                  color:#999;
                  margin-top:68px;
                }
            }
            .activityNum{
                font-size:26px;
                color:#999;
                width: 50%;
                margin-left: 50%;
                text-align: right;
            }
        }
    }

}
</style>
