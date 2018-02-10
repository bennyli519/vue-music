<!--
评论页面
@authors Your Name (you@example.org)
@date    2018-02-09 18:51:47
@version 1.0.0
-->
<template>
  <div class="comment" v-show="isShow">
    <div class="titlebar">
        <div class="back" @click="back">
            <i class="icon-left"></i>
        </div>
        <h1 class="title">评论</h1>
    </div>
     <div class="container">
         <div class="song-wrapper">
            <img :src="currentSong.image">
            <ul class="desc">
                <li class="name">{{ currentSong.name }}</li>
                <li class="singer">{{ currentSong.singer }}</li>
            </ul>
        </div>
        <div class="comment-wrapper">
            <h3>评论区</h3>
            <div class="msg-container">
                <div class="msg"  v-for="i in 10">
                    <div class="img-container">
                        <img :src="currentSong.image">
                    </div>
                    <div class="user">
                        <div class="username">benny</div>
                        <div class="date">2018-9-9 21:23</div>
                        <div class="content">
                            我们用初中三年去盼望高中三年，高中三年去憧憬大学四年。
                            而用大学四年去怀念中学六年，最终用一生去祭奠我们的青春。
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
     <div class="comment-footer">
         <input type="text" placeholder="发表评论">
         <a href="#" class="sendBtn">发表</a>
     </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
      data(){
          return{
              show:true
          }
      },
      computed:{
          ...mapGetters([
              'isShow',
              'currentSong'
          ])
      },
      created(){
          console.log(this.currentSong)
      },
      methods:{
          back(){
              this.setIsShow(false)
          },
          ...mapMutations({
              setIsShow:'SET_IS_SHOW'
          })
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .comment
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index 1000
    padding-bottom 60px
    background:$color-background 
    .titlebar
        position fixed
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
    .container
        position relative
        overflow-y scroll
        margin-top 40px
        height 100%
        .song-wrapper
            position relative
            display flex
            background $color-highlight-background
            margin 0 0 20px
            padding 10px 20px
            img
                flex 0 1 100px
                height 100px
            .desc
                flex 1
                display flex
                padding 0 10px
                align-self center
                flex-direction: column
                .name
                    margin-bottom 10px
                .singer
                    color:$color-text-l
        .comment-wrapper
            padding 0 20px
            .msg-container
                padding 10px 0
                .msg
                    display flex
                    margin-bottom 10px
                    .img-container
                        flex: 0 0 50px
                        img 
                            width 50px
                            height 50px
                            border-radius 50%
                    .user
                        flex 1
                        flex-direction: column
                        justify-content center
                        overflow hidden
                        color $color-text-l
                        word-break break-word
                        padding 0 0 10px 8px
                        border-bottom 1px solid #5a555587
                        .username
                            margin-bottom 5px
                        .date
                            margin-bottom 10px
                            font-size $font-size-small
                        .content
                            color:$color-text
                            font-size $font-size-medium
                            line-height 22px
    .comment-footer
        position fixed
        display flex
        padding 5px 10px
        width 100%
        left 0 
        bottom 0
        background $color-highlight-background
        input 
            flex 1
            height 30px
            text-indent 15px
            color:#fff
            border 1px solid $color-text-d
            border-radius 4px
            outline-color hsla(147, 98%, 50%, 0.53)
            background transparent
        .sendBtn
            flex 0 0 50px
            padding-left 5px
            line-height 30px
            color $color-text-ll

                      

              
            
         
</style>
