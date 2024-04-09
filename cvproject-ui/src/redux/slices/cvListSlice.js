import { createSlice } from '@reduxjs/toolkit';

const cvListSlice = createSlice({
    name: 'cvList',
    initialState: {
        data: [],
        loading: false,
        editingKey: '',
        totalPage: 1,
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
        }
    },
});

export default cvListSlice;