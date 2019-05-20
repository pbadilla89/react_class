const ADD_TEAM = 'ADD_TEAM'
const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'

const initialState = {
    teams: [
        { id: '1', name: 'Manchester United', pos: 1, pts: 0, country: "1", pj: 0, pg: 0, pe: 0, pp: 0 },
        { id: '2', name: 'Manchester City', pos: 2, pts: 0, country: "1", pj: 0, pg: 0, pe: 0, pp: 0 }
    ],
    headerTeam: [
        { id: "pos", label: "Pos" },
        { id: "pts", label: "Puntos" },
        { id: "name", label: "Nombre" },
        { id: "pj", label: "Partidos Jugados" },
        { id: "pg", label: "Partidos Ganados" },
        { id: "pe", label: "Partidos Empatados" },
        { id: "pp", label: "Partidos Perdidos" }
    ]
}


export const addTeam = ( values ) => {
    return ({
        type: ADD_TEAM,
        payload: {
            values
        }
    })
}


export const editTeam = ( values ) => {
    return ({
        type: EDIT_TEAM,
        payload: {
            values
        }
    })
}


export const removeTeam = ( values ) => {
    return ({
        type: REMOVE_TEAM,
        payload: {
            values
        }
    })
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TEAM:{

            let { name, country } = action.payload.values

            let { teams } = state

            teams = teams.map( ( lr, indLr ) => {
                return {
                    ...lr,
                    pts: 0,
                    pj: 0,
                    pg: 0,
                    pe: 0,
                    pp: 0,
                    id: String( indLr+1 ),
                    pos: indLr+1
                }
            } )

            return {
                ...state,
                teams:[
                    ...teams,
                    { id: String(state.teams.length+1), name, pos: (state.teams.length+1), country, pg: 0, pe: 0, pp: 0, pts: 0, pj: 0 }
                ]
            }
        }
        case EDIT_TEAM:{
            let { lst, name, country } = action.payload.values

            let last_edit = state.teams.map( ( team ) => {
                let oldName = team.name
                let oldCountry = team.country

                if( team.id === lst.id ){
                    oldName = name
                    oldCountry = country
                }

                return {...team, name: oldName, country: oldCountry}
            } )
            
            return {
                ...state,
                teams: last_edit
            }
        }
        case REMOVE_TEAM:{
            let { lst } = action.payload.values

            let last_remove = state.teams.filter( (team) => team.id !== lst.id )

            last_remove = last_remove.map( ( lr, indLr ) => {

                return {
                    ...lr,
                    pts: 0,
                    pj: 0,
                    pg: 0,
                    pe: 0,
                    pp: 0,
                    id: String( indLr+1 ),
                    pos: indLr+1
                }
            } )

            return {
                ...state,
                teams: last_remove
            }
        }
        default: return state
    }
}


