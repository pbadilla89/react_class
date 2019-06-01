const ADD_LEAGUE = 'ADD_LEAGUE'
const REMOVE_LEAGUE = 'REMOVE_LEAGUE'
const EDIT_LEAGUE = 'EDIT_LEAGUE'

const initialState = {
    leagues: [
        { _id: '1', name: 'Premier League', country: "2" }
    ],
    headerLeague: [
        { id: "name", label: "Name" },
        { id: "country_name", label: "Country" },
    ]
}


export const addLeague = ( values ) => {
    return ({
        type: ADD_LEAGUE,
        payload: {
            values
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
        case ADD_LEAGUE:{

            let { name, country } = action.payload.values

            let { leagues } = state

            let newId = 1

            for( let nid = 0; nid < leagues.length; nid++ ){
                newId = parseInt(leagues[nid]["id"]) > newId ? parseInt(leagues[nid]["id"]) : newId
            }

            return {
                ...state,
                leagues:[
                    ...state.leagues,
                    { id: String(newId+1), name, country }
                ]
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


