<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 15:56:22
@version 1.0.0
-->
<template>
  <div class="mine-content">
    <div class="user">
      <i class="icon"></i>
      <div class="user-name">username</div>
    </div>
    <div class="mine-nav">
      <a href="#" class="nav-item">全部歌曲</a>
      <a href="#" class="nav-item">下载歌曲</a>
      <a href="#" class="nav-item">最近播放</a>
      <a href="#" class="nav-item">我喜欢</a>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .mine-content
    background:$color-highlight-background
    .user
      display:flex
      flex-direction:column
      align-items:center
      .icon
        display: inline-block
        vertical-align: top
        margin: 6px 0px 10px
        width: 30px
        height: 32px
        bg-image('logo')
        background-size: 30px 32px
      .user-name:before
        content:"-"
        margin-right:20px 
      .user-name:after
        content:"-"
        margin-left:20px
    .mine-nav
      display:flex
      flex-flow: row wrap
      margin-top:20px
      .nav-item
        width:50%
        text-align:center

</style>

