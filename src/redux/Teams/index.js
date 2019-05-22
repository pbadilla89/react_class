const ADD_TEAM = 'ADD_TEAM'
const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'
const CHANGE_ACTIVE_LEAGUE = 'CHANGE_ACTIVE_LEAGUE'

const initialState = {
    teams: [
        { id: '1', name: 'Manchester United', pos: 1, pts: 0, country: "2", league: "1", pj: 0, pg: 0, pe: 0, pp: 0 },
        { id: '2', name: 'Manchester City', pos: 2, pts: 0, country: "2", league: "1", pj: 0, pg: 0, pe: 0, pp: 0 }
    ],
    activeLeague: "",
    headerTeam: [
        { id: "pos", label: "Pos" },
        { id: "pts", label: "Points" },
        { id: "name", label: "Name" },
        { id: "pj", label: "Played Matches" },
        { id: "pg", label: "Won Matches" },
        { id: "pe", label: "Tied Matches" },
        { id: "pp", label: "Lost Matches" }
    ]
}

export const changeActiveLeague = ( active ) => {
    return ({
        type: CHANGE_ACTIVE_LEAGUE,
        payload: {
            active
        }
    })
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
        case CHANGE_ACTIVE_LEAGUE:{

            let { active } = action.payload

            return {
                ...state,
                activeLeague: active
            }
        }
        case ADD_TEAM:{

            let { name, country, league } = action.payload.values

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

            let newId = 1

            for( let nid = 0; nid < teams.length; nid++ ){
                newId = parseInt(teams[nid]["id"]) > newId ? parseInt(teams[nid]["id"]) : newId
            }

            return {
                ...state,
                teams:[
                    ...teams,
                    { id: String(newId+1), name, pos: (state.teams.length+1), country, pg: 0, pe: 0, pp: 0, pts: 0, pj: 0, league }
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


