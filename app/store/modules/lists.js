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
    updatePhoto (state, newData) {
        console.log("updated list for "+newData[0]+" with "+newData[1])
        state.photoLists['hdtvList'][newData[0]]=newData[1];
        debugger;
    },
}

export default {
    namespaced: true,
    state,
    mutations
}