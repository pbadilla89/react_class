const REFRESH_MATCH = 'REFRESH_MATCH'
const PLAY_MATCH = 'PLAY_MATCH'

const initialState = {
matches: [
    { id:"1", idHome: "1", idAway: "2", win: "-1" },
    { id:"2", idHome: "2", idAway: "1", win: "-1" }
],
headerMatch: [
    { id:"home", label: "Home Team" },
    { id:"away", label: "Away Team" }
]
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
        case PLAY_MATCH: {
          let { whoWin, values } = action.payload

          const { matches } = state
          
          let { lst, indLst } = values

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


