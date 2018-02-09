<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 15:56:22
@version 1.0.0
-->
<template>

    <div class="mine-content">
      <div class="user" v-if="userMsg">
        <img :src="userMsg.user_avtar" class="thumb">
        <div class="user-name">{{ userMsg.user_name }}</div>
      </div>
      <div class="unLogin" v-else>
        <p class="text">您还未登陆哦~</p>
        <router-link class="login-btn" to="/login">立即登陆</router-link>
      </div>
      <div class="mine-nav">
        <a href="#" class="nav-item"><i class="icon-music"></i><span>全部歌曲</span></a>
        <a href="#" class="nav-item"><i class="icon-download"></i><span>下载歌曲</span></a>
        <a href="#" class="nav-item"><i class="icon-recent"></i><span>最近播放</span></a>
        <a href="#" class="nav-item"><i class="icon-favoriate"></i><span>我喜欢</span></a>
      </div>
      <ul class="broad-cast-list">
        <li>
          <div class="media">
            <div class="media-left"><img src="../../common/image/default.png" alt=""></div>
            <div class="media-body">
              <span class="title">个性电台</span>
              <p class="recommend">来听听我为你定制的音乐吧！</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="songList">
        <div class="list-title">
          <h1>每日歌曲推荐</h1>
          <!-- <a href="#" class="self-list">自建歌单</a>
          <a href="#" class="collect-list">收藏歌单</a>
          <a href="#" class="add" ><i class="icon-add"></i></a>
          <a href="#" class="playlist"><i class="icon-list"></i></a> -->
        </div>
        <ul class="personal-list">
            <li>
                <div class="media">
                  <div class="media-left"><img src="../../common/image/default.png" alt=""></div>
                  <div class="media-body">
                    <span class="title">歌曲一</span>
                    <p class="recommend">来听听我为你定制的音乐吧！</p>
                  </div>
                </div>
            </li>
            <li>
                <div class="media">
                  <div class="media-left"><img src="../../common/image/default.png" alt=""></div>
                  <div class="media-body">
                    <span class="title">歌曲2</span>
                    <p class="recommend">来听听我为你定制的音乐吧！</p>
                  </div>
                </div>
            </li>
        </ul>
      </div>
    </div>

</template>

<script>
  export default {
    data(){
      return{
        userMsg:''
      }
    },
    created(){
       this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    }
     // watch:{
    //   userMsg:function(nweMsg,oldMsg){
    //     this.isLogin = true
    //     console.log("老的"+this.oldMsg)
    //     console.log("新的"+this.thnewMsg)
    //   }
    // },
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .media
    display:flex
    .media-left
      width:100px
      img
        width:80px
        height:60px 
    .media-body
      flex:1
      align-self:center
      .recommend
        margin-top:10px
        color:$color-text-d
        font-size :$font-size-small

  .mine-content
    font-size:$font-size-medium
    .user
      display:flex
      flex-direction:column
      align-items:center
      .thumb
        display: inline-block
        vertical-align: top
        margin: 6px 0px 10px
        width: 80px
        height: 80px
        border-radius 50%
      .user-name:before
        content:"-"
        margin-right:20px 
      .user-name:after
        content:"-"
        margin-left:20px
    .unLogin
      display:flex
      flex-direction:column
      align-items:center
      .text
        margin 20px 0
      .login-btn
        text-align center
        width 60%
        color #000
        padding 10px 20px
        border-radius 4px
        box-shadow 1px 2px 10px #b6e092
        background $color-text-l
    .mine-nav
      display:flex
      flex-flow: row wrap
      margin-top:20px    
      padding:20px 0
      background:$color-highlight-background
      .nav-item
        width:50%
        text-align:center
        color:$color-theme
        &:nth-child(3),
        &:nth-child(4)
          margin-top:20px
        .icon-music,.icon-download,.icon-recent,.icon-favoriate
          display:block
          font-size:30px
          color:$color-icon-theme
          margin-bottom:10px

    .broad-cast-list
      margin-top:5px
      background:$color-highlight-background
    .songList
      margin-top:5px 
      background:$color-highlight-background
      .list-title
        display:-webkit-flex
        height:50px
        justify-content:center
        align-items: center
        color #68de6c
        border-bottom:1px solid $color-border
      .personal-list
        li
          border-bottom:1px solid $color-border
          
          
          
          



</style>

