import { combineReducers } from 'redux'

import TeamsReducer from './Teams'
import MatchesReducer from './Matches'
import crossSliceReducer from './CrossSlice'


const REFRESH_MATCH = 'REFRESH_MATCH'
const PLAY_MATCH = 'PLAY_MATCH'

const combinedReducer = combineReducers({
  TeamsReducer,
  MatchesReducer
})

const rootReducer = (state, action) => {
  const intermediateState = combinedReducer(state, action)
  const finalState = crossSliceReducer(intermediateState, action)
  return finalState
}

export default rootReducer