import {
  reloadCountry
} from './index'

import { post } from 'axios'

const HostApi = "http://andbytes.com:2889"

export const listCountries = () =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem("token")
    }
  }
  const res = await post(`${HostApi}/api/listcountries`,{}, config)

  dispatch(reloadCountry(res.data))
}

export const saveCountry = ( country ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem("token")
    }
  }

  const params = {
    name: country.name
  }

  if( typeof country.lst != "undefined"){
    params._id = country.lst._id
  }

  const res = await post(`${HostApi}/api/saveCountry`,params, config)
  console.log(res)
  dispatch(listCountries())
}

export const removeCountry = ( countries ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem("token")
    }
  }
  const res = await post(`${HostApi}/api/removeCountry`, countries.lst, config)
  console.log(res)
  dispatch(listCountries())
}
