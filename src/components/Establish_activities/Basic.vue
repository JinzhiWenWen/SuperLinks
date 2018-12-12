<template>
	<div id="basic">
		<div class="basic_header">
			<img src="../../assets/img/返回.png" alt="" @click="Last_step">
			<p>填写活动基本信息</p>
			<p></p>
		</div>
		<div class="basic_content">
			<ul>
				<li @click="go_title">
					<p><i style="color:red;">*</i>标题</p>
					<input type="text" placeholder="｜请输入活动标题" v-show="titleIfShow" name="" value="">
					<span>{{activity_x.title}}</span>
					<img src="../../assets/img/组6.png" alt="">
				</li>

				<li>
					<div class="show_list">
						<p><i style="color:red;">*</i>活动开始时间</p>
						<div class="end_cha">
							<input type="text" v-model="valueTime" placeholder="请选择时间" disabled="disabled" name="" value="">
							<mt-datetime-picker type="datetime" v-model="pickerValue" ref="pickerVisible" :startDate="startTime"></mt-datetime-picker>
							<span class="startIcon"><img src="../../assets/img/773490914107672542.png" /></span>
							<div class="startTime_mask" @click="open('pickerVisible')">

							</div>
						</div>
						<img src="../../assets/img/组6.png" alt="">
					</div>
				</li>
				<li>
					<div class="show_list">
						<p><i style="color:red;">*</i>活动结束时间</p>
						<div class="end_cha">
							<input type="text" v-model="valueTimeEnd" placeholder="请选择时间" name="" value="">
							<mt-datetime-picker type="datetime" v-model="pickerValueEnd" ref="pickerVisibleEnd" :startDate="endTime"></mt-datetime-picker>
							<span class="startIcon"><img src="../../assets/img/773490914107672542.png" /></span>
							<div class="endTime_mask" @click="openEnd('pickerVisibleEnd')">

							</div>
						</div>
						<img src="../../assets/img/组6.png" alt="">
					</div>
				</li>
				<li @click="go_address" class="add">
					<p><i style="color:red">*</i>地点</p>
					<span>{{activity_x.address}}</span>
					<input type="text" placeholder="｜请选择地点" v-show="locationIfShow" name="" value="">
					<img src="../../assets/img/组6.png" alt="">
				</li>
				<div class="publicity">
					<div class="publicity_title">
						<span><i style="color:red">*</i>宣传海报 (只可以一张)</span>
					</div>
					<div class="upload_poster">
						<div class="imgs">
							<!-- <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :show-file-list="false" :on-success="handleAvatarSuccess" :data='postData' :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload> -->
							<div class="uploadHa">
								<p class="showUpPic" v-show="isPic">
									<img :src="activity_x.imgUrl" alt="" @click="showMoveTop()">
									<span class="maskTopPic" v-show="isMove">
										<img src="../../assets/img/close.png" alt=""  @click="moveFinPic()">
								</span>
								</p>
								<p class="upBtnTop" v-show="isUpBtn">
									<input type="file" name="" value=""  ref="file"  accept="image/*" @change="uploadChange">
								</p>
							</div>
							<div class="v-simple-cropper">
			          <div class="v-cropper-layer" ref="layer">
			            <div class="layer-header">
			              <button class="cancel" @click="cancelHandleTop">取消</button>
			              <button class="confirm" @click="confirmHandleTop">确定</button>
			            </div>
			            <img ref="cropperImgH">
			          </div>
			        </div>
						</div>
					</div>
				</div>
				<div class="campaign">
					<div class="campaign_title">
						<span><i style="color:red">*</i>活动海报(最多6张)</span>
					</div>
					<div class="active_posters">
						<div class="imgs2">
							<ul>
								<li v-for="(item,index) in activity_x.activityImgs" :key="index">
									<img :src="item" alt="" @click="showMove()">
									<span v-show="ifMove">
										<img src="../../assets/img/close_icon.png" @click="moveHerePic(index)" alt="">
									</span>
								</li>
								<li v-show="ifShowUpHas">
									<input type="file" accept="image/*" name="" value="" @change="upHaB">
									<img src="../../assets/img/up_icon.png" alt="">
								</li>
							</ul>
							<!-- <UpLoad></UpLoad> -->
							<!-- <el-upload action="https://upload-z1.qiniup.com"
								list-type="picture-card"
								:on-remove="handleRemove"
								:name="file"
								:multiple='true'
								:limit="6"
								:show-file-list="true"
								:file-list='activityImgs'
								:onError="uploadError"
								:onSuccess="uploadSuccess2"
								:data='postData'>
								<i class="el-icon-plus"></i>
							</el-upload> -->
							<!-- <el-dialog :visible.sync="dialogVisible" >
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog> -->
						</div>
					</div>
				</div>
			</ul>
		<div class="basic_footer" @click="Next_step">
			<button>
                 下一步
             </button>
		</div>
		</div>
	</div>
</template>

<script>
  import Cropper from 'cropperjs'
	import '@/assets/css/cropper.min.css'
	import eventBus from '@/assets/js/eventBus.js'
	import config from "@/common/config.js"
	import { timestampToTime } from '@/common/commin.js'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import { Indicator } from 'mint-ui';
	export default {
		name:'v-simple-cropper',
		components:{
			UpLoad:resolve=>{require(['@/components/Establish_activities/uploadList'],resolve)}
		},
		data() {
			return {
				ifShowUpHas:true,
				ifMove:false,
				isLayerTop:false,
				isLayer:false,
				isMove:false,
				isUpBtn:true,
				isPic:false,
				tokenU: 'O0Is8iUB5hiksW7DW0hCxiVconEwoFn4BTRAKMlM:8XkUpf8F8pv6nswxEP-wrcatGlM=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MjUzNzc2MDA4M30=',
				titleIfShow:true,
				locationIfShow:true,
				pickerVisible: true,
				pickerValue: null,
				pickerValueEnd: null,
				picsTop:null,
				a: 2,
				imgUrl: '',
				imageUrl: '',
				dialogImageUrl: [],
				activityImgs: [],
				herePics:[],
				dialogVisible: false,
				dialogVisible1: false,
				img: require('../../assets/img/46574339c2da383.jpg'),
				time1: '',
				time2: '',
				file: 'file',
				postData: {
					token: 'O0Is8iUB5hiksW7DW0hCxiVconEwoFn4BTRAKMlM:8XkUpf8F8pv6nswxEP-wrcatGlM=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MjUzNzc2MDA4M30=',
				},
				/* start 开始时间小于今天,结束时间不能大于开始时间 */
				starttime: {
					disabledDate: time => {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				endtime: {
					disabledDate: time => {
						if(this.time2) {
							return(
								time.getTime() < Date.now() ||
								time.getTime() > new Date(this.time2).getTime()
							);
						} else {
							return time.getTime() < Date.now();
						}
					}
				},
				first_group: {},
				key: new Date().getTime(),
				startTime: new Date(),
				endTime: new Date(new Date().getTime() + 600000),
				valueTime: '',
				valueTimeEnd: '',
				num: '',
				picker: null,
				tuenUpPic:[],
				isTurn:false,
				locaBase:null
			}
		},
		// watch:{
		// 	activityImgs(val,oldVal){
		// 		alert('11')
		// 	}
		// },
		created() {
			var _this = this;
			// console.log(this.activity_x.imgUrl,123)


			this.num = this.$route.query.num;
			this.$store.state.title = '填写活动基本信息';
			if(_this.activityImg!=''){
				_this.picsTop=_this.activityImg;
				_this.isPic=true;
				_this.isUpBtn=false;
			}
			console.log(this.activity_x)
			if(this.activity_x.title!=''){
				this.titleIfShow=false;
			}else{
				this.titleIfShow=true;
			}
			if(this.activity_x.location!=''){
				this.locationIfShow=false;
			}else{
				this.locationIfShow=true;
			}
			this.activity_x.activityImgs.map((val, index) => {
				this.activityImgs.push({
					url: val
				})
			});
			if(_this.activity_x.startDate != '' || _this.activity_x.endDate != '') {
				_this.valueTime = timestampToTime(_this.activity_x.startDate)
				console.log(_this.activity_x.startDate)
				_this.valueTimeEnd = timestampToTime(_this.activity_x.endDate)
			}
			if(this.activity_x.activityImgs.length>5){
				this.ifShowUpHas=false;

			}else{
				this.ifShowUpHas=true;

			}
		},
		watch: {
			pickerValue(val, oldVal) {
				if(new Date(val).getTime() > new Date(this.endTime).getTime()) {
					this.endTime = new Date(new Date(this.pickerValue).getTime() + 600000);
					this.pickerValueEnd = new Date(new Date(this.pickerValue).getTime() + 600000)
				}
				var year = new Date(val).getFullYear();
				var month = new Date(val).getMonth() + 1;
				var day = new Date(val).getDate();
				if(day > 0 && day < 10) {
					day = '0' + day
				}
				var hour = new Date(val).getHours();
				if(hour>0&&hour<10){
					hour='0'+hour
				};
				var min = new Date(val).getMinutes();
				if(min>=0&&min<10){
					min='0'+min;
				}
				this.activity_x.startDate = new Date(val).getTime();
				this.valueTime = year + '/' + month + '/' + day + ' ' + hour + ':' + min;

			},
			pickerValueEnd(val, oldVal) {
				var year = new Date(val).getFullYear();
				var month = new Date(val).getMonth() + 1;
				var day = new Date(val).getDate();
				if(day > 0 && day < 10) {
					day = '0' + day
				}
				var hour = new Date(val).getHours();
				var min = new Date(val).getMinutes();
				if(hour>0&&hour<10){
					hour='0'+hour
				};
				if(min>=0&&min<10){
					min='0'+min
				}
				this.activity_x.endDate = new Date(val).getTime()
				this.valueTimeEnd = year + '/' + month + '/' + day + ' ' + hour + ':' + min;
			},
			getStorePics(val){
				if(val.length>5){
					this.ifShowUpHas=false;
				}else{
					this.ifShowUpHas=true;
				}
			}
		},
		mounted() {
			this.initCroH();
			console.log(this.activity_x.imgUrl,'789789')
			if(this.activity_x.imgUrl==''){
				this.isPic=false;
				this.isUpBtn=true;
			}else{
				this.isPic=true;
				this.isUpBtn=false;
			}
			// this.isShowPicsl()
		},
		computed: {
			...mapState(['activity_x', 'status','activityImg']),
			getStorePics(){
				return this.activity_x.activityImgs;
			}
		},
		methods: {
			isShowPicsl(){
				console.log(this.tuenUpPic.length)
				if(this.tuenUpPic.length>0){
					// alert('11')
					console.log('大于0')
					// this.picsTop=this.tuenUpPic[0];
				}
			},
			showMoveTop(){
				this.isMove=true;
			},
			moveFinPic(){
				// this.activityImg_fn('');
				this.activity_x.imgUrl='';
				this.isPic=false;
				this.isUpBtn=true;
				this.toast({
					message:'已删除当前海报',
					duration:1000
				});
				this.tuenUpPic=[];
				this.isMove=false;
			},
			// 初始化Cropper
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
			preservation_fn(){
					this.$refs['file'].click()
			},
			uploadChange (e) {
					// alert('1')
					var _this=this;
					 var file = e.target.files[0];
					 this.filename = file['name'];
					 var URL = window.URL || window.webkitURL
					 _this.$refs['layer'].style.display = 'block';
					 _this.cropper.replace(URL.createObjectURL(file))
					 var m=new FileReader();
					 m.readAsDataURL(file);
					 m.onload=(e)=>{
						 var opiPic=e.target.result;
						 // window.sessionStorage.setItem('topFile',opiPic)
						 this.locaBase=opiPic;
					 }
				 },
				 cancelHandleTop () {  //取消裁剪
					 // window.sessionStorage.clear('topFile')
					 this.locaBase=null;
					 this.cropper.reset()
					 this.$refs['layer'].style.display = 'none'
					 this.$refs['file'].value = ''
					},

					confirmHandleTop () {  //确定上传
						Indicator.open();
						var _this=this;
						var token=this.tokenU;
						var key=new Date().getTime();
						//原图处理
						// var turnTopPic=window.sessionStorage.getItem('topFile');
						var turnTopPic=this.locaBase;
						var turnBase=turnTopPic.split(','),mimeOri=turnBase[0].match(/:(.*?);/)[1],
						bstrOri=atob(turnBase[1]),m=bstrOri.length,u8turnTopPic=new Uint8Array(m);
						while(m--){
							u8turnTopPic[m]=bstrOri.charCodeAt(m)
						}
						var filesOri=new File([u8turnTopPic],'124.png',{type:mimeOri});
						console.log(filesOri,'这是原图')
						//裁剪图处理
						var cropBox = _this.cropper.getCropBoxData();
						var cropCanvas = _this.cropper.getCroppedCanvas({
								width: cropBox.width * 2,
								height: cropBox.height * 2,
								borderRdius:50
							})
							var imgData = cropCanvas.toDataURL('image/jpeg',1);
							var basePic=imgData.split(','),mime=basePic[0].match(/:(.*?);/)[1],
							bstr=atob(basePic[1]),n=bstr.length , u8basePic=new Uint8Array(n);
							while(n--){
								u8basePic[n]=bstr.charCodeAt(n);
							}
							var files= new File([u8basePic],'123.png',{type:mime});
							console.log(files,'这是裁剪图')
							this.sendPics(files,token,key)
							// this.sendPicsTpp(filesOri,token)
						},
						sendPics(file,token,key){ //上传裁剪图
							var _this=this;
							var upload = file
							let form = new FormData();
							form.append('file',upload);
							this.$http.post(config.base_url+'upload',form).then(res => {
								var imgurl = config.img_url+'/'+res.data.filename
								_this.imageUrl=imgurl;
								Indicator.close();
								_this.activity_x.imgUrl=_this.imageUrl;
								_this.$refs['layer'].style.display = 'none';
								_this.toast({
									message:'选择成功',
									duration:1000
								})
								_this.isPic=true;
								_this.isUpBtn=false;
							})
							// var Qiniu_UploadUrl='https://upload-z1.qiniup.com';
							// var xhr=new XMLHttpRequest();
							// var _this=this;
							// xhr.open('POST',Qiniu_UploadUrl,true);
							// var formData=new FormData();
							// if(key!==null&&key!==undefined){
							// 	formData.append('key',key)
							// }
							// formData.append('token',token);
							// formData.append('file',file);
							// xhr.onreadystatechange=(response)=>{
							// 	if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
							// 		var blkRet=JSON.parse(xhr.responseText);
							// 		var imgPic="http://pfedfy7kb.bkt.clouddn.com/" + blkRet.key;
							// 		_this.activity_x.imgUrl=imgPic;
							// 		_this.toast({
							// 			message:'选择成功',
							// 			duration:1000
							// 		});
							// 		console.log(_this.activity_x.imgUrl)
							// 		_this.$refs['layer'].style.display = 'none';
							// 		_this.isPic=true;
							// 		_this.isUpBtn=false;
							// 		Indicator.close();
							// 	}else if(xhr.status!=200&&xhr.responseText){
							// 		_this.toast({
							// 			message:'上传异常',
							// 			duration:1000
							// 		})
							// 	}
							// };
							// xhr.send(formData);
						},
						sendPicsTpp(file,token){
							var _this=this;
							var upload = file
							let form = new FormData();
							form.append('file',upload);
							this.$http.post(config.base_url+'upload',form).then(res => {
								var imgurl = config.img_url+'/'+res.data.filename
								_this.imageUrl=imgurl;
								_this.$http.post(config.server_url+'users/amend/avatar/',{
										token:_this.token,
										avatar:_this.imageUrl
									}).then((res)=>{
										Indicator.close();
										_this.$refs['layer'].style.display = 'none';
										_this.toast({
											message:res.data.msg,
											duration:1000
										})
									})
							})
							// if(this.isTurn){
								// var key=new Date().getTime();
								// var Qiniu_UploadUrl='https://upload-z1.qiniup.com';
								// var xhr=new XMLHttpRequest();
								// var _this=this;
								// xhr.open('POST',Qiniu_UploadUrl,true);
								// var formData=new FormData();
								// if(key!==null&&key!==undefined){
								// 	formData.append('key',key)
								// }
								// formData.append('token',token);
								// formData.append('file',file);
								// xhr.onreadystatechange=(response)=>{
								// 	if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
								// 		var blkRet=JSON.parse(xhr.responseText);
								// 		var imgPicOri="http://pfedfy7kb.bkt.clouddn.com/" + blkRet.key;
								// 		_this.tuenUpPic.push(imgPicOri)
								// 		_this.imgUrl=imgPicOri;
								// 		console.log(_this.imgUrl)
								// 		_this.activity_x.imgUrl.push(imgPicOri)
								// 		_this.toast({
								// 			message:'选择成功',
								// 			duration:1000
								// 		});
								//
								// 		_this.$refs['layer'].style.display = 'none';
								// 		// _this.picsTop=_this.tuenUpPic[0];
								//
								// 		_this.isPic=true;
								// 		_this.isUpBtn=false;
								// 		console.log(_this.picsTop);
								// 		// _this.activityImg_fn(_this.tuenUpPic[0])
								// 		Indicator.close();
								// 	}else if(xhr.status!=200&&xhr.responseText){
								// 		_this.toast({
								// 			message:'上传异常',
								// 			duration:1000
								// 		})
								// 	}
								// };
								// xhr.send(formData);
								// console.log(_this.tuenUpPic);
								_this.activity_x.imgUrl=this.tuenUpPic;
								console.log(_this.activity_x.imgUrl,'45465')
								_this.isShowPicsl();
								// console.log(_this.tuenUpPic.length)
							// }
						},
			...mapMutations(['basic_fn', 'activity_x_uid','activityImg_fn']),
			open(pickerVisible) {
				this.$refs[pickerVisible].open();
				var firstTime = new Date();
				if(new Date(this.pickerValue).getTime() > new Date().getTime()) {
					var firstTime = new Date(this.pickerValue)
				} else if(this.activity_x.startDate == '') {
					this.activity_x.startDate = firstTime;
				}
				var year = firstTime.getFullYear();
				var month = firstTime.getMonth() + 1;
				var day = firstTime.getDate();
				var hour = firstTime.getHours();
				var min = firstTime.getMinutes();
				if(day > 0 && day < 9) {
					day = '0' + day
				}
				if(hour>0&&hour<10){
					hour='0'+hour
				};
				if(min>=0&&min<10){
					min='0'+min
				}
                this.activity_x.startDate=firstTime.getTime()
				this.valueTime = year + '/' + month + '/' + day + ' ' + hour + ':' + min;
			},
			openEnd(pickerVisibleEnd) {
				if(this.pickerValue != null) {
					this.endTime = new Date(new Date(this.pickerValue).getTime() + 600000);
				} else if(this.activity_x.endDate == '') {
					this.activity_x.endDate = this.endTime;
				}
				this.$refs[pickerVisibleEnd].open();
				var firstTime = new Date(this.endTime.getTime());
				var year = firstTime.getFullYear();
				var month = firstTime.getMonth() + 1;
				var day = firstTime.getDate();
				var hour = firstTime.getHours();
				var min = firstTime.getMinutes();
				if(day > 0 && day < 9) {
					day = '0' + day
				}
				if(hour>0&&hour<10){
					hour='0'+hour
				};
				if(min>=0&&min<10){
					min='0'+min
				}
				this.activity_x.endDate=firstTime.getTime()
				this.valueTimeEnd = year + '/' + month + '/' + day + ' ' + hour + ':' + min;
			},
			Reply_fn() {
				this.first_group = {
					title: '',
					location: {},
					address: '',
					activityImgs: [],
				}
			},
			Last_step() { //上一步
				window.sessionStorage.clear()
				this.$router.push({
					path: '/activity',
					query: {}
				})
			},
			go_title() {
				this.$router.push({
					path: '/title',
					query: {}
				})
			},
			go_address() {
				this.$router.push({
					path: '/address',
					query: {}
				})
			},
			Next_step() { //下一步
				this.activity_x_uid();
				console.log(this.activity_x.imgUrl);
				if(this.activity_x.title == ''){
					this.toast({
						message:'请输入活动标题',
						duration:1000
					})
				}else if(this.activity_x.startDate == ''){
					this.toast({
						message:'请输入活动开始时间',
						duration:1000
					})
				}else if(this.activity_x.endDate==''){
					this.toast({
						message:'请输入活动结束时间',
						duration:1000
					})
				}else if(this.activity_x.address==''){
					this.toast({
						message:'请选择活动地址',
						duration:1000
					})
				}else if(this.activity_x.imgUrl.length==''){
					this.toast({
						message:'请上传宣传海报',
						duration:1000
					})
				}else if(this.activity_x.activityImgs.length <1){
					this.toast({
						message:'请上传至少一张活动海报',
						duration:1000
					})
				}else{
					this.$router.push({
              path:'/next_step2',
              query:{
            }
          })
				}
				// if(this.activity_x.title == '' || this.activity_x.startDate == '' || this.activity_x.endDate == '' || this.activity_x.address == '' || this.activity_x.location == '' ||
				// 	this.activity_x.imgUrl.length != 2 || this.activity_x.activityImgs =='') {
				// 	this.toast('活动信息不完整')
				// } else {

				// }
			},
			upHaB(e){
				var file=e.target.files[0];
				var key=new Date().getTime();
				var token="O0Is8iUB5hiksW7DW0hCxiVconEwoFn4BTRAKMlM:8XkUpf8F8pv6nswxEP-wrcatGlM=:eyJzY29wZSI6InN1cGVybGlua3MiLCJkZWFkbGluZSI6MjUzNzc2MDA4M30=";
				if(this.herePics.length>5){
					this.toast({
						message:'最多上传六张',
						duration:1000
					});
				}else{
					this.sendHerePics(file,token,key)
				}
			},
			sendHerePics(file,token,key){
				var _this=this;
				var upload = file
				let form = new FormData();
				form.append('file',upload);
				this.$http.post(config.base_url+'upload',form).then(res => {
					var imgurl = config.img_url+'/'+res.data.filename
					_this.activity_x.activityImgs.push(imgurl);
				})
				// var xhr=new XMLHttpRequest();
				// var _this=this;
				// var Qiniu_UploadUrl='https://upload-z1.qiniup.com'
				// xhr.open('POST',Qiniu_UploadUrl,true);
				// var formData=new FormData();
				// if(key!==null||key!==undefined){
				// 	formData.append('key',key)
				// };
				// formData.append('token',token);
				// formData.append('file',file);
				// xhr.onreadystatechange=(res)=>{
				// 	if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=''){
				// 		var blkRet=JSON.parse(xhr.responseText);
				// 		var imgPic="http://pfedfy7kb.bkt.clouddn.com/"+blkRet.key;
				// 		_this.activity_x.activityImgs.push(imgPic);
				// 		console.log(_this.activity_x.activityImgs)
				// 	}else if(xhr.status!=200&&xhr.responseText){
				// 		_this.toast({
				// 			message:'上传错误',
				// 			duration:1000
				// 		})
				// 	}
				// };
				// xhr.send(formData);
			},
			moveHerePic(index){
				this.activity_x.activityImgs.splice(index,1);
				this.toast({
					message:'删除当前海报成功',
					duration:1000
				});
				this.ifMove=false;
			},
			showMove(){
				this.ifMove=true;
			}
			// handleAvatarSuccess(res, file) {//上传一张图片
			// 	this.imageUrl = 'http://pfedfy7kb.bkt.clouddn.com/' + res.key;
			// 	this.activity_x.imgUrl = 'http://pfedfy7kb.bkt.clouddn.com/' + res.key;
			//
			// },
			// uploadSuccess2(response, file, fileList) {//上传多张图片
			// 	this.activity_x.activityImgs.push('http://pfedfy7kb.bkt.clouddn.com/' + response.key); //第一组
			// 	if(this.activity_x.activityImgs.length>6){
			// 		alert('111');
			// 	}
			// },
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isGIF = file.type === 'image/gif';
			// 	const isPNG = file.type === 'image/png';
			// 	const isBMP = file.type === 'image/bmp';
			// 	const isLt8M = file.size / 6000 / 6000 < 8;
			//
			// 	if(!isJPG && !isGIF && !isPNG && !isBMP) {
			// 		this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
			// 	}
			// 	if(!isLt8M) {
			// 		this.$message.error('上传头像图片大小不能超过 8MB!');
			// 	}
			// 	return(isJPG || isBMP || isGIF || isPNG) && isLt8M;
			// },
			// uploadError(response, file, fileList) { // 上传错误
			// 	console.log(response)
			// 	console.log('上传失败，请重试！')
			// },
			// handleRemove(file, fileList) { //文件列表移除文件时的钩子
			// 	console.log(file, fileList);
			// },
			// handlePictureCardPreview(file) { //点击文件列表中已上传的文件时的钩子
			// 	this.activityImgs = file.url;
			// 	this.dialogVisible = true;
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.basic_header {
		width: 100%;
		position: fixed;
		top: 0;
		padding: 26px 20px;
		display: flex;
		z-index: 1;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		img {
			width: 36px;
			height: 46px;
		}
		p {
			font-size: 34px;
			color: #000;
			font-weight: bold;
		}
	}

	.basic_content {
		position: absolute;
		top: 100px;
		width: 100%;
		padding: 0 25px;
		ul {
			li:nth-child(1){
				position: relative;
				input{
					border:0;
					position: absolute;
					left:41%;
					font-size: 27px;
				}

			}
			li:nth-child(4){
				position: relative;
				input{
					border:0;
					position: absolute;
					left:41%;
					font-size: 27px;
				}
			}
			li {
				width: 100%;
				height: 110px;
				margin-top: 23px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 32px;
				background: #fff;
				border-radius: 12px;
				-moz-box-shadow: 2px 2px 10px #D8D8D8;
				-webkit-box-shadow: 2px 2px 10px #D8D8D8;
				box-shadow: 2px 2px 10px #D8D8D8;
				span {
					font-size: 30px;
					width: 300px;
					padding-left: 70px;
					color: #515151;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p {
					font-size: 32px;
					color: #000;
				}
				img {
					width: 19px;
					height: 31px;
				}
				.show_list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.Notes {
					position: absolute;
					right: 20px;
					bottom: 20px;
					color: rgb(196, 67, 67);
				}
				img {
					width: 19px;
					height: 31px;
				}
				.show_list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.end_cha {
						width: 51%;
						height: 100%;
						position: relative;
						// background: red;
						.startTime_mask {
							width: 350px;
							height: 50px;
							position: absolute;
							left: 0;
							top: 0;
							background: rgba(0, 0, 0, 0);
						}
						.endTime_mask {
							width: 350px;
							height: 50px;
							position: absolute;
							left: 0;
							top: 0;
							background: rgba(0, 0, 0, 0);
						}
						input {
							height: 50px;
							border: 0;
							width: 350px;
							font-size: 28px;
							padding-left: 40px;
							color: #606266;
							margin-left: 20px;
						}
						.startIcon {
							position: absolute;
							top: 6%;
							left: -20%;
							img {
								width: 46px;
								height: 46px;
							}
						}
					}
				}
			}
			.publicity{
				.uploadHa{
					width: 94%;
					margin:0 auto;
					height:auto;
					display: flex;
					flex-wrap: wrap;
					.showUpPic{
						width: 200px;
						height:200px;
						position: relative;
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
						img{
							width: 100%;
							height:100%;
						}
					}
					.upBtnTop{
						height:200px;
						width: 200px;
						position: relative;
						background: url('../../assets/img/up_icon.png');
						background-size: 100% 100%;
						box-shadow: 2px 0px 8px rgba(0,0,0,.15);
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
				    z-index: 1;
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
							margin-left:25px!important;
				    }
				    .confirm {
				      line-height: .8rem;
							font-size: 28px;
				      background: inherit;
				      border: 0;
				      outline: 0;
				      float: left;
							margin-right:25px!important;
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
			}
				.publicity_title {
					width: 100%;
					padding: 50px 350px 22px 60px;
					span {
						color: #999999;
						font-size: 24px;
					}
				}
			}
			.campaign{
				.campaign_title {
					width: 100%;
					padding: 50px 350px 22px 60px;
					span {
						color: #999999;
						font-size: 24px;
					}
				}
				.imgs2{
					width: 100%;
					height:auto;
					// background: white;
					padding-left:24px;
					padding-top:16px;
					ul{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						li{
							margin: 0;
							padding:0;
							width: 200px;
							height:200px;
							margin-right:24px;
							margin-bottom:24px;
							position: relative;
							img{
								width: 100%;
								height:100%;
							}
							span{
								position: absolute;
								width: 100%;
								height:100%;
								background: rgba(0,0,0,.5);
								top:0;
								left:0;
								img{
									position: absolute;
									width: 30px;
									height:30px;
									top:0;
									right:0;
								}
							}
						}
						li:last-child{
							width: 200px;
							height:200px;
							position: relative;
							input{
								position: absolute;
								width: 100%;
								height:100%;
								top:0;
								left:0;
								opacity: 0;
							}
							img{
								width: 100%;
								height:100%;
							}
						}
					}
				}
			}

	}

	.basic_footer {
		width: 100%;
		padding: 52px 20px 20px 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			width: 700px;
			height: 100px;
			box-shadow: 0px 0px 25px rgba(0,0,0,.15);
			border: none;
			outline: none;
			border-radius: 12px;
			background: white;
			color: rgba(252,52,220,1);
			font-size: 30px;
		}
	}

	.el-upload-list {
		li {
			float: left!important;
		}
	}

	.el-upload {
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
</style>
