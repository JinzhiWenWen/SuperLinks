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
                 <input type="password" v-model="confirm.newPayPwd" placeholder="******">
             </div>
              <div class="ipt_pass">
                 <span>重复新密码</span>
                 <input type="password" v-model="Modify" placeholder="******">
             </div>
        </div>
         <div class="next_step_footer">
             <button @click="confirm_fn">
                 确认修改
             </button>
         </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
    export default {
        data(){
            return {
                Modify:'',
                confirm:{
                    "uid":"5ba1bcfdc0134f4880c19733",
                    "oldPayPwd":"",
                    "newPayPwd":""
                }

            }
        },
        computed:{
            ...mapState(['token'])

        },
        methods:{
             Last_step(){
                 this.$router.go(-1)
            },
            confirm_fn(){
                if(this.confirm.newPayPwd ==this.Modify){
                    console.log(this.confirm)
                    this.$http.post('http://192.168.1.109:3000/v1/auth/amend/payPwd'+this.token,this.confirm).then(res=>{
                         console.log(res)
                    })
                    this.$router.go(-1)
                }else{
                    console.log('两次输入密码不一样哦')
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
.next_step_footer{
    width: 94%;
    height: 110px;
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
        border: 1px solid #ccc;/*no*/
        border-radius: 15px;
        color:white;
        background: #fe3263;
        font-size: 32px;
    }
}
</style>