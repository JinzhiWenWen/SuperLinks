<template>
    <div id="WeChat">
           <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>微信</p >
            <p></p >
        </div>
    </div>
</template>

<script>
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {

            }
        },
        computed:{
          ...mapState(['uid','user'])
        },
        methods:{
            Last_step(){
                 this.$router.go(-1)
            },
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
</style>