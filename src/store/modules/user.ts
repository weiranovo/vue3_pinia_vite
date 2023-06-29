import { reqLogin, reqUserInfo } from "@/api/user"
import type { loginFormData,responseData,userInforesponseData } from '@/api/user/type'

import type { UserState } from "./types/type"
import { constantRoute } from '@/router/routes'
const state = (): UserState => {
    return {
        token: '',
        menuRoutes: constantRoute,
        username: '',
        avatar: ''
    }
}

const mutations = {
    setToken(state: any, data: any) {
        state.token = data
    },

    setUserInfo(state: any, data: any) {
        const { name, avatar } = data
        state.username = name
        state.avatar = avatar
        
    },

    //退出登录
    removeUserInfo(state: any) {
        state.username = ''
        state.avatar = ''
        state.token = ''
    }
}

const actions = {
    //用户登陆
    userLogin({ commit }: any, payload: loginFormData) {
        return new Promise((resolve, reject) => {
            reqLogin(payload).then((result: responseData<string>) => {
                if (result.code == 200) {
                    commit('setToken', result.data)
                    // localStorage.setItem('token',result.data.token)
                    resolve('ok')
                } else {
                    reject(new Error(result.data))
                }
            })

        })

    },

    //获取数据
    async userInfo({ commit }: any) {
        let result: responseData<userInforesponseData> = await reqUserInfo()
        console.log(result)
        if (result.code == 200) {
            commit('setUserInfo', result.data)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions

}