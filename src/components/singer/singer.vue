<!--
Description
@authors Your Name (you@example.org)
@date    2017-12-30 20:39:56
@version 1.0.0
-->
<template>
    <div class="singer">
        <div class="back" @click="back">
            <
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'

  export default {
      data() {
          return{
            singers:[]
          }
      },
      created(){
          this._getSingerList()
      },
      methods:{
          back(){
              this.$router.back()
          },
          _getSingerList(){
              getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = res.data.list
                    console.log(this.singers)
                }
              })
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background:$color-background 
</style>
