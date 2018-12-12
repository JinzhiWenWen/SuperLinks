<template>
    <div id="title">
         <div class="basic_header">
            <img src="../../assets/img/返回.png" alt="" @click="Last_step">
            <p>活动标题</p >
            <p></p >
        </div>
        <div class="content">
            <div class="content_title">
                <input type="text" placeholder="请输入活动标题"  v-model="title" maxlength="20">
            </div>
        </div>
        <div class="basic_footer" @click="Preservation">
            <button >保存
            </button>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import eventBus from '@/assets/js/eventBus.js'
     export default {
        data(){
            return {
                 title:'',
            }
        },
         created(){
          // this.$store.state.title = '标题'
          this.title=this.activity_x.title;

        },
        components:{

        },
        computed:{
          ...mapState(['status','activity_x'])
        },
        methods:{
            ...mapMutations(['status_fn','title_fn']),
             Last_step(){
                this.$router.go(-1)
            },
            Preservation(){//保存
                 this.title_fn(this.title)
                console.log(this.activity_x)
                 this.$router.push({
                    path:'/basic',
                    query:{
                        title:this.title
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
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
