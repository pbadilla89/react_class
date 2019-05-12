import { combineReducers } from 'redux'

import TeamsReducer from './all/teams'
import MatchesReducer from './all/matches'

export default combineReducers({
  TeamsReducer,
  MatchesReducer
  })