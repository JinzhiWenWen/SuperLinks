<template>
    <div id="Personal_information">
           <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>个人信息</p >
            <p></p >
        </div>
          <div class="content">
               <dl @click="head_fn">
                    <dd>
                       <p>头像</p>
                    </dd>
                     <dt>
                        <img :src="Personal_inf_x.user.avatar" alt="">
                        <div class="info">
                            <img src="../../../assets/img/组6.png" alt="">
                        </div>
                    </dt>
                </dl>
                <ul>
                    <li @click="router_fn0">
                        <span>昵称</span>
                        <div class="info">
                            <p>{{user.name}}</p>
                            <img src="../../../assets/img/组6.png" alt="">
                        </div>
                    </li>
                     <li @click="router_fn1">
                        <span>个人简介</span>
                        <div class="info">
                            <p></p>
                            <img src="../../../assets/img/组6.png" alt="">
                        </div>
                    </li>
                     <li @click="router_fn2">
                        <span>属性</span>
                        <div class="info">
                            <p></p>
                            <img src="../../../assets/img/组6.png" alt="">
                        </div>
                    </li>
                     <li  @click="router_fn3">
                        <span>个人角色卡片</span>
                        <div class="info">
                            <p></p>
                            <img src="../../../assets/img/组6.png" alt="">
                        </div>
                    </li>
                </ul>
          </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
         data(){
            return {
                 Personal_inf:'',
                 userPic:''
            }
        },
        created(){
            this.$store.state.title = '个人中心'
            this.Personal_inf_fn_x();
            if(this.user.intro == ''){
                 this.user.intro='待完善'
            }
        },
        mounted(){
          this.Personal_inf_fn();
        },
        computed:{
             ...mapState(['Personal_inf_x',"uid","user","token"]),
        },
        methods:{
            ...mapActions(['Personal_inf_fn_x']),
            Last_step(){
                this.$router.push({
                    path:'/my',
                    query:{

                    }
                })
            },
            head_fn(){
                 this.$router.push({
                    path:'/Head_portrait',
                    query:{
                        Personal_inf:this.Personal_inf
                    }
                })
            },
            router_fn0(){
                this.$router.push({
                    path:'/Nickname',
                    query:{

                    }
                })
            },
            router_fn1(){
                this.$router.push({
                    path:'/Personal_profile',
                    query:{

                    }
                })
            },
            router_fn2(){
                this.$router.push({
                    path:'/attribute',
                    query:{

                    }
                })
            },
            router_fn3(){
                this.$router.push({
                    path:'/card',
                    query:{
                       _id:this.uid
                    }
                })
            },
            Personal_inf_fn(){
                this.$http.get(config.server_url+'users/personal/info/'+this.token).then(res=>{
                    this.Personal_inf=res.data.data;
                    this.userPic = res.data.data.user.avatar
                    // this.arr[0].cont=this.Personal_inf.name;
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
    height: 100%;
    padding:0 25px;
    dl{
        width: 100%;
        height:220px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        background:#fff;
        margin-top:22px;
        padding:20px 30px;
        -moz-box-shadow:2px 2px 10px #D8D8D8;
        -webkit-box-shadow:2px 2px 10px #D8D8D8;
        box-shadow:2px 2px 10px #D8D8D8;
        border-radius:12px;
        dt{
            display:flex;
            align-items:center;
            img{
                width: 180px;
                height: 180px;
                border-radius:50%;
                margin-right:20px;
            }
            .info{
                img{
                     width: 19px;
                    height: 31px;
                }
            }
        }
        dd{
            p{
                font-size:38px;
                color:#000;
            }
        }
    }
    ul{
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    li{
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
        span{
            font-size:30px;
            color:#000;
        }
        .info{
            height: 110px;
            display:flex;
            align-items:center;
            p{
                width: 140px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size:32px;
                color:#000;
                margin-right:20px;
            }
            img{
                width: 19px;
                height: 31px;
            }
        }
    }
}
}
</style>
