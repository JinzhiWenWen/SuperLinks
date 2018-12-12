<template>
    <div id="Organizer">
        <div class="basic_header">
             <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
             <p>组织者</p>
             <p></p>
         </div>
        <div class="content1">
            <div class="role">
                <p class="role_title">申请组织角色</p>
                <div>
                    <input type="text"
                    placeholder="请选择职位"
                    v-model="Apply.role"
                    @click="showPopup()" name=""
                    value=""  style="color:black;font-size:16px;margin-top:1px;"
                     >
                     <div class="positionMask"   @click="showPopup()">

                     </div>
                    <mt-popup
                      v-model="popupVisible"
                      position="bottom"
                      >
                      <mt-picker
                      :slots="slots"
                      @change="onValuesChange"
                      ></mt-picker>
                    </mt-popup>
                    <div class="popup_header" ref="popupHeader">
                      <p @click="closePopup()">取消</p>
                      <p @click="closePopup()">确认</p>
                    </div>
                </div>
                <img src="../../../assets/img/组6.png" alt="">
            </div>
            <div class="applyInfo">
                <p>| 申请说明</p>
                <textarea name="" id="" cols="30" rows="10" class="text" v-model="Apply.des">
                </textarea>
            </div>
             <div class="check_pledge" @click="showToggle">
                <div class="switchBtn" v-bind:class="{'close': isClose, 'open': isOpen}"><span class="el-icon-check"></span></div>
                <span>抵押slk</span>
            </div>
             <div class="flagBox" v-if="isClose">
                <div class="pledgeNum">
                    <p>| 抵押SLK数</p>
                    <div class="box">
                        <input type="number" placeholder="0.00 SLK" v-model="Apply.pledge">
                    </div>
                    <span>可用余额 {{available}}SLk </span>
                </div>
                <div class="write_pwd">
                    <p>输入密码</p>
                    <input placeholder="" type="password" v-model="Apply.payPwd">
                </div>
             </div>
        </div>
         <div class="basic_footer" @click="Apply_fn">
            <button >
                 申请报名
             </button>
         </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                radio:'',
                isClose: false,
                isOpen: true,//假设默认关闭
                Apply:{
                  "token":null,
                    "aid":"",
                    "uid":"",
                    "name":"",
                    "role":"",
                    "des":"",
                    "pledge":'',
                    "status":'0',
                    "payPwd":'',//支付密码
                    "serviceMoney":0,
                },
                popupVisible:false,
                slots: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot1',
                  textAlign: 'center'
                },

              ],
                positionValue:null
            }
        },
        created(){
            this.Apply.uid=this.uid;
            this.Apply.aid=this.$route.query.aid;
            this.$route.query.setting_organizer.map(val=>{
                 this.slots[0].values.push(val.role)
            })
            console.log(this.slots[0].values)
        },
        watch:{
          popupVisible(val,oldVal){
            if(!val){
              this.$refs.popupHeader.style.bottom="-60px";
            }
          }
        },
        computed:{
           ...mapState(['uid','user','token']),
           available(){
                 return this.user.slk-this.user.pledgedSlk-this.user.fronzenSlk;
             }
        },
        methods:{
             ...mapMutations(['pledgedSlk_fn']),
             showPopup(){
               this.popupVisible=true;
               this.$refs.popupHeader.style.bottom="170px";
             },
             closePopup(){
               this.popupVisible=false;
               this.$refs.popupHeader.style.bottom="-60px";
             },
             onValuesChange(picker, values) {
              if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);

              };
              this.Apply.role=values[0];
            },
            showToggle(){
                //实现开关切换
                this.isClose = !this.isClose;
                this.isOpen = !this.isOpen;
            },
            Last_step(){
                this.$router.go(-1)
            },
            Apply_fn(){
                console.log(this.isClose)
                 this.Apply.pledge=parseInt(this.Apply.pledge)
                 this.Apply.token=this.token;
                 console.log(this.Apply)
                    this.$http.post(config.server_url+'activity/enroll/organizer',this.Apply).then(res=>{
                      console.log(res)
                        if(res.data.code== 200){
                            this.pledgedSlk_fn(res.data.data.user.pledgedSlk)
                            this.toast({
                              message:'报名成功',
                              duration:1000
                            })
                            this.$router.go(-1)
                        }else{
                            this.toast({
                              message:res.data.msg,
                              duration:1000
                            })
                        }

                    })
            }
        }
    }
</script>

<style lang="scss">
.mint-popup-bottom{
  width: 100%!important;
}
.picker-item.picker-selected{
  font-size: 36px!important;
}
.picker-item{
  font-size: 36px!important;
}
#Organizer{
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
.content1{
     width: 100%;
    display:flex;
    flex-wrap:wrap;
    padding:23px 25px;
    .role{
        width: 100%;
        height: 110px;
        background:#fff;
        border-radius:12px;
        display:flex;
        padding:0 32px;
        justify-content:space-between;
        align-items:center;
        margin-bottom:22px;
        position: relative;
        .positionMask{
          position: absolute;
          background: rgba(0,0,0,0);
          width: 300px;
          height:50px;
          top:30px;
        }
        .popup_header{
          width: 100%;
          height:60px;
          position: fixed;
          bottom:-60px;
          background: white;
          left:0;
          z-index: 9999;
          border-bottom:1px solid #ccc;
          display: flex;
          transition: .3s all;
          p{
            width: 50%;
            text-align: center;
            line-height: 60px;
            color:#26a2ff;
            font-size: 30px;
          }
        }
        .role_title{
            color:#000;
            font-size:30px;
            min-width: 180px;
        }
        input{
            font-size:24px;
            border:0;
            color:#C5C5C5;
        }
        img{
            width: 19px;
            height: 31px;
        }
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
            font-size:30px;
            color:#C5C5C5;
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
    .check_pledge{
        width: 100%;
        height: 150px;
        display:flex;
        align-items:center;
        .open{
            width: 40px;
            height: 40px;
            border:1px solid #000;
            position:relative;
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
            width: 40px;
            height: 40px;
            border:1px solid #fff;
            position:relative;
            background:#b1cbfa;
            span{
                position:absolute;
                right:-18px;
                top:0px;
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
    .flagBox{
        width: 100%;
        .pledgeNum{
            width: 100%;
            background:#fff;
            height: 220px;
            border-radius:12px;
            -moz-box-shadow:2px 2px 10px #DADADA;
            -webkit-box-shadow:2px 2px 10px #DADADA;
            box-shadow:2px 2px 10px #DADADA;
            display:flex;
            flex-direction:column;
            p{
                font-size:30px;
                color:#C5C5C5;
                padding:20px 0 0 36px;
            }
            .box{
                width: 100%;
                display:flex;
                justify-content:center;
                align-items:center;
                input{
                    width: 360px;
                    padding: 0 0 18px 0;
                    border:0;
                    border-bottom:2px solid #f4f4f4;
                    font-size:40px;
                    text-align:center;
                }
                input::-webkit-input-placeholder {
                    color:#fe3263;
                }
            }
            span{
                font-size:30px;
                color:#999;
                text-align:center;
                margin-bottom:20px;
            }
        }
        .write_pwd{
            margin-top:24px;
            width: 100%;
            height: 110px;
            background:#fff;
            border-radius:12px;
            -moz-box-shadow:2px 2px 10px #DADADA;
            -webkit-box-shadow:2px 2px 10px #DADADA;
            box-shadow:2px 2px 10px #DADADA;
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:36px;
            p{
                width: 30%;
                color:#000;
                font-size:30px;
            }
            input{
                flex:1;
                border:0;
                color:#999;
            }
            input::-webkit-input-placeholder {
                color:#999;
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
}
</style>
