// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import VueResource from 'vue-resource'
Vue.config.productionTip = false

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
    loading: require('common/image/default.png')
  })
Vue.use(VueResource)
    /* eslint-disable no-new */

// 全局导航钩子
router.beforeEach((to, from, next) => {
    const userMsg = localStorage.getItem("userMsg");
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 通过vuex state获取当前的token是否存在
        // console.log(isEmptyObject(store.state.user)) 
        if(!isEmptyObject(userMsg)) {   
            next();
        }
        else { 
            next({
                path: '/login',
                query: {redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
 })

 function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
 }
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})