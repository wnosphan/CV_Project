import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Button, Modal, Upload } from 'antd'
import { FolderAddOutlined, InboxOutlined } from '@ant-design/icons'

import { modalUploadProps } from '~/components/layouts/main/MainContent/ListCV/CommonProps'
import { myCVListApi } from '~/api'
import handleLogError from '~/utils/HandleError'
import { NOTIFICATION } from '~/configs'
const { Dragger } = Upload;

const ImportButton = ({ handleCV, currentPage, api, filters }) => {
    const auth = useAuth();
    const [visible, setVisible] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [uploading, setUploading] = useState(false);

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
            handleCV(currentPage, filters);
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
        <>
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
        </>
    )
}

export default ImportButton