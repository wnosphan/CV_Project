import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, notification, Upload } from 'antd';
import { PlusCircleOutlined, FolderAddOutlined, CheckCircleOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import CVTable from './CVTable';
import handleLogError from '../../utils/HandleError';
import { myCVListApi } from '../../api/MyCVListApi';
import useMounted from '../../hooks/useMounted'
import { paginationProps, modalDeleteProps, modalUploadProps, modalUpdateStatusProps } from './CommonProps';
import { NOTIFICATION, STATUS } from '../../configs'
const { Dragger } = Upload;


const MainContent = () => {
    // const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [tableData, setTableData] = useState({
        data: [],
        pagination: { ...paginationProps },
        loading: false,
        currentPage: 1
    });
    const { isMounted } = useMounted();

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
    const handleCV = useCallback(async () => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        await myCVListApi.getCV(1).then((response) => {
            console.log(response.data.cvs_list);
            if (isMounted.current) {
                setTableData({
                    data: response.data.cvs_list,
                    pagination: { ...paginationProps, current: tableData.currentPage },
                    loading: false,
                });
            }
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
            handleLogError(errInfo);
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

    /*Delete*/
    const onDelete = (key) => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCV(key)
                    .then((response) => {
                        if (response.status === 200) {
                            onChangeSelectRow(key);
                            handleCV();
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

    /** Delete multiple row */
    const onMultipleDelete = async () => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCVs(selectedRowKeys)
                    .then((response) => {
                        if (response.status === 200) {
                            handleCV();
                            setSelectedRowKeys([]);
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
                        });
                        handleLogError(error);
                    });

            },
        })
    }

    const onUpdateMultipleStatus = async () => {
        Modal.confirm({
            ...modalUpdateStatusProps,
            onOk: async () => {
                await myCVListApi.updateMultipleStatus(selectedStatus)
                    .then((response) => {
                        if (response.status === 200) {
                            handleCV();
                            api.success({
                                message: NOTIFICATION.UPDATE.SUCCESS,
                                duration: 2,
                            })
                        }
                    })
                    .catch((error) => {
                        api.error({
                            message: NOTIFICATION.UPDATE.ERROR,
                            duration: 2,
                        });
                        handleLogError(error);
                    }).finally(() => {
                        setSelectedRowKeys([]);
                        setSelectedStatus([]);
                    });
            },
        })
    }


    const onUpload = (file) => {
        if (excelFile === null) {
            setVisible(false);
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);
        myCVListApi.fileUpload(formData).then((response) => {
            console.log(response.data);
            setExcelFile(null);
            api.success({
                message: NOTIFICATION.UPLOAD.SUCCESS,
                duration: 2,
            })
        }).catch((error) => {
            handleLogError(error);
        }).finally(() => {
            setUploading(false);
        });

    }
    const uploadProps = {
        maxCount: 1,
        listType: 'picture',
        accept: '.xlsx, .xls, .csv',
        onRemove: () => {
            setExcelFile(null);
        },
        beforeUpload: (file) => {
            setExcelFile(file);
            return false;
        },
        excelFile
    }
    console.log('excelFile', excelFile);

    return (
        <Col span={23}>
            {contextHolder}
            <Flex vertical gap={'1rem'}>
                <Card style={{ height: 80 }}>
                    <Flex vertical>
                        <Flex gap="1rem" justify='flex-end' align='center'>
                            <Button icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0} className='bg-red-600 text-white' size='large' onClick={onMultipleDelete}>Delete</Button>
                            <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0} className='text-white bg-violet-500' size='large' onClick={onUpdateMultipleStatus}>Apply</Button>
                            <Button icon={<PlusCircleOutlined />} type='primary' size='large'>Create</Button>
                            <Button icon={<FolderAddOutlined />} size='large' onClick={() => setVisible(true)}>Import</Button>
                            <Modal open={visible}
                                {...modalUploadProps}
                                onOk={() => onUpload(excelFile)}
                                confirmLoading={uploading}
                                onCancel={() => setVisible(false)}
                            >
                                <Dragger {...uploadProps}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                        banned files.
                                    </p>
                                </Dragger>
                            </Modal>
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