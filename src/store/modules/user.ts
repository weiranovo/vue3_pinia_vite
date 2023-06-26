import { reqLogin } from "@/api/user"

const state = () => ({
    name:"haha",
    token:'' 
})

const mutations ={
    setToken(state:any,data:any){
        state.token = data
    }
}

const actions = {
    // @ts-ignore
     userLogin({commit},payload){
        return new Promise((resolve,reject) => {
            reqLogin(payload).then((result)=>{
                console.log(result) 
                if(result.code == 200){
                    commit('setToken',result.data.token)
                    // localStorage.setItem('token',result.data.token)
                    resolve('ok')
                }else{
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