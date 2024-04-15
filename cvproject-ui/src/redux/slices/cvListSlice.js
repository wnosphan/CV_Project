import { createSlice } from '@reduxjs/toolkit';

const cvListSlice = createSlice({
    name: 'cvList',
    initialState: {
        data: [],
        loading: false,
        editingKey: '',
        totalPage: 0,
        pageSize: 10,
    },
    reducers: {
        fetchDataBegin: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.data = action.payload.cvs_list;
            state.loading = false;
            state.totalPage = action.payload.total;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        }
    },
});

export default cvListSlice;