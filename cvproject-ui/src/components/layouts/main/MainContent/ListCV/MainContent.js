import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context';
import { useSelector, useDispatch } from 'react-redux';


import Home from '~/components/layouts/main/MainLayout/Home';
import CVTable from './CVTable';
import SearchBox from '../Filters/SearchBox';
import useNotification from '~/hooks/useNotification';
import handleLogError from '~/utils/HandleError';
import { myCVListApi } from '~/api';
import { modalDeleteProps } from './CommonProps';
import { NOTIFICATION } from '~/configs'
import { cvListSelector, filtersSelector } from '~/redux/selectors';
import { ImportButton, DeleteButton, ApplyButton } from './Button';
import cvListSlice from '~/redux/slices/cvListSlice';
import { current } from '@reduxjs/toolkit';


const MainContent = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const cvList = useSelector(cvListSelector);
    const filtersList = useSelector(filtersSelector);
    const [api, contextHolder] = useNotification();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);   

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

    // const handleCV = useCallback((page, pageSize, filters) => {
    //     dispatch(myCVListApi.getCV(auth.user?.profile.preferred_username, page - 1, pageSize, filters));
    // }, [dispatch, auth.user?.profile.preferred_username]);

    // useEffect(() => {
    //     handleCV(currentPage, filters);
    // }, [handleCV, currentPage, filters]);

    useEffect(() => {
        const params = {
            username: auth.user?.profile.preferred_username,
            page: cvList.pagination.current - 1,
            limit: cvList.pagination.pageSize,
            filters: filtersList,
            sorter: {}
        }
        dispatch(myCVListApi.getCV(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('filters', filtersList);
    console.log('tableData', cvList.data);

    const handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        dispatch(cvListSlice.actions.setPaginationCurrent(pager.current));
        dispatch(cvListSlice.actions.setPagination(pager));
        const params = {
            username: auth.user?.profile.preferred_username,
            page: pagination.current - 1,
            limit: pagination.pageSize,
            filters: filtersList,
            sorter: {}
        }
        if (sorter.hasOwnProperty('column')) {
            params.sorter.sort_by = sorter.column.dataIndex;
            params.sorter.sort_type = sorter.order === 'ascend' ? 'ASC' : 'DESC';
        }
        dispatch(myCVListApi.getCV(params));
        cancel();
    };

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
                    // handleCV(currentPage, filtersList);
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
                            // await handleCV(currentPage, filtersList);
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
            <Col span={6}>
                <SearchBox />
            </Col>
            <Col span={18}>
                {contextHolder}
                <Flex vertical gap={'1rem'}>
                    <Card className='h-20 shadow-lg'>
                        <Flex vertical>
                            <Flex gap="1rem" justify='flex-end' align='center'>
                                {/* <DeleteButton selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} filters={filtersList} />
                                <ApplyButton selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} filters={filtersList} />
                                <Link to='/create'><Button icon={<PlusCircleOutlined />} type='primary' size='large'>Create</Button></Link>
                                <ImportButton handleCV={handleCV} currentPage={currentPage} api={api} filters={filtersList} /> */}
                            </Flex>
                        </Flex>
                    </Card>
                    <CVTable
                        dataSource={cvList.data}
                        rowSelection={rowSelection}
                        onDelete={onDelete}
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: false,
                            total: cvList.pagination.total,
                            current: cvList.pagination.current,
                            pageSize: cvList.pagination.pageSize,
                        }}
                        onChange={handleTableChange}
                        loading={cvList.loading}
                        editProps={editProps}
                    />
                </Flex>
            </Col>
        </Home>

    )
}

export default MainContent;