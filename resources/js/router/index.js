import { createWebHistory, createRouter } from "vue-router";
import store from '../store/index';

//Auth
import Login from "../components/Auth/Login"
import Register from '../components/Auth/Register'
import ResetPassword from '../components/Auth/ResetPassword'
import ForgotPassword from '../components/Auth/ForgotPassword'

//Public
import LandingPage from "../components/Public/LandingPage"
import HomeIndex from "../components/Public/Home/Index"
import UserProfile from "../components/Public/Profile/Index"

//404
let NotFound = {template: '<div>404</div>'};

//Routes
const routes = [
    {
        path: '/',
        component: LandingPage,
        children: [
            {
                path: '',
                name: 'home',
                component: HomeIndex,
            },
            {
                path: 'login',
                name: 'login',
                component: Login,
                meta: {
                    guest: true
                },
            },
            {
                path: 'register',
                name: 'register',
                component: Register,
                meta: {
                    guest: true
                },
            },
            {
                path: "reset-password",
                name: "resetPassword",
                component: ResetPassword,
                meta: {
                    guest: true
                },
            },
            {
                path: "forgot-password",
                name: "forgotPassword",
                component: ForgotPassword,
                meta: {
                    guest: true
                },
            },
            {
                path: "profile",
                name: "UserProfile",
                component: UserProfile,
                meta: {
                    guest: true
                },
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component:NotFound
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const abilities = store.getters['permission']
    const loggedIn = store.getters['loggedIn']

    const canNavigate = to.matched.some(() => {
        if (!loggedIn && to.meta.verified) {
            return false
        }
        else if (loggedIn && to.meta.guest) {
            return false
        }
        else if (to.meta.action) {
            return abilities.can(to.meta.action)
        }
        else {
            return true
        }
    })

    if (!canNavigate) {
        return next('/')
    } else {
        next()
    }
})

export default router;
