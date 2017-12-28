<!--
Description
@authors Your Name (you@example.org)
@date    2017-11-28 16:00:20
@version 1.0.0
-->
<template>
  <div class="music" ref="music">
      <scroll ref="scroll" class="music-content">
        <div>
          <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
            <slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li @click="selectItem(item)" v-for="item in discList" class="item">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="css">
  
</style>
