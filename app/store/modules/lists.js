const state = {
    traktLists : {
        popularList : [],
        trendingList : [],
        recommendedList : [],
        collectionList : [],
        watchList : [],

    },
    photoLists: {
        hdtvList : [],
        posterList : [],
        backgroundList : [],
    }
}

const mutations = {
    updateList (state, newData) {
        state.traktLists[newData[0]]=newData[1];
    },
    insertItem (state, newData) {
        state.traktLists[newData[0]].unshift(newData[1]);
    },
    removeItem (state, newData) {
        let index = state.traktLists[newData[0]].indexOf(newData[1]);
        state.traktLists[newData[0]].splice(index, 1);
    },
    updateHdtvList (state, newData) {
        state.photoLists['hdtvList'][newData[0]]=newData[1];
    },
    updatePosterList (state, newData) {
        state.photoLists['posterList'][newData[0]]=newData[1];
    },
    updateBackgroundList (state, newData) {
        state.photoLists['backgroundList'][newData[0]]=newData[1].slice(0,5);
    },
}

export default {
    namespaced: true,
    state,
    mutations
}