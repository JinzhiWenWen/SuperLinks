<!-- 完善个人信息 -->
<template lang="html">
  <div class="person_perfect">
    <div class="person_perfect_header">
      <p>完善个人信息</p>
    </div>
    <div class="person_perfect_con">
      <div class="person_pics" @click="upPics()">
        <span><span style="color:red;">*</span>头像</span>
        <img src="../assets/img/yhu5y.jpg" ref="userPic" class="userPic" alt="">
        <img src="../assets/img/27.png" class="arrow" alt="">
      </div>
      <div class="person_nick">
        <ul>
          <li>
            <span>昵称</span>
            <input type="text" placeholder="请输入公司名称" name="" value="">
          </li><li>
            <span>爱好</span>
            <input type="text" placeholder="如：滑雪" name="" value="">
          </li>
        </ul>
      </div>
      <p class="person_title" @click="userClick()">
        重大事件
        <span>待完善</span>
        <img src="../assets/img/27.png" alt="">
      </p>
      <p class="person_title" @click="userIntro()">
        详细介绍
        <span>待完善</span>
        <img src="../assets/img/27.png" alt="">
      </p>
      <div class="person_qr">
        <p>微信二维码</p>
        <div class="upload">
          <div v-show="isUp">
            <img src="../assets/img/up_icon.png" alt="">
            <input type="file" name="" value="" @change="upUserPic">
          </div>
          <p>
            <span>微信二维码不做公开展示</span><br>
            <span>当您发起活动时可自行选择</span><br>
            <span>是否在该活动中展示您的联系方式</span>
          </p>
          <img :src="signPicV" v-show="isPics" @click="showMove()" class="signPicT" alt="">
          <span class="moveQr" v-show="isMoveQr">
            <img src="../assets/img/close.png" @click="turnMove()" alt="">
          </span>
        </div>

      </div>
      <div class="person_pcsList">
        <p>形象照片<span style="color:#999;">（上传图片，最多6张）</span></p>
        <ul>
          <li v-for="(item,index) in signPicList">
            <img :src="item" alt="" @click="moveList(index)">
            <span class="moveList" v-show="isMList">
              <img src="../assets/img/close.png" style="left:93px;" class="moveLists" @click="moveListT(index)" alt="">
            </span>
          </li>
          <li class="upload">
            <div v-show="isUpList">
              <img src="../assets/img/up_icon.png" alt="">
              <input type="file" name="" value="" @change="upListPic">
            </div>
          </li>
        </ul>

      </div>
    </div>
    <div class="perfect_sub">
      <button type="button" name="button">完成</button>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  data(){
    return{
      signPic:'',//二维码
      isUp:true,
      isPics:false,
      tokenU:'xvNJWAUqvla_QpNs5ZPEO6ZaEbNV9e__Tqjx2Nys:WcuGknCZdut2tTQu4QK2AK9NAXw=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MTg0MDQ2NjQxOH0=',
      picList:[],  //形象
      isUpList:true,
      isMoveQr:false,
      isMList:false

    }
  },
  computed:{
    ...mapState(['portrait','token','signPicV','signPicList']),

  },
  created(){
    if(this.signPicV!=''){
      this.isUp=false;
      this.isPics=true;
    }
    if(this.signPicList.length>5){
      this.isUpList=false;
    }
  },
  watch:{
    picList(val,oldVal){
      console.log(val.length)
      if(val.length>5){
        this.isUpList=false;
      }
    }
  },
  mounted(){
    if(this.portrait!=''){
      this.$refs.userPic.src=this.portrait
    }
  },
  methods:{
    ...mapMutations(['signPicV_fn']),
    moveListT(index){
      this.picList.splice(index,1);
      this.signPicList.splice(index,1)
      this.isMList=false;
      this.toast({
        message:'删除成功',
        duration:1000
      })
    },
    moveList(index){
      this.isMList=true;
    },
    showMove(){
      this.isMoveQr=true;

    },
    turnMove(){
      this.signPic='';
      this.isUp=true;
      this.isPics=false;
      this.isMoveQr=false;
      this.signPicV_fn('');
      this.toast({
        message:'删除成功',
        duration:1000
      })
    },
    upPics(){
      // alert('上传头像')
      this.$router.push('/Head_portrait')
    },
    userClick(){
      this.$router.push('/perIntro')
    },
    userIntro(){
      this.$router.push('/perIntroT')
    },
    upUserPic(e){
      console.log(e.target.files[0]);
      let key=new Date().getTime();
      let file=e.target.files[0];
      this.sendUp(file,key);
    },
    sendUp(file,key){
      let _this=this;
      var Qiniu_UploadUrl='https://upload-z1.qiniup.com';
      var xhr=new XMLHttpRequest();
      xhr.open('POST',Qiniu_UploadUrl,true);
      var formData=new FormData();
      if(key!==null&&key!==undefined){
        formData.append('key',key)
      }
      formData.append('token',this.tokenU);
      formData.append('file',file);
      xhr.onreadystatechange=(response)=>{
        if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
          var blkRet=JSON.parse(xhr.responseText);
          var imgPic="http://ph4v489dr.bkt.clouddn.com/" + blkRet.key;
          // _this.imageUrl=imgPic;
          _this.isUp=false;
          _this.isPics=true;
          _this.signPic=imgPic;

          //存入VUEX

          _this.signPicV_fn(imgPic);

          console.log(imgPic)
        }else if(xhr.status!=200&&xhr.responseText){
          _this.toast({
            message:'上传异常',
            duration:1000
          })
        }
      };
      xhr.send(formData);
    },
    upListPic(e){
      console.log(e.target.files[0])
      let key=new Date().getTime();
      let file=e.target.files[0];
      this.sendUpList(file,key)
    },
    sendUpList(file,key){
      let _this=this;
      var Qiniu_UploadUrl='https://upload-z1.qiniup.com';
      var xhr=new XMLHttpRequest();
      xhr.open('POST',Qiniu_UploadUrl,true);
      var formData=new FormData();
      if(key!==null&&key!==undefined){
        formData.append('key',key)
      }
      formData.append('token',this.tokenU);
      formData.append('file',file);
      xhr.onreadystatechange=(response)=>{
        if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
          var blkRet=JSON.parse(xhr.responseText);
          var imgPic="http://ph4v489dr.bkt.clouddn.com/" + blkRet.key;
          // _this.imageUrl=imgPic;
          _this.picList.push(imgPic)


          //存入VUEX
          _this.signPicList.push(imgPic)



          console.log(this.picList)
        }else if(xhr.status!=200&&xhr.responseText){
          _this.toast({
            message:'上传异常',
            duration:1000
          })
        }
      };
      xhr.send(formData);
    }
  }
}
</script>

<style lang="scss">
.person_perfect{
  width: 100%;
  height:100%;
  .person_perfect_header{
    width: 100%;
    padding:26px 20px;
    p{
      width: 100%;
      text-align: center;
        font-size:34px;
        color:#000;
        font-weight:bold;
    }
  }
  .person_perfect_con{
    width: 94%;
    margin:0 auto;
    height:auto;
    .person_pics{
      width: 100%;
      height:200px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      line-height: 200px;
      padding-left:22px;
      position: relative;
      span{
        font-size: 30px;
      }
      .arrow{
        width: 30px;
        height:30px;
        position: absolute;
        right:30px;
        top:50%;
        margin-top:-15px;
      }
      .userPic{
        width: 150px;
        height:150px;
        position: absolute;
        border-radius:50%;
        right:80px;
        top:50%;
        margin-top:-75px;
      }
    }
    .person_nick{
      width: 100%;
      height:auto;
      margin-top:24px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      ul{
        width: 100%;
        li{
          width: 100%;
          height:110px;
          line-height: 110px;
          padding-left:24px;
          span{
            font-size: 28px;
          }
          input{
            width: 500px;
            margin-left: 20px;
            height:50px;
            font-size: 26px;
            border:0;
          }
          input::-webkit-input-placeholder{
            color:#ccc!important;
          }
        }
        li:nth-child(1){
          border-bottom: 1px solid #ccc;
        }
      }
    }
    .person_title{
      width: 100%;
      height:110px;
      background: white;
      border-radius:12px;
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      margin-top:24px;
      line-height: 110px;
      position: relative;
      padding-left: 24px;
      font-size: 28px;
      img{
        position: absolute;
        width: 30px;
        height:30px;
        right:30px;
        top:50%;
        margin-top:-15px;
      }
      span{
        position: absolute;
        right:80px;
        color:#999;
      }
    }
    .person_qr{
      width: 100%;
      margin-top:54px;
      p{
        padding-left: 22px;
      }
      .upload{
        width: 200px;
        height:200px;
        position: relative;
        margin-top:12px;
        margin-left: 32px;
        .moveQr{
          width: 100%;
          height:100%;
          background: rgba(0,0,0,.5);
          position: absolute;
          top:0;
          left:0;
          img{
            position: absolute;
            right:-15px;
            top:-15px;
            width: 30px;
            height:30px;
          }
        }
        .signPicT{
          width: 100%;
          height:100%;
          border-radius: 12px;
          box-shadow: 0px 0px 20px rgba(0,0,0,.15);
          position: absolute;
          top:0;
          left:0;
        }
        img{
          width: 100%;
          border-radius: 12px;
          height:100%;
          box-shadow: 0px 0px 20px rgba(0,0,0,.15);
        }
        input{
          width: 100%;
          height:100%;
          top:0;
          left:0;
          // background: red;
          opacity: 0;
          position: absolute;
        }
        p{
          position: absolute;
          top:0;
          width: 500px;
          color:#999;
          left:220px;
          font-size: 24px;
        }
      }
    }
    .person_pcsList{
      width: 100%;
      margin-top:54px;
      ul{
        height:auto;
        display: flex;
        flex-wrap: wrap;
        li{
          width: 200px;
          height:200px;
          margin-top:22px;
          position: relative;
          margin-left:32px;
          span{
            position: absolute;
            width: 100%;
            height:100%;
            background: rgba(0,0,0,.5);
            top:0;
            left:0;
            .moveLists{
              width: 30px;
              height:30px;
              position: absolute;
              right:-15px!important;
              top:-15px;
            }
          }
          img{
            position: absolute;
            top:0;
            left:0;
            border-radius: 12px;
            width: 100%;
            box-shadow: 0px 0px 20px rgba(0,0,0,.15);
            height:100%;
          }
        }
      }
      p{
        padding-left: 22px;
      }
      .upload{
        width: 200px;
        height:200px;
        position: relative;
        margin-top:22px;
        .signPicT{
          width: 100%;
          height:100%;
          border-radius: 12px;
          box-shadow: 0px 0px 20px rgba(0,0,0,.15);
          position: absolute;
          top:0;
          left:0;
        }
        img{
          width: 100%;
          border-radius: 12px;
          height:100%;
          box-shadow: 0px 0px 20px rgba(0,0,0,.15);
        }
        input{
          width: 100%;
          height:100%;
          top:0;
          left:0;
          // background: red;
          opacity: 0;
          position: absolute;
        }
        p{
          position: absolute;
          top:0;
          width: 500px;
          color:#999;
          left:220px;
          font-size: 24px;
        }
      }
    }
  }
  .perfect_sub{
    width: 94%;
    margin: 0 auto;
    margin-top:80px;
    button{
      width: 100%;
      height:100px;
      background: white;
      border-radius: 12px;
      border:0;
      color:rgba(252,52,220,1);
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      font-size: 30px;
      margin-bottom:30px;
    }
  }
}
</style>
