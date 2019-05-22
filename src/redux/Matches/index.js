const REFRESH_MATCH = 'REFRESH_MATCH'
const PLAY_MATCH = 'PLAY_MATCH'
const CHANGE_ACTIVE_LEAGUE = 'CHANGE_ACTIVE_LEAGUE'

const initialState = {
    matches: [
        { id:"1", idHome: "1", idAway: "2", win: "-1", league: "1" },
        { id:"2", idHome: "2", idAway: "1", win: "-1", league: "1" }
    ],
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

export const refreshMatch = () => {
    return ({
        type: REFRESH_MATCH,
        payload: {
            reload: true
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
        case CHANGE_ACTIVE_LEAGUE:{

            let { active } = action.payload

            return {
                ...state,
                activeLeague: active
            }
        }
        case PLAY_MATCH: {
          let { whoWin, values } = action.payload

          const { matches } = state
          
          let { lst } = values

          const indLst = matches.findIndex( (mat) => mat.id === lst["id"])

          let tied = []
          let play = []
          let win = []
          let lose = []

          let newMatches = matches.map( ( mtc, indMtc ) => {
              if( indMtc === indLst && whoWin === "none" ){
                  tied.push(lst.idHome)
                  tied.push(lst.idAway)
              } else if( indMtc === indLst ){
                  win.push(lst[whoWin])
                  let whoWin2 = whoWin === "idHome" ? "idAway" : "idHome"
                  lose.push(lst[whoWin2])
              } 
              if( indMtc === indLst ){
                  play.push(lst.idHome)
                  play.push(lst.idAway)
              }
              return {
                  ...mtc,
                  win: indMtc === indLst ? whoWin === "none" ? "0": lst[whoWin] : mtc.win
              }
          } )

          return {
            ...state,
            matches: newMatches,
            lst,
            tied,
            play,
            win,
            lose
          }
        }
        default: return state
    }
}


