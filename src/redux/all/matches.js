const PLAY_MATCH = 'PLAY_MATCH'

const initialState = {
    match: []
}



export const playMatch = id => {
    return ({
        type: PLAY_MATCH,
        payload: {
            id
        }
    })
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PLAY_MATCH:
            return state

        default: return state
    }
}


