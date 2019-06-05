const REFRESH_MATCH = 'REFRESH_MATCH'
const REMOVE_TEAM = 'REMOVE_TEAM'
const ADD_TEAM = 'ADD_TEAM'
const REMOVE_COUNTRY = 'REMOVE_COUNTRY'
const REMOVE_LEAGUE = 'REMOVE_LEAGUE'

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