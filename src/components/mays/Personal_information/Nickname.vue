<template>
    <div id="Nickname">
         <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>昵称</p >
            <p  @click="preservation_fn">保存</p >
        </div>
        <div class="Nickname_ipt">
            <input type="text" placeholder="请输入昵称"  v-model="user.name" @focus="a()" @blur="b()">
            <img src="../../../assets/img/close_input.png" alt="" @click="emptyVal()" v-show="hasFocus"></span>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                user_name:'',
                hasFocus:false
            }
        },
         created(){
             this.user_name=this.user.name;
        },
        computed:{
             ...mapState(["Personal_inf_x","user"]),
        },
        methods:{
             ...mapActions(['Nickname_fn_x']),
            Last_step(){
                 if(this.user.name==''){
                   this.toast({
                     message:'昵称不能为空',
                     duration:1000
                   })
                 }else{
                   this.$router.go(-1);
                 }
            },
            preservation_fn(){//保存昵称
            if(this.user.name != ''){
                this.Nickname_fn_x(this.user.name);
                this.$router.go(-1)
            }else{
                this.toast({
                  message:'昵称不能为空',
                  duration:1000
                })
                this.user.name=this.user_name
            }

            },
            emptyVal(){
              this.user.name='';
            },
            a(){//获取焦点
              // alert('1')
              this.hasFocus=true;
            },
            b(){  //  失去焦点
              this.hasFocus=false;
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
.Nickname_ipt{
  width: 94%;
  margin:0 auto;
  margin-top:23px;
  height:110px;
  border-radius:12px;
  box-shadow: 0px 0px 30px rgba(0,0,0,.2);
  position: relative;
    input{
            width: 100%;
            height:100%;
            border-radius: 12px;
            outline: none;
            border: none;
            background: #fff;
            font-size: 32px;
            padding: 15px;
        }
        img{
          position: absolute;
          right:60px;
          top:50%;
          margin-top:-15px;
          width: 30px;
          height:30px;
        }

}
</style>
