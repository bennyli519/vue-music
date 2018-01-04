import Vue from 'vue'
import Router from 'vue-router'
import Mine from 'components/mine/mine'
import Music from 'components/music-bar/music'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
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
                { path: 'singer', component: Singer },
                { path: 'rank', component: Rank },
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
})