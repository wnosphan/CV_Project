import { createSelector } from '@reduxjs/toolkit';

export const cvListSelector = (state) => state.cvList;
export const filtersSelector = (state) => state.filters;

export const filteredCvListSelector = createSelector(
    [cvListSelector, filtersSelector],
    (cvList, filters) => {
        const { data, loading, totalPage } = cvList;
        const { searchText, status, university, skill, position } = filters;
    }
);