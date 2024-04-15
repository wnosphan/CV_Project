import { useEffect, useState } from 'react'
import { Card, Row, Col, Typography, Input, Select, Tooltip, Button } from 'antd'
import { useDispatch } from 'react-redux';

import useFilterData from './FilterService';
import filtersSlice from '~/redux/slices/filtersSlice';


const statusItems = [
    {
        value: '',
        label: 'All',
    },
    {
        value: 'pass',
        label: 'Pass',
    },
    {
        value: 'notpass',
        label: 'Not Pass',
    },
    {
        value: 'inprogress',
        label: 'Inprogress',
    },
]

const SearchBox = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const [skill, setSkill] = useState('');
    const filterData = useFilterData();
    useEffect(() => {
        dispatch(filtersSlice.actions.nameFilterChange(searchText));
        dispatch(filtersSlice.actions.statusFilterChange(status));
        dispatch(filtersSlice.actions.skillFilterChange(skill));
    }, [dispatch, searchText, status, skill]);


    console.log(filterData);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleStatusChange = (value) => {
        setStatus(value);
    }

    const handleSkillChange = (value) => {
        setSkill(value);
    }
    const handleUniversityChange = (value) => {
        dispatch(filtersSlice.actions.universityFilterChange(value));
    }

    const handlePositionChange = (value) => {
        dispatch(filtersSlice.actions.positionFilterChange(value));
    }

    const clearFilter = () => {
        setSearchText('');
        setSkill('');
        setStatus('');
        dispatch(filtersSlice.actions.nameFilterChange(''));
        dispatch(filtersSlice.actions.statusFilterChange(''));
        dispatch(filtersSlice.actions.skillFilterChange(''));
        dispatch(filtersSlice.actions.universityFilterChange([]));
        dispatch(filtersSlice.actions.positionFilterChange([]));
        window.location.reload();
    }

    return (

        <Card className='mr-4 shadow-lg'>
            <Row justify={'center'}>
                <Col span={24} className='text-center'>
                    <Typography.Title
                        style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 5, color: '#4f6f52' }}
                    >
                        Filter
                    </Typography.Title>
                </Col>
                <Col span={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}
                    >
                        Search
                    </Typography.Paragraph>
                    <Input.Search value={searchText} onChange={handleSearchTextChange} placeholder='Search by name' allowClear />
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}
                    >
                        Filter By Status
                    </Typography.Paragraph>
                    <Select style={{ width: "100%" }}
                        defaultValue={status}
                        options={statusItems}
                        value={status}
                        onChange={handleStatusChange} />
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}
                    >
                        Filter By Skill
                    </Typography.Paragraph>
                    <Select
                        // mode='multiple'
                        placeholder='Please select skill'
                        style={{ width: '100%' }}
                        onChange={handleSkillChange}
                        defaultValue={skill}
                    >
                        {filterData.skill.map((item, key) => {
                            return <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}
                    >
                        Filter By University
                    </Typography.Paragraph>
                    <Select
                        mode='multiple'
                        allowClear
                        placeholder='Please select university'
                        style={{ width: '100%' }}
                        maxTagPlaceholder={(omittedValues) => (
                            <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                                <span>...</span>
                            </Tooltip>
                        )}
                        maxTagCount={'responsive'}
                        onChange={handleUniversityChange}


                    >
                        {filterData.university.map((item, key) => {
                            return <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col sm={24}>
                    <Typography.Paragraph
                        style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}
                    >
                        Filter By Position
                    </Typography.Paragraph>
                    <Select
                        mode='multiple'
                        allowClear
                        placeholder='Please select position'
                        style={{ width: '100%' }}
                        maxTagPlaceholder={(omittedValues) => (
                            <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                                <span>...</span>
                            </Tooltip>
                        )}
                        maxTagCount={'responsive'}
                        onChange={handlePositionChange}


                    >
                        {filterData.position.map((item, key) => {
                            return <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col className='text-center mt-6' sm={24}>
                    <Button size='large' onClick={clearFilter}>Clear filter</Button>
                </Col>
            </Row>
        </Card>

    )
}

export default SearchBox