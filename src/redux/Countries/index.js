const ADD_COUNTRY = 'ADD_COUNTRY'
const REMOVE_COUNTRY = 'REMOVE_COUNTRY'
const EDIT_COUNTRY = 'EDIT_COUNTRY'

const initialState = {
    countries: [
        { id: '1', name: 'Germany' },
        { id: '2', name: 'England' }
    ],
    headerCountry: [
        { id: "name", label: "Name" }
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

            let { countries } = state

            let newId = 1

            for( let nid = 0; nid < countries.length; nid++ ){
                newId = parseInt(countries[nid]["id"]) > newId ? parseInt(countries[nid]["id"]) : newId
            }

            return {
                ...state,
                countries:[
                    ...state.countries,
                    { id: String(newId+1), name}
                ]
            }
        }
        case EDIT_COUNTRY:{
          let { lst, name } = action.payload.values

          let { countries } = state

          let last_edit = countries.map( ( country ) => {
              let oldName = country.name

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
            let removed = countries.filter( ( country ) => country.id === lst.id )[0]

            return {
                ...state,
                countries: last_remove,
                removed
            }
        }
        default: return state
    }
}


