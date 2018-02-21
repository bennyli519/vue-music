<!--
评论页面
@authors Your Name (you@example.org)
@date    2018-02-09 18:51:47
@version 1.0.0
-->
<template>
  <transition name="slide" @enter="enter">
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
                    <div class="msg"  v-for="(item,index) in commentList">
                        <div class="img-container">
                            <img :src="item.user_avtar">
                        </div>
                        <div class="user">
                            <div class="username" ref="username">{{item.user_name}}</div>
                            <div class="date">{{item.comment_time}}</div>
                            <div class="content">
                                {{item.comment_content}}
                                <!-- <div class="replycontent">
                                </div> -->
                            </div>
                        </div>
                        <div class="reply">
                            <a href="#" @click="replyCk(index)">回复</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment-footer">
            <input type="text" :placeholder="inputHolder" v-model="comment">
            <a v-if="isBtnShow" href="#" class="sendBtn" @click="publish">发表</a>
            <a v-else href="#" class="sendBtn" @click="reply" >回复</a>
        </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
      data(){
          return{
              show:true,
              isBtnShow:true,
              comment:'',//评论内容
              commentList:[],
              inputHolder:"发表评论", //input框内PlaceHolder
              replyPerson:''
          }
      },
      computed:{
          ...mapGetters([
              'isShow',
              'currentSong',
              'userList',
              'isLogin'
          ])
      },
      created(){
      },
      methods:{
          enter(){
               this.isBtnShow = true
               this.inputHolder = "发表评论"
               this.$http.post('http://localhost:81/music/admin/api/checkComment',{
                    mid:this.currentSong.mid
                }, {emulateJSON: true})
                .then(
                    (response) => {
                        this.commentList = response.data
                        console.log(this.commentList)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
              console.log("当前歌曲的mid" + this.currentSong.mid + this.currentSong.name)
          },
          back(){
              this.setIsShow(false)
          },
          publish(){
            if(this.comment == ''){
                alert('发表内容不能为空')
            }else if(this.comment.length < 10){
                alert('发表内容长度不能少于10个字')
            }else{
                this.$http.post('http://localhost:81/music/admin/api/addComment',{
                    mid:this.currentSong.mid,
                    user_id:this.userList.user_id,
                    comment:this.comment
                }, {emulateJSON: true})
                .then(
                    (response) => {
                        this.commentList = response.data 
                        alert("发表成功")
                        this.comment = ''
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }
           
          },
          //回复点击事件
          replyCk(index){
              this.isBtnShow = false
              this.replyPerson = this.$refs.username[index].innerHTML
              this.inputHolder = "回复@"+ this.replyPerson
          
          },
          //回复
          reply(){
              alert("这里是回复内容" + this.comment+ this.replyPerson)
          },
          ...mapMutations({
              setIsShow:'SET_IS_SHOW'
          })
      },
    watch:{
        currentSong(newSong,oldSong){
            if(newSong.id === oldSong.id){
                return
            }else{
                this.enter()
            }

        }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
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
                    justify-content space-between
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
                            .comment_content
                                padding-bottom 5px
                                margin-bottom 5px
                                border-bottom 1px solid #5a555587
                            .replycontent
                                img
                                  width 50px
                                  height 50px
                                  border-radius 50%
                                  vertical-align bottom

                    .reply
                        display flex
                        align-items flex-end
                        padding-bottom 10px
                        border-bottom 1px solid #5a555587
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
