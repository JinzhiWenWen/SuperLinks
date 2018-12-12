<template>
    <div id="Participant">
        <div class="basic_header">
             <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
             <p>参与者</p>
             <p></p>
         </div>
         <div class="" ref="Tonight" style="position:relative;transition:1s all;z-index:-1;">
           <div class="amount_warning" v-show="isWarning">
             <img src="../../../assets/img/warning.png" alt="">
             <span>余额不足无法申请报名，请先充值</span>
             <i @click="paySlk()">立即充值</i>
           </div>
           <div class="infoBox" v-show="ifHasCond">

               <p>报名参加此次活动需满足以下条件:</p>
               <ul>
                   <li v-for="(item,index) in conditions" :key="index">{{item}}</li>
               </ul>
           </div>
          <div class="content">

              <div class="applyInfo">
                  <textarea name="" id="" cols="30" placeholder="请将您的优势写到申请说明中..." rows="10" class="text" v-model="applyInfoW">
                  </textarea>
              </div>
              <div class="pledgeNum" v-show="needPledge">
                <span class="pledgeNum_title">报名需缴纳</span>
                <p>
                  <input placeholder="0.00" v-model="Apply.fee" disabled="disable" type="number" name="" value="">
                  <span class="unit">SLK</span>
                </p>
                <p class="border_p"></p>
                <p class="balance_bot">可用余额&nbsp;<span ref="balance_bot">{{available}}</span>&nbsp;SLK</span></p>
              </div>
              <div class="password" v-show="needPledge">
                <span>输入密码</span>
                <input type="password" v-model="Apply.payPwd" placeholder="" name="" value="">
              </div>
              <!-- <div class="pledgeNum" v-if="needPledge">
                  <p>| 抵押SLK数</p>
                  <div class="box">
                      <input type="number" placeholder="0.00 SLK" v-model="Apply.pledge">
                  </div>
                  <span>可用余额 {{available}} SLk </span>
               </div>
              <div class="write_pwd" v-if="needPledge">
                   <p>输入密码</p>
                   <input type="password" v-model="Apply.payPwd">
              </div> -->

          </div>
           <div class="basic_footer">
              <button :class="{pantDis:sta==1}" :disabled="disablePan"  @click="Apply_fn">
                   确认申请
               </button>
           </div>
         </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
              isWarning:false,
              sta:1,
              ifHasCond:false,
              disablePan:true,
                 Apply:{
                   token:null,
                    aid:'',//活动id
                    uid:'',//用户id
                    name:"李四",
                    payPwd:'',//支付密码
                    applyInfo:"",
                    fee:'',
                    status:0
                },
                needPledge:false,
                conditions:[],
                applyInfoW:null
            }
        },
        created(){
            this.Apply.uid=this.user._id;
            this.Apply.aid=this.$route.query.aid;
            this.applyInfoW=this.Apply.applyInfo;
            console.log(this.$route.query);
            this.conditions.push(this.$route.query.setting_participator.condition);
            this.Apply.fee=this.$route.query.setting_participator.fee;
            console.log(this.Apply.fee)
        },
        computed:{
           ...mapState(['uid','user','token']),
           available(){
                 return this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk;
            },
            payPas(){
              return this.Apply.payPwd;
            }
        },
        watch:{
          applyInfoW(val,oldVal){
            // if(val!=''){
            //   if(this.needPledge){
            //     if()
            //   }
            //   this.sta=2;
            //   this.disablePan=false;
            // }else{
            //   this.sta=1;
            //   this.disablePan=true;
            // }
            if(this.needPledge){
              if(val!=''&&this.payPas!=''){
                this.sta=2;
                this.disablePan=false;
              }else{
                this.sta=1;
                this.disablePan=true;
              }
            }else if(val!=''){
              this.sta=2;
              this.disablePan=false;
            }

          },
          payPas(val,oldVal){
            if(this.needPledge){
              if(val!=''&&this.applyInfoW!=''){
                this.sta=2;
                this.disablePan=false;
              }else{
                this.sta=1;
                this.disablePan=true;
              }
            }
          }
        },
        methods:{
          paySlk(){
            this.$router.push('/Recharge')
          },
             ...mapMutations(['pledgedSlk_fn']),
            Last_step(){
              this.$router.go(-1)
            },
            Apply_fn(){
                 this.Apply.fee=parseInt(this.Apply.fee)
                 this.Apply.token=this.token;
                 this.Apply.applyInfo=this.applyInfoW;
                 // alert('1')
                    this.$http.post(config.server_url+'activity/enroll/participator',this.Apply).then(res=>{
                    if(res.data.code== 200){
                    this.pledgedSlk_fn(res.data.data.user.pledgedSlk)
                    this.toast({
                      message:'报名成功',
                      duration:1000
                    })
                    this.$router.go(-1)
                    }else{
                        this.toast({
                            message:res.data.msg,
                            duration:1000
                          })
                        }
                    })
            }
        },
        mounted(){
             this.setting_participator=this.$route.query.setting_participator;
             // this.needPledge = this.setting_participator.needPledge;
             setTimeout(()=>{
               if(this.Apply.fee>this.available){
                 this.$refs.balance_bot.style.color="red";
                 this.isWarning=true;
                 setTimeout(()=>{
                   this.$refs.Tonight.style.transform='translateY(42.5px)';
                   this.$refs.Tonight.style.zIndex='1';
                 },500)
               }else{
                 this.$refs.Tonight.style.zIndex='1';
                 this.isWarning=false;
               }
             })

             console.log(this.conditions)
             console.log(this.conditions)
             if(this.conditions.length>0){
               this.ifHasCond=true;
             }else{
              this.ifHasCond=false;
             }
             if(this.Apply.fee!=''){
               this.needPledge=true;
             }
        },
    }
</script>

<style lang="scss" scoped>
.pantDis{
  color:rgba(253,180,242,1)!important;
}
.basic_header{
    width: 100%;
    padding:26px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
    z-index: 10;
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
.amount_warning{
  width: 100%;
  height:70px;
  background: rgba(255,251,198,1);
  position: absolute;
  top:-12%;
  line-height: 70px;
  img{
    position: absolute;
    width: 40px;
    height:40px;
    top:15px;
    left:25px;
  }
  span{
    display: inline-block;
    width: 59%;
    text-align: right;
    line-height: 75px;
  }
  i{
    // position: absolute;
    margin-left:180px;
    color:rgba(252,91,211,1);
    text-decoration:underline;
  }
}
.infoBox{
    width: 96%;
    margin: 0 auto;
    color:#666;
    margin-top:24px!important;
    padding-left: 12px;
    font-size: 28px;
}
.content{
     width: 100%;
    display:flex;
    flex-wrap:wrap;
    padding:23px 25px;
    .applyInfo{
        width: 100%;
        background:#fff;
        height: 220px;
        border-radius:12px;
        -moz-box-shadow:2px 2px 10px #DADADA;
        -webkit-box-shadow:2px 2px 10px #DADADA;
        box-shadow:2px 2px 10px #DADADA;
        display:flex;
        flex-direction:column;
        padding:20px 0 0 36px;
        p{
            font-size:30px;
            color:#C5C5C5;
        }
        textarea{
            font-size:24px;
            border:0;
            color:black!important;
            border-bottom-right-radius: 12px;
        }
        textarea::-webkit-input-placeholder {
            color:#C5C5C5;
            font-size: 28px;
        }
    }
    .pledgeNum{
      width: 100%;
      height:230px;
      background: white;
      border-radius:12px;
      margin-top:40px;
      box-shadow: 0px 0px 20px rgba(0,0,0,.15);
      padding-top:24px;
      .pledgeNum_title{
        font-size:30px;
        color:black;
        margin-left: 24px;
      }
      p{
        margin-top:40px;
        width: 100%;
        height:56px;
        position: relative;
        input{
          // margin-left:40px;
          font-size: 46px;
          height: 100%;
          border:0;
          outline: none;
          width: 350px;
          text-align: right;
        }
        .unit{
          font-size: 46px;
          position: absolute;
          right:35%;
          top:3px;
        }
      }
      .border_p{
        height:2px;
        width: 50%;
        background: #ccc;
        margin:0 auto;
      }
      .balance_bot{
        margin-top:15px;
        width: 100%;
        overflow: hidden;
        color:#999;
        text-align: center;
      }
    }
    .password{
      width: 100%;
      height:110px;
      background: white;
      margin-top: 40px;
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      border-radius:12px;
      position: relative;
      span{
        font-size: 30px;
        height:100%;
        line-height: 110px;
        padding-left:30px;
        color:black;
      }
      input{
        height:50px;
        font-size: 26px;
        border:0;
        margin-left:20px;
        font-size: 50px;
        position: absolute;
        top:26px;
      }
    }
    // .pledgeNum{
    //     width: 100%;
    //     background:#fff;
    //     height: 220px;
    //     border-radius:12px;
    //     -moz-box-shadow:2px 2px 10px #DADADA;
    //     -webkit-box-shadow:2px 2px 10px #DADADA;
    //     box-shadow:2px 2px 10px #DADADA;
    //     display:flex;
    //     flex-direction:column;
    //     margin-top:22px;
    //     p{
    //         font-size:30px;
    //         color:#C5C5C5;
    //         padding:20px 0 0 36px;
    //     }
    //     .box{
    //         width: 100%;
    //         display:flex;
    //         justify-content:center;
    //         align-items:center;
    //         input{
    //             width: 360px;
    //             padding: 0 0 18px 0;
    //             border:0;
    //             border-bottom:2px solid #f4f4f4;
    //             font-size:40px;
    //             text-align:center;
    //         }
    //         input::-webkit-input-placeholder {
    //             color:#fe3263;
    //         }
    //     }
    //     span{
    //         font-size:30px;
    //         color:#999;
    //         text-align:center;
    //         margin-bottom:20px;
    //     }
    // }
    // .write_pwd{
    //     margin-top:24px;
    //     width: 100%;
    //     height: 110px;
    //     background:#fff;
    //     border-radius:12px;
    //     -moz-box-shadow:2px 2px 10px #DADADA;
    //     -webkit-box-shadow:2px 2px 10px #DADADA;
    //     box-shadow:2px 2px 10px #DADADA;
    //     display:flex;
    //     justify-content:space-between;
    //     align-items:center;
    //     padding:36px;
    //     p{
    //         width: 30%;
    //         color:#000;
    //         font-size:30px;
    //     }
    //     input{
    //         flex:1;
    //         border:0;
    //         color:#999;
    //     }
    //     input::-webkit-input-placeholder {
    //         color:#999;
    //     }
    // }
}
.basic_footer{
    width: 100%;
    padding:52px 20px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
        width:700px;
        height: 100px;
        border: none;
        outline: none;
        border-radius: 12px;
        background:white;
        color:rgba(252,52,220,1);
        font-size:30px;
    }
}

</style>
