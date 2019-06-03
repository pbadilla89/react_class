const REMOVE_LEAGUE = 'REMOVE_LEAGUE'
const EDIT_LEAGUE = 'EDIT_LEAGUE'
const RELOAD_LEAGUE = 'RELOAD_LEAGUE'

const initialState = {
    leagues: [],
    countries: [],
    headerLeague: [
        { id: "name", label: "Name" },
        { id: "country_name", label: "Country" },
    ]
}

export const reloadLeague = ( listLeague, blank = true ) => {
  return ({
      type: RELOAD_LEAGUE,
      payload: {
          listLeague,
          blank
      }
  })
}

export const editLeague = ( values ) => {
    return ({
        type: EDIT_LEAGUE,
        payload: {
            values
        }
    })
}


export const removeLeague = ( values ) => {
    return ({
        type: REMOVE_LEAGUE,
        payload: {
            values
        }
    })
}

export default (state = initialState, action) => {

    switch (action.type) {
      case RELOAD_LEAGUE:{
        const { blank, listLeague } = action.payload

        let leagues = [
          ...state.leagues,
          ...listLeague.leagues
        ]

        if(blank) {
          leagues = [
            ...listLeague.leagues
          ]
        }

        return {
          ...state,
          leagues,
          countries: listLeague.leagues
        }
      }
      case EDIT_LEAGUE:{
          let { lst, name, country } = action.payload.values

          let last_edit = state.leagues.map( ( league ) => {
              let oldName = league.name
              let oldCountry = league.country

              if( league.id === lst.id ){
                  oldName = name
                  oldCountry = country
              }

              return {...league, name: oldName, country: oldCountry}
          } )
          
          return {
              ...state,
              leagues: last_edit
          }
      }
      case REMOVE_LEAGUE:{
          let { lst } = action.payload.values

          let last_remove = state.leagues.filter( (league) => league.id !== lst.id )
          let removed = state.leagues.filter( (league) => league.id === lst.id )[0]

          return {
              ...state,
              leagues: last_remove,
              removed
          }
      }
      default: return state
    }
}


