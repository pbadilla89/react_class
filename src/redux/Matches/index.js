const REFRESH_MATCH = 'REFRESH_MATCH'
const PLAY_MATCH = 'PLAY_MATCH'
const CHANGE_ACTIVE_LEAGUE = 'CHANGE_ACTIVE_LEAGUE'

const initialState = {
    teams: [],
    leagues: [],
    matches: [],
    activeLeague: "",
    headerMatch: [
        { id:"home", label: "Home Team" },
        { id:"away", label: "Away Team" }
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

export const refreshMatch = ( listMatches, blank = true ) => {
    return ({
        type: REFRESH_MATCH,
        payload: {
            reload: true,
            listMatches
        }
    })
}

export const playMatch = ( values, whoWin) => {
    return ({
        type: PLAY_MATCH,
        payload: {
            values,
            whoWin
        }
    })
}

export default (state = initialState, action) => {
    switch (action.type) {
      case REFRESH_MATCH: {

        let { listMatches } = action.payload
  
        let { leagues, matches } = listMatches

        let new_matches = []

        let activeLeague = ""

        if(leagues.length > 0){
          let activeLeague = leagues[0]["_id"]

          console.log(matches)
      
          let matches2 = matches.filter( ( mat ) => String(mat.league._id) === String(activeLeague) )
          console.log(matches2)
      
          new_matches = matches2.map( ( mat ) => {
            const homeTeam = mat.idHome
            const awayTeam = mat.idAway

            console.log(homeTeam)
            console.log(awayTeam)
      
            const options = [
              { id: "1", value: "idHome", label: `Gana ${homeTeam.name}` },
              { id: "2", value: "none", label: `Empatan` },
              { id: "3", value: "idHome", label: `Gana ${awayTeam.name}` }
            ]
      
            const home_next = ""
            const away_next = ""
            return { 
              ...mat,
              home: homeTeam.name,
              away: awayTeam.name,
              options,
              home_next,
              away_next }
          } )
        }
  
        return {
          ...state,
          matches: new_matches,
          activeLeague
        }
      }
        case CHANGE_ACTIVE_LEAGUE:{

            let { active } = action.payload

            return {
                ...state,
                activeLeague: active
            }
        }

        default: return state
    }
}


