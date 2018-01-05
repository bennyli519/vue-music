<!--
音乐分类页面
@authors Your Name (you@example.org)
@date    2018-01-04 21:18:37
@version 1.0.0
-->
<template>
  <div class="music-type">
    <div class="titlebar">
        <div class="back" @click="back">
            <i class="icon-left"></i>
        </div>
        <h1 class="title">分类</h1>
    </div>
    <div class="typeBar">
        <h1>歌曲类型分类</h1>
        <div class="title-list">
            <div class="column">
                <div class="title-wrapper">
                    <span>流行</span>
                </div>
                <div class="title-wrapper">
                    <span>嘻哈</span>
                </div>
            </div>
            <div class="column">
                <div class="title-wrapper">
                    <span>情歌</span>
                </div>
                <div class="title-wrapper">
                    <span>流行</span>
                </div>
                <div class="title-wrapper">
                    <span>乡村</span>
                </div>
            </div>
            <div class="column">
                <div class="title-wrapper">
                    <span>情歌</span>
                </div>
                <div class="title-wrapper">
                    <span>流行</span>
                </div>
                <div class="title-wrapper">
                    <span>摇滚</span>
                </div>
            </div>
        </div>
    </div>
    <div class="language">
        <h1>语种分类</h1>
        <div class="language-list">
            <div class="language-wrapper">
                <img src="../../common/image/lan.jpg"  width="85" height="85">
                <p>英语</p>
            </div>
            <div class="language-wrapper">
                <img src="../../common/image/lan.jpg"  width="85" height="85">
                <p>粤语</p>
            </div>
            <div class="language-wrapper">
                <img src="../../common/image/lan.jpg"  width="85" height="85">
                <p>国语</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
        back(){
            this.$router.back()
        },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

    .music-type
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
        .typeBar
            margin 15px 8px
            h1
              padding-left 8px
            .title-list
                display:flex
                font-size $font-size-medium-x 
                .column
                  flex 1
                  .title-wrapper
                    display flex
                    align-items center
                    justify-content center
                    margin 10px 5px
                    padding 6px
                    border-radius 3px
                    background $color-dialog-background
                .column:first-child .title-wrapper:first-child
                    height 55px
        .language
            margin 15px 8px
            h1
              padding-left 8px
              margin-bottom 10px
            .language-list
              display flex
              flex-direction row
              justify-content space-around
              .language-wrapper
                margin 10px 5px
                img
                  border-radius 50%
                p
                  margin-top 5px
                  text-align center
               

</style>
