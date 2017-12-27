<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 16:00:20
@version 1.0.0
-->
<template>
  <div>
    <div v-if="recommends.length"class="slider-wrapper"></div>
     <slider>
       <div v-for="item in recommends">
         <a :href="item.linkUrl">
           <img :src="item.picUrl">
         </a>
       </div>
     </slider>
     </div>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default {
    data() {
      return {
        recommends:[]
      }
    },
    created(){
      this._getRecommend()
      console.log('aaa')
    },
    methods:{
      _getRecommend(){
        getRecommend().then((res) => {
          if(res.code === ERR_OK){
            this.recommends = res.data.slider
          }
        })
      }
    },
    components:{
      Slider
    }
  }
</script>

<style lang="css">
  
</style>
