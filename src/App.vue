
<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
          <router-view></router-view>
    </keep-alive>
    <player></player>
    <comment-detail></comment-detail>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Player from 'components/player/player'
import CommentDetail from 'components/comment/comment'
export default {
  name: 'app',
  components:{
    MHeader,
    Player,
    CommentDetail
  }
}
</script>

<style lang="stylus">
@import "common/stylus/variable";
  #app
    color:$color-theme
</style>

