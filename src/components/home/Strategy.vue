<template>
    <div id="Strategy">
        <div class="basic_header">
            <img src="../../assets/img/返回.png" alt="" @click="Last_step">
            <p>攻略</p >
            <p></p >
        </div>
         <div class="Strategy_p">
            <p>{{Strategy.drawStrategy_title}}}</p>
            <p>{{Strategy.drawStrategy_content}}</p>
         </div>
         <div class="Strategy_ul">
             <ul>
                 <li v-for="(item,index) in Strategy.drawStrategy_list" :key="index">
                     <span>{{item.title}}</span>
                     <p>{{item.content}}</p>
                 </li>
             </ul>
         </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
    export default {
        data (){
            return {
                Strategy:''
            }
        },
        created(){
            this.Strategy_fn();
        },
        mounted(){
       
        },
        methods:{
             Last_step(){
                this.$router.go(-1)
            },
            Strategy_fn(){
                this.$http.get(config.server_url+'draw/strategy').then(res=>{
                    this.Strategy=res.data;
                    console.log( this.Strategy)
                })
            }
            
        }
    }
</script>

<style scoped lang="scss">
#Strategy{
	background: #F0F0F0;
	
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
.Strategy_p{
    padding: 15px;
    font-size: 24px;
    height: 110px;
    line-height: 40px;
    text-align: center;
    color: #999;
    margin-top: 28px;
}
.Strategy_ul{
    ul{
        li{
        	height: 220px;
        	width: 94%;
        	border: 1px solid #fff;
        	background: #fff;
        	margin-left: 25px;
        	margin-bottom: 30px;
        	border-radius: 12px;
        	box-shadow: #000 0 0 20px;
        	box-shadow: 0px 0px 30px rgba(0,0,0,.2);
            span{
                font-size: 30px;
                line-height: 48px;
                color: #000;
                margin-left: 30px;
                padding-top: 36px;
                display: block;
            }
            p{
            	font-size: 30px;
            	margin-top: 46px;
            	margin-left: 30px;
                font-size: 28px;
                color: #000;
                line-height: 58px;
                margin-bottom: 78px;
            }
        }
    }
}
</style>