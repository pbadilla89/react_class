const PLAY_MATCH = 'PLAY_MATCH'

const initialState = {
    match: [
        { id:"1", home: 1, away: 2, win: 1 }
    ],
    header: [
        { id:"1", label: "Equipo Local" },
        { id:"2", label: "Equipo Visita" },
        { id:"3", label: "Jugar", action: "play" }
    ]
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


