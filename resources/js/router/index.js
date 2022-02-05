import { createWebHistory, createRouter } from "vue-router";
import store from "../store/index";

//Auth
import ResetPassword from '../components/Auth/ResetPassword';
import ForgotPassword from '../components/Auth/ForgotPassword';
import SocialLogin from "../components/Auth/SocialLogin";
import RegistrationSuccessful from "../components/Auth/RegistrationSuccessful";
let EmailVerification = {template: '<div>Ahoj</div>'}

//Public
import LandingPage from "../components/Public/LandingPage";
import HomeIndex from "../components/Public/Home/Index";
import ProfileIndex from "../components/Public/Profile/Index";
import ProfileInformation from "../components/Public/Profile/Profile";
import ProfilePassword from "../components/Public/Profile/Password";

//404
let NotFound = {template: '<div>404</div>'}

//Routes
const routes = [
    {
        path: '/',
        component: LandingPage,
        children: [
            {
                path: '',
                name: 'homeIndex',
                component: HomeIndex,
            },
            {
                path: 'authorize/:provider/callback',
                name: 'socialLogin',
                component: SocialLogin,
            },
            {
                path: 'reset-password',
                name: 'resetPassword',
                component: ResetPassword,
                meta: {
                    guest: true
                },
            },
            {
                path: 'forgot-password',
                name: 'forgotPassword',
                component: ForgotPassword,
                meta: {
                    guest: true
                },
            },
            {
                path: 'registration-successful',
                name: 'registrationSuccessful',
                component: RegistrationSuccessful,
                meta: {
                    guest: true
                },
            },
            // {
            //     path: 'email',
            //     name: 'emailVerification',
            //     component: EmailVerification
            // },
            {
                path: 'profile',
                name: 'profileIndex',
                component: ProfileIndex,
                children: [
                    {
                        path: '',
                        name: 'profileInformation',
                        component: ProfileInformation,
                    },
                    {
                        path: 'password',
                        name: 'profilePassword',
                        component: ProfilePassword,
                    },
                ]
            },
        ]
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     component:NotFound
    // },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {

    const loggedIn = store.getters['userModule/loggedIn']

    if (to.matched.some(record => record.meta.guest)) {
        if (loggedIn) {
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
