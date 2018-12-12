<template>
    <div id="next_step">
        <div class="basic_header">
            <img src="../../assets/img/返回.png" alt="" @click="Last_step">
            <p>添加组织者结构</p >
            <p></p >
        </div>
       <div class="nextStep_content">
            <div class="organizer_box" v-for="(item,index) in activity_x.setting_organizer" :key="index">
                 <div class="title">组织者{{index+1}}</div>
                 <div class="content">
                    <div class="content_title">
                         <span>名称</span>
                         <input type="text" placeholder="如：队长/班长/校长" v-model="item.role">
                    </div>
                    <div class="content_duty">
                        <span>团队内职责</span>
                        <textarea name="" id="" cols="30" rows="5" placeholder="活动中负责组织参与者签到，集合按时跟进行程..." class="text"
                            v-model="item.des"
                        >
                        </textarea>
                    </div>
                 </div>
            </div>
        </div>
        <div class="ple">
            <div class="append" ref="append" @click="append_div" v-if="activity_x.setting_organizer.length >=0">
                +添加组织者
            </div>
            <div class="append" ref="append" @click="pop_div" v-if="activity_x.setting_organizer.length > 1">
                -删除
            </div>
        </div>
        
         <div class="nextStep_footer" @click="Next_step">
             <button>下一步</button>
         </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                 number:1,//组织者数量
                 organizerList:[ //组织者
                     {
                        "role":"",
                        "des":""
                     }
                     
                 ],
                 boolean:true, 
                 Second_groups:{}
            }
        },
        created(){
          this.$store.state.title = '添加组织结构'; 
        },
        mounted(){
             
        },
        computed:{
           ...mapState(['status','activity_x'])
        },
        methods:{
            ...mapMutations(['Next_step_fn','']),
             Reply_fn(){
                 this.organizerList=[ //组织者
                     {
                        "role":"",
                        "des":""
                     }
                     
                 ]
            },
            Last_step(){
                  this.$router.push({
                    path:'/basic',
                    query:{
           
                    }
                })
            },
            Next_step(){

                // this.activity_x.setting_organizer.map(val=>{   
                //     if(val.role == '' || val.des == ''){
                //            this.boolean=false
                //     }else{
                //            this.boolean=true
                //     }
                   
                // });
                // if(this.boolean == false){
                //            this.toast('活动信息不完整')    
                //     }else{
                     this.$router.push({
                        path:'/next_step2',
                        query:{
                           
                        }
                    })
                // }
            },
            append_div(){
                this.number++;
                this.activity_x.setting_organizer.push({
                    "role":"",
                    "des":""
                });
               
            },
            pop_div(){
                if(this.activity_x.setting_organizer.length>1){
                    this.activity_x.setting_organizer.pop()
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
// 头部
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
.nextStep_content{
    width: 100%;
    padding:0 25px;
    .organizer_box{
        width: 100%;
        display:flex;
        flex-wrap:wrap;
        .title{
            width: 100%;
            color: #999;
            font-size: 26px;
            padding:26px 560px 20px 44px;
        }
        .content{
            width: 700px;
            height:420px;
            -moz-box-shadow:2px 2px 10px #DADADA;
            -webkit-box-shadow:2px 2px 10px #DADADA;
            box-shadow:2px 2px 10px #DADADA;
            display:flex;
            flex-wrap:wrap;
            padding:0 30px;
            background:#fff;
            border-radius:12px;
            .content_title{
                width: 100%;
                height: 88px;
                display:flex;
                justify-content:space-between;
                align-items:center;
                border-bottom:1px solid #ddd;
                span{
                    color:#000000;
                    font-size:30px;
                }
                input{
                    float: right;
                    outline: none;
                    border: none;
                    color:24px;
                }
                input::-webkit-input-placeholder {
                   color:#C5C5C5;
                }
            }
            .content_duty{
                width: 100%;
                display:flex;
                flex-direction:column;
                span{
                    display:inline-block;
                    padding:0px 0 24px 0;
                    color:#000000;
                    font-size:30px;
                }
                textarea{
                    font-size:24px;
                    border:0;
                }
                textarea::-webkit-input-placeholder {
                   color:#C5C5C5;
                }
            }
        }
    }
}

.nextStep_footer{
    width: 100%;
    padding:52px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
.ple{
    display: flex;
    div{
        color: #376EEA;
        font-size: 26px;
        padding:42px 0 0 44px;
    }
}
</style>