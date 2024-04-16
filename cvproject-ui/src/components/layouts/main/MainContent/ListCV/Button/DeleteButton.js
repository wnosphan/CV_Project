import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { modalDeleteProps } from '~/components/layouts/main/MainContent/ListCV/CommonProps'
import { myCVListApi } from '~/api'
import { NOTIFICATION } from '~/configs/constants'
import handleLogError from '~/utils/HandleError'
import { cvListSelector, filtersSelector } from '~/redux/selectors'

const DeleteButton = ({ api, selectedRowKeys, setSelectedRowKeys, handleCV }) => {
    const cvList = useSelector(cvListSelector);
    const filters = useSelector(filtersSelector);
    
    const onMultipleDelete = () => {
        Modal.confirm({
            ...modalDeleteProps,
            onOk: async () => {
                await myCVListApi.deleteCVs(selectedRowKeys)
                    .then((response) => {
                        if (response.status === 200) {
                            handleCV(cvList.current, filters);
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