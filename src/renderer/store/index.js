import Vue from 'vue'
import Vuex from 'vuex'

import saleDiary from "../modules/sale/saleDiary/store";

const modules = {
  saleDiary
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
