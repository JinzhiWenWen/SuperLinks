<template>
    <div id="wallet_pwd">
         <div class="basic_header">
            <!-- <img src="../assets/img/返回.png" alt="" @click="Last_step"> -->
            <p>实名认证</p >
        </div>
        <div class="Modify_content">
              <div class="ipt_pass">
                 <span>真实姓名</span>
                 <input type="text"
                 onkeyup="value=value.replace(/[\d]/g,'')"
                 onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))"
                 v-model="name">
             </div>
             <div class="ipt_pass">
                 <span>身份证号</span>
                 <input type="number" v-model="cardNum">
             </div>
        </div>
         <div class="next_step_footer">
             <button @click="cerCard()" :class="{isDisPasT:color==1}" :disabled="isDisPas">
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
               name:'',
               cardNum:'',
               phone:'',
               isDisPas:true,
               color:1
            }
        },
        created(){
            this.phone=this.$route.query.phone;
            console.log(this.token)
        },
        computed:{
          ...mapState(['token'])
        },
        watch:{
          name(val,oldVal){
           if(val!=''&&this.cardNum!=''){
              this.color=2;
              this.isDisPas=false;
            }else{
              this.color=1;
              this.isDisPas=true;
            }
          },
          cardNum(val,oldVal){
            if(val!=''&&this.name!=''){
              this.color=2;
              this.isDisPas=false;
            }else{
              this.color=1;
              this.isDisPas=true;
            }
          }
        },
        methods:{
            ...mapMutations(['uid_fn','user_fn']),
            Last_step(){
                this.$router.go(-1)
            },
            cerCard(){
              // alert(1)
              let _this=this;
              if(_this.cardNum.length!=18){
                _this.toast({
                  message:'无效的身份证号',
                  duration:1000
                })
              }else{
                _this.$http.post(config.server_url+'auth/Certification',{
                  token:this.token,
                  userName:this.name,
                  idCard:this.cardNum
                }).then((res)=>{
                  this.toast({
                    message:res.data.msg,
                    duration:1000
                  })
                  _this.$router.push('/personCerti')
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
    // background:#fff;
    p{
      width: 100%;
      text-align: center;
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
