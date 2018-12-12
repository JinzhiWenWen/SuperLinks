<template>
    <div id="Warn">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>转账</p >
            <p></p >
        </div>
        <div class="Warn_content">
            <ul>
                <li>
                    <span>收钱人钱包地址</span>
                    <input type="text" placeholder="输入地址" v-model="Warn.walletAddress">
                </li>
                <li>
                    <span>输入金额</span><br/>
                    <span class="amount_num">
                      <input type="number" v-model="Warn.num" ref="waAmount">
                    </span>
                    <span class="unit">SLK</span>
                    <p class="amount">可用余额：<b>{{available}}.00SLK </b>手续费：<b>0.00SLK</b></p>
                </li>
                <li class="pwd">
                    <span>输入密码</span>
                    <input type="password" placeholder="输入钱包密码" v-model="Warn.payPwd">
                </li>
                <li class="li">您可输入的范围在0.00-{{available}}.00之间</li>
                <li>
                    <span>备注</span>
                    <input type="text" placeholder="输入备注" v-model="Warn.remark">
                </li>

            </ul>
        </div>
         <div class="basic_footer" @click="Warn_fn">
            <button >确认转帐</button>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                Warn:{
                    // uid:'',//用户ID
                    token:'',
                    walletAddress:'',//收款钱包地址
                    remark:"",//转账备注
                    serviceMoney:'',//glass费
                    payPwd:'',//钱包密码
                    num:''//金额
                }

            }
        },
        created(){
            this.Warn.uid=this.uid
        },
        mounted(){
          setTimeout(()=>{
            this.$refs.waAmount.focus()
          },50)
        },
        computed:{
             ...mapState(['uid','slk_x','user','token']),
             available(){
                 return this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk;
             }
        },
        watch:{
          num(val,oldVal){
            if(val>this.available){
              this.toast({
                message:'转账金额不得大于钱包余额',
                duration:1000
              })
            }
          }
        },
        methods:{
            ...mapMutations(['Wallet_fn']),
            Last_step(){
                this.$router.push({
                    path:'wallet',
                    query:{

                    }
                })
            },
            Warn_fn(){
                if(this.Warn.num >0 &&  this.Warn.num<=this.available){
                        console.log(this.Warn)
                        this.Warn.token=this.token;
                        this.$http.post(config.server_url+'users/transfer',this.Warn).then(res=>{
                        console.log(res.data)
                        if(res.data.code == 200){
                            this.toast({
                              message:res.data.msg,
                              duration:1000
                            })
                            this.Warn={
                                token:'',
                                walletAddress:'',
                                num:'',
                                remark:"",
                                serviceMoney:'',
                            }
                            this.toast({
                              message:'转账成功',
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
                     this.toast({
                       message:'抵押数不合法',
                       duration:1000
                     })
                }
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
.Warn_content{
  width: 94%;
  margin:0 auto;
  margin-top:24px!important;
    ul{
      li:nth-child(1){
          margin-bottom:24px;
          border-radius: 12px;
          box-shadow: 0px 0px 30px rgba(0,0,0,.2);
          font-size: 32px;
          input{
            margin-left:32px;
          }
      }
        li:nth-child(2){
          margin-bottom: 30px;
          height:280px;
          border-radius:12px;
          box-shadow: 0px 0px 30px rgba(0,0,0,.2);
          position: relative;
          .amount_num{
            border-bottom:1px solid #ccc;
            text-align: left;
            padding-right:100px;
            position: absolute;
            top:30%;
            left:50%;
            margin-left: -240px;
            width: 500px;
            font-size: 40px;
            input{
              width: 73%;
              text-align: center;
            }
          }
          .unit{
            position: absolute;
            top:84px;
            font-size: 40px;
            color:#fe3263;
            right:219px;
          }
          .amount{
            width: 100%;
            text-align: center;
            color:#999;
            margin-top: 50px;
            font-size: 24px;
          }
        }
        li:nth-child(4){
          background: rgba(0,0,0,0);
          font-size: 24px;
          color:#999;
          padding-left: 24px;
          height:30px;
          line-height: 100px;
          margin-bottom:64px;
        }
        li:last-child{
          box-shadow: 0px 0px 30px rgba(0,0,0,.2);
          border-radius:12px;
          input{
            margin-left:32px;
          }
        }
        li{
            height: 110px;
            line-height: 110px;
            padding: 0px 15px;
            background: white;
            font-size: 32px;
            span{
                float: left;
            }
            input{
                overflow: hidden;
                border: none;
                width: 300px;
                height: 80px;
                // background: red;
            }
            input::-webkit-input-placeholder{
              color:#c5c5c5;
            }
        }
    }
}
.basic_footer{
        width: 100%;
        padding:52px 20px 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
            width:700px;
            height: 100px;
            border: none;
            outline: none;
            border-radius: 12px;
            background:#FE3263;
            color:#fff;
            font-size:30px;
        }
    }
    .pwd{
        box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
        border-radius:12px;
        input{
            margin-left: 15px;
        }
    }
</style>
