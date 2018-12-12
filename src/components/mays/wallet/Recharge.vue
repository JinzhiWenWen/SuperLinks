<template>
    <div id="Recharge">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>充值</p >
            <p></p >
        </div>
        <div class="Recharge_content">
            <span>钱包地址</span>
            <input type="text" v-model="addr">
            <input type="text" id="copy_text" v-model="user.addr" v-show="Tex" name="" value="">
            <div class="basic_footer">
                <img src="../../../assets/img/32.png" alt=""
                ref="copy"  data-clipboard-action="copy"
                data-clipboard-target="#copy_text" @click="copy">
            </div>
        </div>
        <p class="Recharge_instr">
            禁止向SLK地址充值除SLK之外的资产，任何充值SLK地址的非SLK资产将不可找回。
        </p>

    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import Clipboard from 'clipboard';
    export default {
        data(){
            return {
               copyContent:'',
               addr:null,
               Tex:false
            }
        },
        mounted(){
            this.copyBtn = new Clipboard(this.$refs.copy)
            this.addr=this.user.addr.substr(0,24)+'...';
            console.log(this.addr)
        },
        computed:{
            ...mapState(['user'])
        },
        methods:{
            Last_step(){
                this.$router.go(-1)
            },
            copy () {
                    var _this = this
                    this.copyBtn.on('success', function () {
                        _this.toast({
                          message:'复制成功',
                          duration:1000
                        })
                        console.log(231)
                    })
                    this.copyBtn.on('error', function () {
                            _this.toast({
                              message:'复制失败，请手动复制',
                              duration:1000
                            })
                            console.log(12313213)
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
.Recharge_content{
	width: 94%;
	margin:0 auto;
	margin-top:24px!important;
	background: white;
  position: relative;
    height: 110px;
    line-height: 110px;
    padding-left:32px;
    border-radius:12px;
    box-shadow: 0px 0px 30px rgba(0,0,0,.2);
    font-size: 32px;
    color:black;
    input{
    	outline: none;
    	border:0;
    	margin-left:18px;
        font-size:30px ;
        width: 500px;
    }
}
.Recharge_amount{
	width:94%;
	margin:0 auto;
	background: white;
	height:220px;
	margin-top:24px!important;
	border-radius:12px;
	box-shadow: 0px 0px 30px rgba(0,0,0,.2s);
	position: relative;
	padding-left:32px;
	padding-top:36px;
	span{
		font-size:32px ;
		color:black;
	}
	input{
		width:400px;
		position: absolute;
		left:50%;
		margin-left: -200px;
		top:38%;
		height:80px;
		border:0;
		border-bottom:1px solid #f4f4f4;
        text-align: center;
        color: #FE3263;
	}
    input::-webkit-input-placeholder {
        color: #FE3263;
        font-size: 48px;
    }
	.amount_title{
		width:100%;
		text-align: center;
		margin-top:100px;
		span{
			font-size:24px;
			color:#999;
		}
	}
}
.Recharge_instr{
	width:94%;
	margin: 0 auto;
    font-size: 24px;
    color: #333;
    padding: 0px 15px;
    line-height: 40px;
    margin-top: 20px;
}
.basic_footer{
  width: 40px;
  height:40px;
  position: absolute;
  right:20px;
  top:8px;
  img{
    width: 100%;
    height:100%;
  }
}
</style>
