import jsonp from 'common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongsUrl(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const filename = 'C400' + songmid + '.m4a'
  const data = Object.assign({}, {
    cid: 205361747,
    uin: 0,
    guid: 5230584542,
    filename: filename,
    songmid: songmid,
    format: 'json'
  })

  return jsonp(url, data)
}