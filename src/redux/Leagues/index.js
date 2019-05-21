const ADD_LEAGUE = 'ADD_LEAGUE'
const REMOVE_LEAGUE = 'REMOVE_LEAGUE'
const EDIT_LEAGUE = 'EDIT_LEAGUE'

const initialState = {
    leagues: [
        { id: '1', name: 'Premier League', idCountry: "2" }
    ],
    headerLeague: [
        { id: "name", label: "Name" },
        { id: "country", label: "Country" },
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

            return {
                ...state,
                leagues:[
                    ...state.leagues,
                    { id: String(state.leagues.length+1), name, country }
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

            return {
                ...state,
                leagues: last_remove
            }
        }
        default: return state
    }
}


