import {
  reloadLeague
} from './index'

import { post } from 'axios'

const HostApi = "http://andbytes.com:2889"

export const listLeagues = () =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/listleagues`,{}, config)
  console.log(res)
  dispatch(reloadLeague(res.data))
}

export const saveLeague = ( country ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/addLeague`,country, config)
  console.log(res)
  dispatch(reloadLeague(res.data, false))
}

export const removeLeague = ( leagues ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/removeLeague`, leagues.lst, config)
  console.log(res)
  dispatch(listLeagues())
}
