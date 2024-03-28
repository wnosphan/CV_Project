import React, { useState, useRef, memo, useEffect } from 'react'
import { Table, Tag, Space, Button, Input, Flex, Popconfirm, Form, Card } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import EditableCell from './EditableCell';



function CVTable({ dataSource, rowSelection, onDelete, pagination, loading, editProps }) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const statusFilter = ['PASS', 'NOTPASS', 'INPROGRESS'];
    

    const handleChange = (filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    // Columns and data
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            fixed: 'left',
            width: '10%',
            ...getColumnSearchProps('full_name'),
            editable: true,
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            width: '10%',
            editable: true,
            render: (text) => moment(text).format('DD-MM-YYYY'),

        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            ...getColumnSearchProps('university'),
            editable: true,

        },
        {
            title: 'Training System',
            dataIndex: 'training_system',
            key: 'training_system',
            width: '12%',
            ...getColumnSearchProps('training_system'),
            editable: true,
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            width: '8%',
            ...getColumnSearchProps('gpa'),
            sorter: (a, b) => a.gpa - b.gpa,
            editable: true,

        },
        {
            title: 'Apply Position',
            dataIndex: 'apply_position',
            key: 'apply_position',
            width: '12%',
            ...getColumnSearchProps('apply_position'),
            editable: true,
        },
        {
            title: 'Skills',
            dataIndex: 'skill',
            key: 'skill',
            width: '14%',
            editable: true,
            render: (text) => {
                const split = text.split(',');
                const result = split.map((item) => item = item.trim());
                return (
                    <>
                        <Flex gap={'4px'} wrap='wrap'>
                            {result.map((item, index) => {
                                return (
                                    <Tag key={index} color={'purple'}>
                                        {item.toUpperCase()}
                                    </Tag>
                                )
                            })}
                        </Flex>
                    </>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render(status) {
                let color;
                switch (status) {
                    case "PASS":
                        color = 'green';
                        break;
                    case 'NOTPASS':
                        color = 'red';
                        break;
                    default:
                        color = 'purple';
                        break;
                }

                return (
                    <Tag color={color}>
                        {status}
                    </Tag>
                )
            },
            filters: statusFilter.map((item) => {
                return {
                    text: item,
                    value: item
                }
            }),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (_, record) => {
                const editable = editProps.isEditing(record);
                return (

                    <Space size="middle">
                        {editable ? (
                            <>
                                <Button icon={<SaveOutlined />} type="primary" onClick={() => editProps.save(record.key)}>
                                </Button>
                                <Popconfirm title="Chắc chưa?" onConfirm={editProps.cancel}>
                                    <Button danger icon={<CloseCircleOutlined />}></Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Button
                                    icon={<EditOutlined />}
                                    disabled={editable === ''}
                                    onClick={() => editProps.edit(record)}
                                    type='primary' shape='circle'></Button>
                                <Button
                                    icon={<DeleteOutlined />}
                                    type='default' shape='circle'
                                    danger onClick={() => onDelete(record.key)}></Button>
                            </>
                        )}
                    </Space>
                );
            },

        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'gpa' ? 'number' : col.dataIndex === 'dob' ? 'date' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: editProps.isEditing(record),
            }),
        };
    });
    const cvs = () => {
        return dataSource.map((cv) => ({
            key: cv.id,
            skill: cv.skill,
            university: cv.university,
            gpa: cv.gpa,
            status: cv.status,
            full_name: cv.full_name,
            dob: moment(cv.date_of_birth),
            training_system: cv.training_system,
            create_by: cv.create_by,
            apply_position: cv.apply_position,
            link_cv: cv.link_cv
        }));
    }

    const datas = cvs();
    return (
        <Card>
            <div className='mb-4'>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </div>
            <Form form={editProps.form} component={false}>
                <Table
                    rootClassName='cv-table'
                    rowSelection={rowSelection}
                    dataSource={datas}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    scroll={{
                        scrollToFirstRowOnChange: false,
                        x: 1600,
                        y: 420
                    }}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleChange}
                />
            </Form>

        </Card>
    )
}

export default memo(CVTable)