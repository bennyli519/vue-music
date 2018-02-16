import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Mine from 'components/mine/mine'
import Music from 'components/music-bar/music'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Type from 'components/music-type/type'
import Cast from 'components/broadcast/broadcast'
import SingerDetail from 'components/singer-detail/singer-detail'
import TopList from 'components/top-list/top-list'
import TypeDetail from 'components/type-detail/type-detail'
import DiscDetail from 'components/disc-detail/disc-detail'
import CastDetail from 'components/cast-detail/cast-detail'
import CommentDetail from 'components/comment/comment'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/mine'
        },
        {
            path: '/login',
            component: Login
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
                    // meta: {
                    // // 添加该字段，表示进入这个路由是需要登录的
                    //     requireAuth: true,  
                    // }, 
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
                {
                    path: 'type',
                    component: Type,
                    children: [{
                        path: ':id',
                        component: TypeDetail
                    }]
                },
                {
                    path: 'cast',
                    component: Cast,
                    children: [{
                        path: ':id',
                        component: CastDetail
                    }]
                },
                { path: '/disc/:id', component: DiscDetail }
            ]
        },
        {
            path: '/search',
            component: Search
        }, {
            path: '/comment',
            component: CommentDetail
        }
    ]
})