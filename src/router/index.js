import Vue from 'vue'
import Router from 'vue-router'
import Mine from 'components/mine/mine'
import Music from 'components/music-bar/music'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/mine'
        },
        {
            path: '/mine',
            component: Mine
        },
        {
            path: '/music',
            component: Music,
            children: [
                { path: 'singer', component: Singer }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
})