<template>
    <div id="place">
         <div class="basic_header">
            <img src="../../assets/img/返回.png" alt="" @click="Last_step">
            <p>地点</p >
            <p></p >
        </div>
           <div class="content">
        <div class="content_title">
        <input type="text" id="suggestId" name="address_detail" class="ipt" placeholder="地址" v-model="address_detail">
        </div>
        <div id="allmap"></div>
        </div>
        <div class="basic_footer" @click="Next_step">
        <button >保存</button>
        </div>
    </div>
</template>

<script>

import eventBus from '@/assets/js/eventBus.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                address_detail: null, //详细地址
                userlocation: {lng: "", lat: ""},
                location:{
                    lo:"",
                    la:""
                }
            }
        },
        created(){
            this.$store.state.title = '填写活动基本信息'
        },
        computed:{
           ...mapState(['status','activity_x'])
        },
        mounted(){
            this.$nextTick(() => {
                this.fn2()
            });
        },
        methods:{
            ...mapMutations(['address_fn','location_fn']),
            Last_step(){
                this.$router.push({
                    path:'/basic',
                    query:{
                    }
                })
            },
            Next_step(){
                this.$router.push({
                    path:'/basic',
                    query:{

                    }
                })
            },
             fn2(){
             	    var _this=this;
                    var th = _this
                    var map = new BMap.Map("allmap");            // 创建Map实例
            		var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            		var opts = {type: BMAP_NAVIGATION_CONTROL_PAN}
            		map.addControl(new BMap.NavigationControl(opts));
            		map.disableDragging();     //禁止拖拽
					setTimeout(function(){
					   map.enableDragging();   //两秒后开启拖拽
					}, 1000);
                    map.centerAndZoom(point,15);
                    map.enableScrollWheelZoom();
					var geoc = new BMap.Geocoder();
					map.addEventListener("click", function(e){
						map.clearOverlays();    //清除地图上所有覆盖物
					    var pt = e.point;
					    geoc.getLocation(pt, function(rs){
					        var addComp = rs.addressComponents;
					        var lat = pt.lat
					        var lng = pt.lng
					        var point = new BMap.Point(lng, lat);
						map.centerAndZoom(point, 19);
						var marker = new BMap.Marker(point);        // 创建标注
						map.addOverlay(marker);
					        var url = 'http://api.map.baidu.com/geocoder/v2/?ak=BuMSjDH81yOSPCb2Az5gmUWmdZ1mbEnL&callback=?&location=' + lat + ',' + lng + '&output=json&pois=1';
					        $.getJSON(url, function (res) {
					        	console.log(res)
					            $("#suggestId").val(res.result.sematic_description)
                                this.address_detail=res.result.sematic_description
                                _this.activity_x.address=this.address_detail //存地址
                 			    _this.activity_x.location=res.result.location;
					        });
					    });
					});
                    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                      {
                        "input" : "suggestId",
                        "location" : map
                      })
                    var myValue
                    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                      var _value = e.item.value;
                      myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                      this.address_detail = myValue
                      console.log("地点",this.address_detail)
                      _this.activity_x.address=this.address_detail //存地址
                      setPlace();
                    });
                    function setPlace(){
                    map.clearOverlays();    //清除地图上所有覆盖物
                    function myFun(){
                      th.userlocation = local.getResults().getPoi(0);    //获取第一个智能搜索的结果
                      _this.location=th.userlocation;
                      console.log("经纬度=》",_this.location)
                      console.log(_this.activity_x)
                       _this.activity_x.location=_this.location.point;
                       console.log(_this.activity_x.address,_this.activity_x.location)
                      map.centerAndZoom(th.userlocation.point, 19);
                      map.addOverlay(new BMap.Marker(th.userlocation.point));    //添加标注
                    }
                      var local = new BMap.LocalSearch(map, { //智能搜索
                      onSearchComplete: myFun
                    });
                    local.search(myValue);
                  }
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
