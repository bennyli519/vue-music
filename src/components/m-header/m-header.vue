<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 15:23:36
@version 1.0.0
-->
<template>
  <div class="tab">
    <div class="icon">
      <i class="icon-sequence"></i>
    </div>
    <router-link tag="div" class="tab-item" to="/mine">
      <span class="tab-link">我的</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/music">
      <span class="tab-link">音乐坊</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
    <div class="icon"></div>
  </div>
</template>

<script>
  export default {

  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .tab
    display:flex
    height:45px
    line-height:45px
    font-size: $font-size-medium
    .icon
      width 40px
      text-align center
    .tab-item
      flex:1
      text-align:center
      .tab-link
        color:$color-text-l
      &.router-link-active
        .tab-link
          padding-bottom:5px
          color:$color-theme
          border-bottom: 2px solid $color-icon-theme
</style>

