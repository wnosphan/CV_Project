import { createSlice } from '@reduxjs/toolkit';

const cvListSlice = createSlice({
    name: 'cvList',
    initialState: {
        data: [],
        totalPage: 1,
        loading: false,
        pageSize: 10,
        editingKey: '',
    },
    reducers: {
        fetchDataBegin: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.data = action.payload.cvs_list;
            state.totalPage = action.payload.total;
            state.loading = false;
        },
        editCv: (state, action) => {
            state.editingKey = action.payload;
        },
    },
});

export default cvListSlice;