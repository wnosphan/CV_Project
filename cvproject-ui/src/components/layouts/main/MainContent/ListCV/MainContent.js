import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, notification, Input, Space, List } from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context';
import { useSelector, useDispatch } from 'react-redux';


import CVTable from './CVTable';
import handleLogError from '~/utils/HandleError';
import { myCVListApi } from '~/api';
import { modalDeleteProps } from './CommonProps';
import { NOTIFICATION } from '~/configs'
import { cvListSelector } from '~/redux/selectors';
import Home from '~/components/layouts/main/MainLayout/Home';
import { ImportButton, DeleteButton, ApplyButton } from './Button';

const paginationProps = {
    // simple: true,
    showQuickJumper: true,
    showSizeChanger: false,
    position: ['bottomCenter'],
}

const MainContent = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const cvList = useSelector(cvListSelector);
    const { data, totalPage, loading, pageSize } = cvList;
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    // const [tableData, setTableData] = useState({
    //     data: [],
    //     totalPage: 1,
    //     loading: false,
    //     pageSize: 10,
    // });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
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
    // const handleCV = useCallback((page, dataIndex, keySearch) => {
    //     setTableData((tableData) => ({ ...tableData, loading: true }));
    //     setTimeout(() => {
    //         myCVListApi.getCV(auth.user?.profile.preferred_username, page - 1, tableData.pageSize, dataIndex, keySearch).then((response) => {
    //             setTableData({
    //                 ...tableData,
    //                 data: response.data.cvs_list,
    //                 totalPage: response.data.total,
    //                 loading: false,
    //             });

    //         }).catch((error) => {
    //             handleLogError(error);
    //         });
    //     }, 500);
    // }, []);

    // useEffect(() => {
    //     if (searchText !== '') {
    //         handleCV(currentPage, searchedColumn, searchText);
    //     } else {
    //         handleCV(currentPage);
    //     }
    // }, [handleCV, currentPage]);

    const handleCV = useCallback((page) => {
        dispatch(myCVListApi.getCV(auth.user?.profile.preferred_username, page - 1, pageSize));
    }, []);

    useEffect(() => {
        handleCV(currentPage);
    }, [handleCV, currentPage]);

    console.log('tableData', data);


    const handleTableChange = (page) => {
        setCurrentPage(page);
        cancel();
    };


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        handleCV(currentPage, dataIndex, selectedKeys[0]);
        console.log('selectedKeys', selectedKeys[0]);
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
        console.log(record);
        form.setFieldsValue({
            full_name: '',
            date_of_birth: '',
            university: '',
            training_system: '',
            gpa: '',
            apply_position: '',
            skill: '',
            link_cv: '',
            ...record
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        const row = await form.validateFields();
        handleUpdateCV(key, row);
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
        await myCVListApi.updateCV(auth.user?.profile.preferred_username, key, record)
            .then((response) => {
                console.log('request', record);
                console.log('response', response);
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
                                <DeleteButton selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} />
                                {/* <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0} className='text-white bg-violet-500' size='large' onClick={onUpdateMultipleStatus}>Apply</Button> */}
                                <ApplyButton selectedRowKeys={selectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} />
                                <Link to='/create'><Button icon={<PlusCircleOutlined />} onClick={() => localStorage.setItem('currentPage', currentPage)} type='primary' size='large'>Create</Button></Link>
                                <ImportButton handleCV={handleCV} currentPage={currentPage} api={api} />
                            </Flex>
                        </Flex>
                    </Card>
                    <CVTable
                        dataSource={data}
                        rowSelection={rowSelection}
                        onDelete={onDelete}
                        pagination={{
                            ...paginationProps,
                            total: totalPage * pageSize,
                            current: currentPage,
                            pageSize: pageSize,
                            onChange: handleTableChange,
                        }}
                        loading={loading}
                        editProps={editProps}
                        getColumnSearchProps={getColumnSearchProps}
                    />
                </Flex>
            </Col>
        </Home>

    )
}

export default MainContent;