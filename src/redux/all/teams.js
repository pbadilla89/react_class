const ADD_TEAM = 'ADD_TEAM'
const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'

const initialState = {
    teams: [
        { id: '1', name: 'Manchester United', pos: 1, country: "Inglaterra", pg: 0, pe: 0, pp: 0 },
        { id: '2', name: 'Manchester City', pos: 2, country: "Inglaterra", pg: 0, pe: 0, pp: 0 }
    ],
    headers: [
        { id: "pos", label: "Pos" },
        { id: "name", label: "Name" }
    ]
}


export const addTeam = values => {
    return ({
        type: ADD_TEAM,
        payload: {
            values
        }
    })
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:

            let { name, country } = action.payload.values

            state = {
                ...state,
                teams:[
                    ...state.teams,
                    { id: String(state.teams.length+1), name, pos: (state.teams.length+1), country, pg: 0, pe: 0, pp: 0 }
                ]
            }
            return state

        default: return state
    }
}


