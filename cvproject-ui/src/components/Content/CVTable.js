import React, { useState, useRef } from 'react'
import { Table, Tag, Space, Button, Input } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';


function CVTable({ dataSource, onDelete, onChange, loading }) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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

    const cvs = dataSource.map((cv) => {
        return {
            id: cv.id,
            name: cv.name,
            dob: cv.dob,
            university: cv.university,
            trainingSystem: cv.trainingSystem,
            gpa: cv.gpa,
            position: cv.position,
            tags: cv.skills
        }

    });


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    // Columns and data
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 120,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            width: 120
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            ...getColumnSearchProps('university')
        },
        {
            title: 'TrainingSystem',
            dataIndex: 'trainingSystem',
            key: 'trainingSystem',
            width: 150,
            ...getColumnSearchProps('trainingSystem'),
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            width: 80,
            ...getColumnSearchProps('gpa'),
            sorter: (a, b) => a.gpa - b.gpa,
        },
        {
            title: 'ApplyPosition',
            dataIndex: 'position',
            key: 'position',
            width: 150,
            ...getColumnSearchProps('position'),
            sorter: (a, b) => a.position.length - b.position.length,
        },
        {
            title: 'Skills',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags) => {
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        )
                    })}
                </span>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type='primary' shape='circle'></Button>
                    <Button icon={<DeleteOutlined />} type='default' shape='circle' danger onClick={(e) => onDelete(record.id, e)}></Button>
                </Space>
            ),
            fixed: 'right',
            width: 150
        },
    ];

    return (
        <>
            <Table
                rowSelection={rowSelection}
                dataSource={cvs}
                columns={columns}
                scroll={{
                    x: 1600,
                }}
                pagination={{
                    pageSize: 5,
                    // simple: true,
                    showQuickJumper: true,
                    position: ['bottomCenter']
                }}

            />
        </>
    )
}

export default CVTable