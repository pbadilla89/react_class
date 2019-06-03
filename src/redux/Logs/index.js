const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const CHANGELOADING = 'CHANGELOADING'

const initialState = {
    isLogin: false,
    openModal: true,
    is_loading: true
}

export const logIn = ( values ) => {
    return ({
        type: LOGIN,
        payload: { values }
    })
}

export const logOut = ( ) => {
    return ({
        type: LOGOUT,
        payload: {}
    })
}

export const changeLoading = ( is_loading ) => {
    return ({
        type: CHANGELOADING,
        payload: { is_loading }
    })
}

export default (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:{

          return {
            ...state,
            isLogin: true,
            openModal: false,
            is_loading: false
          }
        }
        case LOGOUT:{
          localStorage.removeItem('token')
          return {
            ...state,
            openModal: true,
            isLogin: false,
            is_loading: false
          }
        }
        case CHANGELOADING:{

          const { is_loading } = action.payload

          return {
            ...state,
            is_loading
          }
        }
        default: return state
    }
}


