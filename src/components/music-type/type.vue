<!--
音乐分类页面
@authors Your Name (you@example.org)
@date    2018-01-04 21:18:37
@version 1.0.0
-->
<template>
    <transition name="slide">
        <div class="music-type">
            <div class="titlebar">
                <div class="back" @click="back">
                    <i class="icon-left"></i>
                </div>
                <h1 class="title">分类</h1>
            </div>
            <div class="typeBar">
                <h1>歌曲类型分类</h1>
                <ul class="title-list">
                    <li @click="selectItem(item,0)" class="title-wrapper" v-for="item in typeList.songType">
                        <span>{{ item.type_name }}</span>
                    </li>
                </ul>
            </div>
            <div class="singer-type">
                <h1>歌手类别</h1>
                <div class="singer-list">
                    <div class="singer-wrapper" @click="selectItem(item,1)" v-for="item in typeList.singerType">
                        <img :src="item.picUrl"  width="100" height="100">
                        <p>{{item.title}}</p>
                    </div>
                </div>
            </div>
            <div class="date">
                <h1>年代分类</h1>
                <div class="date-list">
                    <div class="date-wrapper" @click="selectItem(item,2)" v-for="item in typeList.dateType">
                        <img :src="item.picUrl"  width="100" height="100">
                        <p>{{item.title}}</p>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
        data(){
            return{
                typeList:[]
            }
        },
        created(){
            this._getTypeList();
        },
        methods:{
            selectItem(item,$id){
                this.$router.push({
                    path:`type/${item.type_id}`,
                    query:{row:$id}
                })
                this.setTypeList(item)
            },
            back(){
                this.$router.back()
            },
            _getTypeList(){
                 this.$http.post('http://localhost:81/music/admin/api/getTypeList', {emulateJSON: true})
		        .then(
		            (response) => {
		                this.typeList = response.data
                        console.log(this.typeList)    
		            },
		            (error) => {
		                console.log(error)
		            }
		        )
            },
            ...mapMutations({
                setTypeList:'SET_TYPE_LIST'
            })
        },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s ease

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .music-type
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background:$color-background
        .titlebar
            height:40px
            width 100% 
            border-bottom: 1px solid #5a555587
            .back
                position absolute
                top: 0
                left: 6px
                z-index: 50
                .icon-left
                    display: block
                    padding: 10px
                    font-size: $font-size-large
                    color: $color-icon-theme 
            .title
                position: absolute
                top: 0
                left: 10%
                z-index: 40
                width: 80%
                no-wrap()
                text-align: center
                line-height: 40px
                font-size: $font-size-large
                color: $color-text
        .typeBar
            margin 15px 8px
            h1
              padding-left 8px
            .title-list
                width 100%
                font-size $font-size-medium-x 
                .title-wrapper
                    display inline-block
                    width 30%
                    margin 5px
                    padding 6px 0
                    text-align center
                    border-radius 3px
                    background $color-dialog-background
        .singer-type
            margin 15px 8px
            h1
              padding-left 8px
              margin-bottom 10px
            .singer-list
              display flex
              flex-direction row
              justify-content space-around
              .singer-wrapper
                margin 10px 5px
                img
                  border-radius 50%
                p
                  margin-top 5px
                  text-align center
        .date
            margin 15px 8px
            h1
              padding-left 8px
              margin-bottom 10px
            .date-list
              display flex
              flex-direction row
              justify-content space-around
              .date-wrapper
                margin 10px 5px
                p
                  margin-top 5px
                  text-align center
               

</style>
