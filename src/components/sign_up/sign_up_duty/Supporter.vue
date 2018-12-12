<template>
    <div id="Supporter">
        <div class="basic_header">
             <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
               <p>抵押支持</p>
             <p></p>
         </div>
         <div class="content">
             <div class="applyInfo">
                <p>抵押SLK数</p>
                <div class="box">
                  <p>
                    <input type="number" v-model="Apply.pledge" placeholder="0.00">
                    <span>SLK</span>
                    <span class="border"></span>
                  </p>

                </div>
                <span>可用余额 {{available}} SLk </span>
             </div>
             <div class="num">
                  本次活动支持抵押数量限制
                <b>{{setting_supporter.minPledge}}</b>~<b>{{setting_supporter.maxPledge}}</b>
                SLK
             </div>
             <div class="write_pwd">
                 <p>输入密码</p>
                 <input type="password" v-model="Apply.payPwd">
             </div>

         </div>
         <div class="basic_footer">
            <button  @click="Apply_fn" :class="{isDiya:color==1}" :disabled="disableDiya">
                 确认抵押
             </button>
             <p class="hasMortgageBot" v-show="ishas">
               已在本次活动中抵押&nbsp;{{haspledge}}&nbsp;SLk
               <span @click="exitHas()">退出抵押</span>
             </p>
         </div>
         <div class="mask_suppor" v-show="mask_suppor">

         </div>
         <div class="isExit" v-show="exit_box" ref="is_Exit">
           <p class="exit_title">退出抵押</p>
           <p class="exit_alt">确认是否要全部退出抵押？</p>
           <p class="exit_has">已抵押&nbsp;{{haspledge}}&nbsp;SLK</p>
           <p class="exit_btn">
             <button type="button" name="button"  @click="closeExit()">取消</button>
             <button type="button" name="button" @click="turnExit()">确认退出</button>
           </p>
           <img src="../../../assets/img/close_black.png" alt="" @click="closeExit()">
         </div>
    </div>

</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                setting_supporter:'',
                hasMortgageB:100,
                disableDiya:true,
                exit_box:false,
                mask_suppor:false,
                color:1,
                ishas:false,
                haspledge:null,
                Apply:{
                  token:null,
                    aid:"",//活动id
                    uid:"",//用户id
                    name:"",
                    pledge:'',//抵押数
                    status:0,
                    payPwd:'',//密码
                }

            }
        },
        mounted(){
             this.Apply.uid=this.uid;
             this.setting_supporter=this.$route.query.setting_supporter;
             this.Apply.aid=this.$route.query.aid;
             this.haspledge=this.$route.query.haspledge;
             if(this.haspledge!=0){
               // alert(1)
               this.ishas=true;
             }
        },
        computed:{
           ...mapState(['uid','user','token']),
           available(){
             return (this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk).toFixed(3);
           },
           rePledge(){
             return this.Apply.pledge;
           },
           rePas(){
             return this.Apply.payPwd;
           }
        },
        watch:{
          rePledge(val,oldVal){
            console.log(val)
            if(val!=='0.00'&&val!=''&&this.rePas!=''){
              this.color=2;
              this.disableDiya=false;
            }else{
              this.color=1;
              this.disableDiya=true;
            }
          },
          rePas(val,oldVal){
            if(val!=''&&this.rePledge!==''&&this.rePledge!=''){
              this.color=2;
              this.disableDiya=false;
            }else{
              this.color=1;
              this.disableDiya=true;
            }
          }
        },
        methods:{
          turnExit(){
            let _this=this;
            _this.$http.get(config.server_url+'activity/return_pledgeslk/'+_this.Apply.aid+'/'+_this.token).then((res)=>{
              console.log(res)
              _this.toast({
                message:'退出成功',
                duration:1000
              })
              _this.$router.go(-1);
            })
          },
          exitHas(){
            this.mask_suppor=true;
            this.exit_box=true;
            setTimeout(()=>{
              this.$refs.is_Exit.style.opacity='1';
              this.$refs.is_Exit.style.transform="translateY(0)"
            },150)
          },
          closeExit(){
            this.$refs.is_Exit.style.opacity='0';
            this.$refs.is_Exit.style.transform="translateY(-100px)";
            setTimeout(()=>{
              this.mask_suppor=false;
              this.exit_box=false;
            },300)
          },
            ...mapMutations(['pledgedSlk_fn']),
            Last_step(){
               // this.$router.go(-1)
               // window.history.back();
               this.$router.push({
                 path:'/sign_up',
                 query:{
                   _id:this.Apply.aid
                 }
               })
            },//需要提示
            Apply_fn(){
                 this.Apply.pledge=parseInt(this.Apply.pledge)
                 this.Apply.token=this.token;
                    this.$http.post(config.server_url+'activity/enroll/supporter',this.Apply).then(res=>{
                    if(res.data.code== 200){
                        console.log(res.data)
                        this.pledgedSlk_fn(res.data.data.user.pledgedSlk)
                        this.toast({
                          message:'抵押支持成功',
                          duration:1000
                        })
                        // this.$router.go(-1)
                        // window.history.back()
                        this.$router.push({
                          path:'/sign_up',
                          query:{
                            _id:this.Apply.aid
                          }
                        })
                    }else{
                          this.toast({
                            message:res.data.msg,
                            duration:1000
                          })
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
.isDiya{
  color:rgba(253,180,242,1)!important;
}
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

        p{
            font-size:30px;
            color:black;
            padding:20px 0 0 36px;
        }
        .box{
            width: 100%;
            p{
              width: 100%;
              height:60px;
              // background: blue;
              position: relative;
              // margin-top:20px;
              span{
                position: absolute;
                color: black;
                font-size: 48px;
                top:25px;
              }
              input{
                  width: 340px;
                  border:0;
                  font-size:48px;
                  text-align:right;
                  padding-right:20px;
              }
              input::-webkit-input-placeholder {
                  color:#fe3263;
              }
              .border{
                position: absolute;
                top:150%;
                height:2px;
                width:50%;
                background: #ddd;
                left:50%;
                margin-left:-25%;
              }
            }

        }
        span{
            font-size:26px;
            color:#999;
            text-align:center;
            margin-bottom:20px;
        }
    }
    .write_pwd{
        margin-top:24px;
        width: 100%;
        height: 110px;
        background:#fff;
        border-radius:12px;
        -moz-box-shadow:2px 2px 10px #DADADA;
        -webkit-box-shadow:2px 2px 10px #DADADA;
        box-shadow:2px 2px 10px #DADADA;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:36px;
        p{
            width: 30%;
            color:#000;
            font-size:30px;
        }
        input{
            flex:1;
            border:0;
            color:#999;
        }
        input::-webkit-input-placeholder {
            color:#999;
        }
    }
    .num{
        font-size:26px;
        color:#999;
        margin-top:24px;
    }
}
.basic_footer{
    width: 94%;
    margin:0 auto;
    button{
        width:100%;
        height: 100px;
        border: none;
        outline: none;
        border-radius: 12px;
        background:white;
        color:rgba(252,52,220,1);
        font-size:30px;
        box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    }
    .hasMortgageBot{
      width: 100%;
      color:black;
      font-size: 28px;
      margin-top:24px;
      span{
        margin-left:200px;
        color:#5f9de3;
        text-decoration: underline;
      }
    }
}
.mask_suppor{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  background: rgba(0,0,0,.55);
  z-index: 1;
}
.isExit{
  width: 550px;
  height:372px;
  background: white;
  position: fixed;
  top:50%;
  transform: translateY(-100px);
  margin-top:-175px;
  left: 50%;
  margin-left:-275px;
  z-index: 2;
  border-radius:30px;
  position: relative;
  padding-top: 34px;
  opacity: 1;
  transition: .4s all;
  img{
    width: 50px;
    height:50px;
    position: absolute;
    top:-15px;
    right:-15px;
  }
  p{
    width: 100%;
    text-align: center;
    color:black;
  }
  .exit_title{
    font-size: 32px;
    margin-bottom:44px;
  }
  .exit_alt{
    font-size: 28px;
  }
  .exit_has{
    margin-top:20px;
    color:#666;
    margin-bottom:55px;
  }
  .exit_btn{
    height:100px;
    // background: red;
    display: flex;
    border-top:3px solid #eee;
    button{
      width: 50%;
      text-align: center;
      border:0;
      color:#5f9de3;
      font-size: 30px;
    }
    button:nth-child(1){
      border-right:3px solid #eee;
    }
  }
}
</style>
