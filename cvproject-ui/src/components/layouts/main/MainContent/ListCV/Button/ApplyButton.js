import { useState } from 'react'
import { Button, Modal, Upload, Radio } from 'antd'
import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons'

import { modalApplyProps } from '../CommonProps';
import myCVListApi from '~/api/MyCVListApi';
import { NOTIFICATION } from '~/configs/constants';
import handleLogError from '~/utils/HandleError';
const { Dragger } = Upload;

const ApplyButton = ({ selectedRowKeys, handleCV, currentPage, api, setSelectedRowKeys }) => {
    const [visible, setVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('pass');

    const onUpdateMultipleStatus = async () => {
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
            });

    }

    console.log(selectedStatus);
    return (
        <>
            <Button icon={<CheckCircleOutlined />}
                disabled={selectedRowKeys.length === 0}
                className='text-white bg-violet-500'
                size='large' onClick={() => setVisible(true)}>Apply</Button>
            <Modal open={visible}
                {...modalApplyProps}
                // onOk={() => }
                confirmLoading={uploading}
                onCancel={() => setVisible(false)}
            >
                <div className='pt-6 pb-6 text-center'>
                    <Radio.Group buttonStyle='solid' defaultValue="pass" size="large" onChange={(e) => setSelectedStatus(e.target.value)}>
                        <Radio.Button value="pass">PASS</Radio.Button>
                        <Radio.Button value="not_pass">NOT PASS</Radio.Button>
                        <Radio.Button value="inprogress">INPROGRESS</Radio.Button>
                    </Radio.Group>
                </div>
            </Modal>
        </>
    )
}

export default ApplyButton