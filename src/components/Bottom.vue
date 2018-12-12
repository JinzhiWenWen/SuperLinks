<template>
    <div id="bottom">
            <div v-for="(item,index) in router" :key="index" @click="tab(item.font)" ref="bottom_s">
                <img :src="item.Img" alt="">
                <p :class="item.class">{{item.font}}</p>
            </div>     
            <div class="sign" v-if="showsign">
            </div>
    </div>
</template>
<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import config from '@/common/config.js'
	
    export default {
        data(){
            return {
            	showsign:false,
                   router:[
                         {
                            "router":"/home",
                            "Img":require('../assets/img/8.png'),
                            'font':'首页',
                            'class':'color1'
                         },
                        {
                            "router":"/activity",
                            "Img":require('../assets/img/9.png'),
                            'font':'活动',
                            'class':'color1'
                        },
                        {
                            "router":"/find",
                            "Img":require('../assets/img/10.png'),
                            'font':'发现',
                            'class':'color1'
                        },
                        {
                            "router":"/my",
                            "Img":require('../assets/img/11.png'),
                            'font':'我的',
                            'class':'color1'
                        }
                   ],
                   add:[
						                   
                   ],
                   arr1:[
                       require('../assets/img/4.png'),
                       require('../assets/img/5.png'),
                       require('../assets/img/6.png'),
                       require('../assets/img/7.png')
                   ],
                   arr2:[
                        require('../assets/img/8.png'),
                        require('../assets/img/9.png'),
                        require('../assets/img/10.png'),
                        require('../assets/img/11.png')
                   ]
            }
        },
        created(){
            for(var i in this.router){
                if(this.router[i].router == this.$route.path){
                    this.router[i].Img = this.arr1[i]
                    this.router[i].class = 'color2'
                }else{
                	this.router[i].class = 'color1'
                }
            }
            if(this.audit.length>0){
            	if(this.audit[0].status == 'True' || this.audit[1].status == 'True'){
					this.showsign = true
				}else{
					this.showsign = false
				}
            }
           
        },
        mounted(){
            //   this.$refs.bottom_s[0].className="active"
        },
        computed: {
			...mapState(['audit','token'])
		},
        watch:{

        },
        methods:{
            ...mapMutations(['audit_fn']),
            tab(i){
            	for(var a in this.router){
            		if(this.router[a].font == i){
            			this.router[a].class = 'color2'
            			this.router[a].Img = this.arr1[a]
            			this.$router.push({
	                        path:this.router[a].router,
	                        query:{
	                        }
	                    })
            		}else{
            			this.router[a].class = 'color1'
            			this.router[a].Img = this.arr2[a]
            		}
            	}
            	this.$http.get(config.server_url + 'activity/started_status/' + this.token).then(res => {
//          			console.log(res,9888)
						if(res.data.audit){
	                      	this.audit_fn(res.data.audit)
	                    }
						if(res.data.audit.length>0){
		            		if(this.audit[0].status == 'True' || this.audit[1].status == 'True'){
								this.showsign = true
							}else{
								this.showsign = false
							}
		            	}
				})
                    
            }
        },
        filters:{//过滤器  用法 {{>{{ num | discount}}}}
            discount : function(value){
                            if(value==0){
                            return a
                            }else if(value==1){
                            return b
                            }else if(value==2){
                            return c
                            }else if(value==3){
                            return d
                            }
                        }
        }
    }
</script>

<style lang="scss" scoped>
#bottom{
    width: 100%;
    display: flex;
    div{
        width: 25%;
        text-align: center;
        padding-top: 10px;
        img{
            width: 54px;
            height: 54px;
        }
    }
    .sign{
    	width: 16px;
    	height: 16px;
    	background: red;
    	border-radius: 13px;
    	position: absolute;
    	top: 10px;
    	right: 50px;
    }
    .color1{
    	color:#c4c4c4;
    }
    .color2{
    	color:#FF67E9;
    }
    
}

</style>