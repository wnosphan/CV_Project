import { message, Upload } from 'antd';
import { myCVListApi } from '../../api/MyCVListApi';

const handleFileUpload = async ({ file }) => {
    
}

export const uploadProps = {
    customRequest: { handleFileUpload }
}

export const paginationProps = {
    // simple: true,
    showQuickJumper: true,
    position: ['bottomCenter'],
    pageSize: 5
}

export const modalProps = {

    title: 'Mày có chắc là muốn xóa?',
    okText: 'Xóa',
    cancelText: 'Hủy',
    okType: 'danger',
    maskClosable: true,
    mask: true,
    keyboard: true,
    closable: true,
    centered: true

}