<template>
    <div id="basic">
          <div class="basic_header">
            <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
            <p>个人简介</p >
            <p  @click="preservation_fn">保存</p >
        </div>
         <div class="basic_content">
            <textarea name="name"  placeholder="输入个人简介" class="profile_text" v-model='introT'></textarea>
                    <div class="active_posters">
                        <div class="imgs2">
                            <!-- <el-upload
                                action="https://upload-z1.qiniup.com"
                                list-type="picture-card"
                                :on-remove="handleRemove"
                                :name="file"
                                :limit="6"
                                :show-file-list="true"
                                :file-list='actiimgs'
                                :onError="uploadError"
                                :onSuccess="uploadSuccess2"
                                :data = 'postData'
                            >
                            <i class="el-icon-plus"></i>
                            </el-upload> -->
                            <!-- <el-dialog :visible.sync="dialogVisible" >
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog> -->
                            <p class="upPerPicTit">上传照片，最多6张</p>
                            <ul class="imgList">
                              <li v-for="(item,index) in subPic" :key="index">
                                <img :src="item" alt="" @click="showMove(index)" />
                                <span class="maskPicMove" v-show="isMovePer">
                                  <img src="../../../assets/img/close.png" @click="moveInPic(index)" alt="">
                                </span>
                              </li>
                              <li v-show="ifFive">
                                <input type="file" accept="image/*" @change="upPerPic" name="" value="">
                              </li>
                            </ul>
                         </div>
                     </div>
         </div>
    </div>
</template>

<script>

import eventBus from '@/assets/js/eventBus.js'
import config from '@/common/config.js'
import {timestampToTime} from '@/common/commin.js'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                    imgUrl: '',
                    imageUrl:'',
                    textValule:'',
                    introT:null,
                    dialogImageUrl: [],
                    isMovePer:false,
                    subPic:[],
                    actiimgs:[],
                    arr:[],
                    img:require('../../../assets/img/46574339c2da383.jpg'),
                    file:'file',
                    tokenU: 'O0Is8iUB5hiksW7DW0hCxiVconEwoFn4BTRAKMlM:8XkUpf8F8pv6nswxEP-wrcatGlM=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MjUzNzc2MDA4M30=',
                    ifFive:true

            }
        },
        created(){
          this.$http.get(config.server_url+'users/personal/info/'+this.token).then((res)=>{
            console.log(res)
            this.introT=res.data.data.user.intro.txt;
            this.subPic=res.data.data.user.intro.imgs;
            console.log(this.proPics);

          })
           // console.log(this.actiimgs,this.user.intro.imgs)
           // this.textValule=this.user.intro.txt;
           // this.$http.get(config.server_url+'users/personal/info/'+this.token).then((res)=>{
           //   console.log(res.data.data)
           //    res.data.data.user.intro.imgs.map((val,index)=>{
           //      this.actiimgs.push({url:val})
           //    })
           // })
           // this.user.intro.imgs.map((val,index)=>{
           //       this.actiimgs.push({url:val})
           //  });
           //console.log(this.actiimgs)
        },
         mounted(){

        },
         computed:{
            ...mapState(['status',"activity_x","user","token","proPics"])
        },
        watch:{
            textValule(val,oldVal){
            $.each($(".profile_text"), function(i, n){
                $(n).css("height", n.scrollHeight + "px");
            })
          },
          subPic(val,oldVal){
            console.log(val.length);
            if(val.length>5){
              this.ifFive=false;
            }else{
              this.ifFive=true;
            }
          }
        },
        methods:{
            moveInPic(index){
              this.subPic.splice(index,1);
              this.toast({
                message:'删除成功',
                duration:1000
              })
              console.log(this.subPic);
              this.isMovePer=false;
            },
            showMove(){
              this.isMovePer=true;
            },
            upPerPic(e){
              // console.log(e.target.files[0]);
              var file=e.target.files[0];
              var key=new Date().getTime();
              var token=this.tokenU;
              if(this.subPic.length>5){
                this.toast({
                  message:'最多上传六张',
                  duration:1000
                });
              }else{
                this.sendPerPic(file,token,key);
              }
            },
            sendPerPic(file,token,key){
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
									_this.subPic.push(imgPic);
                  _this.proPics.push(imgPic);
                  console.log(_this.proPics);
                  console.log(_this.subPic);

								}else if(xhr.status!=200&&xhr.responseText){
									_this.toast({
                    message:'上传异常',
                    duration:1000
                  })
								}
							};
							xhr.send(formData);
            },
            ...mapActions(['Personal_profile_fn_x']),
            Last_step(){//上一步
                this.$router.push({
                    path:'/Personal_information',
                    query:{
                    }
                })
            },
            preservation_fn(){
            	if(!this.introT){
            		this.toast({
                  message:'请编辑个人简介',
                  duration:1000
                })
            	}else{
                this.$http.post(config.server_url+'users/amend/intro',{
                  token:this.token,
                  intro:{
                    txt:this.introT,
                    imgs:this.subPic
                  }
                }).then((res)=>{
                  console.log(res)
                  this.toast({
                    message:'保存成功',
                    duration:1000
                  });
                  setTimeout(()=>{
                    window.history.back()
                  },500)
                })
            		// this.user.intro.txt=this.textValule;
                // 	this.Personal_profile_fn_x();
            	}

            },
            // uploadSuccess2 (response, file, fileList) {
            //     console.log(this.user)
            //     // this.user.intro.imgs.push('http://pfedfy7kb.bkt.clouddn.com/'+ response.key);//第一组
            //     // console.log('http://pfedfy7kb.bkt.clouddn.com/'+ response.key)
            //     // this.subPic.push('http://pfedfy7kb.bkt.clouddn.com/'+ response.key)
            //     console.log(this.subPic)
            // },
            // uploadError (response, file, fileList) {        // 上传错误
            //      console.log(response)
            //      console.log('上传失败，请重试！')
            // },
            // handleRemove(file, fileList) {        //文件列表移除文件时的钩子
            //      console.log(file);
            //      for (let i=0;i<this.subPic.length;i++){
            //        console.log(this.subPic.indexOf(file.response.hash))
            //      }
            //      // this.$http.post(config.server_url+'users/amend/intro',{
            //      //   token:this.token,
            //      //   intro:{
            //      //     'txt':'123'
            //      //   },
            //      //   img:file.url
            //      // }).then((res)=>{
            //      //   console.log(res)
            //      // })
            // },
            // handlePictureCardPreview(file) {     //点击文件列表中已上传的文件时的钩子
            //     this.activityImgs = file.url;
            //     this.dialogVisible = true;
            // },
        }
    }
</script>

<style lang="scss" scoped>
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
.basic_content{
  .active_posters{
    .imgs2{
      width: 100%;
      height:200px;
      .upPerPicTit{
        width: 100%;
        font-size: 28px;
        color:#999;
        padding-left:24px;
        margin-top:24px;
      }
      ul{
        width: 100%;
        height:auto;
        display: flex;
        flex-wrap: wrap;
        li{
          margin:0;
          padding: 0;
          background: white;
          width: 30%;
          height:230px;
          margin-left:20px;
          margin-top:20px;
          position: relative;
          .maskPicMove{
            background: rgba(0,0,0,.5);
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height:100%;
            img{
              width: 30px;
              height:30px;
              position: absolute;
              right:-15px;
              top:-15px;
            }
          }
          img{
            width: 100%;
            height:100%;
          }
        }
        li:last-child{
          width: 30%;
          height:230px;
          background: url('../../../assets/img/up_icon.png');
          background-size: 100% 100%;
          input{
            width: 100%;
            height:100%;
            opacity: 0;
          }
        }
      }
    }
  }
}

.el-upload-list{
    li{
        float: left!important;
    }
}
.el-upload{
    float: left;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 220px;
    line-height: 220px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
  }
  .profile_text{
      width: 100%;
      outline: none;
      border: none;

  }
  .profile_text{
      padding: 25px;
      font-size: 26px;
  }
</style>
