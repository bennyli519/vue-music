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
                  <a href="#" class="nav-item"><i class="icon-music"></i>歌手</a>
                  <a href="#" class="nav-item"><i class="icon-music"></i>排行</a>
                  <a href="#" class="nav-item"><i class="icon-music"></i>分类</a>
                  <a href="#" class="nav-item"><i class="icon-music"></i>电台</a>
              </div>

              <!-- 新歌速递 -->
              <div class="newsong-list">
                  <h1 class="list-title">新歌速递</h1>
                  <div class="item-list">
                      <div class="item-wrapper" v-for="i in 3">
                        <img src="../../common/image/default.png" width="100">
                        <p>每日新歌：全个性感音色</p>
                    </div>
                  </div>
              </div>
              <!-- 歌单推荐 -->
              <div class="recommend-list">
                  <h1 class="list-title">热门歌单推荐</h1>
                  <ul>
                    <li class="item"  v-for="i in 2">
                      <div class="icon">
                        <img src="../../common/image/default.png" width="60" height="60">
                      </div>
                      <div class="text">
                         <h2 class="name">怀念那些离我而去的旧时光</h2>
                         <p class="desc">伴你到最后的不是旧人的手，而是伤喉的酒</p>
                      </div>
                    </li>
                  </ul>
              </div>
          </div>
     </div>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default {
    data() {
      return {
        recommends:[]
      }
    },
    created(){
      this._getRecommend()
      console.log('aaa')
    },
    methods:{
      _getRecommend(){
        getRecommend().then((res) => {
          if(res.code === ERR_OK){
            this.recommends = res.data.slider
          }
        })
      }
    },
    components:{
      Slider
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
      background:$color-highlight-background
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .music-nav
        display:flex
        padding-top:15px
        justify-content:space-around
        .nav-item .icon-music
          display:block
          text-align:center
          margin-bottom:6px
          color:$color-icon-theme 
      .newsong-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium-x
          color: $color-icon-theme
        .item-list
          display:flex
          align-content: space-between
          font-size: $font-size-small
          .item-wrapper
            flex:1
           
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium-x
          color: $color-icon-theme
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