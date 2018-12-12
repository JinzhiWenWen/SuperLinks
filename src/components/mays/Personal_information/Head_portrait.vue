<template>
    <div id="Head_portrait">
         <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>个人头像</p >
            <p  class="more" @click="preservation_fn"><img src="../../../assets/img/33.png" alt=""/></p >
            <input type="file" name="" value=""  ref="file"  accept="image/*" @change="uploadChange">
        </div>
        <div class="v-simple-cropper">
          <div class="v-cropper-layer" ref="layer">
            <div class="layer-header">
              <button class="cancel" @click="cancelHandle">取消</button>
              <button class="confirm" @click="confirmHandle">确定</button>
            </div>
            <img ref="cropperImg">
          </div>
          <div class="user_pic">
            <img :src="hasPics" alt="">
          </div>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs'
import '@/assets/css/cropper.min.css'
import config from '@/common/config.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
      name:'v-simple-cropper',
         data(){
            return {
              cropper:{},
              filename:'',
              hasPics:null,
              imageUrl:null,
                // postData: {
              tokenU: 'O0Is8iUB5hiksW7DW0hCxiVconEwoFn4BTRAKMlM:8XkUpf8F8pv6nswxEP-wrcatGlM=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MjUzNzc2MDA4M30=',
                // },
            }
        },
        created(){
            // console.log(this.Personal_inf_x)
            this.Personal_inf_fn_x();
        },
        computed:{
             ...mapState(['Personal_inf_x','user','token','portrait']),
        },
        mounted(){
          this.initCro();
          // console.log(this.Personal_inf_x)
          // if(this.Personal_inf_x.user.avatar==''){
          //   this.hasPics=this.user.avatar;
          // }else{
          //   this.hasPics=this.Personal_inf_x.user.avatar;
          // }
          this.$http.get(config.server_url+'users/personal/info/'+this.token).then(res=>{
                  console.log(res)
                    this.hasPics = res.data.data.user.avatar
                })
        },
        methods:{
            ...mapActions(['preservation_fn_x','Personal_inf_fn_x']),
            // 初始化Cropper
            initCro () {
              var cropperImg = this.$refs['cropperImg']
              this.cropper = new Cropper(cropperImg, {
                aspectRatio: 1 / 1,
                dragMode: 'move',
                viewMode:1,
                guides:false,
                cropBoxMovable:false,
                minCropBoxWidth:350,
                minCropBoxHeight:350
              })
            },
            Last_step(){
                 this.$router.go(-1)
            },
            preservation_fn(){
                this.$refs['file'].click()
                // this.preservation_fn_x(this.imageUrl);
                // this.$router.go(-1)
            },
            uploadChange (e) {
                var _this=this;
                 var file = e.target.files[0]
                 this.filename = file['name']
                 var URL = window.URL || window.webkitURL
                 _this.$refs['layer'].style.display = 'block'
                 _this.cropper.replace(URL.createObjectURL(file))
               },
               cancelHandle () {  //取消裁剪
                  console.log(this)
                 this.cropper.reset()
                 this.$refs['layer'].style.display = 'none'
                 this.$refs['file'].value = ''
                },
                confirmHandle () {  //确定上传
                  var _this=this;
                  console.log(_this)
                  var cropBox = _this.cropper.getCropBoxData();
                  console.log(cropBox)
                  var cropCanvas = _this.cropper.getCroppedCanvas({
                      width: cropBox.width * 1,
                      height: cropBox.height * 1,
                      borderRdius:50
                    })
                    // console.log(cropCanvas)
                    var imgData = cropCanvas.toDataURL('image/jpeg')
                    // console.log(imgData);
                    var basePic=imgData.split(','),mime=basePic[0].match(/:(.*?);/)[1],
                    bstr=atob(basePic[1]),n=bstr.length , u8basePic=new Uint8Array(n);
                    while(n--){
                      u8basePic[n]=bstr.charCodeAt(n);
                    }
                    var files= new File([u8basePic],"123.png",{type:mime});
                    var token=this.tokenU;
                    var key=new Date().getTime();
                    this.sendPics(files,token,key)
                  },
                  sendPics(file,token,key){
                    var _this=this;
                  	// var upload = file
  	                // let form = new FormData();
  	                // form.append('file',upload);
  	              	// this.$http.post(config.base_url+'upload',form).then(res => {
  	              	// 	var imgurl = config.img_url+'/'+res.data.filename
  	              	// 	_this.imageUrl=imgurl;
  		              //   _this.$http.post(config.server_url+'users/amend/avatar/',{
  	                //       token:_this.token,
  	                //       avatar:_this.imageUrl
  	                //     }).then((res)=>{
  	                //       window.history.back();
  	                //       _this.toast({
  	                //         message:res.data.msg,
  	                //         duration:1000
  	                //       })
  	                //     })
  	              	// })
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
                        var imgPic="http://ph4v489dr.bkt.clouddn.com" + blkRet.key;
                        _this.imageUrl=imgPic;
                        _this.portrait=imgPic;
                        console.log(_this.imageUrl);
                        console.log(_this.token)
                        _this.$http.post(config.server_url+'users/amend/avatar/',{
                          token:_this.token,
                          avatar:_this.imageUrl
                        }).then((res)=>{
                          window.history.back();

                          _this.toast({
                            message:res.data.msg,
                            duration:1000
                          })
                        })

                      }else if(xhr.status!=200&&xhr.responseText){
                        _this.toast({
                          message:'上传异常',
                          duration:1000
                        })
                      }
                    };
                    xhr.send(formData);
                    console.log(file)
                  }
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl='http://pfedfy7kb.bkt.clouddn.com/'+ res.key;
            // },
            // beforeAvatarUpload(file) {
            //     const isJPG = file.type === 'image/jpeg';
            //     const isGIF = file.type === 'image/gif';
            //     const isPNG = file.type === 'image/png';
            //     const isBMP = file.type === 'image/bmp';
            //     const isLt2M = file.size / 6000 / 6000 < 6;
            //
            //     if (!isJPG && !isGIF && !isPNG && !isBMP) {
            //         this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            //     }
            //     if (!isLt2M) {
            //         this.$message.error('上传头像图片大小不能超过 2MB!');
            //     }
            //     return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
            // }
        }
    }
</script>
<style scoped lang="scss">
.basic_header{
    width: 100%;
    padding:26px 20px;
    display:flex;
    align-items:center;
    background:#fff;
    position: relative;
    img{
        width: 36px;
        height: 46px;
    }
    p{
        font-size:34px;
        color:#000;
        font-weight:bold;
        padding-left:30px;
        width: 57%;
        // background: red;
        text-align: right;
    }
    .more{
      position: absolute;
      right:20px;
      width: 100px;
      height:50px;
      img{
        width: 100%;
        height:100%;
      }
    }
    input{
      position: absolute;
      width: 100px;
      height:50px;
      background: blue;
      right:20px;
      opacity: 0;
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
      height: 70px;
      padding-top:5px!important;
      padding: 0 .2rem;
      box-sizing: border-box;
    }
    .cancel{
      line-height: .8rem;
      font-size: 28px;
      background: inherit;
      border: 0;
      outline: 0;
      float: left;
      margin-left:20px!important;
    }
    .confirm {
      line-height: .8rem;
      font-size: 28px;
      background: inherit;
      border: 0;
      outline: 0;
      float: left;
      margin-right:20px;
    }
    .confirm {
      float: right;
    }
    img {
      position: inherit!important;
      border-radius: inherit!important;
      float: inherit!important;
    }
  }
}
.user_pic{
  width: 100%;
  height:750px;
  position: absolute;
  left:0;
  top:50%;
  margin-top:-375px;
  z-index: -1;
  img{
    width: 100%;
    height:100%;
  }
}
// .item_bock {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height:94px;
//   width: 300px;
//   padding:0px 24px 0px 38px;
//   border-bottom: 1px solid #f7f7f7;
//   background: #fff;
// }
// .head_p {
//   height:132px;
// }
// .head_img{
//   height: 90px;
// }
// .head_img img{
//   width:90px;
//   height:90px;
//   border-radius:50px
// }
// .setting_right{
//   display: flex;
//   height: 37px;
//   justify-content: flex-end;
//   align-items: center;
// }
// .hiddenInput{
//   display: none;
// }
// .caption {
//   color: #8F8F8F;
//   font-size: 26px;
//   height: 37px;
// }
// .avatar-uploader .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//   }
//   .avatar-uploader .el-upload:hover {
//     border-color: #409EFF;
//   }
//   .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 220px;
//     height: 220px;
//     line-height: 220px;
//     text-align: center;
//   }
//   .avatar {
//     width: 220px;
//     height: 220px;
//     display: block;
//   }
</style>
