import { useEffect, useState } from 'react';

import { myCVListApi } from '~/api'
import handleLogError from '~/utils/HandleError'

const getUniversityFilter = () => {
    const university = [];
    myCVListApi.getUniversity()
        .then(response => {
            response.data.forEach((item) => {
                university.push({
                    label: item,
                    value: item
                })
            })
        })
        .catch(error => {
            handleLogError(error)
        })
    return university;
}


const getSkillFilter = () => {
    const skill = [{ value: '', label: 'All' }];
    myCVListApi.getSkill()
        .then(response => {
            response.data.forEach((item) => {
                skill.push({
                    value: item,
                    label: item

                })
            })
        })
        .catch(error => {
            handleLogError(error)
        })
    return skill;

}

const getPositionFilter = () => {
    const pos = [];
    myCVListApi.getPosition()
        .then(response => {
            response.data.forEach((item) => {
                pos.push({
                    label: item,
                    value: item

                })
            })
        })
        .catch(error => {
            handleLogError(error)
        })
    return pos;

}

export const filterService = {
    getUniversityFilter,
    getSkillFilter,
    getPositionFilter,
}

const useFilterData = () => {
    const [filterData, setFilterData] = useState({
        university: [],
        skill: [],
        position: [],
    });

    useEffect(() => {
        setFilterData({
            university: getUniversityFilter(),
            skill: getSkillFilter(),
            position: getPositionFilter(),
        });
    }, []);

    return filterData;
};

export default useFilterData;
