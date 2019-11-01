import Vue from 'vue';
import Router from 'vue-router';
import store from '@/Store/index';
import Auth from '@/Pages/Auth/Auth.vue';
import MainPage from '@/Pages/MainPage/MainPage.vue';
import NotFound from '@/Pages/NotFound/NotFound.vue';


Vue.use(Router);

const Route = new Router({
    routes: [
        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
            meta: {
                auth: true,
                title: (route: any) => route.name,
            },
        },
        {
            path: '/',
            name: 'MainPage',
            component: MainPage,
            meta: {
                title: (route: any) => 'Google ladings admin',
            },
            children: [
                {
                    path: '',
                    name: 'Apps',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ '@/Pages/Apps/Apps.vue'),
                    meta: {
                        title: (route: any) => route.name,
                    },
                }, {
                    path: '/create-app',
                    name: 'Create app',
                    component: () => import('@/Pages/CreateApp/CreateApp.vue'),
                    meta: {
                        title: (route: any) => route.name,
                    },
                }, {
                    path: '/admin/create-template',
                    name: 'Create template',
                    component: () => import('@/Pages/CreateTemplate/CreateTemplate.vue'),
                    meta: {
                        title: (route: any) => route.name,
                    },
                }, {
                    path: '/push-messages',
                    name: 'Push messages',
                    component: () => import('@/Pages/PushMessages/PushMessages.vue'),
                    meta: {
                        title: (route: any) => route.name,
                    },
                },
                {
                    path: '404',
                    name: '404',
                    component: NotFound,
                }, {
                    path: '*',
                    redirect: '/404',
                },
            ],
        },


    ],
    mode: 'history',
    base: process.env.BASE_URL,
});

Route.beforeEach((to, from, next) => {
    Vue.nextTick(() => {
        if (to.meta.title) {
            document.title = to.meta.title(to);
        }
    });

    if (to.matched.some((record) => !record.meta.auth)) {
        if (!store.state.UserModule.currentUser) {
            next({
                path: '/auth',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default Route;
