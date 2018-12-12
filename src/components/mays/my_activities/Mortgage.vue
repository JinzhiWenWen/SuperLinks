<template>
    <div id="Supporter">
        <div class="basic_header">
             <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
             <p>抵押</p>
             <p></p>
         </div>
         <div class="content">
             <div class="applyInfo">
                <p>| 抵押SLK数</p>
                <div class="box">
                    <input type="number" placeholder="0.00 SLK" v-model="Apply.pledge">
                </div>
                <span>可用余额 {{available}} SLk &nbsp;已在该活动抵押 {{pledgeInAct}} SLK</span>
             </div>
             <div class="write_pwd">
                 <p>输入密码</p>
                 <input type="password" v-model="Apply.payPwd">
             </div>
             <div class="num">
                活动抵押范围
                <b>{{min_num}} w</b>~<b>{{max_num}} w</b>
                之间
             </div>
         </div>
         <div class="basic_footer" @click="Apply_fn">
            <button >
                 立即支持
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
                setting_supporter:'',
                Apply:{
                    aid:"",//活动id
                    uid:"",//用户id
                    name:"",
                    pledge:'',//抵押数
                    payPwd:'',//密码
                    token:'',
                    status:0
                },
                pledgedSlk:'',
                pledgeInAct:'',
                max_num:'',
                min_num:'',
            }
        },
        mounted(){
             this.Apply.aid=this.$route.query.item._id;
             this.Apply.uid=this.uid;
             this.Apply.name=this.user.name;
             console.log(this.$route.query.item)
             this.max_num=this.$route.query.item.max_num;
             this.min_num=this.$route.query.item.min_num;
             this.pledgedSlk=this.$route.query.item.pledgedSlk
             this.Apply.token=this.token;
             this.pledgeInAct=this.$route.query.item.pledgeInAct
        },
        computed:{
            ...mapState(['slk_x','user','uid','token']),
             available(){//可用
                 return (this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk).toFixed(3);
             }
        },
        methods:{
            ...mapMutations(['user_new_fn','pledgedSlk_fn']),
            Last_step(){
                this.$router.go(-1)
            },
            Apply_fn(){


              this.Apply.token=this.token;
                 this.$http.post(config.server_url+'activity/enroll/supporter',this.Apply).then(res=>{
                   console.log(res,2222)
                 if(res.data.code== 200){
                     console.log(res.data)
                     this.pledgedSlk_fn(res.data.data.user.pledgedSlk)
                     this.toast({
                       message:'抵押支持成功',
                       duration:1000
                     })
                     this.$router.go(-1);
                 }else{
                     this.toast({
                       message:res.data.msg,
                       duration:1000
                     })
                     }
                 })


                // this.$http.post(config.server_url+'users/pledgeSlk',this.Apply).then(res=>{
                //     if(res.data.code == 200){
                //         console.log(res.data)
                //         this.user_new_fn(res.data.data.user)
                //         this.toast({
                //           message:'抵押成功',
                //           duration:1000
                //         })
                //         this.Apply.slkPledge='';
                //         this.Apply.payPwd='';
                //         this.$router.go(-1)
                //     }else{
                //         this.toast({
                //           message:res.data.msg,
                //           duration:1000
                //         })
                //     }
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
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
        padding: 18px ;
        font-size:30px;
        color:#999;
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
