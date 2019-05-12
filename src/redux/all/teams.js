const ADD_TEAM = 'ADD_TEAM'
const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'
const PLAY_MATCH = 'PLAY_MATCH'

const initialState = {
    teams: [
    { id: '1', name: 'Manchester United', pos: 1, pais: "Inglaterra", pg: 0, pe: 0, pp: 0 }
    ],
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


export const addTeam = id => {
    return ({
        type: ADD_TEAM,
        payload: {
            id
        }
    })
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:
            return state

        default: return state
    }
}


