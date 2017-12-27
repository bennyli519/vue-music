<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 16:00:20
@version 1.0.0
-->
<template>
  <div>
      音乐坊
  </div>
</template>

<script>
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default {
    created(){
      this._getRecommend()
      console.log('aaa')
    },
    methods:{
      _getRecommend(){
        getRecommend().then((res) => {
          if(res.code === ERR_OK){
            console.log(res.data.slider)
          }
        })
      }
    }
  }
</script>

<style lang="css">
  
</style>
