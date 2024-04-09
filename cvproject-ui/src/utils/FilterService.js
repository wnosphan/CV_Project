import { myCVListApi } from '~/api'
import handleLogError from './HandleError'

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
    const skill = [];
    myCVListApi.getSkill()
        .then(response => {
            response.data.forEach((item) => {
                skill.push({
                    label: item,
                    value: item

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