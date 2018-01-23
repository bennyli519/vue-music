// import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
import {getSongsUrl,getLyric} from 'api/song'
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, uploadtime, listencount,albummid,url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.albummid = albummid
    this.duration = duration
    this.image = image
    this.uploadtime = uploadtime
    this.listencount = listencount
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

// const filename = 'C400' + item.song_mid + '.m4a'
// getSongsUrl(item.song_mid).then((res) => {
//     if (res.code === ERR_OK) {
//         const realUrl = 'http://dl.stream.qqmusic.qq.com/' + filename + '?vkey=' + res.data.items[0]['vkey'] + '&guid=5230584542&uin=0&fromtag=66'
//         // console.log(item.song_name +":"+ realUrl)
    
//     }                  
// })
export function createSong(musicData,url) {
  return new Song({
    id: musicData.song_id,
    mid: musicData.song_mid,
    singer:musicData.singer_name,
    name: musicData.song_name,
    albummid:musicData.album_mid,
    album: musicData.album_name,
    duration: musicData.song_duration,
    listencount: musicData.song_listencount,
    uploadtime: musicData.song_publish,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album_mid}.jpg?max_age=2592000`,
    url:`http://isure.stream.qqmusic.qq.com/C100${musicData.song_mid}.m4a?fromtag=32`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.mid)
  })
  return ret.join('/')
}

