import { createSlice } from '@reduxjs/toolkit';



const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        name: '',
        status: '',
        university: [],
        skill: [],
        position: [],
    },
    reducers: {
        nameFilterChange: (state, action) => {
            state.name = action.payload;
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