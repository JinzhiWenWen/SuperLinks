<!-- 个人认证 -->
<template lang="html">
  <div class="person_cerit">
    <div class="person_cerit_header">
      <p>个人认证</p>
    </div>
    <div class="person_cerit_con">
      <ul>
        <li>
          <span><span style="color:red;">*</span>公司名称</span>
          <input type="text" placeholder="请输入公司名称" v-model="company" name="" value="">
        </li>
        <li>
          <span><span style="color:red;">*</span>担任职位</span>
          <input type="text" name="" value="" v-model="position" placeholder="如：CEO">
        </li>
        <li>
          <span><span style="color:red;">*</span>所属行业</span>
          <input type="text" name="" value="" v-model="industry" placeholder="如：区块链">
        </li>
        <li style="paddingLeft:5px;">
          <span>社会职务</span>
          <input type="text" name="" value="" v-model="position_y" placeholder="如：企业会第四期班长">
        </li>
        <li style="paddingLeft:5px;">
          <span>其他Title</span>
          <input type="text" name="" value=""  v-model="title" placeholder="若有请填写出上述信息外的其他Title">
        </li>
      </ul>
    </div>
    <div class="subBtn">
      <button type="button"
      :class="{isisTurnMesS:color==1}" name="button"
      :disabled="isTurnMes"
      @click="subPerMes()"
      >确认</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      company:'',
      position:'',
      industry:'',
      position_y:'',
      title:'',
      isTurnMes:true,
      color:1
    }
  },
  watch:{
    company(val,oldVal){
      if(val!=''&&this.position!=''&&this.industry!=''){
        this.color=2;
        this.isTurnMes=false;
      }else{
        this.color=1;
        this.isTurnMes=true;
      }
    },
    position(val,oldVal){
      if(val!=''&&this.company!=''&&this.industry!=''){
        this.color=2;
        this.isTurnMes=false;
      }else{
        this.color=1;
        this.isTurnMes=true;
      }
    },
    industry(val,oldVal){
      if(val!=''&&this.company!=''&&this.position!=''){
        this.color=2;
        this.isTurnMes=false;
      }else{
        this.color=1;
        this.isTurnMes=true;
      }
    }
  },
  methods:{
    subPerMes(){
      // this.$http.post().then((res)=>{
      //   console.log(res)
      // })
      this.$router.push('/personPer')
    }
  }
}
</script>

<style lang="scss" scoped>
.isisTurnMesS{
  color:rgba(253,180,242,1)!important;
}
.person_cerit{
  width: 100%;
  height:100%;
  .person_cerit_header{
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
  .person_cerit_con{
    width: 94%;
    margin:0 auto;
    height:auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 0px 25px rgba(0,0,0,.15);
    ul{
      width: 100%;
      height:auto;
      li{
        width: 100%;
        height:100px;
        border-bottom:1px solid #eee;
        line-height: 100px;
        margin-left: 10px;
        span{
          font-size: 28px;
        }
        input{
          margin-left: 20px;
          height:50px;
          border:0;
          outline: none;
          font-size: 28px;
        }
        input::-webkit-input-placeholder{
          color:#ccc!important;
        }
      }
      li:last-child{
        border:0;
      }
    }
  }
  .subBtn{
    width: 94%;
    margin :0 auto;
    margin-top:160px;
    button {
      width: 100%;
      height:90px;
      background: white;
      color:rgba(252,52,220,1);
      border:0;
      border-radius:12px;
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      font-size: 28px;
    }
  }
}
</style>
