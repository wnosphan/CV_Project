import { useEffect, useState } from 'react'
import { Card, Row, Col, Typography, Input, Select, Tooltip, Button } from 'antd'
import { useDispatch } from 'react-redux';

import { filterService } from '~/utils/FilterService';
import filtersSlice from '~/redux/slices/filtersSlice';


const optionItems = [
    {
        value: '',
        label: 'All',
    },
    {
        value: 'pass',
        label: 'Pass',
    },
    {
        value: 'not_pass',
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
    // const [filterData, setFilterData] = useState({
    //     university: [],
    //     skill: [],
    //     position: [],
    // });

    useEffect(() => {
        // setFilterData(prev => {
        //     return {
        //         ...prev,
        //         university: filterService.getUniversityFilter(),
        //         skill: filterService.getSkillFilter(),
        //         position: filterService.getPositionFilter(),
        //     }
        // })
        dispatch(filtersSlice.actions.nameFilterChange(searchText));
        dispatch(filtersSlice.actions.statusFilterChange(status));
    }, [searchText, status, dispatch]);


    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleStatusChange = (value) => {
        setStatus(value);
    }

    // const handleUniversityChange = (value) => {
    //     dispatch(filtersSlice.actions.universityFilterChange(value));
    // }

    // const handleSkillChange = (value) => {
    //     dispatch(filtersSlice.actions.skillFilterChange(value));
    // }
    // const handlePositionChange = (value) => {
    //     dispatch(filtersSlice.actions.positionFilterChange(value));
    // }

    const onClearFilter = () => {
        setSearchText('');
        setStatus('');
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
                        options={optionItems}
                        value={status}
                        onChange={handleStatusChange} />
                </Col>
                {/* <Col sm={24}>
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
                        Filter By Skill
                    </Typography.Paragraph>
                    <Select
                        mode='multiple'
                        allowClear
                        placeholder='Please select skill'
                        style={{ width: '100%' }}
                        maxTagPlaceholder={(omittedValues) => (
                            <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                                <span>...</span>
                            </Tooltip>
                        )}
                        maxTagCount={'responsive'}
                        onChange={handleSkillChange}

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
                </Col> */}
                <Col sm={24} className='text-center mt-4'>
                    <Button size='large' onClick={onClearFilter}>Clear filter</Button>
                </Col>
            </Row>
        </Card>

    )
}

export default SearchBox