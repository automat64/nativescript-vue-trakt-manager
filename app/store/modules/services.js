import Fanart from "../../services/fanart.js";
import Trakt from "../../services/trakt.js";
const fanart = new Fanart();
const trakt = new Trakt();
const state = {
    fanart,
    trakt,
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    mutations
}