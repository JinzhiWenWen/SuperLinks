<template>
	<div id="Register">
		<div class="logo">
			<div class="logo_img">
				<img :src="img" alt="" style="width:100%;height:100%;">
			</div>
		</div>
		<div class="box">
			<div class="check">
				<!-- <span class="el-icon-mobile-phone"></span> -->
				<input type="text" placeholder="请输入手机号" v-model="phone">
			</div>
			<div class="verification">
				<!-- <b class="el-icon-phone-outline"></b> -->
				<input type="number" placeholder="请输入验证码" style="width: 70%;" v-model="vCode">
				<span v-show="show" @click="getCode" cursor:pointer style="color:rgba(252,52,220,1);">获取验证码</span>
				<span v-show="!show">{{count}}s</span>
			</div>
			<div class="registerBtn" >
				<button @click="goNextPage" :class="{isResiD:color==1}" :disabled="isResi">
                      登陆
                  </button>
			</div>
		</div>
	</div>
</template>

<script>
	import config from '@/common/config.js'
	import { setStore, getStore, removeStore } from '@/utill'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				show: true, //显示
				count: '', //倒计时
				timer: null,
				phone: '', //手机号
				vCode: '', //验证码
				img: require('../assets/img/510429391932265190.png'),
				isResi:true,
				color:1
			}
		},
		watch:{
			phone(val,oldVal){
				if(val!=''&&this.vCode!=''){
					this.color=2;
					this.isResi=false;
				}else{
					this.color=1;
					this.isResi=true;
				}
			},
			vCode(val,oldVal){
				if(val!=''&&this.phone!=''){
					this.color=2;
					this.isResi=false;
				}else{
					this.color=1;
					this.isResitrue;
				}
			}
		},
		created(){
			if(localStorage.getItem("logininfo_token")){
				var user_token = localStorage.getItem("logininfo_token")
				 this.$http.get(config.server_url+'auth/user/'+user_token).then(res=>{
	             	console.log(res,66)
	                 if(res.data.code == 200 ){
	                      console.log(res.data)
	                      this.uid_fn(res.data.data.user._id)
	                      this.user_fn(res.data.data.user);
	                      this.token_fn(res.data.data.token);
	                      this.audit_fn(res.data.data.audit)
	                      localStorage.setItem('logininfo_uid', JSON.stringify(res.data.data.user._id))
						  					localStorage.setItem('logininfo_token', res.data.data.token)
	                      this.$router.push({
	                          path:'/home',
	                          query:{
	                          }
	                      })
	                 }
	             })
			}
		},
//		beforeCreate() {
//			if(localStorage.logininfo_phone && localStorage.logininfo_uid && localStorage.logininfo_utoken) {
//				console.log("判断本地存储", localStorage.logininfo_uid)
//				var user_phone = JSON.parse(localStorage.logininfo_phone)
//				var user_uid = JSON.parse(localStorage.logininfo_uid)
//				var user_token = JSON.parse(localStorage.logininfo_utoken)
//
//	             console.log(user_uid)
//	             this.$http.get(config.server_url+'auth/user/').then(res=>{
//	             	console.log(res,66)
//	                 if(res.data.code == 200 ){
//	                      console.log(res.data)
//	                      this.uid_fn(res.data.data.user._id)
//	                      this.user_fn(res.data.data.user);
//	                      this.token_fn(res.data.data.token);
//						  this.audit_fn(res.data.data.audit)
//	                      this.$router.push({
//	                          path:'/home',
//	                          query:{
//
//	                          }
//	                      })
//	                 }
//	             })
//			}
//		},
		methods: {
			...mapMutations(['uid_fn', 'user_fn', 'token_fn', 'audit_fn']),
			goNextPage() { //登录
				var _this = this;
				this.$http.post(config.server_url + 'auth/signUpIn', {
					phone: this.phone,
					vCode: this.vCode
				}).then(res => {
					console.log(res)
					if(this.vCode == '') {
						this.toast({
							message:'请输入验证码',
							duration:1000
						})
					} else if(res.data.code == 200) {
						if(res.data.data) {
							console.log(res.data.data)
							this.token_fn(res.data.data.token)
							this.uid_fn(res.data.data.user._id)
							this.user_fn(res.data.data.user);
							this.audit_fn(res.data.data.audit);
							localStorage.setItem('logininfo_phone', JSON.stringify(this.phone))
							localStorage.setItem('logininfo_uid', JSON.stringify(res.data.data.user._id))
							localStorage.setItem('logininfo_token', res.data.data.token)
							console.log(res)
							this.toast({
								message:'登录成功',
								duration:1000
							})
							this.$router.push({
								path: '/home',
							})
						} else {
							_this.token_fn(res.data.token);
							this.$router.push({
								path: '/Wallet_pwd',
								query: {
									phone: this.phone
								}
							})
						}
					} else {
						this.toast({
							message:res.data.msg,
							duration:1000
						})
					}

				}).catch(res => {
						this.toast({
							message:'服务器错误',
							duration:1000
						})
					})
			},
			// 获取验证码
			getCode() {
				if(this.phone == '') {
					this.toast({
						message:'手机号不能为空',
						duration:1000
					})
					return
				} else if(!(/^1[345678]\d{9}$/.test(this.phone))) {
					this.toast({
						message:'请输入正确的手机号',
						duration:1000
					})
				} else {
					this.$http.get(config.server_url + 'auth/phoneVerify/' + this.phone).then(res => {
						console.log("短信", res.data)
						console.log("短信2", res)
						if(res.data.code = 200) {
							const TIME_COUNT = res.data.data.wait // 获取倒计时
							// 倒计时
							if(!this.timer) {
								this.count = TIME_COUNT;
								this.show = false;
								this.timer = setInterval(() => {
									if(this.count > 0 && this.count <= TIME_COUNT) {
										this.count--;
									} else {
										this.show = true;
										clearInterval(this.timer);
										this.timer = null;
									}
								}, 1000)
							}
						} else {
							this.toast({
								message:res.data.msg,
								duration:1000
							})
						}
					}).catch(res => {
						this.toast({
							message:'服务器错误',
							duration:1000
						})
					})
				}

			}
		}

	}
</script>

<style scoped lang="scss">
.isResiD{
	color:rgba(253,180,242,1)!important;
}
	#Register {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: white;
	}

	.logo {
		margin-top: 30px;
		width: 100%;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		.logo_img {
			width: 360px;
			// height: 120px;
		}
	}

	.box {
		position: fixed;
		top: 35%;
		width: 100%;
		flex: 1;
		padding: 0 28px;
		.check {
			width: 100%;
			height: 62px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 22px;
			border-bottom: 3px solid #E8E8E8;
			span {
				display: inline-block;
				width: 50px;
				font-size: 40px;
			}
			input {
				flex: 1;
				height: 62px;
				border: 0;
				outline: none;
				line-height: 88px;
				font-size: 32px;
				color: black;
				padding-left: 12px;
			}
		}
		.verification {
			width: 100%;
			height: 80px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 22px;
			border-bottom: 3px solid #E8E8E8;
			b {
				display: inline-block;
				width: 50px;
				font-size: 40px;
			}
			input {
				width: 75%;
				height: 62px;
				border: 0;
				outline: none;
				line-height: 88px;
				font-size: 32px;
				color: black;
				padding-left: 12px;
			}
			span {
				flex: 1;
				height: 62px;
				display: inline-block;
				border: 2px solid #E8E8E8;
				text-align: center;
				line-height: 62px;
				border-radius: 12px;
				color: rgba(525,52,220,1);
				font-size: 20px;
				margin-bottom:4px;
			}
		}
		.registerBtn {
			width: 100%;
			margin-top:154px!important;
			display: flex;
			justify-content: center;
			align-items: center;
			button {
				width: 100%;
				height: 100px;
				border: none;
				outline: none;
				border-radius: 12px;
				background: white;
				color: rgba(252,52,220,1);
				font-size: 36px;
				box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			}
		}
	}
</style>
