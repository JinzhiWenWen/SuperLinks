<template>
    <div id="Wallet">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>钱包</p >
            <p></p >
        </div>
        <mt-loadmore :top-method="loadTop"  ref="loadmore">
        	<div style="min-height: 500px;">
        		<div class="Wallet_head">
		            <div class="Wallet_more">
		                {{user.slk}}SLK
		                <b @click="Detailed_fn">明细</b>
		            </div>
		            <div class="Wallet_ul">
		                 <li>
		                     <span>可用</span>
		                     <b>{{available}}</b>
		                 </li>
		                 <li>
		                      <span>冻结</span>
		                     <b>{{user.fronzenSlk}}</b>
		                 </li>
		                 <li>
		                      <span>抵押</span>
		                     <b>{{user.pledgedSlk}}</b>
		                 </li>
		            </div>
		        </div>
		        <div class="Wallet_bottom">
		             <ul>
		                 <li v-for="(item,index) in arr2" :key="index" @click="router_fn(index)" >
		                     <span>{{item.name}}</span>
		                     <img src="../../../assets/img/组6.png" alt="" class="go_img">
		                 </li>
		             </ul>
		        </div>
        	</div>

        </mt-loadmore>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import { Loadmore } from 'mint-ui';
    export default {

        data (){
            return {
                a:1,
                arr2:[
                    {
                        "name":"转账",
                        "router":"/Warn",
                    },
                    {
                        "name":"充值",
                        "router":"/Recharge",
                    },
                    {
                        "name":"修改钱包密码",
                        "router":"/Modify",
                    }
                ]
            }
        },
        created(){
            this.wallet_fn_x();
        },
        computed:{
             ...mapState(['slk_x','user','uid','token']),
             available(){
                 return (this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk).toFixed(3);
             }
        },
        methods:{
            ...mapActions(['wallet_fn_x']),
            loadTop() {
                this.address_fn()
                setTimeout(()=>{
                   this.$refs.loadmore.onTopLoaded();
                },1000)

            },
            address_fn(state,opt){//获取钱包地址
                this.$http.get(config.server_url+'users/account/checkDeposit/'+this.user.addr+'/'+this.token).then(res=>{
                     this.toast({
                       message:res.data.msg,
                       duration:1000
                     })
                     this.wallet_fn_x();
                })
            },
           Last_step(){
                this.$router.push({
                    path:'/my',
                    query:{

                    }
                })
            },
            router_fn(i){
                this.$router.push({
                    path:this.arr2[i].router,
                    query:{

                    }
                })
            },
            Detailed_fn(){
                this.a++
                this.$router.push({
                    path:'/Wallet_Detailed',  //<-+-+-+-+-+-+-+-+-+->
                    query:{
                      bo:this.a
                    }
                })
            }
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
.Wallet_head{
    width: 94%;
    margin:0 auto;
    background: #fff;
    height:300px;
    margin-top:23px!important;
    border-radius: 12px;
    padding-top:56px;
    box-shadow: 0px 0px 30px rgba(0,0,0,.2);
    .Wallet_more{
       text-align: center;
       font-size: 48px;
       font-weight: bold;
       line-height: 100px;
       position: relative;
       color:#fe3263;
       b{
         font-size: 26px;
         color: #c5c5c5;
         position: absolute;
         right: 10px;
         top: 30px;
         line-height: 36px;
         font-weight: normal;
         padding-right: 22px;
       }
    }
    .Wallet_ul{
        overflow: hidden;
        margin-top:30px;
        li{
            width: 33.33%;
            float: left;
            display: flex;
            flex-direction:column;
            text-align: center;
            line-height: 46px;
            font-size: 28px;
            b{
              font-size: 26px;
              color:#999;
            }
        }
    }
}
.Wallet_bottom{
    margin-top: 20px!important;
    width: 94%;
    margin:0 auto;
    ul{
        li{
            background: #fff;
            height: 110px;
            line-height:110px;
            font-size: 28px;
            padding: 0px 20px;
            margin-bottom:24px;
            border-radius: 12px;
            box-shadow: 0px 0px 30px rgba(0,0,0,.2);
            position: relative;
            &:last-child{
               border: none;
            }
             .go_img{
                width: 24px;
                height: 34px;
                position: absolute;
                display: block;
                right: 30px;
                top: 50%;
                margin-top: -17px;
                font-size: 28px;
          }
        }

    }
}
</style>
