<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 15:56:22
@version 1.0.0
-->
<template>

    <div class="mine-content"  ref="scroll">
      <div class="user" v-if="isLogin">
        <img :src="userList.user_avtar" class="thumb">
        <div class="user-name">{{ userList.user_name }}</div>
        <div class="logout-btn" @click="logout">退出</div>
      </div>
      <div class="unLogin" v-else>
        <p class="text">您还未登陆哦~</p>
        <router-link class="login-btn" :to="{ path: '/login', query: { from: 'mine' }}">立即登陆</router-link>
      </div>
      <div class="mine-nav">
        <a href="#" class="nav-item"><i class="icon-music"></i><span>全部歌曲</span></a>
        <a href="#" class="nav-item"><i class="icon-download"></i><span>下载歌曲</span></a>
        <router-link to="/mine/recent"  class="nav-item"><i class="icon-recent"></i><span>最近播放</span></router-link>
        <router-link to="/mine/favorite" class="nav-item"><i class="icon-not-favorite"></i><span>我喜欢</span></router-link>
      </div>
      <!-- <ul class="broad-cast-list">
        <li>
          <div class="media">
            <div class="media-left"><img src="../../common/image/default.png" alt=""></div>
            <div class="media-body">
              <span class="title">个性电台</span>
              <p class="recommend">来听听我为你定制的音乐吧！</p>
            </div>
          </div>
        </li>
      </ul> -->
      <div class="songList">
        <div class="list-title">
          <h1>猜你喜欢</h1>
          <!-- <a href="#" class="self-list">自建歌单</a>
          <a href="#" class="collect-list">收藏歌单</a>
          <a href="#" class="add" ><i class="icon-add"></i></a>
          <a href="#" class="playlist"><i class="icon-list"></i></a> -->
        </div>
        <ul class="person-list"> 
          <li @click="selectSong(item,index)" class="item"  v-for="(item,index) in songList">
            <div class="icon">
              <img :src="item.image" width="60" height="60">
            </div>
            <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.singer }}·{{ item.album }}</p>
            </div>
          </li>
        </ul>
        <div class="loading-container" v-show="!songList.length">
          <loading></loading>
        </div> 
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import Loading from 'base/loading/loading'
  import {createSong} from 'common/js/song'
  import {playlistMixin} from 'common/js/mixin'
  export default {
    mixins: [playlistMixin],
    data(){
      return{
        msg:'',
        songList:[]//猜你喜欢歌曲列表
      }
    },
    computed:{
      ...mapGetters([
        'isLogin',
        'userList'
      ])
    },
    created(){
      this.msg = JSON.parse(localStorage.getItem("userMsg"))
      if(this.msg){
          this.loginMes({
            userMsg:this.msg 
        });
        this._getLike(this.msg.user_name)
      }else{
        this._getLike("null")
      }
    },
    watch:{
      isLogin(newState,oldState){
        this.$nextTick(function(){
          this.songList = ''
          if(newState && !oldState){
              this._getLike(this.userList.user_name)
          }
        })
      } 
    },
    methods:{
      logout(){
        localStorage.clear();
        this.setPlayingState(false);
        this.setIsLogin(false);
        this.$router.push({      
          path:'/login',
          query:{from:'mine'}
        })
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.scroll.style['padding-bottom'] = bottom
      },
       // 猜你喜欢点击事件
      selectSong(item,index){
        this.selectPlay({
          list:this.songList,
          index
        })
      },
      _getLike(username){
        this.$http.post('http://localhost:81/music/admin/api/recom', {name:username,isLogin:this.isLogin},{emulateJSON: true})
        .then(
            (response) => {
                this.songList = this._normalizeSongs(response.data)
                console.log(this.songList)
            },
            (error) => {
                console.log(error)
            }
        )
      },
      _normalizeSongs(list) {
          let ret = []
          list.forEach((item) => {
              if (item.song_mid && item.album_mid) {
                  ret.push(createSong(item,item.song_mid))
              }
          })
          return ret
      },
      ...mapActions([
          'selectPlay',
          'loginMes'
      ]),
      ...mapMutations({
          setIsLogin:'SET_IS_LOGIN',
          setPlayingState:'SET_PLAYING_STATE'
      }),
    },
    components:{
      Loading
    }
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
      .logout-btn
        text-align center
        margin-top 10px
        width 60%
        color #000
        padding 10px 20px
        border-radius 4px
        background $color-text-l
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
        .icon-music,.icon-download,.icon-recent,.icon-not-favorite
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
      .person-list
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 0px 20px
          border-bottom:1px solid $color-border
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
            
          
          
          



</style>

