const REMOVE_TEAM = 'REMOVE_TEAM'
const EDIT_TEAM = 'EDIT_TEAM'
const RELOAD_TEAM = 'RELOAD_TEAM'
const CHANGE_ACTIVE_LEAGUE = 'CHANGE_ACTIVE_LEAGUE'

const initialState = {
    teams: [],
    countries: [],
    leagues: [],
    activeLeague: "",
    headerTeamTable: [
        { id: "pos", label: "Pos" },
        { id: "pts", label: "Points" },
        { id: "name", label: "Name" },
        { id: "pj", label: "Played Matches" },
        { id: "pg", label: "Won Matches" },
        { id: "pe", label: "Tied Matches" },
        { id: "pp", label: "Lost Matches" }
    ],
    headerTeam: [
        { id: "name", label: "Name" },
        { id: "country_name", label: "Country" },
        { id: "league_name", label: "League" }
    ]
}

export const reloadTeam = ( listTeam, blank = true ) => {
  return ({
      type: RELOAD_TEAM,
      payload: {
          listTeam,
          blank
      }
  })
}

export const changeActiveLeague = ( active ) => {
    return ({
        type: CHANGE_ACTIVE_LEAGUE,
        payload: {
            active
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
      case RELOAD_TEAM:{
        const { blank, listTeam } = action.payload

        let teams = [
          ...state.teams,
          ...listTeam.teams
        ]

        if(blank) {
          teams = [
            ...listTeam.teams
          ]
        }

        let inOrder = teams.sort((a, b) => (a.pts < b.pts) ? 1 : -1)

        return {
          ...state,
          teams: inOrder,
          countries: listTeam.countries,
          leagues: listTeam.leagues
        }
      }
        case CHANGE_ACTIVE_LEAGUE:{

            let { active } = action.payload

            return {
                ...state,
                activeLeague: active
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


