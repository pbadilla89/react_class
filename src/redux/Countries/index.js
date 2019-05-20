const ADD_COUNTRY = 'ADD_COUNTRY'
const REMOVE_COUNTRY = 'REMOVE_COUNTRY'
const EDIT_COUNTRY = 'EDIT_COUNTRY'

const initialState = {
    countries: [
        { id: '1', name: 'Inglaterra' }
    ],
    headerCountry: [
        { id: "name", label: "Nombre" }
    ]
}


export const addCountry = ( values ) => {
    return ({
        type: ADD_COUNTRY,
        payload: {
            values
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
        case ADD_COUNTRY:{

            let { name } = action.payload.values

            return {
                ...state,
                countries:[
                    ...state.countries,
                    { id: String(state.countries.length+1), name}
                ]
            }
        }
        case EDIT_COUNTRY:{
          console.log("llego aca")
          let { lst, name } = action.payload.values

          let { countries } = state

          let last_edit = countries.map( ( country ) => {
              let oldName = country.name

              console.log(name)
              console.log(oldName)

              console.log(lst.id)
              console.log(country.id)
              console.log(country.id === lst.id)

              if( country.id === lst.id ){
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

            let last_remove = countries.filter( ( country ) => country.id !== lst.id )

            return {
                ...state,
                countries: last_remove
            }
        }
        default: return state
    }
}


