import { combineReducers } from '@reduxjs/toolkit'
import cvListSlice from './slices/cvListSlice'
import filtersSlice from './slices/filtersSlice';

const rootReducer = combineReducers({
    cvList: cvListSlice.reducer,
    filters: filtersSlice.reducer,
});

export default rootReducer;