import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
import admin from './admin'
export default new Vuex.Store({
    modules:{
        admin,
    }
})
