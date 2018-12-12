<template>
    <div id="find">
        <ul class="content">
            <li v-for="(item,index) in arr" :key="index" @click="finds(index)">
                <div class="left">
                    <img :src="item.img" alt="">
                    <p>{{item.name}}</p>
                </div>
                <img src="../assets/img/组6.png" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                arr:[
                    {   
                        "img":require('../assets/img/17.png'),
                        "name":"超级玩家",
                        "router":"/find/super_player"
                    },
                    {   
                       "img":require('../assets/img/18.png'),
                        "name":"日程安排",
                        "router":"/find/schedule"
                    }
                ]
            }
        },
        methods:{
            finds(i){
                   this.$router.push({
                    path:this.arr[i].router,
                    query:{
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
#find{
    width: 100%;
    height: 100%;
    background: url("../assets/img/shouye.png") fixed center center no-repeat;
    background-size: cover;
}
.content{
    width: 100%;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:30px 25px 25px 25px;
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