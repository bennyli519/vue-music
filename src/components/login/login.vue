<!--
登陆界面
@authors Your Name (you@example.org)
@date    2018-02-08 13:48:45
@version 1.0.0
-->
<template>
  <div class="container" ref="container">
    <div class="login-wrapper">
        <input type="text" placeholder="用户名" v-model="username">
        <input type="password" placeholder="密码" v-model="password">
        <a href="#" @click="login" class="btn">登陆</a>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapMutations} from 'vuex'
  export default {
      data(){
          return{
            username:'',
            password:'',
            isLogin:'',
            userMsg:[],
            currentUrl:''//准备要调过去的路由 路径
          }
      },
      methods:{
        login(){
            //window.open("http://isure.stream.qqmusic.qq.com/C100001CG3wA3QkuJS.m4a?fromtag=32");
            if(this.username.trim() == '' || this.password.trim() == '' ){
                alert('用户名或密码不能为空')
            }else{
                this.$http.post('http://localhost:81/music/admin/api/checkUser',{user: this.username,pwd:this.password}, {emulateJSON: true})
                .then(
                    (response) => {
                        this.userMsg = response.data[0];
                        const userList = JSON.stringify(this.userMsg);
                        if(this.userMsg.Rstatus){
                            localStorage.setItem("userMsg",userList);
                            this.loginMes({
                                userMsg:this.userMsg 
                            });
                            this.$router.push('/music')
                            this.setIsShow(true)
                            this.setPlayingState(true)
                            this.$refs.container.style['display'] = 'none'
                            //this.currentUrl = this.$route.query.redirect
                            // console.log(this.currentUrl)
                            // this.$router.push({ path: this.currentUrl })    
                        }else{
                            alert('您所输入的信息有误!')
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            } 
        },
        ...mapMutations({
            setIsShow:'SET_IS_SHOW',
            setPlayingState:'SET_PLAYING_STATE'
        }),
        ...mapActions([
            'loginMes'
        ])
       
      }
  }
</script>

<style lang="stylus" scoped>
    .container
        position fixed    
        display flex  
        flex-direction column-reverse
        background url('bg.jpg') no-repeat center center
        background-size cover
        width 100%
        height 100%
        top 0
        left 0
        z-index:10000
        .login-wrapper
            margin-bottom 25px
            text-align center
            input 
                width 70%
                margin-bottom 20px
                height 40px
                color:#fff
                background transparent
                border 1px solid #524d4d
                text-indent 15px
                border-radius 4px
                outline-color hsla(147, 98%, 50%, 0.53)
            .btn
                display block
                width 70%
                margin 0 auto
                padding 12px 0
                background hsla(147, 98%, 50%, 0.53)
                color #fff
                border-radius 4px

</style>
