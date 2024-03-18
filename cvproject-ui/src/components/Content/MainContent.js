import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, Upload } from 'antd';
import CVTable from './CVTable';
import handleLogError from '../../utils/HandleError';
import { myCVListApi } from '../../api/MyCVListApi';
import useMounted from '../../hooks/useMounted'
import { PlusCircleOutlined, FolderAddOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { paginationProps, modalProps, uploadProps } from './CommonProps';



const MainContent = () => {
    // const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [tableData, setTableData] = useState({
        data: [],
        pagination: {...paginationProps},
        loading: false,
        currentPage: 1
    });
    const { isMounted } = useMounted();

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

    const handleCV = useCallback(async () => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        await myCVListApi.getCV().then((response) => {
            console.log(response.data);
            if (isMounted.current) {
                setTableData({
                    data: response.data.cvs_list,
                    pagination: { ...paginationProps, current: tableData.currentPage },
                    loading: false,
                });
            }
            // setDataSource(response.data.cvs_list);
        }).catch((error) => {
            handleLogError(error);
        });
    }, [isMounted, tableData.currentPage]);

    useEffect(() => {
        handleCV();
    }, [handleCV]);

    const handleTableChange = (pagination) => {
        setTableData(prevData => ({
            ...prevData,
            currentPage: pagination.current,
            loading: true
        }))

    };


    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            full_name: '',
            date_of_birth: '',
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
        try {
            const row = await form.validateFields();

            const newData = [...tableData.data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
            } else {
                newData.push(row);
            }
            setTableData({ ...tableData, data: newData });
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const editProps = {
        isEditing,
        edit,
        cancel,
        save,
        editingKey,
        form
    }

    const onDelete = (key) => {
        Modal.confirm({
            ...modalProps,
            onOk: async () => {
                await myCVListApi.deleteCV(key)
                    .catch((error) => {
                        handleLogError(error);
                    });
                await onChangeSelectRow(key);
                await handleCV();

            },
        })
    }

    const onChangeSelectRow = (key) => {
        setSelectedRowKeys(prev => prev.filter((item) => item !== key));
    }

    /** Delete multiple row */
    const handleDelete = async () => {
        Modal.confirm({
            ...modalProps,
            onOk: async () => {
                await myCVListApi.deleteCVs(selectedRowKeys).catch((error) => {
                    handleLogError(error);
                });
                await handleCV();
                setSelectedRowKeys([]);
            },
        })
    }



    return (
        <Col span={23}>
            <Flex vertical gap={'1rem'}>
                <Card style={{ height: 80 }}>
                    <Flex vertical>
                        <Flex gap="1rem" justify='flex-end' align='center'>
                            <Button icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0} className='bg-red-600 text-white' size='large' onClick={handleDelete}>Delete</Button>
                            <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0} className='text-white bg-violet-500' size='large'>Apply</Button>
                            <Button icon={<PlusCircleOutlined />} type='primary' size='large'>Create</Button>
                            <Upload {...uploadProps}>
                                <Button icon={<FolderAddOutlined />} size='large'>Import</Button>
                            </Upload>
                        </Flex>
                    </Flex>
                </Card>
                <CVTable
                    dataSource={tableData.data}
                    rowSelection={rowSelection}
                    onDelete={onDelete}
                    onChange={handleTableChange}
                    pagination={tableData.pagination}
                    loading={tableData.loading}
                    editProps={editProps}
                />
            </Flex>
        </Col>

    )
}

export default MainContent;