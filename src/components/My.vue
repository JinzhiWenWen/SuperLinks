<template>
    <div id="my">

        <div class="myInfo" @click="personMes()">
            <dl>
                <dt>
                    <img :src="userPic" alt="">
                </dt>
                <dd>
                     <p>{{user.name}}</p>
                     <span>信用值{{user.credit}}&nbsp;TOP{{user.cRank}} </span>
                </dd>
            </dl>
        </div>
        <ul class="content">
            <li @click="my_wallet()">
                <div class="left">
                    <img src="../assets/img/716216462267329256.png" alt="">
                    <p>钱包</p>
                </div>
                <img src="../assets/img/组6.png" alt="">
            </li>
            <li @click="my_activity()">
                <div class="left">
                    <img src="../assets/img/144815817849746941.png" alt="">
                    <p>我的活动</p>
                </div>
                <img src="../assets/img/组6.png" alt="">
                <div class="sign" v-if="showsign"></div>
            </li>
            <li @click="setMessage()">
                <div class="left">
                    <img src="../assets/img/754530903564109209.png" alt="">
                    <p>设置</p>
                </div>
                <img src="../assets/img/组6.png" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
            	showsign:false,
              userPic:null,
                   arr:[
                   {
                       "name":"钱包",
                       "router":"/Wallet"
                   },{
                       "name":"我的活动",
                       "router":"/My_activities"
                   },{
                       "name":"设置",
                       "router":"/Set_up"
                   }]
            }
        },
        computed:{
           ...mapState(['user','Personal_inf_x','uid','token','audit','portrait'])
        },
        created(){
            this.Personal_inf_fn();
            console.log(this.user)
            console.log(this.token)
            console.log(this.audit,999)
            if(this.audit[0]){
              for(var i in this.audit){
              	if(this.audit[i].status == 'True'){
              		this.showsign = true
              	}
              }
            };
        },
        methods:{
            ...mapMutations(['user_new_fn','Personal_inf_fn_x']),
          personMes(){//用户信息
              this.$router.push({
                path:'/Personal_information',
                query:{
                  id:1
                }
              })
          },
            my_wallet(){  //我的钱包
                this.$router.push({
                    path:'/Wallet',
                    query:{
                        id:1
                    }
                })
            },
            my_activity(){  //我的活动
                this.$router.push({
                    path:'/My_activities',
                    query:{
                        id:1
                    }
                })
            },
            setMessage(){  //设置
                this.$router.push({
                  path:'/Set_up',
                  query:{
                    id:1
                  }
                })
            },
             Personal_inf_fn(){
                this.$http.get(config.server_url+'users/personal/info/'+this.token).then((res)=>{
                  // console.log(res)
                  this.userPic=res.data.data.user.avatar;
                    this.user_new_fn(res.data.data)
                })
            }
        },
        mounted(){
          if(this.userPic==null){
            this.userPic=this.portrait;
          }
        }
    }
</script>

<style scoped lang="scss">
#my{
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/img/shouye.png") fixed center center no-repeat;
    background-size: cover;
}
.myInfo{
    width: 100%;
    padding:80px 25px;
    display:flex;
    justify-content:center;
    align-items:center;
    dl{
        width: 100%;
        height: 100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        dt{
            width: 100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            margin-bottom:32px;
            img{
                width: 200px;
                height: 200px;
                border-radius:50%;
            }
        }
        dd{
            width: 100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            p{
                font-size:38px;
                color:#fff;
            }
            span{
                display:inline-block;
                padding:20px 0;
                font-size:24px;
                color:#fff;
            }
        }
    }
}
.content{
    width: 100%;
    padding:0 25px;
    li{
    	position: relative;
        width: 100%;
        height: 110px;
        margin-top:23px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:0 32px;
        border-radius:12px;
        -moz-box-shadow:2px 2px 10px #D8D8D8;
        -webkit-box-shadow:2px 2px 10px #D8D8D8;
        box-shadow:2px 2px 10px #D8D8D8;
        background:#fff;
        .sign{
	    	width: 16px;
	    	height: 16px;
	    	background: red;
	    	border-radius: 50%;
	    	position: absolute;
	    	top: 25px;
	    	left: 240px;
	    }
        .left{
            display:flex;
            img{
                width: 40px;
                height: 40px;
                margin-right:25px;
            }
            p{
                font-size:32px;
                color:#000;
            }
        }

        img{
            width: 19px;
            height: 31px;
        }
    }
}
</style>
