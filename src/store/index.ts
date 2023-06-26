import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
import getters from './getters'


const store = createStore({
    modules: {
        user
    },
    getters,
    plugins: [
        createPersistedstate({
          key: 'saveInfo',
          paths: ['user']
        })
      ]
})

export default store