const REMOVE_COUNTRY = 'REMOVE_COUNTRY'
const EDIT_COUNTRY = 'EDIT_COUNTRY'
const RELOAD_COUNTRY = 'RELOAD_COUNTRY'

const initialState = {
    countries: [],
    headerCountry: [
        { id: "name", label: "Name" }
    ]
}

export const reloadCountry = ( listCountry, blank = true ) => {
  return ({
      type: RELOAD_COUNTRY,
      payload: {
          listCountry,
          blank
      }
  })
}

export const editCountry = ( values ) => {
    return ({
        type: EDIT_COUNTRY,
        payload: {
            values
        }
    })
}


export const removeCountry = ( values ) => {
    return ({
        type: REMOVE_COUNTRY,
        payload: {
            values
        }
    })
}

export default (state = initialState, action) => {

    switch (action.type) {
        case RELOAD_COUNTRY:{
          const { blank, listCountry } = action.payload

          let countries = [
            ...state.countries,
            ...listCountry.countries
          ]

          if(blank) {
            countries = [
              ...listCountry.countries
            ]
          }

          return {
            ...state,
            countries
          }
        }
        case EDIT_COUNTRY:{
          let { lst, name } = action.payload.values

          let { countries } = state

          let last_edit = countries.map( ( country ) => {
              let oldName = country.name

              if( country.id === lst._id ){
                oldName = name
              }

              return {...country, name: oldName}
          } )
          
          return {
              ...state,
              countries: last_edit
          }
        }
        case REMOVE_COUNTRY:{
            let { lst } = action.payload.values

            let { countries } = state

            let last_remove = countries.filter( ( country ) => country._id !== lst._id )
            let removed = countries.filter( ( country ) => country._id === lst._id )[0]

            return {
                ...state,
                countries: last_remove,
                removed
            }
        }
        default: return state
    }
}


