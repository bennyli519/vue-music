import Vue from 'vue'
import Router from 'vue-router'
import Mine from 'components/mine/mine'
import Music from 'components/music-bar/music'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Type from 'components/music-type/type'
import Cast from 'components/broadcast/broadcast'
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
                { path: 'type', component: Type },
                { path: 'cast', component: Cast },
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
})