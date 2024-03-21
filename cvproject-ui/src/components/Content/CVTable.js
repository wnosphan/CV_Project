import React, { useState, useRef, memo } from 'react'
import { Table, Tag, Space, Button, Input, Flex, Popconfirm, Form } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import EditableCell from './EditableCell';

function CVTable({ dataSource, rowSelection, onDelete, onChange, pagination, loading, editProps }) {
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

    // Columns and data
    const columns = [
        {
            title: 'Id',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            width: 60,
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            fixed: 'left',
            width: 150,
            ...getColumnSearchProps('full_name'),
            editable: true,
        },
        {
            title: 'DOB',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            width: 120,
            editable: true,
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
            width: 180,
            ...getColumnSearchProps('training_system'),
            editable: true,
            sorter: (a, b) => a.training_system.length - b.training_system.length,
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            width: 100,
            ...getColumnSearchProps('gpa'),
            sorter: (a, b) => a.gpa - b.gpa,
            editable: true,
        },
        {
            title: 'Apply Position',
            dataIndex: 'apply_position',
            key: 'apply_position',
            width: 200,
            ...getColumnSearchProps('apply_position'),
            sorter: (a, b) => a.apply_position.length - b.apply_position.length,
            editable: true,
        },
        {
            title: 'Skills',
            dataIndex: 'skill',
            key: 'skill',
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
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render(status) {
                return (
                    <Tag color={status === 'PASS' ? 'green' : 'red'}>
                        {status}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
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
                inputType: col.dataIndex === 'gpa' ? 'number' : 'text',
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
            date_of_birth: cv.date_of_birth,
            training_system: cv.training_system,
            create_by: cv.create_by,
            apply_position: cv.apply_position,
            link_cv: cv.link_cv
        }));
    }

    const datas = cvs();
    return (
        <>
            <Form form={editProps.form} component={false}>
                <Table
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
                        x: 1600,
                        y: 420
                    }}
                    pagination={pagination}
                    loading={loading}
                    onChange={onChange}

                />
            </Form>

        </>
    )
}

export default memo(CVTable)