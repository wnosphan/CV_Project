import { createSlice } from '@reduxjs/toolkit';



const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        full_name: '',
        status: '',
        university: [],
        skill: [],
        apply_position: [],
        training_system: [],
        gpa: '',
    },
    reducers: {
        nameFilterChange: (state, action) => {
            state.full_name = action.payload;
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
            state.apply_position = action.payload;
        },
        trainingSystemFilterChange: (state, action) => {
            state.training_system = action.payload;
        },
        gpaFilterChange: (state, action) => {
            state.gpa = action.payload;
        },
    }
});

export default filtersSlice;