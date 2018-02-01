import Vue from 'vue'
import Router from 'vue-router'
import Mine from 'components/mine/mine'
import Music from 'components/music-bar/music'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Type from 'components/music-type/type'
import Cast from 'components/broadcast/broadcast'
import SingerDetail from 'components/singer-detail/singer-detail'
import TopList from 'components/top-list/top-list'
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
            children: [{
                    path: 'singer',
                    component: Singer,
                    children: [{
                        path: ':id',
                        component: SingerDetail
                    }]
                },
                {
                    path: 'rank',
                    component: Rank,
                    children: [{
                        path: ':id',
                        component: TopList
                    }]
                },
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