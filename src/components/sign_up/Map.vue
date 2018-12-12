<template>
    <div id="map">
        <div class="basic_head">
                <div class="arrow" @click="fn">&laquo;</div>
                <div class="head_cont">
                    签到地图
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created(){
        this.fn2();
        },
        methods:{
            fn(){
                 this.$router.go(-1)
            },
            fn2(){
                if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                function (position) {  
                var longitude = position.coords.longitude;  
                var latitude = position.coords.latitude;  
                console.log(longitude)
                console.log(latitude)
                },
                function (e) {
                var msg = e.code;
                var dd = e.message;
                console.log(msg)
                console.log(dd)
                }
                ) 
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.basic_head{
    position: relative;
    height: 80px;
    background: #eee;
    line-height: 80px;
    text-align: center;
    .arrow{
        position: absolute;
        left: 30px;
        font-size: 40px;
    }
    .head_cont{
        font-size: 38px;
    }
}
</style>