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
                <div className="text-[var(--primary-color)] my-6 text-[1.5rem]">
                    <FaDashcube />
                    {/* <Image 
                    src='/fpt.png' 
                    preview={false}
                    /> */}
                </div>
            </Flex>
            <Menu mode='vertical' defaultSelectedKeys={['1']} className='flex flex-col gap-2.5 font-medium' items={items} />
        </>
    )
}

export default Sidebar;
