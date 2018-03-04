<!--
Description
@authors Your Name (you@example.org)
@date    2018-01-04 20:04:52
@version 1.0.0
-->
<template>
  <transition name="slide">
    <div class="broadcast" ref="cast">
      <div class="titlebar">
          <div class="back" @click="back">
              <i class="icon-left"></i>
          </div>
          <h1 class="title">电台</h1>
      </div>
      <scroll :data="castList" class="castlist" ref="castlist">
        <ul>
          <li class="item" @click="selectItem(item)" v-for="item in castList">
            <div class="icon">
              <p class="cast-title">{{ item.broadcast_name }}</p>
              <img width="100" height="100" :src="item.broadcast_thumb" />
            </div>
            <div class="text">
              <div class="desc">{{ item.broadcast_intro }}</div>
              <div class="name">— {{ item.broadcast_author }}</div>           
            </div>
          </li>
        </ul>
        <div class="loading-container" v-show="!castList.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
 </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],
    data(){
      return{
        castList:[]
      }
    },
    created(){
      this._getCastList()
    },
    methods:{
        selectItem(item){
          this.$router.push({
            path:`cast/${item.broadcast_id}`
          })
          this.setCastList(item)
        },
        handlePlaylist(playlist) {
	        const bottom = playlist.length > 0 ? '60px' : ''
	
	        this.$refs.cast.style.bottom = bottom
	        this.$refs.castlist.refresh()
        },
      	_getCastList(){
	      	  this.$http.post('http://localhost:81/music/admin/api/getBroadCast', {emulateJSON: true})
		        .then(
		            (response) => {
		                this.castList = response.data
		                console.log(this.castList)
		            },
		            (error) => {
		                console.log(error)
		            }
		        )
        },
        back(){
            this.$router.back()
        },
        ...mapMutations({
          setCastList:'SET_CAST_LIST'
        })
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
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
      overflow: scroll
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
        .text
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
          .name
            no-wrap()
            margin-top 10px
            text-align left 
          .desc
            line-height: 20px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
