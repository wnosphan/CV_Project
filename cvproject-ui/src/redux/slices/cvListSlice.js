import { createSlice } from '@reduxjs/toolkit';

const cvListSlice = createSlice({
    name: 'cvList',
    initialState: {
        data: [],
        loading: false,
        editingKey: '',
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
    },
    reducers: {
        fetchDataBegin: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.data = action.payload.cvs_list;
            state.loading = false;
            state.pagination.total = action.payload.total * state.pagination.pageSize;
        },
        setPageSize: (state, action) => {
            state.pagination.pageSize = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination.pageSize = action.payload.pageSize;
            state.pagination.total = action.payload.total;
        },
        setPaginationCurrent: (state, action) => {
            state.pagination.current = action.payload;
        }
    },
});

export default cvListSlice;