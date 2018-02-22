<!--
最近播放
@authors Your Name (you@example.org)
@date    2018-02-22 14:22:42
@version 1.0.0
-->
<template>
  <transition name="slide">
    <div class="recent">
            <div class="titlebar">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title">最近播放</h1>
        </div>
    </div>    
  </transition>
</template>

<script>
  export default {
      methods:{
          back(){
            this.$router.back()
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .recent
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
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
