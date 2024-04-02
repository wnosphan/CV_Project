import React, { memo } from 'react'
import { useAuth } from "react-oidc-context"
import { Flex, Typography, Dropdown, Image } from 'antd';
import { FaDashcube } from "react-icons/fa6";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { properties } from '~/configs/properties'
//Navigation Menu Options

function CustomHeader() {
    const auth = useAuth();

    const handleLogout = () => {
        try {
            auth.removeUser();
            auth.signoutRedirect({ post_logout_redirect_uri: properties.project.url });
        } catch (error) {
            console.log(error)
        }
    };

    const items = [
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: () => handleLogout()
        }
    ]

    return (
        <>
            <Flex align='center'>
                {/* <Image
                    src='/fpt.png'
                    preview={false}
                    style={{width: '7rem'}}
                /> */}
                <div className="text-[var(--primary-color)] my-6 text-[1.5rem]">
                    <FaDashcube />
                </div>
            </Flex>
            <Flex align='center' justify='flex-end'>
                <Dropdown
                    menu={{items}}
                >
                    <div className='hover:bg-black/[.03] cursor-auto p-2 rounded-md'>
                        <Flex align='center' gap='5px'>
                            <UserOutlined />
                            <Typography.Text>{auth.user?.profile.preferred_username}</Typography.Text>
                        </Flex>
                    </div>
                </Dropdown>
            </Flex>
        </>


    );
}

export default memo(CustomHeader)