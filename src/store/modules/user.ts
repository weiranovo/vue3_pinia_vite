import { reqLogin } from "@/api/user"
import type { loginForm, loginResponseData } from "@/api/user/type"
import type { UserState } from "./types/type"
import {constantRoute} from '@/router/routes'
const state = ():UserState => {
    return {
        token: '',
        menuRoutes:constantRoute
    }
}

const mutations = {
    setToken(state: any, data: any) {
        state.token = data
    }
}

const actions = {

    userLogin({ commit }:any, payload: loginForm) {
        return new Promise((resolve, reject) => {
            reqLogin(payload).then((result: loginResponseData) => {
                console.log(result)
                if (result.code == 200) {
                    commit('setToken', result.data.token)
                    // localStorage.setItem('token',result.data.token)
                    resolve('ok')
                } else {
                    reject(new Error('出错啦!'))
                }
            })

        })

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions

}