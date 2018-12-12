<template>
    <div id="wallet_pwd">
         <div class="basic_header">
            <img src="../assets/img/返回.png" alt="" @click="Last_step">
            <p>设置钱包密码</p >
            <p></p >
        </div>
        <div class="Modify_content">
              <div class="ipt_pass">
                 <span>设置密码</span>
                 <input type="password" v-model="newPayPwd">
             </div>
             <div class="ipt_pass">
                 <span>确认密码</span>
                 <input type="password" v-model="newPayPwd2">
             </div>
        </div>
        <p class="newPasTitle">6-20位字符，可包含数字或字母</p>
         <div class="next_step_footer">
             <button @click="confirm_fn" :class="{isDisPasT:color==1}" :disabled="isDisPas">
                 确认
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
               newPayPwd:'',
               newPayPwd2:'',
               phone:'',
               isDisPas:true,
               color:1
            }
        },
        created(){
            this.phone=this.$route.query.phone;
        },
        watch:{
          newPayPwd(val,oldVal){
            if(!/^[0-9a-zA-Z]*$/g.test(val)){
              var a=val.slice(0,val.length-1)
              this.newPayPwd=a;
              this.toast({
                message:'不可输入非法字符',
                duration:1000
              });
            }else if(val!=''&&this.newPayPwd2!=''){
              this.color=2;
              tthis.isDisPas=false;
            }else{
              this.color=1;
              this.isDisPas=true;
            }
          },
          newPayPwd2(val,oldVal){
            if(val!=''&&this.newPayPwd!=''){
              this.color=2;
              this.isDisPas=false;
            }else{
              this.color=1;
              this.isDisPas=true;
            }
          }
        },
        methods:{
            ...mapMutations(['uid_fn','user_fn','token']),
            Last_step(){
                this.$router.go(-1)
            },
            confirm_fn(){
                this.phone=parseInt(this.phone);
                console.log(this.phone)
                var token = window.sessionStorage.getItem('token')  /*sheng'ming'*/
                if(this.newPayPwd==this.newPayPwd2){
                    // this.$http.post(config.server_url+'auth/payPwd',{
                    //       phone:this.phone,
                    //       payPwd:this.newPayPwd
                    // }).then(res=>{
                    //   console.log(res,123)
                    //     this.toast({
                    //       message:'设置成功',
                    //       duration:1000
                    //     })
                    //     // this.uid_fn(res.data.data.user._id)
                    //     // this.user_fn(res.data.data.user);
                    //     // localStorage.setItem('logininfo_phone',JSON.stringify(this.phone))
                    //     // localStorage.setItem('logininfo_uid',JSON.stringify(res.data.data.user._id))
                    //     // this.toast({
                    //     //   message:'登录成功',
                    //     //   duration:1000
                    //     // })
                    //
                    // })
                    this.$router.push({
                            path:'/certi',
                        })
                }else if(this.newPayPwd.length<6||this.newPayPwd.length>20){
                    this.toast({
                      message:'密码长度为6-20位',
                      duration:1000
                    })
                }else{
                  this.toast({
                    message:'两次密码不相符',
                    duration:1000
                  })
                }

            }
        }
    }
</script>

<style scoped lang="scss">
.isDisPasT{
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
.Modify_content{
	width: 94%;
	margin:0 auto;
	background:white;
	margin-top:24px!important;
	border-radius: 12px;
	box-shadow: 0px 0px 30px rgba(0,0,0,.2);
	/*padding-left:20px;*/
	div:nth-child(2){
		border-bottom:0;
	}
    .ipt_pass{
        border-bottom: 1px solid #eee;
        height: 110px;
        line-height: 110px;
        span{
            font-size: 28px;
            padding: 15px;
            margin-left:20px;
        }
        input{
            width: 300px;
            height: 80px;
            border: none;
            outline: none;
            font-size: 30px;
            margin-left: 10px;
        }
    }
}
.newPasTitle{
  width: 94%;
  margin:0 auto;
  margin-top:24px!important;
  color:#999;
  padding-left:12px;
}
.next_step_footer{
    width: 94%;
    height: 100px;
    margin:0 auto;
    margin-top:110px!important;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        // border: 1px solid #ccc;/*no*/
        border-radius: 15px;
        color:rgba(252,52,220,1);
        background: white;
        font-size: 32px;
        box-shadow: 0px 0px 25px rgba(0,0,0,.15);
    }
}
</style>
