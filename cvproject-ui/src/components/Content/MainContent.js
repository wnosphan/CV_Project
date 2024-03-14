import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card, Flex, Button, Modal } from 'antd';
import CVTable from './CVTable';
import handleLogError from '../../utils/HandleError';
import { myCVListApi } from '../../api/MyCVListApi';
import useMounted from '../../hooks/useMounted'
import { PlusCircleOutlined, FolderAddOutlined, CheckCircleOutlined,DeleteOutlined } from '@ant-design/icons';
const initialPagination = {
    current: 1,
    pageSize: 5,
};

const MainContent = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState({
        data: [],
        pagination: initialPagination,
        loading: false,
    });
    const { isMounted } = useMounted();


    const handleCV = useCallback(async () => {
        try {
            setTableData((tableData) => ({ ...tableData, loading: true }));
            const response = await myCVListApi.getCV();
            console.log(response.data);
            if (isMounted.current) {
                setTableData({ data: response.data, pagination: initialPagination, loading: false });
            }
            setDataSource(response.data);
        } catch (error) {
            handleLogError(error)
        }
    }, [isMounted]);

    useEffect(() => {
        handleCV();
    }, [handleCV]);

    const onDelete = (key) => {
        try {
            Modal.confirm({
                title: 'Mày có chắc là muốn xóa?',
                okText: 'Xóa',
                cancelText: 'Hủy',
                okType: 'danger',
                maskClosable: true,
                mask: true,
                keyboard: true,
                closable: true,
                centered: true,
                onOk: async () => {
                    await myCVListApi.deleteCV(key);
                    await handleCV()
                }
            })

        } catch (error) {
            handleLogError(error)
        }
    }

    const handleTableChange = () => {
        setLoading(true);
    };

    return (
        <Col span={23}>
            <Flex vertical gap={'1rem'}>
                <Card style={{ height: 80 }}>
                    <Flex vertical>
                        <Flex gap="1rem" justify='flex-end' align='center'>
                            <Button icon={<DeleteOutlined />} disabled className='bg-red-600 text-white' size='large'>Delete</Button>
                            <Button icon={<CheckCircleOutlined />} className='text-white bg-violet-500' size='large'>Apply</Button>
                            <Button icon={<PlusCircleOutlined />} type='primary' size='large'>Create</Button>
                            <Button icon={<FolderAddOutlined />} size='large'>Import</Button>
                        </Flex>
                    </Flex>
                </Card>
                <CVTable
                    dataSource={dataSource}
                    onDelete={onDelete}
                    onchange={handleTableChange}
                    loading={loading}
                />
            </Flex>
        </Col>

    )
}

export default MainContent;