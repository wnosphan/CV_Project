import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, notification, Upload } from 'antd';
import { PlusCircleOutlined, FolderAddOutlined, CheckCircleOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { useAuth } from 'react-oidc-context';

import CVTable from './CVTable';
import handleLogError from '~/utils/HandleError';
import { myCVListApi } from '~/api/MyCVListApi';
import { modalDeleteProps, modalUploadProps, modalUpdateStatusProps } from './CommonProps';
import { NOTIFICATION, STATUS } from '~/configs'
import Home from '~/components/layouts/main/MainLayout/Home';
const { Dragger } = Upload;

const paginationProps = {
    // simple: true,
    showQuickJumper: true,
    position: ['bottomCenter'],
    pageSize: 8
}

const MainContent = () => {
    const auth = useAuth();
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
                            status.push({
                                id: item,
                                status: STATUS.PASS
                            });
                            break;
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
    const handleCV = useCallback((page) => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        setCurrentPage(page);
        const antdPage = page - 1;
        setTimeout(() => {
            myCVListApi.getCV(auth.user?.profile.preferred_username, antdPage, paginationProps.pageSize).then((response) => {
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

    /** Delete multiple row */
    const onMultipleDelete = async () => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCVs(selectedRowKeys)
                    .then(async (response) => {
                        if (response.status === 200) {
                            if (tableData.data.length === 0) {
                                let i = setCurrentPage(currentPage - 1);
                                console.log('currentPage', i);
                            }
                            await handleCV(currentPage);
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
                            handleCV(currentPage);
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
        myCVListApi.fileUpload(auth.user?.profile.preferred_username, formData).then((response) => {
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
            setVisible(false);
            handleCV(currentPage);
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


    return (
        <Home>
            <Col span={23}>
                {contextHolder}
                <Flex vertical gap={'1rem'}>
                    <Card className='h-20'>
                        <Flex vertical>
                            <Flex gap="1rem" justify='flex-end' align='center'>
                                <Button icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0} className='bg-red-600 text-white' size='large' onClick={onMultipleDelete}>Delete</Button>
                                <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0} className='text-white bg-violet-500' size='large' onClick={onUpdateMultipleStatus}>Apply</Button>
                                <Link to='/create'><Button icon={<PlusCircleOutlined />} onClick={() => localStorage.setItem('currentPage', currentPage)} type='primary' size='large'>Create</Button></Link>
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
                                            Support for a single upload. Strictly prohibited from uploading company data or other
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
                        pagination={{
                            ...paginationProps,
                            total: tableData.totalPage * paginationProps.pageSize,
                            current: currentPage,
                            onChange: handleTableChange
                        }}
                        loading={tableData.loading}
                        editProps={editProps}
                    />
                </Flex>
            </Col>
        </Home>

    )
}

export default MainContent;