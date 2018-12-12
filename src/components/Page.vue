<template>
    <div id="zhu">
        <div class="core">
            <!--<transition :name="transitionName">-->
                <router-view class="background"></router-view>  
            <!--</transition>-->     
                <Bottom class="bottom"></Bottom>
        </div>
    </div>
</template>

<script>
import Bottom from './Bottom'
export default {
            data(){
                return {
                   transitionName: 'slide-left'
                }
            },
            watch:{

            },
            methods:{
                
            },
            watch: {
                '$route' (to, from) {
                    const toDepth = to.path.split('/').length
                    const fromDepth = from.path.split('/').length
                    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
                }
            },
            created(){  


            },
            mounted(){

            },
            components:{
                Bottom
            }
    }
</script>

<style lang="scss" scoped>
#zhu {
  height: 100%;
  width: 100%;
}
.core{
  height: 100%;
  width: 100%;
   overflow-y:scroll;
}
.background{
	height: 91%;
	padding-bottom: 100px;
}
.bottom{
  height: 9%;
  width: 100%;
  background:#fafafa;
  position: fixed;
  bottom: 0;
}
</style>