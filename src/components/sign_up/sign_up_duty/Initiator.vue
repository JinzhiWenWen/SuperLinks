<template>
    <div id="Initiator">
         <div class="basic_header">
             <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
             <p>发起者</p>
             <p></p>
         </div>
        <div class="content">
            <div class="applyInfo">
                <p>| 申请说明</p>
                <textarea name="" id="" cols="30" rows="10" placeholder="如：我就是一个好玩儿的人,从我的身边出发找到更多的有趣的灵魂,描述你的优势..." v-model="Apply.des">
                </textarea>
            </div>
            <div class="check_pledge" @click="showToggle">
                <div class="switchBtn" v-bind:class="{'close': isClose, 'open': isOpen}"><span class="el-icon-check"></span></div>
                <span>抵押slk</span>
            </div>
            <div class="flagBox"  v-if="isClose">
                <div class="pledgeNum">
                    <p>| 抵押SLK数</p>
                    <div class="box">
                        <input type="number" placeholder="0.00 SLK" v-model="Apply.pledge">
                    </div>
                    <span>可用余额 {{available}} SLk </span>
                </div>
                <div class="write_pwd">
                    <p>输入密码</p>
                    <input type="password" v-model="Apply.payPwd">
                </div>
            </div>
        </div>

        <div class="basic_footer" @click="Apply_fn">
            <button >
                申请报名
            </button>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                radio:'',
                Apply:{

                  token:null,
                    aid:'',//活动id
                    uid:'',//用户id
                    name:"李四",
                    payPwd:'',//支付密码
                    des:"",
                    pledge:'',
                    status:0,
                },
                isClose: false,
                isOpen:true,//假设默认关闭
            }
        },
        created(){
            this.Apply.uid=this.uid;
            this.Apply.aid=this.$route.query.aid;
            console.log( this.user)
        },
        computed:{
            ...mapState(['uid','user','token']),
            available(){
                 return this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk;
             }
        },
        methods:{
            ...mapMutations(['pledgedSlk_fn']),
             showToggle(){
                //实现开关切换
                this.isClose = !this.isClose;
                this.isOpen = !this.isOpen;
            },
            getRadio(){
                // this.flag = !this.flag
                if (this.radio) {
                    this.flag = false
                }else{
                    this.flag = true

                }
            },
             Last_step(){
                 this.$router.go(-1)
            },
            Apply_fn(){
                 this.Apply.pledge=parseInt(this.Apply.pledge);
                 this.Apply.token=this.token;
                      this.$http.post(config.server_url+'activity/enroll/creator',this.Apply).then(res=>{
                        console.log(res)
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
        padding:36px 0 0 36px;
        p{
            font-size:30px;
            color:black;

        }
        textarea{
            font-size:24px;
            border:0;
            margin-top:22px;
            color:black;
        }
        textarea::-webkit-input-placeholder {
            color:#C5C5C5;
        }
    }
    .check_pledge{
        width: 100%;
        height: 150px;
        display:flex;
        align-items:center;
        padding-left:20px;
        .open{
            width: 35px;
            height: 35px;
            border:2px solid #000;
            position:relative;
            border-radius: 50%;
            span{
                position:absolute;
                right:-18px;
                top:0px;
                line-height:35px;
                text-align:center;
                display: none;
            }
        }
        .close{
            width: 35px;
            height: 35px;
            border:2px solid #fff;
            position:relative;
            background:black;
            border-radius:50%;
            span{
                position:absolute;
                right:-18px;
                top:0px;
                line-height:35px;
                text-align:center;
                color:#fff;
            }
        }
        span{
            font-size:30px;
            color:#000;
            padding:0 20px;
        }
    }
    .flagBox{
        width: 100%;
        .pledgeNum{
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
                color:#C5C5C5;
                padding:20px 0 0 36px;
            }
            .box{
                width: 100%;
                display:flex;
                justify-content:center;
                align-items:center;
                input{
                    width: 360px;
                    padding: 0 0 18px 0;
                    border:0;
                    border-bottom:2px solid #f4f4f4;
                    font-size:40px;
                    text-align:center;
                }
                input::-webkit-input-placeholder {
                    color:#fe3263;
                }
            }
            span{
                font-size:30px;
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
</style>
