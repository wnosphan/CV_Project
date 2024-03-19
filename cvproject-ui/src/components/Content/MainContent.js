import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card, Flex, Button, Modal, Table, Form, notification,Upload } from 'antd';
import CVTable from './CVTable';
import handleLogError from '../../utils/HandleError';
import { myCVListApi } from '../../api/MyCVListApi';
import useMounted from '../../hooks/useMounted'
import { PlusCircleOutlined, FolderAddOutlined, CheckCircleOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { paginationProps, modalDeleteProps, modalUploadProps } from './CommonProps';
const { Dragger } = Upload;


const MainContent = () => {
    // const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [tableData, setTableData] = useState({
        data: [],
        pagination: { ...paginationProps },
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

    /**Get all */
    const handleCV = useCallback(async () => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        await myCVListApi.getCV(1).then((response) => {
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

    /*Delete*/
    const onDelete = (key) => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCV(key)
                    .catch((error) => {
                        handleLogError(error);
                    });
                await onChangeSelectRow(key);
                await handleCV();
                api.success({
                    message: 'Xóa thành công',
                    duration: 2,
                })
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
                await myCVListApi.deleteCVs(selectedRowKeys).catch((error) => {
                    handleLogError(error);
                });
                await handleCV();
                setSelectedRowKeys([]);
                api.success({
                    message: 'Xóa thành công',
                    duration: 2,
                })
            },
        })
    }
    const onUpload = (file) => {
        if(excelFile === null){
            setVisible(false);
            return;
        }
        const formData = new FormData();
        formData.append('excel', file);
        setUploading(true);
        myCVListApi.fileUpload(formData).then((response) => {
            console.log(response.data);
            setExcelFile(null);
            api.success({
                message: 'Tải lên thành công',
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
        // customRequest: ({ file }) => {
        //     onUpload(file);
        // }
        beforeUpload: ({file}) => {
            setExcelFile(file);
            console.log(excelFile);
            return false;
        },
        excelFile
    }


    return (
        <Col span={23}>
            {contextHolder}
            <Flex vertical gap={'1rem'}>
                <Card style={{ height: 80 }}>
                    <Flex vertical>
                        <Flex gap="1rem" justify='flex-end' align='center'>
                            <Button icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0} className='bg-red-600 text-white' size='large' onClick={onMultipleDelete}>Delete</Button>
                            <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0} className='text-white bg-violet-500' size='large'>Apply</Button>
                            <Button icon={<PlusCircleOutlined />} type='primary' size='large'>Create</Button>
                            <Button icon={<FolderAddOutlined />} size='large' onClick={() => setVisible(true)}>Import</Button>
                            <Modal open={visible}
                                {...modalUploadProps}
                                onOk={onUpload}
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