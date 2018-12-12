<template>
    <div id="Set_up">
        <TitlePage></TitlePage>
        <ul>
            <li v-for="(item,index) in arr" :key="index" @click="router_go(index)">
                <span>{{item.name}}</span>
                <div class="info">
                    <p>{{item.information}}</p>
                    <img src="../../../assets/img/组6.png" alt="">
                </div>
            </li>
        </ul>
        <div class="basic_footer" @click="quit">
            <button >
               退出登陆
            </button>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import { MessageBox } from 'mint-ui';
import {removeStore} from '@/utill'
import TitlePage from '../../../components/commons/TitlePage'
    export default {
        data (){
            return {
                arr:[
                    // {
                    //     "name":"身份证认证",
                    //     "information":"待完善",
                    //     "router":"/ID"
                    // },
                    // {
                    //     "name":"活体认证",
                    //     "information":"已完成",
                    //     "router":"/camera"
                    // },
                    // {
                    //     "name":"手机号码",
                    //     "information":"18646146106",
                    //     "router":"/Phone"
                    // },
//                  {
//                      "name":"微信",
//                      "information":"dd_111",
//                      "router":"/WeChat"
//                  },
                    // {
                    //     "name":"QQ",
                    //     "information":"731616021",
                    //     "router":"/QQ"
                    // },
                    // {
                    //     "name":"邮箱",
                    //     "information":"zhangyuan@qq.com",
                    //     "router":"/Email"
                    // }
                ]
            }
        },
        components:{
            TitlePage
        },
        created(){
            this.$store.state.title = '设置'
        },
        methods:{
        	quit(){
        		MessageBox.confirm('确定要退出登陆?').then(action => {
                    removeStore('logininfo_phone')
                    removeStore('logininfo_uid')
                    removeStore('logininfo_token')
	        		this.$router.push({
	                    path:'/',
	                    query:{}
	                })
				});
        	},
            router_go(i){
                  this.$router.push({
                    path:this.arr[i].router,
                    query:{
                        id:1,
                        ifShow:true
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
 ul{
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    padding:0 25px;
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
    .basic_footer{
            width: 100%;
            padding:52px 20px 0 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom:22px;
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