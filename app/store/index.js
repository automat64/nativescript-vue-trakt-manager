import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import tabs from './modules/tabs';
import lists from './modules/lists'
import services from './modules/services'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
       
    },
    modules: {
        tabs,
        lists,
        services,
    },
    mutations: {
        
    },
   
})

Vue.prototype.$store = store;

export default store;