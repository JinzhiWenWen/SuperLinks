<template>
    <div id="place">
         <div class="basic_header">
            <img src="../../assets/img/返回.png" alt="" @click="Last_step">
            <p>地点</p >
            <p></p >
        </div>
           <div class="content">
        <div class="content_title">
        <!-- <input type="text" id="suggestId" name="address_detail" class="ipt" placeholder="地址" v-model="address_detail" value="不不不"> -->
        <input type="text" name="" id="" v-model="address_detail">
        </div>
        <div id="allmap"></div>
        </div>
    </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                address_detail: '', //详细地址
                userlocation: {lng: "", lat: ""},
            }
        },
        created(){
            this.address_detail = this.$route.query.address;
            this.userlocation = this.$route.query.location;
            console.log(this.address_detail)
        },
        computed:{
           ...mapState(['status'])
        },
        mounted(){
            this.$nextTick(() => {
                this.fn2()
            });
        },
        methods:{
            ...mapMutations(['address_fn','location_fn']),
            Last_step(){
                this.$router.go(-1)
            },
             fn2(){
                      var _this=this;
                    var th = _this
                    var map = new BMap.Map("allmap");            // 创建Map实例
                    var point = new BMap.Point(_this.userlocation.lng, _this.userlocation.lat); // 创建点坐标
                    map.centerAndZoom(point,17);
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
        .content_title{
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
            input{
                width: 100%;
                height: 100%;
                font-size:30px;
                border:0;
                color:#000;
            }
            input::-webkit-input-placeholder {
                color:#000;
            }
        }
        #allmap{
            width: 100%;
            height:600px;
            font-family: "微软雅黑";
            border:1px solid #fff;
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
</style>
