import { createSlice } from '@reduxjs/toolkit';


const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        searchText: '',
        status: '',
        university: [],
        skill: [],
        position: [],
    },
    reducers: {
        searchTextFilterChange: (state, action) => {
            state.searchText = action.payload;
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload;
        },
        universityFilterChange: (state, action) => {
            state.university = action.payload;
        },
        skillFilterChange: (state, action) => {
            state.skill = action.payload;
        },
        positionFilterChange: (state, action) => {
            state.position = action.payload;
        },
    }

});

export default filtersSlice;