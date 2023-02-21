const { atom } = require("recoil");

export const rightListState = atom({
    key: 'rightListState',
    default: [],
})

export const leftListState = atom({
    key: 'leftListState',
    default: [],
})

export const upListState = atom({
    key: 'upListState',
    default: [],
})

export const downListState = atom({
    key: 'downListState',
    default: [],
})

export const matchesViewState = atom({
    key: 'matchesViewState',
    default: {currentView: "Friends"}
}) 

export const currentUserState = atom({
    key: 'currentUserState',
    default: {loading: true}
})

export const userFriendsState = atom({
    key: 'userFriendsState',
    default: {}
})

export const userMatchesState = atom({
    key: 'userMatchesState',
    default: {
        loading: true,
        matchList: []
    }
})

export const moviesMatchesState = atom({
    key: 'movieMatchesState',
    default: {loading: true}
})

export const movieSliceState = atom({
    key: 'movieSliceState',
    default: [0,9]
})

// export const friendMatchSliceState = atom({
//     key: 'friendMatchSlice',
//     default: [0,4]
// })

// export const fmSliceState = atom({
//     key: 'fmSliceState',
//     default: {}
// })
