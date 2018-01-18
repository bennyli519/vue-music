<!--
歌手详情
@authors Your Name (you@example.org)
@date    2018-01-17 16:46:01
@version 1.0.0
-->
<template>
    <transition name="slide">
        <div class="singer-detail">
            aaa
        </div>
    </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
//   import {getSongsUrl} from 'api/song'
  import {ERR_OK} from 'api/config'
  export default {
      computed:{
          ...mapGetters([
            'singer'
          ])
      },
      data(){
          return {
              songs:[]
          }
      },
      created(){
          console.log(this.singer)
          this._getDetail()
      },
      methods:{
           _getDetail() {
                if (!this.singer.id) {
                    this.$router.push('/singer')
                    return
                }
                // this.songs = this._normalizeSongs(res.data.list)
                this.$http.post('http://localhost:81/music/admin/api/Songs', {mid: this.singer.id}, {emulateJSON: true})
                .then(
                    (response) => {
                        //console.log(response.body)
                        this.songs = this._normalizeSongs(response.data)
                        console.log(this.songs)
                        
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            },
            _normalizeSongs(list) {
                let ret = []
                // let urlArr = []
                list.forEach((item) => {
                    // const filename = 'C400' + item.song_mid + '.m4a'
                    // getSongsUrl(item.song_mid).then((res) => {
                    //     if (res.code === ERR_OK) {
                    //         const realUrl = 'http://dl.stream.qqmusic.qq.com/' + filename + '?vkey=' + res.data.items[0]['vkey'] + '&guid=5230584542&uin=0&fromtag=66'
                    //         // console.log(item.song_name +":"+ realUrl)
                        
                    //     }                  
                    // })
                
                    if (item.song_mid && item.album_mid) {
                        ret.push(createSong(item,item.song_mid))
                    }
                })
                return ret
            },
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)

    .singer-detail
        position: fixed
        z-index 100
        top: 0
        bottom: 0
        width: 100%
        background:$color-background 
</style>
