import Vue from 'vue'
import xx from '../store/index'

import Router from 'vue-router'
import Page from '@/components/Page'
import Bottom from '@/components/Bottom'
import Home from '@/components/Home'
import Activity from '@/components/Activity'
import Wallet_pwd from '@/components/Wallet_pwd'
import Find from '@/components/Find'
import My from '@/components/My'
import Basic from '@/components/Establish_activities/Basic'
import Address from '@/components/Establish_activities/Address'
import Title from '@/components/Establish_activities/Title'
import Next_step from '@/components/Establish_activities/Next_step'
import Next_step2 from '@/components/Establish_activities/Next_step2'
import Next_step3 from '@/components/Establish_activities/Next_step3'
import Next_step4 from '@/components/Establish_activities/Next_step4'
import Search from '@/components/activity_search/Search'
import Sign_up from '@/components/sign_up/Sign_up'
import Share_sign_up from '@/components/sign_up/Share_sign_up'
import More_people from '@/components/sign_up/More_people'
import Sign_address from '@/components/sign_up/Sign_address'
import Map from '@/components/sign_up/Map'
import Evaluate from '@/components/sign_up/Evaluate'
import Organizer from '@/components/sign_up/sign_up_duty/Organizer'
import Supporter from '@/components/sign_up/sign_up_duty/Supporter'
import Participant from '@/components/sign_up/sign_up_duty/Participant'
import Initiator from '@/components/sign_up/sign_up_duty/Initiator'
import Super_player from '@/components/finds/Super_player'
import Schedule from '@/components/finds/Schedule'
import Attribute from '@/components/mays/Personal_information/Attribute'
import Card from '@/components/mays/Personal_information/Card'
import Share_card from '@/components/mays/Personal_information/Share_card'
import Head_portrait from '@/components/mays/Personal_information/Head_portrait'
import Nickname from '@/components/mays/Personal_information/Nickname'
import Personal_information from '@/components/mays/Personal_information/Personal_information'
import Personal_profile from '@/components/mays/Personal_information/Personal_profile'
import My_activities from '@/components/mays/my_activities/My_activities'
import Set_up from '@/components/mays/Set_up/Set_up'
import Wallet from '@/components/mays/wallet/Wallet'
import Warn from '@/components/mays/wallet/Warn'
import Recharge from '@/components/mays/wallet/Recharge'
import Modify from '@/components/mays/wallet/Modify'
import Email from '@/components/mays/Set_up/Email'
import ID from '@/components/mays/Set_up/ID'
import camera from '@/components/mays/Set_up/camera'
import Living_thing from '@/components/mays/Set_up/Living_thing'
import Phone from '@/components/mays/Set_up/Phone'
import QQ from '@/components/mays/Set_up/QQ'
import WeChat from '@/components/mays/Set_up/WeChat'
import Detailed from '@/components/home/Detailed'
import Exchange from '@/components/home/Exchange'
import Strategy from '@/components/home/Strategy'
import Register from '@/components/Register'
import Player_details from '@/components/finds/Player_details'
import Mortgage from '@/components/mays/my_activities/Mortgage'
import Registration_information from '@/components/mays/my_activities/Registration_information'
import Toexamine from '@/components/mays/my_activities/Toexamine'
import Wallet_Detailed from '@/components/mays/wallet/Detailed'
import SupBot from '@/components/sign_up/sign_up_duty/supBot'
import Certi from '@/components/certification'
import PersonCerti from '@/components/person_certi'
import PersonPer from '@/components/person_perfect'
import PerIntro from '@/components/person_intro'
import PerIntroT from '@/components/person_introT'
// import {setStore,getStore} from '@/utill'
Vue.use(Router)



 const router= new Router({
  routes:[
      {
        path:'*',
        redirect:'/',
        component:resolve=>{require(['@/components/Page'],resolve)}
      },
      {
        path:'/',
        component:Register,
      },
      {
        path:'/zhu',
        name: 'zhu',
        component:Page,
        redirect:'/home',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
        children:[
            {
              path:'/home',
              component:Home
            },
            {
              path:'/activity',
              component:Activity,
            },
            {
              path:'/find',
              component:Find,
              children:[

              ]
            },
            {
              path:'/my',
              component:My
            },
        ]
      },
     {
      path:'/basic',
      component:Basic,
    },
    {
      path:'/address',
      component:Address,
    },
    {
      path:'/title',
      component:Title,
    },
    {
      path:'/next_step',
      component:Next_step,
    },
    {
      path:'/next_step2',
      component:Next_step2,
    },
    {
      path:'/next_step3',
      component:Next_step3,
    },
    {
      path:'/next_step4',
      component:Next_step4,
    },
    {
      path:'/search',
      component:Search,
    },
    {
      path:'/sign_up',
      component:Sign_up,
    },
    {
      path:'/share_sign_up',
      component:Share_sign_up,
    },
    {
      path:'/more_people',
      component:More_people
    },
    {
      path:'/map',
      component:Map,
    },
    {
      path:'/evaluate',
      component:Evaluate,
    },
    {
      path:'/organizer',
      component:Organizer,
    },
    {
      path:'/Initiator',
      component:Initiator,
    },
    {
      path:'/supporter',
      component:Supporter,
    },
    {
      path:'/participant',
      component:Participant,
    },
    {
      path:'/find/super_player',
      component:Super_player
    },
    {
      path:'/find/schedule',
      component:Schedule
    },
    {
      path:'/attribute',
      component:Attribute
    },
    {
      path:'/card',
      component:Card
    },
    {
      path:'/share_card',
      component:Share_card
    },
    {
      path:'/Head_portrait',
      component:Head_portrait
    },
    {
      path:'/Nickname',
      component:Nickname
    },
    {
      path:'/Personal_information',
      component:Personal_information
    },
    {
      path:'/Personal_profile',
      component:Personal_profile
    },
    {
      path:'/Wallet',
      component:Wallet
    },
    {
      path:'/My_activities',
      component:My_activities
    },
    {
      path:'/Set_up',
      component:Set_up
    },
    {
      path:'/Warn',
      component:Warn
    },
    {
      path:'/Recharge',
      component:Recharge
    },
    {
      path:'/Modify',
      component:Modify
    },
    {
      path:'/Email',
      component:Email
    },
    {
      path:'/ID',
      component:ID
    },
    {
      path:'/Living_thing',
      component:Living_thing
    },
    {
      path:'/Phone',
      component:Phone
    },
    {
      path:'/QQ',
      component:QQ
    },
    {
      path:'/WeChat',
      component:WeChat
    },
    {
      path:'/Strategy',
      component:Strategy
    },
    {
      path:'/Exchange',
      component:Exchange
    },
    {
      path:'/Detailed',
      component:Detailed
    },
    {
      path:'/Player_details',
      component:Player_details
    },
    {
      path:'/Mortgage',
      component:Mortgage
    },
    {
      path:'/Registration_information',
      component:Registration_information
    },
    {
      path:'/Toexamine',
      component:Toexamine
    },
    {
      path:'/Wallet_Detailed',
      component:Wallet_Detailed
    },
    {
      path:'/camera',
      component:camera
    },
    {
      path:'/Wallet_pwd',
      component:Wallet_pwd
    },
    {
      path:'/Sign_address',
      component:Sign_address
    },
    {
      path:'/supBot',
      component:SupBot
    },
    {
      path:'/certi',
      component:Certi
    },
    {
      path:'/personCerti',
      component:PersonCerti
    },
    {
      path:'/personPer',
      component:PersonPer
    },
    {
      path:'/perIntro',
      component:PerIntro
    },
    {
      path:'/perIntroT',
      component:PerIntroT
    }
  ]
})



export default router
