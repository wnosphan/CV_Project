import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context';
import { useSelector, useDispatch } from 'react-redux';


import CVTable from './CVTable';
import handleLogError from '~/utils/HandleError';
import { myCVListApi } from '~/api';
import { modalDeleteProps } from './CommonProps';
import { NOTIFICATION } from '~/configs'
import { cvListSelector, filtersSelector } from '~/redux/selectors';
import Home from '~/components/layouts/main/MainLayout/Home';
import { ImportButton, DeleteButton, ApplyButton } from './Button';
import SearchBox from '../Filters/SearchBox';

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
    const filters = useSelector(filtersSelector);
    const { data, loading, totalPage, pageSize } = cvList;
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    const handleCV = useCallback((page) => {
        dispatch(myCVListApi.getCV(auth.user?.profile.preferred_username, page - 1, pageSize, filters));
    }, []);

    useEffect(() => {
        handleCV(currentPage);
    }, [handleCV, currentPage, filters]);

    console.log('tableData', data);


    const handleTableChange = (page) => {
        setCurrentPage(page);
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
            <Col span={6}>
                <SearchBox />
            </Col>
            <Col span={18}>
                {contextHolder}
                <Flex vertical gap={'1rem'}>
                    <Card className='h-20 shadow-lg'>
                        <Flex vertical>
                            <Flex gap="1rem" justify='flex-end' align='center'>
                                <DeleteButton selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} />
                                <ApplyButton selectedRowKeys={selectedRowKeys} handleCV={handleCV} currentPage={currentPage} api={api} />
                                <Link to='/create'><Button icon={<PlusCircleOutlined />} type='primary' size='large'>Create</Button></Link>
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
                    />
                </Flex>
            </Col>
        </Home>

    )
}

export default MainContent;