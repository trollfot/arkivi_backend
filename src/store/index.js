import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import { messaging } from './message'

const store = new Vuex.Store({
    modules: {
	messages: messaging,
    }
})

export { store };
