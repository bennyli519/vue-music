<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 16:00:20
@version 1.0.0
-->
<template>
  <div class="music" ref="music">
     <div ref="scroll" class="music-content">
          <div>
              <!-- 轮播 -->
              <div v-if="recommends.length" class="slider-wrapper">
                  <slider>
                    <div v-for="item in recommends">
                      <a :href="item.linkUrl">
                        <img :src="item.picUrl">
                      </a>
                    </div>
                  </slider>
              </div>

              <!-- 音乐坊导航栏 -->
              <div class="music-nav">
                  <router-link to="/music/singer" class="nav-item" >
                    <i class="icon-singer"></i>歌手
                  </router-link>
                  <router-link to="/music/rank" class="nav-item" >
                    <i class="icon-rank"></i>排行
                  </router-link>
                  <router-link to="/music/type" class="nav-item" >
                    <i class="icon-type"></i>分类
                  </router-link>
                    <router-link to="/music/cast" class="nav-item" >
                    <i class="icon-broadcast"></i>电台
                  </router-link>
              </div>

              <!-- 歌单推荐 -->
              <div class="newsong-list">
                  <h1 class="list-title">歌单推荐</h1>
                  <div class="item-list">
                      <div class="item-wrapper" v-for="item in discList" @click="selectItem(item)">
                        <img :src="item.list_thumb" >
                        <p class="newsong-desc">{{ item.list_name }}</p>
                    </div>
                  </div>
              </div>
              <!-- 新歌速递 -->
              <div class="recommend-list">
                  <h1 class="list-title">新歌速递<i class="icon-right_circle"></i></h1>
                  <ul>
                    <li class="item"  v-for="item in newSongList">
                      <div class="icon">
                        <img src="../../common/image/default.png" width="60" height="60">
                      </div>
                      <div class="text">
                         <h2 class="name">{{ item.song_name }}</h2>
                         <p class="desc">{{ item.singer_name }}·{{ item.album_name }}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="loading-container" v-show="!newSongList.length">
                    <loading></loading>
                  </div> 
              </div>
           
          </div>
     </div>
     <router-view></router-view>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Loading from 'base/loading/loading'
  import {getRecommend,getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        recommends:[],
        discList: [],//歌单
        newSongList:[]//新歌速递
      }
    },
    created(){
      this._getRecommend()
      this._getNewSongList()
      this._getDiscList()
     
    },
    methods:{
      selectItem(item){
          this.$router.push({
            path:`disc/${item.list_id}`
          })
          this.setDiscList(item)  
      },
      _getRecommend(){
        getRecommend().then((res) => {
          if(res.code === ERR_OK){
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        this.$http.post('http://localhost:81/music/admin/api/getDiscList', {emulateJSON: true})
        .then(
            (response) => {
                this.discList = response.data
                console.log(this.discList)
            },
            (error) => {
                console.log(error)
            }
        )
      },
      _getNewSongList(){
        this.$http.post('http://localhost:81/music/admin/api/getNewSong', {emulateJSON: true})
        .then(
            (response) => {
                this.newSongList = response.data
                console.log(this.newSongList)
            },
            (error) => {
                console.log(error)
            }
        )
      },
      ...mapMutations({
        setDiscList:'SET_DISC'
      })
    },
    components:{
      Slider,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .music
    //position:fixed
    width: 100%
    top: 45px
    bottom: 0
    .music-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .music-nav
        display:flex
        padding-top:15px
        justify-content:space-around
        .nav-item 
          .icon-singer,.icon-rank,.icon-type,.icon-broadcast
            display:block
            text-align:center
            margin-bottom:10px
            color:$color-icon-theme 
            font-size:30px
      .newsong-list
        .list-title
          position relative
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium-x
          color: $color-icon-theme
          .icon-right_circle
            position absolute
            right 10px
            top 0
            line-height 65px
        .item-list
          display:flex
          padding 0 10px
          align-content: space-between
          font-size: $font-size-small
          .item-wrapper
            flex:1
            &:not(:last-child)
                margin-right:5px
            img
              height:100px
              width:100%
            .newsong-desc
              font-size $font-size-medium
              padding:5px 2px
      .recommend-list
        .list-title
          position relative
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium-x
          color: $color-icon-theme
          .icon-right_circle
            position absolute
            right 10px
            top 0
            line-height 65px
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
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