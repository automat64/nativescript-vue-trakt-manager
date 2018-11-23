import Vue from 'nativescript-vue';

import TraktAuthorize from '@/components/TraktAuthorize';
import AppInit from '@/components/AppInit';
import Home from '@/components/Home';
import UserLists from '@/components/UserLists';
import Settings from '@/components/Settings';
import Search from '@/components/Search';

const routes = {
    AppInit,
    TraktAuthorize,
    Home,
    UserLists,
    Settings,
    Search
}

Vue.prototype.$routes = routes;

export default routes