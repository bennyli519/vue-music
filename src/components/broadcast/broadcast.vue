<!--
Description
@authors Your Name (you@example.org)
@date    2018-01-04 20:04:52
@version 1.0.0
-->
<template>
  <div class="broadcast">
    <div class="titlebar">
        <div class="back" @click="back">
            <i class="icon-left"></i>
        </div>
        <h1 class="title">电台</h1>
    </div>
    <scroll class="castlist" ref="castlist">
      <ul>
        <li class="item">
          <div class="icon">
            <p class="cast-title">热歌</p>
            <img width="100" height="100" src="../../common/image/hot.jpg" />
          </div>
          <ul class="songlist">
            <li class="song">
              <span>1</span>
              <span>狐狸-薛之谦</span>
            </li>
            <li class="song">
              <span>2</span>
              <span>体面-于文文</span>
            </li>
            <li class="song">
              <span>3</span>
              <span>FAST-张杰</span>
            </li>
          </ul>
        </li>
        <li class="item">
          <div class="icon">
            <p class="cast-title">个性电台</p>
            <img width="100" height="100" src="../../common/image/gexing.jpg" />
          </div>
          <ul class="songlist">
            <li class="song">
              <span>1</span>
              <span>狐狸-薛之谦</span>
            </li>
            <li class="song">
              <span>2</span>
              <span>体面-于文文</span>
            </li>
            <li class="song">
              <span>3</span>
              <span>FAST-张杰</span>
            </li>
          </ul>
        </li>
        <li class="item">
          <div class="icon">
            <p class="cast-title">随心听</p>
            <img width="100" height="100" src="../../common/image/suixinting.jpg" />
          </div>
          <ul class="songlist">
            <li class="song">
              <span>1</span>
              <span>狐狸-薛之谦</span>
            </li>
            <li class="song">
              <span>2</span>
              <span>体面-于文文</span>
            </li>
            <li class="song">
              <span>3</span>
              <span>FAST-张杰</span>
            </li>
          </ul>
        </li>
        <li class="item">
          <div class="icon">
            <p class="cast-title">热歌</p>
            <img width="100" height="100" src="../../common/image/hot.jpg" />
          </div>
          <ul class="songlist">
            <li class="song">
              <span>1</span>
              <span>狐狸-薛之谦</span>
            </li>
            <li class="song">
              <span>2</span>
              <span>体面-于文文</span>
            </li>
            <li class="song">
              <span>3</span>
              <span>FAST-张杰</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <div class="loading-container">
        <loading></loading>
      </div> -->
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
      methods:{
          back(){
              this.$router.back()
          },
      },
    components: {
        Scroll,
        Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .broadcast
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background:$color-background
    .titlebar
        height:40px
        width 100% 
        border-bottom: 1px solid #5a555587
        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50
            .icon-left
                display: block
                padding: 10px
                font-size: $font-size-large
                color: $color-icon-theme 
        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text
    .castlist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          position relative
          display flex
          justify-content center
          align-items center
          flex: 0 0 100px
          width: 100px
          height: 100px
          .cast-title
            position absolute
            background: #736363ab;
            padding: 5px;
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
