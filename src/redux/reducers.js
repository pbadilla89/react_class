import { combineReducers } from 'redux'

import TeamsReducer from './Teams'
import MatchesReducer from './Matches'
import CountriesReducer from './Countries'
import LeaguesReducer from './Leagues'
import crossSliceReducer from './CrossSlice'

const combinedReducer = combineReducers({
  TeamsReducer,
  MatchesReducer,
  CountriesReducer,
  LeaguesReducer
})

const rootReducer = (state, action) => {
  const intermediateState = combinedReducer(state, action)
  const finalState = crossSliceReducer(intermediateState, action)
  return finalState
}

export default rootReducer