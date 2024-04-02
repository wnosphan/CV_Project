import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { modalDeleteProps } from '~/components/layouts/main/MainContent/ListCV/CommonProps'
import { myCVListApi } from '~/api/MyCVListApi'
import { NOTIFICATION } from '~/configs/constants'
import handleLogError from '~/utils/HandleError'

const DeleteButton = ({  api, selectedRowKeys,setSelectedRowKeys, handleCV, currentPage }) => {

    const onMultipleDelete = async () => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCVs(selectedRowKeys)
                    .then(async (response) => {
                        if (response.status === 200) {
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
    return (
        <Button
            icon={<DeleteOutlined />}
            disabled={selectedRowKeys.length === 0}
            className='bg-red-600 text-white' size='large'
            onClick={onMultipleDelete}
        >
            Delete
        </Button>
    )
}

export default DeleteButton