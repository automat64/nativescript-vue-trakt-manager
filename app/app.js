import Vue from "nativescript-vue";
import AppInit from "./components/AppInit";
import TraktAuthorize from "./components/TraktAuthorize";
import Home from "./components/Home";
import VueDevtools from 'nativescript-vue-devtools';
import store from './store'
////import Trakt from "./services/trakt.js";
import Fanart from "./services/fanart.js";

Vue.config.silent = false;

//Vue.use(VueDevtools, { host: '192.168.1.2' })
Vue.use(VueDevtools)

////const trakt = new Trakt();
//const fanart = new Fanart();

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

new Vue({
    store,
    data: {
        ////trakt,
    },
    render: h => {
        return h('frame', [h(store.state.services.trakt.traktRefreshToken!=null ? AppInit : TraktAuthorize)])
        //return h('frame', [h(Home)])
    }
}).$start();
