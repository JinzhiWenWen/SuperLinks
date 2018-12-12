<template>
    <div id="Toexamine">
        <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>{{name}}</p >
            <p></p >
        </div>
        <div class="content">
            <div class="content_title">
                 抵押{{pledge}}&nbsp;SLK&nbsp;申请{{state | discount}}
            </div>
            <div class="applyInfo">
                <p>申请说明：</p>
                <textarea name="" id="" cols="30" rows="10" class="text" v-model="applyInfo">
                </textarea>
            </div>
             <div class="card_center">
                 <p>个人卡片信息：</p>
                <span>{{detailData.txt}}</span>
                <div v-for="(item,index) in detailData.imgs" :key="index" class="img_div">
                    <img :src="item" alt="">
                </div>
            </div>
            <div class="btn">
                <button @click="Toexamine_fn(refuse)">拒绝</button>
                <button @click="Toexamine_fn(adopt)">通过</button>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                 aid:'',
                 pid:'',
                 state:'',
                 pledge:'',
                 refuse:'-1',//拒绝
                 adopt:'1',//通过
                 value1:'',
                 name:'',
                 role:'',
                 des:'',
                 applyInfo:'',
                 detailData:{
                     txt:"",
                     imgs:[]
                 }
            }
        },
        created(){
            this.aid=this.$route.query.aid;
            this.pledge=this.$route.query.item.pledge;
            this.pid=this.$route.query.item._id;
            this.name=this.$route.query.item.name;
            this.state=this.$route.query.state;
            this.role=this.$route.query.item.role
            this.des=this.$route.query.item.des
            this.applyInfo=this.$route.query.item.applyInfo
            this.intro_fn()
            console.log(this.audit)
        },
        computed:{
            ...mapState(['user','token','audit'])
        },
        methods:{
            ...mapMutations(['audit_fn']),

             Last_step(){
                 this.$router.go(-1)
             },
             Toexamine_fn(state){
                 if(this.state == '0'){//发起者
                          this.$http.get(config.server_url+'activity/check/creator/'+this.aid+'/'+this.pid+'/'+state+'/'+this.token).
                          then(res=>{
                              console.log(res)
                              if(res.data.audit){
                              	this.audit_fn(res.data.audit)
                              }
                              this.toast({
                                message:res.data.msg,
                                duration:1000
                              })
                          })
                 }else if(this.state == '1'){//组织者
                           this.$http.get(config.server_url+'activity/check/organizer/'+this.aid+'/'+this.pid+'/'+state+'/'+this.token).
                          then(res=>{
                               console.log(res)
                             this.toast({
                               message:res.data.msg,
                               duration:1000
                             })
                          })
                 }else if(this.state == '2'){//参与者
                            this.$http.get(config.server_url+'activity/check/participator/'+this.aid+'/'+this.pid+'/'+state+'/'+this.token).
                            then(res=>{
                                 console.log(res)
                                 if(res.data.audit){
	                              	this.audit_fn(res.data.audit)
	                              }
                               this.toast({
                                 message:res.data.msg,
                                 duration:1000
                               })
                            })
                 }
             },
             intro_fn(){
                 this.$http.get(config.server_url+'users/personal/info/'+this.token+'/'+this.pid).
                   then(res=>{
                     console.log(res,'222')
                            this.detailData=res.data.data.user.intro
                  })
             }

        },
        filters: {
            discount : function(value){
                if(value==0){
                    return '发起者'
                }else if(value==1){
                    return '组织者'
                }else if(value==2){
                    return '参与者'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
#Toexamine{
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    position:relative;
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
    height: auto;
    display:flex;
    flex-wrap:wrap;
    .content_title{
        width: 100%;
        height: 110px;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:30px;
        color:#000;
    }
    .applyInfo{
        width: 100%;
        background:#fff;
        height: 220px;
        border-radius:12px;
        -moz-box-shadow:2px 2px 10px #DADADA;
        -webkit-box-shadow:2px 2px 10px #DADADA;
        box-shadow:2px 2px 10px #DADADA;
        display:flex;
        flex-direction:column;
        padding:20px 0 0 36px;
        p{
            font-size:32px;
            color:#000;
        }
        textarea{
            font-size:24px;
            border:0;
            margin-top:22px;
            color:#C5C5C5;
        }
        textarea::-webkit-input-placeholder {
            color:#C5C5C5;
        }
    }
    .roleInfo{
        width: 100%;
        background:#fff;
        height: 220px;
        border-radius:12px;
        -moz-box-shadow:2px 2px 10px #DADADA;
        -webkit-box-shadow:2px 2px 10px #DADADA;
        box-shadow:2px 2px 10px #DADADA;
        margin-top:22px;
        display:flex;
        flex-direction:column;
        padding:20px 0 0 36px;
        p{
            font-size:32px;
            color:#000;
        }
        textarea{
            font-size:24px;
            border:0;
            margin-top:22px;
            color:#C5C5C5;
        }
        textarea::-webkit-input-placeholder {
            color:#C5C5C5;
        }
    }
    .btn{
        width: 100%;
        height: 110px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        position:absolute;
        background: white;
        bottom:0;
        left:0;
        button:nth-child(1){
          color:#555;
          border-right:1px solid #ccc;
        }
        button{
            width: 50%;
            height: 100%;
            border:0;
            outline:none;
            font-size:30px;
            color:#FF4DE1;
        }
    }
}
.card_center{
    padding: 30px 20px;
    width: 100%;
    background: #fff;
    margin-top: 15px;
    font-size:30px;
    -moz-box-shadow:2px 2px 10px #DADADA;
    -webkit-box-shadow:2px 2px 10px #DADADA;
    box-shadow:2px 2px 10px #DADADA;
    border-radius:12px;
    overflow : hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    .img_div{
        img{
            width: 30%;
            height: 200px;
            float: left;
            margin: 10px;
        }
    }
    span{
        padding-left: 15px;
    }

}
</style>
