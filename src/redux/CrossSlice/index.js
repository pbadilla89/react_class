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
    case REFRESH_MATCH: {

      let { teams } = state.TeamsReducer
      let { leagues } = state.LeaguesReducer

      teams = teams.map( ( tms, indTms ) => {
          return {
              ...tms,
              pts: 0,
              pj: 0,
              pg: 0,
              pe: 0,
              pp: 0
          }
      })

      let newId = 1
      let matches2 = []

      for(let indLeg = 0; indLeg < leagues.length; indLeg++){
        let newTeams = teams.filter( (tms) => tms.league === leagues[indLeg].id )
        for(let indTms = 0; indTms < newTeams.length; indTms++){
          let tms = newTeams[indTms]
          for(let indTms2 = 0; indTms2 < newTeams.length; indTms2++){
            let tms2 = newTeams[indTms2]
            let founded = tms.id === tms2.id? true : false
  
            if(!founded){
              matches2.push({ id: String( newId++ ), idHome: tms.id, idAway: tms2.id, win: "-1", league: leagues[indLeg].id })
            }
          }
        }
      }

      return {
        ...state,
        TeamsReducer:{
          ...state.TeamsReducer,
          teams
        },
        MatchesReducer:{
          ...state.MatchesReducer,
          matches: matches2
        }
      }
    }
    case PLAY_MATCH: {

      const { tied, play, win, lose, lst } = state.MatchesReducer
      const { teams } = state.TeamsReducer

      const idHome = teams.findIndex( (tms) => tms.id === lst["idHome"])
      const idAway = teams.findIndex( (tms) => tms.id === lst["idAway"])

      teams[idHome] = calculateScore( { tied, play, win, lose, tms: teams[idHome] } )
      teams[idAway] = calculateScore( { tied, play, win, lose, tms: teams[idAway] } )

      let inOrder = teams.sort((a, b) => (a.pts < b.pts) ? 1 : -1)

      inOrder = inOrder.map( (tms, indTms) => {
        return { ...tms, pos: indTms+1 }
      } )

      return {
          ...state,
          TeamsReducer:{
            ...state.TeamsReducer,
            teams: inOrder
          }
      }
    }
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