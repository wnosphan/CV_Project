import React from 'react'
import { useAuth } from "react-oidc-context"
import { Space, Typography, Button } from 'antd'
import { properties } from '../configs/properties'
const { Text } = Typography

function AuthBar() {
    const auth = useAuth()

    const spaceStyle = {
        background: "lightgrey",
        justifyContent: "end",
        paddingRight: "10px"
    }

    const handleLogout = () => {
        try {
            auth.removeUser();
            auth.signoutRedirect({ post_logout_redirect_uri: properties.project.url});
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Space wrap style={spaceStyle}>
            <Text>Hi {auth.user?.profile.preferred_username}</Text>
            <Button
                type="primary"
                size="small"
                onClick={handleLogout}
                danger
            >
                Logout
            </Button>
        </Space>
    )
}

export default AuthBar