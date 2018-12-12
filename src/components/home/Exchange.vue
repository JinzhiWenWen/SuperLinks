<template>
    <div id="Exchange">
        <div class="mask" ref="mask">
            <div class="Exchange_alert2" ref="Exchange_alert">
                    <div class="alert_top">
                    <i @click="disappear">X</i>
                    </div>
                <div class="alert_center">
                    <b>兑换</b>
                    <input type="number" v-model="num12">
                    <b>SLK</b>
                </div>
                <div class="alert_bottom">
                    <p>糖果总数<i>{{user.candyNum}}</i>,最多可兑换<i>{{user.getSlk}}</i>个SLK</p>
                    <p>兑换的SLK直接进入钱包</p>
                </div>
                <div class="alert_btn">
                <button @click="en_exchange">确认兑换</button>
                </div>
            </div>
        </div>
        <div class="basic_header">
            <img src="../../assets/img/get.png" alt="" @click="Last_step">
            <p>兑换</p >
            <p></p >
        </div>
        <div class="Exchange_cont">
            <div class="Exchange_cont_center">
                 <span>糖果总数</span> <span class="detail" @click="Detailed">明细</span>
                 <p class="candyNum"><i>{{user.candyNum}}</i></p>
                 <p class="wire"></p>
                 <p class="candyNum_more">满{{show_candy.candy2slkRate}}糖果可兑换1个SLK</p>
            </div>
        </div>
         <div class="Exchange_cont_bottom">
                <button @click="show">兑换 SLK</button>
        </div>
</div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import config from '@/common/config.js'
    export default {
        data (){
            return {
                exchange:'',
                a:1,
                num12:0,
            }
        },
        created(){
            this.show_candy_actions(); //刚进入页面会进行获取最多可兑换的slk
            console.log(this.user)
            console.log(this.user.getSlk)
            this.num12=this.user.getSlk;
        },
        computed:{
           ...mapState(['store_candy_numer','show_candy','num','user']),
            //   test: {//设置vuex里的num
            //     get () {
            //          return this.user.getSlk
            //     },
            //     set (val) {

            //         if(val > 0 && val != ''){
            //             console.log('合法')
            //             this.$store.commit('setTest', val)
            //         }

            //     }
            // }
        },
        mounted(){

        },
        methods:{
             ...mapActions(['exchange_actions','show_candy_actions']),
             ...mapMutations(['candy_fn','num_fn']),
            Last_step(){//返回
                this.$router.go(-1)
            },
            Detailed(){//明细
                this.a++;
                this.$router.push({
                path:'/Detailed',
                    query:{
                       bo:this.a
                }
                })
            },
            show(){//显示兑换
                this.$refs.Exchange_alert.className='Exchange_alert';
                this.$refs.mask.className='mask_alert';
                 this.show_candy_actions();
            },
            disappear(){//让兑换消失
                this.$refs.Exchange_alert.className='Exchange_alert2';
                this.$refs.mask.className='mask';
            },
            en_exchange(){//确认兑换
                this.num_fn(this.num12)
                this.exchange_actions();//兑换
                this.$refs.Exchange_alert.className='Exchange_alert2';
                this.$refs.mask.className='mask';
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
.Exchange_cont{
	width: 95%;
	border: 1px solid #fff;
	margin: 23px 0 0 25px;
	box-shadow: #000;
	background: #fff;
	border-radius: 12px;
    box-shadow: 0px 0px 30px rgba(0,0,0,.2);
    .Exchange_cont_center{
         margin-top:20px ;
         padding: 38px 30px 20px 38px;
        span{
            font-size: 30px;
            color: #000;
        }
        .detail{
            float: right;
            margin-right:25px;
        	font-size: 26px;
        	color: #C5C5C5;
        }
        .candyNum{
            font-size: 68px;
        }
        .candyNum_more{
            font-size: 24px;
            margin-top: 20px;
            color: #9b9b9b;
        }
        p{
            font-size: 48px;
            color: #fe3263;
            text-align: center;
        }
        .wire{
        	border-bottom: 2px solid #f3f3f3;
        	margin-top: 26px;
        }
    }

}
 .Exchange_cont_bottom{
        text-align: center;
        margin-top: 110px;
        width: 95%;
        margin: 50px auto;
        button{
            outline: none;
            border: 1px solid #FE3263;
            background: #FE3263;
            height: 110px;
            width: 100%;
            border-radius: 12px;
            color: #fff;
            font-size: 32px;
        }
        p{
            margin-top: 20px;
            line-height: 60px;
            font-size: 28px;
        }
 }
#Exchange{
    position: relative;
}
.Exchange_alert{
    width: 522px;
    height: 406px;
    background: #fff;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    margin-left: -261px;
    top: 335px;
    text-align: center;
    display: block;
    .alert_top{
        text-align: right;
          font-size: 32px;
         font-weight: bold;
         background: #000;
         width: 44px;
         height: 44px;
         border-radius: 50px;
         position: absolute;
         top: -25px;
         right: -15px;
    }
    .alert_top i{
        color: #fff;
        margin-right: 10px;
    }
    .alert_center{
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 68px;
        b{
            float: left;
            color: #000;
        }
        input{
            width: 200px;
            display: block;
            float: left;
            border-bottom: 1px solid #ccc;/*no*/
            border-top: none;
            border-left:none ;
            border-right:none ;
            margin: 0px 15px;
            color: #fe3263;
            font-size: 44px;
            text-align: center;
            padding-bottom: 5px;
        }
    }
    .alert_bottom{
        margin-top: 62px;
        font-size: 24px;
        color: #999;
        line-height: 40px;

    }
    .alert_btn{

        button{
        	width: 387px;
        	height: 66px;
        	border-radius:33px;
        	background: #fe3263;
        	border: 1px solid #fe3263;
        	color: #fff;
        	font-size: 28px;
        	margin-top: 40px;
        	margin-bottom: 54px;
        }
    }
}
.Exchange_alert2{
    display: none;
}
#Exchange{
    width: 100%;
    height: 100%;
}
.mask{
   display: none;
}
.mask_alert{
    display:block;
    width: 100%;
    height: 100%;
    position:absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:8;
}
</style>
