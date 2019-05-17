const ADD_TEAM = 'ADD_TEAM'
const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'

const REFRESH_MATCH = 'REFRESH_MATCH'
const PLAY_MATCH = 'PLAY_MATCH'

const initialState = {
    teams: [
        { id: '1', name: 'Manchester United', pos: 1, country: "Inglaterra", pj: 0, pg: 0, pe: 0, pp: 0 },
        { id: '2', name: 'Manchester City', pos: 2, country: "Inglaterra", pj: 0, pg: 0, pe: 0, pp: 0 }
    ],
    headerTeam: [
        { id: "pos", label: "Pos" },
        { id: "name", label: "Nombre" },
        { id: "pj", label: "Partidos Jugados" },
        { id: "pg", label: "Partidos Ganados" },
        { id: "pe", label: "Partidos Empatados" },
        { id: "pp", label: "Partidos Perdidos" }
    ],
    matches: [
        { id:"1", home: "1", away: "2", win: "-1" },
        { id:"2", home: "2", away: "1", win: "-1" }
    ],
    headerMatch: [
        { id:"home", label: "Equipo Local" },
        { id:"away", label: "Equipo Visita" }
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

export const refreshMatch = () => {
    console.log("vvrgvggbgrb")
    return ({
        type: REFRESH_MATCH,
        payload: {
            reload: true
        }
    })
}

export const playMatch = ( values, props) => {
    return ({
        type: PLAY_MATCH,
        payload: {
            values,
            props
        }
    })
}

export default (state = initialState, action) => {

    let values

    if (typeof action.payload != "undefined"){
        values = action.payload.values
    }
    

    switch (action.type) {
        case ADD_TEAM:

            let { name, country } = values

            state = {
                ...state,
                teams:[
                    ...state.teams,
                    { id: String(state.teams.length+1), name, pos: (state.teams.length+1), country, pg: 0, pe: 0, pp: 0 }
                ]
            }

            return state
        case EDIT_TEAM:

            let last_edit = state.teams.map( ( team, indTeam ) => {
                let name = team.name
                let country = team.country

                if( team.id === values.lst.id ){
                    name = values.name
                    country = values.country
                }

                return {...team, name, country}
            } )
            
            state = {
                ...state,
                teams: last_edit
            }

            return state
        case REMOVE_TEAM:

            let last_remove = state.teams.filter( (team) => team.id !== values.lst.id )

            last_remove = last_remove.map( ( lr, indLr ) => {
                lr.id = String( indLr+1 )
                lr.pos = indLr+1

                return lr
            } )
            
            state = {
                ...state,
                teams: last_remove,
                matches: []
            }

            return state
        case REFRESH_MATCH: 
            let { teams, matches } = state

            let newTms = teams.map( ( tms, indTms ) => {
                return {
                    ...tms,
                    pj: 0,
                            pg: 0,
                            pe: 0,
                            pp: 0
                }
            })

            state = {
                ...state,
                matches: [],
                teams: newTms
            }
            
            teams.map( ( tms ) => {
                teams.map( ( tms2 ) => {

                    let founded = false
                    matches.map( ( mtc ) => {
                        if( tms.id === tms2.id ){
                            founded = true
                        }
                    } )

                    if(!founded){
                        state = {
                            ...state,
                            matches: [
                                ...state.matches,
                                { id: String( state.matches.length+1 ), home: tms.id, away: tms2.id, win: "-1" }
                            ]
                        }
                    }
                } ) 
            } )

            return state
        case PLAY_MATCH: 

            let props = action.payload.props

            
            let { lst, indLst } = values

            let tied = []
            let play = []
            let win = []
            let lose = []

            let newMatches = state.matches.map( ( mtc, indMtc ) => {
                if( indMtc === indLst && props === "none" ){
                    tied.push(lst.idHome)
                    tied.push(lst.idAway)
                } else if( indMtc === indLst ){
                    win.push(lst[props])
                    let props2 = props === "idHome" ? "idAway" : "idHome"
                    lose.push(lst[props2])
                } 
                if( indMtc === indLst ){
                    play.push(lst.idHome)
                    play.push(lst.idAway)
                }
                return {
                    ...mtc,
                    win: indMtc === indLst ? props === "none" ? "0": lst[props] : mtc.win
                }
            } )

            console.log(play)
            let newTeams = state.teams.map( ( tms, indTms ) => {
                return {
                    ...tms,
                    pj: play.includes(tms.id) ? tms.pj+1 : tms.pj,
                    pe: tied.includes(tms.id) ? tms.pe+1 : tms.pe,
                    pg: win.includes(tms.id)  ? tms.pg+1 : tms.pg,
                    pp: lose.includes(tms.id)  ? tms.pp+1 : tms.pp
                }
            } )

            console.log(newTeams)

            state = {
                ...state,
                matches: newMatches,
                teams: newTeams
            }

            return state

        default: return state
    }
}


