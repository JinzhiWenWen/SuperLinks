<!-- 详细介绍——注册 -->
<template lang="html">
  <div class="person_intro">
    <div class="person_intro_header">
      <p>详细介绍</p>
      <img src="../assets/img/get1.png" alt="" @click="Last_step()">
    </div>
    <div class="person_intro_con">
      <textarea name="name" class="profile_text" v-model="textValule" rows="8" cols="80"

      placeholder="任何展现自己的文字都可以在这里写出来啦～"></textarea>
    </div>
    <div class="person_intro_btn">
      <button type="button" name="button" @click="saveIntroT()">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      textValule:''
    }
  },
  watch:{
      textValule(val,oldVal){
      $.each($(".profile_text"), function(i, n){
          $(n).css("height", n.scrollHeight + "px");
      })
    },
  },
  methods:{
    Last_step(){
      this.$router.go(-1);
    },
    saveIntroT(){
      alert('保存详细介绍')
    }
  }
}
</script>

<style lang="scss" scoped>
.person_intro{
  width: 100%;
  height:100%;
  .person_intro_header{
    width: 100%;
    padding:26px 20px;
    position: relative;
    p{
      width: 100%;
      text-align: center;
        font-size:34px;
        color:#000;
        font-weight:bold;
    }
    img{
      position: absolute;
      width: 36px;
      height:46px;
      top:26px;
    }
  }
  .person_intro_con{
    width: 94%;
    height: auto;
    margin:0 auto;
    background: white;
    border-radius:12px;
    min-height: 300px;
    box-shadow: 0px 0px 25px rgba(0,0,0,.15);
    padding:25px;
    textarea{
      width: 100%;
      border:0;
      outline: none;
      font-size: 28px;
    }
  }
  .person_intro_btn{
    width: 94%;
    margin:0 auto;
    margin-top:84px;
    button{
      width: 100%;
      height:100px;
      background: white;
      border-radius:12px;
      box-shadow: 0px 0px 25px rgba(0,0,0,.15);
      border:0;
      font-size: 30px;
      color:rgba(252,52,220,1);
    }
  }
}


</style>
