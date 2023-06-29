import router from "./index";
//@ts-ignore
import NProgress from 'nprogress'
// 引入对应css样式
import 'nprogress/nprogress.css'
import store from "@/store";


router.beforeEach((to, from, next) => {
    NProgress.start()
    const token = store.state.user.token
    if (token) {
        if (to.path == '/login') {
            next('/')
        }else{
            next()
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: 'login', query: { redirect: to.path } })
        }
    }
})
router.afterEach((to, from) => {
    NProgress.done()
})