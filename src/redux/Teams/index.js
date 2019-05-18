const ADD_TEAM = 'ADD_TEAM'
const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'

const initialState = {
    teams: [
        { id: '1', name: 'Manchester United', pos: 1, pts: 0, country: "Inglaterra", pj: 0, pg: 0, pe: 0, pp: 0 },
        { id: '2', name: 'Manchester City', pos: 2, pts: 0, country: "Inglaterra", pj: 0, pg: 0, pe: 0, pp: 0 }
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
            let { values } = action.payload

            let last_edit = state.teams.map( ( team, indTeam ) => {
                let name = team.name
                let country = team.country

                if( team.id === values.lst.id ){
                    name = values.name
                    country = values.country
                }

                return {...team, name, country}
            } )
            
            return {
                ...state,
                teams: last_edit
            }
        }
        case REMOVE_TEAM:{
            let { values } = action.payload

            let last_remove = state.teams.filter( (team) => team.id !== values.lst.id )

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


