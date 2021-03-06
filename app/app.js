import Vue from "nativescript-vue";
import AppInit from "./components/AppInit";
import TraktAuthorize from "./components/TraktAuthorize";
import Home from "./components/Home";
import VueDevtools from 'nativescript-vue-devtools';
import store from './store'
import router from './router'
import RadListView from 'nativescript-ui-listview/vue';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';
import { Feedback, FeedbackType } from "nativescript-feedback";
import { Carousel, CarouselItem } from "nativescript-carousel";
              
Vue.config.silent = false;

//Vue.use(VueDevtools, { host: '192.168.1.2' })
Vue.use(VueDevtools);
Vue.use(RadListView);
Vue.use(RadSideDrawer);
Vue.prototype.$feedback = new Feedback()
// Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
// Vue.registerElement('RadListView', () => require('nativescript-ui-listview').RadListView)
Vue.registerElement("Carousel", () => require("nativescript-carousel").Carousel); 
Vue.registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);

new Vue({
    store,
    data: {

    },
    render: h => {
        //return h('frame', [h(store.state.services.trakt.traktRefreshToken!=null ? Home : AppInit)])
        return h('frame', [h(AppInit)])
    }
}).$start();
