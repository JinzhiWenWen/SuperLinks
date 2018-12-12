<template lang="html">
  <div class="uploadList">
    <div class="uploadHa">
      <p class="showUpPic">
        <ul>
          <li v-for="(item,index) in hasHpiclist" :key="index">
            <img :src="item" alt="" @click="deletePic()">
            <span class="maskTopPic" v-show="isMove">
              <img src="../../assets/img/close.png" alt="" @click="moveListPic(index)">
            </span>
          </li>
        </ul>
      </p>
      <p class="upBtnTop">
        <input type="file" name="" value=""  ref="file"  accept="image/*" @change="uploadChangeList">
      </p>
    </div>
    <div class="v-simple-cropper">
      <div class="v-cropper-layer" ref="layer">
        <div class="layer-header">
          <button class="cancelList" @click="cancelHandleList">取消</button>
          <button class="confirmList" @click="confirmHandleList">确定</button>
        </div>
        <img ref="cropperImgH">
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import '@/assets/css/cropper.min.css'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'v-simple-cropper',
  data(){
    return{
      tokenU: 'O0Is8iUB5hiksW7DW0hCxiVconEwoFn4BTRAKMlM:8XkUpf8F8pv6nswxEP-wrcatGlM=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MjUzNzc2MDA4M30=',
      Hpiclist:[],
      hasHpiclist:[],//裁剪图
      isMove:false
    }
  },
  computed: {
    ...mapState(['activity_x'])
  },
  mounted(){
    this.initCroH();
  },
  methods:{
    deletePic(){
      this.isMove=true;
    },
    moveListPic(index){
      // window.sessionStorage.clear('finFile');
      // this.isPic=false;
      // this.isUpBtn=true;
      this.toast({
        message:'已删除当前海报',
        duration:1000
      });
      // console.log(1)
      console.log(index)
      this.isMove=false
      this.hasHpiclist.splice(index,1);
      this.Hpiclist.splice(index,1);
      console.log(this.Hpiclist)
      console.log(this.hasHpiclist)
    },
    initCroH () {
      var cropperImgH = this.$refs['cropperImgH']
      this.cropper = new Cropper(cropperImgH, {
        aspectRatio: 720 / 325,
        dragMode: 'move',
        viewMode:1,
        guides:false,
        cropBoxMovable:false,
        autoCropArea:1,
        minCropBoxWidth:375,
        minCropBoxHeight:375
      })
    },
    cancelHandleList () {  //取消裁剪
     this.cropper.reset()
     this.$refs['layer'].style.display = 'none'
     this.$refs['file'].value = ''
    },
    uploadChangeList (e) {
        var _this=this;
        console.log(_this.hasHpiclist.length)
        if(_this.hasHpiclist.length>5){
          _this.$refs['layer'].style.display = 'none';
          _this.toast({
            message:'活动海报最多上传六张',
            duration:1000
          })
        }else{
          _this.$refs['layer'].style.display = 'block';
        }
         var file = e.target.files[0]
         this.filename = file['name']
         var URL = window.URL || window.webkitURL
         _this.cropper.replace(URL.createObjectURL(file))
         var m=new FileReader();
         m.readAsDataURL(file);
         m.onload=(e)=>{
           var opiPicList=e.target.result;
           window.sessionStorage.setItem('botFile',opiPicList)
         }
       },
       confirmHandleList () {  //确定上传
          var _this=this;
          var token=this.tokenU;
          var key=new Date().getTime();
          //原图处理
          var turnTopPic=window.sessionStorage.getItem('botFile');
          var turnBase=turnTopPic.split(','),mimeOri=turnBase[0].match(/:(.*?);/)[1],
          bstrOri=atob(turnBase[1]),m=bstrOri.length,u8turnTopPic=new Uint8Array(m);
          while(m--){
            u8turnTopPic[m]=bstrOri.charCodeAt(m);
          }
          var filesOri=new File([u8turnTopPic],{type:mimeOri});
          console.log(filesOri,'这是原图')

          //裁剪图处理
          var cropBox = _this.cropper.getCropBoxData();
          var cropCanvas = _this.cropper.getCroppedCanvas({
              width: cropBox.width * 1,
              height: cropBox.height * 1,
              borderRdius:50
            })
            var imgData = cropCanvas.toDataURL('image/jpeg');
            var basePic=imgData.split(','),mime=basePic[0].match(/:(.*?);/)[1],
            bstr=atob(basePic[1]),n=bstr.length , u8basePic=new Uint8Array(n);
            while(n--){
              u8basePic[n]=bstr.charCodeAt(n);
            }
            var files= new File([u8basePic], {type:mime});
            console.log(files,'这是裁剪图');
            _this.sendPicList(files,token,key);
            _this.sendPicListB(filesOri,token)
          },
          sendPicList(file,token,key){
            var Qiniu_UploadUrl='https://upload-z1.qiniup.com';
            var xhr=new XMLHttpRequest();
            var _this=this;
            xhr.open('POST',Qiniu_UploadUrl,true);
            var formData=new FormData();
            if(key!==null&&key!==undefined){
              formData.append('key',key)
            }
            formData.append('token',token);
            formData.append('file',file);
            xhr.onreadystatechange=(response)=>{
              if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
                var blkRet=JSON.parse(xhr.responseText);
                var imgPic="http://pfedfy7kb.bkt.clouddn.com/" + blkRet.key;
                console.log(imgPic)
                _this.hasHpiclist.push(imgPic);
                _this.activity_x.activityCutImgs=_this.hasHpiclist;
                console.log(_this.hasHpiclist)
              }else if(xhr.status!=200&&xhr.responseText){
                _this.toast({
                  message:'上传异常',
                  duration:1000
                })
              }
            };
            xhr.send(formData);
          },
          sendPicListB(file,token){
            var key = new Date().getTime();
            var Qiniu_UploadUrl='https://upload-z1.qiniup.com';
            var xhr=new XMLHttpRequest();
            var _this=this;
            xhr.open('POST',Qiniu_UploadUrl,true);
            var formData=new FormData();
            if(key!==null&&key!==undefined){
              formData.append('key',key)
            }
            formData.append('token',token);
            formData.append('file',file);
            xhr.onreadystatechange=(response)=>{
              if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
                var blkRet=JSON.parse(xhr.responseText);
                var imgPic="http://pfedfy7kb.bkt.clouddn.com/" + blkRet.key;
                _this.Hpiclist.push(imgPic);
                _this.activity_x.activityImgs=_this.Hpiclist;
                this.$refs['layer'].style.display = 'none';
              }else if(xhr.status!=200&&xhr.responseText){
                _this.toast({
                  message:'上传异常',
                  duration:1000
                })
              }
            };
            xhr.send(formData);
          },
  }
}
</script>

<style lang="scss" scoped>
.uploadList{
  height:620px;
  .uploadHa{
    width: 94%;
    margin:0 auto;
    height:auto;
    position: relative;
    .showUpPic{
      width: auto;
      height:200px;
      position: relative;
      ul{
        width: 100%;
        height:100%;
        display: flex;
        flex-wrap: wrap;
        li{
          width: 31%;
          margin-right:10px!important;
          height:200px;
          margin:0;
          padding:0;
          margin-bottom:30px;
          position: relative;
          img{
            width: 100%;
            height:100%;
          }
          .maskTopPic{
            width: 100%;
            height:100%;
            background: rgba(0,0,0,.5);
            position: absolute;
            top:0;
            left:0;
            img{
              width: 30px;
              height:30px;
              right:-15px;
              position: absolute;
              top:-15px;
            }
          }
        }
      }

      img{
        width: 100%;
        height:100%;
      }
    }
    .upBtnTop{
      height:200px;
      min-width: 200px;
      width:200px;
      position: relative;
      background: url('../../assets/img/up_icon.png');
      background-size: 100% 100%;
      position: absolute;
      top:460px;
      input{
        position: absolute;
        width: 100%;
        height:100%;
        top:0;
        left:0;
        opacity: 0;
      }
    }
  }
  .v-simple-cropper {
    .v-cropper-layer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      z-index: 9999;
      display: none;
      .layer-header {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background: #fff;
        width: 100%;
        height: .8rem;
        padding: 0 .2rem;
        box-sizing: border-box;
      }
      .cancelList,
      .confirmList {
        line-height: .8rem;
        font-size: .28rem;
        background: inherit;
        border: 0;
        outline: 0;
        float: left;
      }
      .confirmList {
        float: right;
      }
      img {
        position: inherit!important;
        border-radius: inherit!important;
        float: inherit!important;
      }
    }
  }
  .campaign_title {
    width: 100%;
    padding: 50px 350px 22px 60px;
    span {
      color: #999999;
      font-size: 24px;
    }
  }
}
</style>
