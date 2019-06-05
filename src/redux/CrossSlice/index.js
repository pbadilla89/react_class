const REFRESH_MATCH = 'REFRESH_MATCH'
const PLAY_MATCH = 'PLAY_MATCH'
const REMOVE_TEAM = 'REMOVE_TEAM'
const ADD_TEAM = 'ADD_TEAM'
const REMOVE_COUNTRY = 'REMOVE_COUNTRY'
const REMOVE_LEAGUE = 'REMOVE_LEAGUE'

const calculateScore = ( { tied, play, win, lose, tms } ) => {
  return {
    ...tms,
    pj: play.includes(tms.id) ? tms.pj+1 : tms.pj,
    pe: tied.includes(tms.id) ? tms.pe+1 : tms.pe,
    pg: win.includes(tms.id)  ? tms.pg+1 : tms.pg,
    pp: lose.includes(tms.id)  ? tms.pp+1 : tms.pp,
    pts: tied.includes(tms.id) ? tms.pts+1 : win.includes(tms.id)  ? tms.pts+3 : tms.pts
  }
}

const crossSliceReducer = (state, action) => {
  let now_type = action.type

  now_type = now_type === REMOVE_TEAM? REFRESH_MATCH : now_type === ADD_TEAM? REFRESH_MATCH : now_type

  switch (now_type) {
    case REMOVE_COUNTRY:{

      let { CountriesReducer, TeamsReducer, LeaguesReducer } = state

      const { removed } = CountriesReducer
      const { leagues } = LeaguesReducer
      const { teams } = TeamsReducer

      let leagues_removed = leagues.filter( ( league ) => league.country !== removed.id )

      let teams_removed = teams.filter( ( team ) => team.country !== removed.id )

      return {
        ...state,
        TeamsReducer:{
          ...state.TeamsReducer,
          teams: teams_removed,
          activeLeague: ""
        },
        LeaguesReducer:{
          ...state.LeaguesReducer,
          leagues: leagues_removed
        }
      }
    }
    case REMOVE_LEAGUE:{
      let { TeamsReducer, LeaguesReducer } = state

      const { removed } = LeaguesReducer
      const { teams } = TeamsReducer

      let teams_removed = teams.filter( ( team ) => team.league !== removed.id )

      return {
          ...state,
          TeamsReducer:{
            ...state.TeamsReducer,
            teams: teams_removed,
            activeLeague: ""
          }
      }
    }

    default:
      return state
  }
}

export default crossSliceReducer