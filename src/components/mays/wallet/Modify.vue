<template>
    <div id="Modify">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>修改钱包密码</p >
            <p></p >
        </div>
        <div class="Modify_content">
             <div class="ipt_pass">
                 <span>原来旧密码</span>
                 <input type="password" v-model="confirm.oldPayPwd" placeholder="******">
             </div>
              <div class="ipt_pass">
                 <span>设置新密码</span>
                 <input type="password" v-model="newPayPwd" placeholder="******">
             </div>
              <div class="ipt_pass">
                 <span>重复新密码</span>
                 <input type="password" v-model="Modify" placeholder="******">
             </div>
        </div>
        <p class="setPasAlt">6－20位字符，可包含数字或字母</p>
          <div class="basic_footer" @click="confirm_fn">
            <button >确认修改</button>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                Modify:'',
                newPayPwd:'',
                confirm:{
                    "uid":"",
                    "oldPayPwd":""
                }

            }
        },
        created(){
           this.confirm.uid=this.uid;
        },
        computed:{
           ...mapState(['uid','token'])
        },
        watch:{
          newPayPwd(val,oldVal){
            if(!/^[0-9a-zA-Z]*$/g.test(val)){
              var a=val.slice(0,val.length-1)
              console.log(a)
              this.newPayPwd=a;
              this.toast({
                message:'不可输入非法字符',
                duration:1000
              });
            }
          }
        },
        methods:{
             Last_step(){
                 this.$router.go(-1)
            },
            confirm_fn(){
              if(this.confirm.oldPayPwd=''){
                this.toast({
                  message:'请输入原密码',
                  duration:1000
                })
              }else if(this.newPayPwd.length<6||this.newPayPwd>20){
                this.toast({
                  message:'密码长度为6-20位',
                  duration:1000
                })
              }else if(this.newPayPwd !=this.Modify){
                this.toast({
                  message:'两次输入密码不相符',
                  duration:1000
                })
              }else{
                this.$http.post(config.server_url+'auth/amend/payPwd/',this.token,this.confirm).then(res=>{
                     console.log(res)
                     this.toast({
                       message:res.data.msg,
                       duration:1000
                     })
                })
                this.$router.go(-1)
              }
                // if(this.confirm.newPayPwd ==this.Modify){
                //     this.$http.post(config.server_url+'auth/amend/payPwd/',this.token,this.confirm).then(res=>{
                //          console.log(res)
                //          this.toast(res.data.msg)
                //     })
                //     this.$router.go(-1)
                // }else{
                //     console.log('两次输入密码不一样哦')
                // }

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
.Modify_content{
	width: 94%;
	margin:0 auto;
	background:white;
	margin-top:24px!important;
	border-radius: 12px;
	box-shadow: 0px 0px 30px rgba(0,0,0,.2);
	/*padding-left:20px;*/
	div:nth-child(3){
		border-bottom:0;
	}
    .ipt_pass{
        border-bottom: 1px solid #ccc;
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
.setPasAlt{
  width: 94%;
  margin:0 auto;
  font-size: 28px;
  color:#999;
  padding-left:15px;
  margin-top:30px!important;
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
