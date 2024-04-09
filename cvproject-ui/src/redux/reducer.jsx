import { combineReducers } from '@reduxjs/toolkit'
import cvListSlice from './slices/cvs/cvListSlice'

const rootReducer = combineReducers({
    cvList: cvListSlice.reducer,
});

export default rootReducer;