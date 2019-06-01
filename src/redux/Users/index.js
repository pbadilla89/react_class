const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'
const RELOAD_USER = 'RELOAD_USER'

const initialState = {
    users: [],
    headerUser: [
        { id: "name", label: "Name" },
        { id: "lastname", label: "Lastname" },
        { id: "email", label: "Email" }
    ]
}

export const reloadUser = ( listUser, blank = true ) => {
    return ({
        type: RELOAD_USER,
        payload: {
            listUser,
            blank
        }
    })
}

export const editUser = ( values ) => {
    return ({
        type: EDIT_USER,
        payload: {
            values
        }
    })
}

export const removeUser = ( values ) => {
    return ({
        type: REMOVE_USER,
        payload: {
            values
        }
    })
}

export default (state = initialState, action) => {

    switch (action.type) {
        case RELOAD_USER:{
          const { blank, listUser } = action.payload

          let users = [
            ...state.users,
            ...listUser.users
          ]

          if(blank) {
            users = [
              ...listUser.users
            ]
          }

          return {
            ...state,
            users
          }
        }
        case EDIT_USER:{
            
          return {
            ...state
          }
        }
        case REMOVE_USER:{
          return {
            ...state
          }
        }
        default: return state
    }
}


