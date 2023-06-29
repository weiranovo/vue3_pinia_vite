import request from '@/utils/request'
import type { loginFormData,responseData,userInforesponseData } from '@/api/user/type'
enum API{
    LOGIN_URL="/admin/acl/index/login",
    USERINFO_URL="/admin/acl/index/info",
    LOGOUT_URL="/admin/acl/index/logout"
}


export const reqLogin = (data:loginFormData) => request.post<any,responseData<string>>(API.LOGIN_URL,data)
export const reqUserInfo = () => request.get<any,responseData<userInforesponseData>>(API.USERINFO_URL)
export const reqLogout = (data='') => request.post<any,any>(API.LOGOUT_URL,data)
