import {
  refreshMatch
} from './index'
import { listTeams } from '../../redux/Teams/thunks'

import { post } from 'axios'

const HostApi = "http://andbytes.com:2889"

export const listMatches = () =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/listMatches`,{}, config)
  dispatch(refreshMatch(res.data))
}

export const playMatch = ( values, whoWin ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let { lst } = values

  lst.win = whoWin === "none" ? "0" : whoWin

  console.log(lst)
  console.log(whoWin)

  const res = await post(`${HostApi}/api/playMatch`,{match: lst}, config)
  dispatch(listMatches())
}

export const reloadMatch = ( ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const res = await post(`${HostApi}/api/refreshMatch`,{}, config)
  dispatch(listMatches())
  dispatch(listTeams())
}