import Vue from 'vue'
import vuex from 'vuex'
import student_add from './stuAdd/add.js'
import config from '@/common/config.js'
//把vuex变为插件来使用（你在其他组件中才能通过this.$store）
Vue.use(vuex)
//创建vue
export default new vuex.Store({
    state:{
        status:false,
        title:'信息',
        token:'',
        audit:[],
        proPics:[],
        searchList:[],
        portrait:'',
        user:{
        },
        isLogin:0,
        uid:'',
        signPicV:'',//注册时上传的头像
        signPicList:[],//注册时上传的形象照片
        activityImg:'',//活动缩略图
        store_candy_numer:'',//糖果数
        show_candy:'',//最多可兑换slk
        num:'',
        Personal_inf_x:'',//个人信息
        actiListOne:'',//活动列表1
        avtiListTwo:'',//活动列表2
        avtiListThree:'',//活动列表3
        avtiListFour:'',//活动列表4
        activity_x:{//发起活动
            "uid":'',
            "title":"",
            "location":"",
            "address":"",
            "imgUrl":'',
            "activityImgs":[],
            "startDate":'',
            "endDate":'',
            "creator":{
                "_id":'',
                "name":"",
                "pledge":"0"
            },
            "setting_organizer":[
            //     {
            //     "role":"",
            //     "des":""
            //    }
            ],
            "setting_supporter":{
                "minPledge":'',
                "maxPledge":''
            },
            "setting_participator":{
                "maxPeople":'',
                "condition":"",
                "needPledge":'',
                "fee":''
            },
            "setting_allot":[]
        },
        pledgedSlk:'',//已抵押
        followCount:'',//点赞
        position_x:'',
        Excitation_x:{
            term:'',
            total_number:'',
            Scope_of_mortgage_max:'',
            Scope_of_mortgage_min:'',
            Scope_of_acquisition_max:'',
            Scope_of_acquisition_min:''
        }
    },
    getters:{

    },
    mutations:{
      signPicV_fn(state,opt){
        state.signPicV=opt
      },
        actiListOne_fn(state,opt){
          state.actiListOne=opt;
        },
        avtiListTwo_fn(state,opt){
          state.avtiListTwo=opt;
        },
        avtiListThree_fn(state,opt){
          state.avtiListThree=opt;
        },
        avtiListFour_fn(state,opt){
          state.avtiListFour=opt;
        },
        activityImg_fn(state,opt){
          state.activityImg = opt;
        },
        activity_x_fn(state,opt){
            state.activity_x = opt;
        },
        status_fn(state,opt){
            state.status = opt;
        },
        token_fn(state,opt){
        	state.token=opt;
        },
        audit_fn(state,opt){
        	state.audit=opt;
        },
        uid_fn(state,opt){//用户uid
            state.uid = opt;
            state.activity_x.uid=state.user._id;
            state.activity_x.creator.uid=state.user._id;
        },
        activity_x_uid(state,opt){
            state.activity_x.uid=state.user._id;
            state.activity_x.creator.uid=state.user._id;
            state.activity_x.creator.name=state.user.name;
        },
        user_fn(state,opt){//用户基本信息
            state.user = opt;
        },
        user_new_fn(state,opt){//用户基本信息
            state.user = {...state.user,...opt};
        },
        changeLogin(state,opt){
            state.isLogin = opt;
        },
        candy_fn(state,opt){
            state.store_candy_numer= opt
        },
        show_candy_fn(state,opt){
            state.show_candy= opt
        },
        num_fn(state,opt){
            console.log(state.user.getSlk)
            if(opt>0 && opt != '' && opt <= state.user.getSlk){
                state.num= opt
            }
            console.log(state.num)
        },
        pledgedSlk_fn(state,opt){//抵押数
            state.pledgedSlk = opt;
        },
        followCount_fn(state,opt){//点赞
            state.followCount = opt;
        },
        title_fn(state,opt){//保存活动头
            state.activity_x.title = opt;
        },
        address_fn(state,opt){
            state.activity_x.address = opt;
        },
        location_fn(state,opt){
            state.activity_x.location = opt;
        }
    },
    actions:{
        candy_actions(state,opt){//糖果总数
            this._vm.$http.get(config.server_url+'draw/cardList/'+state.state.token).then(res=>{
                store.commit('candy_fn', res.data.data.candyNum);
           })
        },
        show_candy_actions(state,opt){//显示兑换和最多可兑换
            this._vm.$http.get(config.server_url+'draw/change/'+state.state.token).then(res=>{
            	console.log(res,998888896)
                state.state.show_candy=res.data.data;
                state.state.user.getSlk=res.data.data.getSlk;
           })
        },
        exchange_actions(state,opt){//确认兑换
            console.log('我要兑换的slk数量=》',state.state.num)
            if(state.state.num > 0 && state.state.num != '' && state.state.num <= state.state.user.getSlk){
                    this._vm.$http.post(config.server_url+'draw/exchange',{
                        "token":state.state.token,
                        "slk":state.state.num,
                    }).then(res=>{
                        if(res.data.data){
                            state.state.user.candyNum=res.data.data.user.candyNum;
                            state.state.user.slk=res.data.data.user.slk;
                            console.log('确认兑换=》',res.data)
                            this._vm.toast({
                              message:res.data.msg,
                              duration:1000
                            })
                        }else{
                            this._vm.toast({
                              message:res.data.msg,
                              duration:1000
                            })
                        }
                    })
            }else{
                this._vm.toast({
                  message:'请输入正确的兑换数',
                  duration:1000
                })
            }

        },
        Personal_inf_fn_x(state,opt){//获取个人信息
            this._vm.$http.get(config.server_url+'users/personal/info/'+state.state.token).then(res=>{
                state.state.Personal_inf_x=res.data.data;
            })
        },
        preservation_fn_x(state,opt){//保存头像
            this._vm.$http.post(config.server_url+'users/amend/avatar/',{
                token:state.state.token,
                avatar:opt
            }).then(res=>{
                state.state.Personal_inf_x.avatar=opt
                state.state.user.avatar=opt
                this._vm.toast({
                  message:res.data.msg,
                  duration:1000
                })
            })
        },
        Nickname_fn_x(state,opt){//更换昵称

           this._vm.$http.post(config.server_url+'users/amend/name',{
                  token:state.state.token,
                  name:opt
           }).then(res=>{
                state.state.Personal_inf_x.name=opt;
                state.state.user.name= opt;
                this._vm.toast({
                  message:res.data.msg,
                  duration:1000
                })
           })
        },
        Personal_profile_fn_x(state,opt){//个人简介
            console.log(state.state.user.intro)
            this._vm.$http.post(config.server_url+'users/amend/intro',{
                token:state.state.token,
                intro:state.state.user.intro
            }).then(res=>{
                console.log(res)
                console.log(state.state.user.intro)
                this._vm.toast({
                  message:res.data.msg,
                  duration:1000
                })
            })
        },
        wallet_fn_x(state,opt){//获取钱包明细
          console.log(state.state.token)
            this._vm.$http.get(config.server_url+'users/wallet/balance/'+state.state.token).then(res=>{
                console.log(res.data.data)
                state.state.user.slk=res.data.data[0].slk;
                state.state.user.fronzenSlk=res.data.data[0].fronzenSlk;
                state.state.user.pledgedSlk=res.data.data[0].pledgedSlk;
            })


        },

    },
    modules:{
        student_add
    }

})
