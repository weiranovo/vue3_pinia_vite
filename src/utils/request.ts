import axios from 'axios'
import { ElMessage } from "element-plus";
import store from "@/store";
import router from '@/router';
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config) => {
      config.headers.token = store.state.user.token || ''
    return config
})

// const redirectPath = router.currentRoute.value.fullPath
// const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
console.log(router.currentRoute)
console.log(router.currentRoute.value)
console.log(window.location.href)
const redirectPath = window.location.href.split('#')[1]
request.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    let message = ''
    let status = err.response.status
    switch (status) {
        case 401:
            message = "TOKEN过期"
            router.push({path:'/login',query:{redirect:redirectPath}})
            break;
        case 403:
            message = "无权访问"
            break;
        case 404:
            message = "请求地址错误"
            break;
        case 500:
            message = "服务器出错啦"
            break;
        default:
            message = "未知的错误出现了！"
            break;
    }

    ElMessage({
        type:'error',
        message
    })

    return Promise.reject(err)
})

export default request