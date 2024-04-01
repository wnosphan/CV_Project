import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, notification, Input, Space } from 'antd';
import { PlusCircleOutlined, CheckCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { useAuth } from 'react-oidc-context';

import CVTable from './CVTable';
import handleLogError from '~/utils/HandleError';
import { myCVListApi } from '~/api/MyCVListApi';
import { modalDeleteProps } from './CommonProps';
import { NOTIFICATION, STATUS } from '~/configs'
import Home from '~/components/layouts/main/MainLayout/Home';
import { ImportButton, DeleteButton, ApplyButton } from './Button';

const paginationProps = {
    // simple: true,
    showQuickJumper: true,
    showSizeChanger: false,
    position: ['bottomCenter'],
    pageSize: 8
}

const MainContent = () => {
    const auth = useAuth();
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [tableData, setTableData] = useState({
        data: [],
        totalPage: 1,
        loading: false,
    });
    const [currentPage, setCurrentPage] = useState(() => {
        const storedPage = localStorage.getItem('currentPage');
        return storedPage ? JSON.parse(storedPage) : 1;
    });

    const onSelectChange = (newSelectedRowKeys) => {
        const status = [];
        newSelectedRowKeys.forEach((item) => {
            tableData.data.forEach((data) => {
                if (data.id === item) {
                    switch (data.status) {
                        case "PASS":
                            status.push({
                                id: item,
                                status: STATUS.NOT_PASS
                            });
                            break;
                        case "NOTPASS":
                        case "INPROGRESS":
                            status.push({
                                id: item,
                                status: STATUS.PASS
                            });
                            break;
                        default:
                            throw new Error('Invalid status');

                    }

                }
            });
        })

        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('selectedStatus changed:', status);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedStatus(status);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    /**Get all */
    const handleCV = useCallback((page, dataIndex, keySearch) => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        setTimeout(() => {
            myCVListApi.getCV(auth.user?.profile.preferred_username, page - 1, paginationProps.pageSize, dataIndex, keySearch).then((response) => {
                setTableData({
                    data: response.data.cvs_list,
                    totalPage: response.data.total,
                    loading: false,
                });

            }).catch((error) => {
                handleLogError(error);
            });
        }, 1000);
    }, []);

    console.log('tableData', tableData);

    useEffect(() => {
        handleCV(currentPage);
    }, [handleCV, currentPage]);

    const handleTableChange = (page) => {
        setCurrentPage(page);
        localStorage.setItem('currentPage', page);
        cancel();

    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    console.log(searchText, searchedColumn);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        handleCV(currentPage, dataIndex, selectedKeys[0]);
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

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            full_name: '',
            dob: moment(record.dob),
            university: '',
            training_system: '',
            gpa: '',
            apply_position: '',
            skill: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        const row = await form.validateFields();
        handleUpdateCV(key, row);
        // try {

        //     // const row = await form.validateFields();

        //     // const newData = [...tableData.data];
        //     // const index = newData.findIndex((item) => key === item.key);
        //     // if (index > -1) {
        //     //     const item = newData[index];
        //     //     newData.splice(index, 1, {
        //     //         ...item,    
        //     //         ...row,
        //     //         dob: moment(row.dob).format('YYYY-MM-DD')
        //     //     });
        //     // } else {
        //     //     newData.push(row);
        //     // }
        //     // setTableData({ ...tableData, data: newData });
        //     // setEditingKey('');
        // } catch (errInfo) {
        //     handleLogError(errInfo);
        // }
    };
    const editProps = {
        isEditing,
        edit,
        cancel,
        save,
        editingKey,
        form
    }

    const handleUpdateCV = async (key, record) => {
        const data = JSON.stringify(record);
        console.log('data', data);
        await myCVListApi.updateCV(key, data)
            .then((response) => {
                if (response.status === 200) {
                    setEditingKey('');
                    handleCV(currentPage);
                    api.success({
                        message: NOTIFICATION.UPDATE.SUCCESS,
                        duration: 2,
                    });
                }
            })
            .catch((error) => {
                api.error({
                    message: NOTIFICATION.UPDATE.ERROR,
                    duration: 2,
                });
                handleLogError(error);
            });
    };
    /*Delete*/
    const onDelete = (key) => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCV(key)
                    .then(async (response) => {
                        if (response.status === 200) {
                            await onChangeSelectRow(key);
                            await onChangePage();
                            await handleCV(currentPage);
                            api.success({
                                message: NOTIFICATION.DELETE.SUCCESS,
                                duration: 2,
                            })
                        }
                    })
                    .catch((error) => {
                        api.error({
                            message: NOTIFICATION.DELETE.ERROR,
                            duration: 2,
                        })
                        handleLogError(error);
                    });
            },

        })
    }
    const onChangePage = () => {
        if (tableData.data.length === 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const onChangeSelectRow = (key) => {
        setSelectedRowKeys(prev => prev.filter((item) => item !== key));
    }

    return (
        <Home>
            <Col span={23}>
                {contextHolder}
                <Flex vertical gap={'1rem'}>
                    <Card className='h-20'>
                        <Flex vertical>
                            <Flex gap="1rem" justify='flex-end' align='center'>
                                <DeleteButton api={api} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} handleCV={handleCV} currentPage={currentPage} />
                                {/* <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0} className='text-white bg-violet-500' size='large' onClick={onUpdateMultipleStatus}>Apply</Button> */}
                                <ApplyButton selectedRowKeys={selectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} />
                                <Link to='/create'><Button icon={<PlusCircleOutlined />} onClick={() => localStorage.setItem('currentPage', currentPage)} type='primary' size='large'>Create</Button></Link>
                                <ImportButton handleCV={handleCV} currentPage={currentPage} api={api} />
                            </Flex>
                        </Flex>
                    </Card>
                    <CVTable
                        dataSource={tableData.data}
                        rowSelection={rowSelection}
                        onDelete={onDelete}
                        pagination={{
                            ...paginationProps,
                            total: tableData.totalPage * paginationProps.pageSize,
                            current: currentPage,
                            onChange: handleTableChange
                        }}
                        loading={tableData.loading}
                        editProps={editProps}
                        getColumnSearchProps={getColumnSearchProps}
                    />
                </Flex>
            </Col>
        </Home>

    )
}

export default MainContent;