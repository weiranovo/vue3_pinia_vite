import axios from 'axios'
import { ElMessage } from "element-plus";
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config) => {

    return config
})



request.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    let message = ''
    let status = err.response.status
    switch (status) {
        case 401:
            message = "TOKEN过期"
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