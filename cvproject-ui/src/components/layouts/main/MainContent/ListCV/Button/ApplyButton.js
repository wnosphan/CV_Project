import { useState } from 'react'
import { Button, Modal, Radio } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { modalApplyProps } from '../CommonProps';
import { myCVListApi } from '~/api';
import { NOTIFICATION } from '~/configs/constants';
import handleLogError from '~/utils/HandleError';
import { cvListSelector, filtersSelector } from '~/redux/selectors';

const ApplyButton = ({ selectedRowKeys, setSelectedRowKeys, handleCV, api }) => {
    const [visible, setVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const cvList = useSelector(cvListSelector);
    const filters = useSelector(filtersSelector);
    const [selectedStatus, setSelectedStatus] = useState('pass');

    const onUpdateMultipleStatus = async (selectedRowKeys, selectedStatus) => {
        const obj = {
            ids: selectedRowKeys,
            status: selectedStatus
        }
        setUploading(true);
        await myCVListApi.updateMultipleStatus(obj)
            .then((response) => {
                if (response.status === 200) {
                    handleCV(cvList.current, filters);
                    setUploading(false);
                    setVisible(false);
                    setSelectedRowKeys([]);
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
            })

    }

    return (
        <>
            <Button icon={<CheckCircleOutlined />}
                disabled={selectedRowKeys.length === 0}
                className='text-white bg-violet-500'
                size='large' onClick={() => setVisible(true)}>Apply</Button>
            <Modal open={visible}
                {...modalApplyProps}
                onOk={() => onUpdateMultipleStatus(selectedRowKeys, selectedStatus)}
                confirmLoading={uploading}
                onCancel={() => setVisible(false)}
            >
                <div className='pt-6 pb-6 text-center'>
                    <Radio.Group buttonStyle='solid' defaultValue="pass" size="large" onChange={(e) => setSelectedStatus(e.target.value)}>
                        <Radio.Button value="pass">PASS</Radio.Button>
                        <Radio.Button value="not_pass">NOT PASS</Radio.Button>
                        <Radio.Button disabled value="inprogress">INPROGRESS</Radio.Button>
                    </Radio.Group>
                </div>
            </Modal>
        </>
    )
}

export default ApplyButton