import { createSlice } from '@reduxjs/toolkit';

const cvListSlice = createSlice({
    name: 'cvList',
    initialState: {
        data: [],
        loading: false,
        editingKey: '',
        current: 1,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        fetchDataBegin: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.data = action.payload.cvs_list;
            state.loading = false;
            state.total = action.payload.total * state.pageSize;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.current = action.payload;
        },
    },
});

export default cvListSlice;