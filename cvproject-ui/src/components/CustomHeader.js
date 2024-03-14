import React, { memo } from 'react'
import { useAuth } from "react-oidc-context"
import { properties } from '../configs/properties'
import { Flex, Typography, Button } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';

//Navigation Menu Options

function CustomHeader() {
    const auth = useAuth();

    // const navItems = [
    //     {
    //         label: "Logout",
    //         key: "1",
    //         icon: <PoweroffOutlined />,
    //     },
    // ];
    const handleLogout = () => {
        try {
            auth.removeUser();
            auth.signoutRedirect({ post_logout_redirect_uri: properties.project.url });
        } catch (error) {
            console.log(error)
        }
    };
    // const menuProps = {
    //     navItems,
    //     onClick: handleLogout,
    // };



    return (
        <Flex align='center' justify='flex-end'>
            {/* <Dropdown.Button
                menu={menuProps}
                icon={<UserOutlined />}
                className="flex justify-end m-4"
            >
                Hello, User!
            </Dropdown.Button> */}
            <Flex align='center' gap='10px'>
                <Typography.Text>{auth.user?.profile.preferred_username}</Typography.Text>
                <Button
                    type="primary"
                    size="small"
                    onClick={handleLogout}
                    danger
                >
                    Logout
                </Button>
            </Flex>

        </Flex>
    )
}

export default memo(CustomHeader)