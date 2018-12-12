<template>
    <div id="Next_step3">
        <div class="basic_header">
            <img src="../../assets/img/返回.png" alt="" @click="Last_step">
            <p>设置参与者条件</p >
            <p></p >
        </div>
        <div class="participant_con">
          <div class="participant_numer">
             <span>可参与人数</span>
             <input type="number" ref="comPer" placeholder="请输入可参与人数" v-model="maxPeople" onkeyup="value=value.replace(/[^\d]/g,'')">
         </div>
         <div class="participatant_box">
             <span>参与者需满足条件</span>
             <textarea name="" id="" cols="30" rows="10" class="text" placeholder="如：需为上市公司CEO"
                 v-model="condition"
             >
             </textarea>
         </div>
        </div>
       <div class="check_pledge" @click="showToggle">
                <div class="switchBtn" v-bind:class="{'close': isClose, 'open': isOpen}"><span class="el-icon-check" style="border-radius:50%;"></span></div>
                <span>报名活动需抵押SLK</span>
         </div>
        <div class="requirement" v-if="isClose">

                <span>缴纳数量</span>
                <p>
                  <input type="number" v-model="fee" placeholder="0.00">
                  <span>SLK</span>
                </p>
        </div>
        <div class="basic_footer" @click="Next_step">
             <button :class="{isDe:sta==1}" :disabled="disableT" ref="nextBtn_three">
                 下一步
             </button>
         </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import config from '@/common/config.js'
    export default {
        data(){
            return {
                numer:1,
                sta:1,
                disableT:true,
                // setting_participator_x:{
                    condition:'',//条件
                    maxPeople:'',//可参与人数
                    needPledge:'',//抵押物
                    fee:'',

                // },
                Fourth_groups:{},
                 isClose: false,
                isOpen:true,//假设默认关闭
                dailyRate:''
            }
        },
        created(){
            this.getActMaxMin_fn();
            this.maxPeople=this.activity_x.setting_participator.maxPeople;
            this.condition=this.activity_x.setting_participator.condition;
            this.needPledge=this.activity_x.setting_participator.needPledge;
            this.fee=this.activity_x.setting_participator.fee;
        },
        mounted(){
          setTimeout(()=>{
            this.$refs.comPer.focus()
          },50)
        },
        computed:{
          ...mapState(['status','activity_x','Excitation_x','token']),
            term(){//时间范围
                var endDate=this.activity_x.endDate;
                var startDate=this.activity_x.startDate;
                var allTime=endDate-startDate;
                var term=allTime/24/60/60/1000;

                if(term.toFixed(0) <= 1){
                    return 1;
                }else{
                    return term.toFixed(0)
                }
             },
             total_number(){//人数
                return this.activity_x.setting_organizer.length/1+this.activity_x.setting_participator.maxPeople/1;
             },
             Scope_of_mortgage_max(){//最多抵押
                var Scope_of_mortgage_max=this.activity_x.setting_supporter.maxPledge * this.max/1;
                return Scope_of_mortgage_max.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
             },
             Scope_of_mortgage_min(){//最少抵押
                var Scope_of_mortgage_min=this.activity_x.setting_supporter.minPledge * this.min/1;
                return Scope_of_mortgage_min.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
             },
             Scope_of_acquisition_max(){//最多获得
                console.log("最多获得",this.max)
                var Scope_of_acquisition_max1=this.activity_x.setting_supporter.maxPledge/1 * this.dailyRate/1 *this.term/1 * this.activity_x.setting_participator.maxPeople/1 * this.max/1;
                var Scope_of_acquisition_max2=Scope_of_acquisition_max1.toFixed(0)
                return Scope_of_acquisition_max2.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
             },
             Scope_of_acquisition_min(){//最少获得
                var Scope_of_acquisition_min1=this.activity_x.setting_supporter.minPledge/1 * this.dailyRate/1 * this.term/1 * this.activity_x.setting_participator.maxPeople/1 *this.min/1;
                var Scope_of_acquisition_min2 =Scope_of_acquisition_min1.toFixed(0)
                return Scope_of_acquisition_min2.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
             }
        },
        watch:{
          maxPeople(val,oldVal){
            if(val!=''&&!this.isOpen&&this.fee!=''){
              this.sta=2;
              this.disableT=false;
            }else if(val!=''){
              this.sta=2;
              this.disableT=false;
            }else{
              this.sta=1;
              this.disableT=true;
            }
          },
          // condition(val,oldVal){
          //   if(val!=''&&this.maxPeople!=''){
          //     this.sta=2;
          //     this.disableT=false;
          //   }else{
          //     this.sta=1;
          //     this.disableT=true;
          //
          //   }
          // },
          isOpen(val,oldVal){
            if(!val){
              this.disableT=true;
              this.sta=1;
              this.needPledge=true;
            }else if(val&&this.maxPeople!=''){
              this.disableT=false;
              this.sta=2;
              this.needPledge=false;
              this.fee='';

            }else{
              // alert('1')
              this.sta=1;
              this.fee='';
              this.needPledge=false;

            }
          },
          fee(val,oldVal){
            if(val!=''&&this.maxPeople!=''){
              this.sta=2;
              this.disableT=false;
            }else{
              this.disableT=true;
              this.sta=1;
            }
          }
        },
        methods:{

            ...mapMutations(['Next_step3_fn']),
             Last_step(){
                 this.$router.push({
                    path:'/next_step2',
                    query:{

                    }
                })
            },
            showToggle(){
                //实现开关切换
                console.log(this.isOpen)
                this.isClose = !this.isClose;
                this.isOpen = !this.isOpen;
                if(!this.isOpen){
                  this.needPledge=false;
                }else{
                  this.needPledge=true;
                }
            },
            getRadio(){
                // this.flag = !this.flag
                if (this.radio) {
                    this.flag = false
                }else{
                    this.flag = true
                }
            },
             Next_step(){
               this.activity_x.setting_participator.maxPeople=this.maxPeople
               this.activity_x.setting_participator.condition=this.condition;
               this.activity_x.setting_participator.needPledge=this.needPledge;
               this.activity_x.setting_participator.fee=this.fee;
                 this.Excitation_x.term=this.term;
                 this.Excitation_x.total_number=this.total_number;
                 this.Excitation_x.Scope_of_mortgage_max=this.Scope_of_mortgage_max;
                 this.Excitation_x.Scope_of_mortgage_min=this.Scope_of_mortgage_min;
                 this.Excitation_x.Scope_of_acquisition_max=this.Scope_of_acquisition_max
                 this.Excitation_x.Scope_of_acquisition_min=this.Scope_of_acquisition_min;
                    this.$router.push({
                        path:'/next_step4',
                        query:{
                            dailyRate:this.dailyRate
                        }
                    })
            },
            getActMaxMin_fn(){
                this.$http.get(config.server_url+'activity/getActMaxMin/'+this.token).then(res=>{
                     console.log(res.data)
                     this.min=res.data.data.min
                     this.max=res.data.data.max
                     this.dailyRate=res.data.data.dailyRate
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.isDe{
  color:rgba(253,180,242,1)!important;
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
.participant_con{
  width: 96%;
  margin:0 auto;
  margin-top:24px!important;
  border-radius:12px;
  box-shadow: 0px 0px 30px rgba(0,0,0,.2);
}
 .participant_numer{
    width: 100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    height: 88px;
    border-bottom: 1px solid #eee;
    background:#fff;
    padding:0 25px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    span{
        width: 40%;
        color:black;
        font-size:28px;
    }
    input{
        flex:1;
        outline: none;
        border: none;
    }
    input::-webkit-input-placeholder {
        color:#999;
    }
}
.participatant_box{
    width: 100%;
    height:420px;
    display:flex;
    flex-wrap:wrap;
    padding:0 30px;
    background:#fff;
    border-radius:12px;
    flex-direction:column;
    span{
        display:inline-block;
        padding:26px 0 24px 0;
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
.least{
    width: 100%;
    padding:10px 0 10px 10px;
      input{
          display: block;
          float: left;
          margin-left: 15px;
          width: 35px;
          height: 35px;
          margin-top: 22px;
          line-height: 80px;
          background:#fff;
      }
      span{
          font-size: 24px;
          margin-left: 20px;
          line-height: 80px;
          color:#C5C5C5;
      }
}
.requirement{
            width: 96%;
            background: white;
            border-radius:12px;
            box-shadow: 0px 0px 30px rgba(0,0,0,.2);
            margin:0 auto;
            border-bottom: 1px solid #eee;/*no*/
            height: 300px;
            line-height: 60px;
            font-size: 30px;
            padding-top:24px;
            span{
                margin-left: 25px;
                color:black;
                font-size: 28px;
            }
            p{
              width: 100%;
              height:100px;
              line-height: 105px;
              margin-top:40px;
              text-align: left;
              input{
                margin-left:70px;
                width:40%;
                  outline: none;
                  border: none;
                  height: 70px;
                  text-align: right;
                  font-size: 42px;
                  // border-bottom:1px solid #ccc;
              }
              span{
                font-size: 40px;
              }
            }

      }
.basic_footer{
    width: 100%;
    padding:52px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
        width:700px;
        box-shadow: 0px 0px 25px rgba(0,0,0,.15);
        height: 100px;
        border: none;
        outline: none;
        border-radius: 12px;
        background:white;
        color:rgba(252,52,220,1);
        font-size:30px;
    }
}
 .check_pledge{
        width: 100%;
        height: 150px;
        display:flex;
        align-items:center;
        margin-left: 15px;
        margin-left:40px;
        .open{
            width: 30px;
            height: 30px;
            border:2px solid #000;
            position:relative;
            border-radius: 50%;
            span{
                position:absolute;
                right:-18px;
                top:0px;
                line-height:40px;
                text-align:center;
                display: none;
            }
        }
        .close{
            width: 30px;
            height: 30px;
            border:2px solid #fff;
            position:relative;
            border-radius: 50%;
            background:black;
            span{
                position:absolute;
                right:-22px;
                top:-5px;
                line-height:40px;
                text-align:center;
                color:#fff;

            }
        }
        span{
            font-size:30px;
            color:#000;
            padding:0 20px;
        }
    }
</style>
