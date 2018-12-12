<template>
  <div class="certification">
       <div class="basic_header">
        <img src="../../../assets/img/返回.png" alt="" @click="Last_step">
        <p>活体认证</p >
        <p></p >
        </div>
    <div class="pre_">
      <div class="list-default-img" @click.stop="addFace()">
        <img src="../../../assets/img/1453256805_YKPMuGIt.jpg" ref="face"/>
        <span class="certification_title">正面照</span>
        <input id="face" type="file" accept="image/jpeg,image/jpg,image/png" capture="user" @change="onFileChangeFace" style="display: none;">
      </div>
    </div>
    <div class="rear_">
      <div class="list-default-img" @click.stop="addCard()">
        <img src="../../../assets/img/1453256805_YKPMuGIt.jpg" ref="card"/>
        <span class="certification_title_bot">身份证正面照</span>
        <input id="card" type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChangeCard" style="display: none;">
      </div>
    </div>
   </div>

</template>
<script>
 export default {
   data() {
     return {

     }
 },
 methods: {
   Last_step(){
      this.$router.go(-1)
   },
 	fn(){
      window.history.back()
   },
   //正面照
   addFace(e) {
     var vm = this;
     $('#face').trigger('click');
     return false;
   },
   onFileChangeFace(e) {
     var files = e.target.files || e.dataTransfer.files;
     if(!files.length) return;
     this.createImageFace(files, e);
   },
   createImageFace(file,e) {
   	var _this=this;
     var reader=new FileReader();
     reader.readAsDataURL(file[0]);
     var img=new Image;
     reader.onload=function(e){
     	var width=400,
     	quality=0.1,
  		canvas=document.createElement("canvas"),
  		drawer=canvas.getContext("2d");
  		img.src=this.result;
  		img.onload=()=>{
  			canvas.width=width;
  			canvas.height=width*(img.height/img.width);
  			drawer.drawImage(img,0,0,canvas.width,canvas.height);
  			img.src=canvas.toDataURL('image/jpeg',quality);
  		};
  		console.log(img.src)
  		_this.$refs.face.src=img.src;
     }
   },
   //身份证正面照
   addCard(){
     $('#card').trigger('click');
     return false;
   },
   onFileChangeCard(e){
     var files = e.target.files || e.dataTransfer.files;
     if(!files.length) return;
     this.createImageCard(files, e);//传入文件参数
   },
   createImageCard(file,e){
     var _this=this;
      var reader=new FileReader();
      reader.readAsDataURL(file[0]);
      var img=new Image;
      reader.onload=function(e){
      	var width=400,
      	quality=0.1,
     		canvas=document.createElement("canvas"),
     		drawer=canvas.getContext("2d");
     		img.src=this.result;
     		img.onload=()=>{
     			canvas.width=width;
     			canvas.height=width*(img.height/img.width);
     			drawer.drawImage(img,0,0,canvas.width,canvas.height);
     			img.src=canvas.toDataURL('image/jpeg',quality);
     		};
     		console.log(img.src)  //处理之后的图片base64
     		_this.$refs.card.src=img.src;
      }
    }
   }
 }

</script>
<style lang="scss" scoped>
.certification{
	width:100%;
	.basic_head{
    position: relative;
    height: 80px;
    background: #eee;
    line-height: 80px;
    text-align: center;
    .arrow{
      position: absolute;
      left: 30px;
      font-size: 40px;
    }
    .head_cont{
      font-size: 38px;
    }
  }
  .pre_{
    width: 100%;
    text-align: right;
    position: relative;
    .certification_title{
      position: absolute;
      left:0;
      width: 100px;background: red;
      text-align: center;
      height:40px;
      line-height:45px;
      border-radius:5px;
      background: #5277cc;
      color:white;
      top:50%;
      margin-top:-20px;
    }
    img{
      width: 78%;
      height:500px;
    }
  }
  .rear_{
    width: 100%;
    text-align: right;
    position: relative;
    margin-top:5%;
    .certification_title_bot{
      position: absolute;
      left:0;
      width: 150px;background: red;
      text-align: center;
      height:40px;
      line-height:45px;
      border-radius:5px;
      background: #5277cc;
      color:white;
      top:50%;
      margin-top:-20px;
    }
    img{
      width: 78%;
      height:500px;
    }
  }
}
.basic_header{
    width: 100%;
    padding:26px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
    margin-bottom: 20px;
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
