<!--
Description
@authors Your Name (you@example.org)
@date    2018-01-04 20:04:52
@version 1.0.0
-->
<template>
  <transition name="slide">
    <div class="rank" ref="rank">
      <div class="titlebar">
          <div class="back" @click="back">
              <i class="icon-left"></i>
          </div>
          <h1 class="title">排行</h1>
      </div>
      <scroll :data="topList" class="toplist" ref="toplist">
        <ul>
          <li class="item" v-for="item in topList" @click="selectItem(item)">
            <div class="icon">
              <img width="100" height="100" v-lazy="item.rank_picUrl" />
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song,index) in item.rank_songList">
                <span>{{ index+1 }}</span>
                <span>{{ song.song_name }}-{{ song.singer_name }} </span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="loading-container" v-show="!topList.length">
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
  	created(){
  		this._getTopList()
  	},
  	data(){
  		return{
  			topList:[]
  		}
  	},
	  methods:{
	  	  handlePlaylist(playlist) {
	        const bottom = playlist.length > 0 ? '60px' : ''
	        this.$refs.rank.style.bottom = bottom
	        this.$refs.toplist.refresh()
        },
        selectItem(item){
          this.$router.push({
            path:`rank/${item.rank_type}`
          })
          this.setTopList(item)
        },
	      back(){
	          this.$router.back()
	      },
	      _getTopList(){
	      	  this.$http.post('http://localhost:81/music/admin/api/getTopList', {emulateJSON: true})
		        .then(
		            (response) => {
		                this.topList = response.data
		                
		            },
		            (error) => {
		                console.log(error)
		            }
		        )
        },
        ...mapMutations({
          setTopList: 'SET_TOP_LIST'
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
  .rank
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
    .toplist
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
          flex: 0 0 100px
          width: 100px
          height: 100px
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
