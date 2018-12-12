<template>
    <div id="evaluate">
         <div class="basic_header">
             <img src="../../assets/img/返回.png" alt="" @click="Last_step">
             <p>评价</p>
             <p></p>
         </div>
         <div class="content">
             <div class="review_box">
                <p>总体评价:</p>
                <ul class="list">
                    <li v-for="(item,index) in total" :key="index" :class="{ active:general == index}" @click="addClass(index)">
                       <p>{{item}}</p>
                    </li>
                    <!-- <li>有趣</li>
                    <li>合格</li>
                    <li>有趣</li> -->
                </ul>
             </div>
             <div class="review_box">
                <p>特色:</p>
                <ul class="list">
                    <li v-for="(item,index) in arr1" :class="{'active':feature[index]}" :key="index" @click="addClassFeature(index)">
                        <p>{{item.type}}</p>
                    </li>
                </ul>
             </div>
             <div class="description">
                <p>详细描述</p>
                <textarea name="" id="" cols="30" rows="10" placeholder="如：我非常喜欢这次的活动，非常的有意......" class="text" v-model="des">
            </textarea>
        </div>
         </div>
        <div class="basic_footer">
            <button @click="review_fn" :class="{isPingS:color==1}" :disabled="isPing">提交评价</button>
         </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    import Vue from 'vue'
    export default {
        data(){
            return {
                 a:true,
                 total:["优秀","合格","不合格"],// 总体评价
                 arr1:[
                     {type:"有趣"},
                     {type:"有品质"},
                     {type:"有内容"},
                     {type:"有性价比"}
                 ],// 特色
                 aid:'',
                 general:4,
                 feature:[ ],
                 des:'',
                 isPing:true,
                 color:1
            }
        },
        created(){
            this.aid=this.$route.query.aid;
            console.log(this.aid)
        },
        computed:{
            ...mapState(['uid','token'])
        },
        watch:{
          general(val,oldVal){
            if(val==0||val==1||val==2){
              this.color=2;
              this.isPing=false
            }else{
              this.color=1;
              this.isPing=true;
            }
          }
        },
        mounted(){
            this.initfunc()
        },
        methods:{
            Last_step(){
                 this.$router.go(-1)
            },
            // 总体评价
            addClass(index){
                 this.general = index;
                 this.general!=this.general;
            },
            review_fn(){
                 this.$http.post(config.server_url+'activity/review',{
                     uid:this.uid,
                     aid:this.aid,
                     general:this.general,
                     feature:this.feature,
                     des:this.des,
                     token:this.token
                 }).then(res=>{
                     console.log(res)
                     this.toast({
                       message:res.data.msg,
                       duration:1000
                     })
                    this.$router.go(-1)
                 })
            },
            // 特色
            addClassFeature(index){
                for(var i=0;i<this.feature.length;i++){
                    if(i=== index){
                        this.feature[index]?this.feature.splice(index,1,0):this.feature.splice(index,1,1)
                    }
                }
                console.log(this.feature)
            },
            initfunc(){
                for(var i=0;i<this.arr1.length;i++){
                    this.feature.push(0)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.isPingS{
  color:rgba(253,180,242,1)!important;
}
.active{
    font-size: 26px;
    line-height:58px;
    width: 138px;
    border-radius:8px;
    border:1.2px solid rgba(252,52,220,1);
    p{
        text-align:center;
        color:rgba(252,52,220,1)!important;
    }
    &::after{
            content:"";
            position:absolute;
            display:block;
            right: -2px;
            bottom: -1px;
            width: 36px;
            height: 36px;
            background:url('../../assets/img/35.png') no-repeat;
            background-size: cover;
    }
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
.content{
    width: 100%;
    display:flex;
    flex-direction:column;
    padding:18px 25px;
    .review_box{
        background:#fff;
        border-radius:12px;
        height: 188px;
        padding:32px 0 42px 28px;
        margin-bottom:24px;
        p{
            font-size:30px;
            color:#000;
        }
        .list{
            width: 100%;
            display:flex;
            justify-content:flex-start;
            align-items:center;
            li{
                width: 138px;
                height: 58px;
                background:white;
                border-radius:10px;
                margin-right:36px;
                margin-top:26px;
                position:relative;
                box-shadow: 0px 0px 20px rgba(0,0,0,.2);
                box-sizing: border-box;
                p{
                    font-size:26px;
                    color:#666;
                    line-height:58px;
                    text-align:center;
                }
            }
        }
    }
    .description{
        background:#fff;
        border-radius:12px;
        height: 464px;
        padding:32px 0 42px 28px;
        margin-bottom:24px;
        p{
            font-size:30px;
            color:#000;
        }
        textarea{
            width: 644px;
            height: 340px;
            margin-top:20px;
            font-size:28px;
            padding: 5px;
            border:0;
        }
        textarea::-webkit-input-placeholder {
            color:#C5C5C5;
        }
    }
}
.basic_footer{
    width: 92%;
    margin:0 auto;
    margin-top:24px!important;
    button{
        width:100%;
        height: 100px;
        border: none;
        outline: none;
        border-radius: 12px;
        background:white;
        color:rgba(252,52,220,1);
        font-size:30px;
    }
}

</style>
