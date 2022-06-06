import { createStore } from 'vuex'
import getters from './getter'
import user from './modules/user'
import permission from './modules/permission'
import constant from './modules/constant'

export default createStore({
  getters,
  modules: {
    user,
    permission,
    constant
  }
})
