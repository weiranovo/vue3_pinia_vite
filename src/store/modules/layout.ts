const state = ()=> {
    return {
       refresh:false 
    }
}

const mutations = {
    setRefresh(state: any) {
        state.refresh = !state.refresh
    }
}

const actions = {   
}

export default {
    namespaced: true,
    state,
    mutations,
    actions

}