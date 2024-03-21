import { Flex, Image, Menu } from 'antd';
import { FaDashcube } from "react-icons/fa6";
import { UserOutlined, OrderedListOutlined } from '@ant-design/icons';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Program', 'sub1', <OrderedListOutlined />, [
        getItem('List', '1'),
        getItem('Add', '2')
    ]),
];

const Sidebar = () => {
    return (
        <>
            <Flex align='center' justify='center'>
                <div className="logo">
                    <FaDashcube />
                    {/* <Image 
                    src='/fpt.png' 
                    preview={false}
                    /> */}
                </div>
            </Flex>
            <Menu mode='vertical' defaultSelectedKeys={['1']} className='menu-bar' items={items} />
        </>
    )
}

export default Sidebar;
