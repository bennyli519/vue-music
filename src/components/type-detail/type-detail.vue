<!--
分类详情页
@authors Your Name (you@example.org)
@date    2018-02-05 23:41:33
@version 1.0.0
-->
<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  export default {
      computed:{
          title() {
                switch(this.currentType){
                    case 0:
                        return this.typeList.type_name
                        break
                    default:
                        return this.typeList.title
                }
                 
          },
          bgImage(){
                switch(this.currentType){
                    case 0:
                        return "https://p.qpic.cn/music_cover/0yiaX8d9LSmnROyId1RsUUwklzSKKp7RSanBAJ89We5I4kMwdnH5yeg/300?n=1"
                        break
                    default:
                        return this.typeList.picUrl
                }
             
          },
          ...mapGetters([
            'typeList'
          ])
      },
      data(){
        return {
            songs: [],
            currentType:this.$route.query.row,    //当前分类类型（0歌曲类型 1歌手类别 2年代分类）
            postUrl:""
        }
      },
      created(){
          
            this._getMusicList()   
      },
      methods:{
        _getMusicList(){
            if (!this.typeList.type_id) {
                this.$router.push('/music/type')
                return
            }  
            this.$http.post('http://localhost:81/music/admin/api/getTypeSongList',{ type_kind:this.currentType,type_id: this.typeList.type_id}, {emulateJSON: true})
            .then(
                (response) => {
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
            list.forEach((item) => {
                if (item.song_mid && item.album_mid) {
                    ret.push(createSong(item,item.song_mid))
                }
            })
            return ret
        }
      },
      components:{
          MusicList
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
