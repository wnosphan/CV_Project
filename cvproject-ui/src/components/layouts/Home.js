import React, { useEffect, useState } from 'react'
import { Layout, Col, Row } from 'antd'
import { useAuth } from "react-oidc-context"
import { Typography, Button, Flex } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MainContent from '../Content/MainContent'
import { properties } from '../../configs/properties'
import Sidebar from '../Sidebar'
import CustomHeader from '../CustomHeader'
const { Sider, Header, Content, Footer } = Layout;
const { Title } = Typography

function Home() {
    const [collapsed, setCollapsed] = useState(true);

    const auth = useAuth();
    // const [hasTriedSignin, setHasTriedSignin] = React.useState(false);
    const access_token = auth.user?.access_token;

    const isUser = async () => {
        fetch(`${properties.api.baseUrl}/hello`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`  // Ensure correct format
            }
        })
            .then(response => {
                if (response.status === 200) {
                    const { profile } = auth.user;
                    console.log(profile);
                    return profile;
                } else if (response.status === 401) {
                    console.log('Access token invalid, redirecting to login');
                } else {

                }
            })
            .catch(error => {
                handleLogError(error);
            });
    }
    // async function checkAccessToken(token) {
    //     try {
    //         const response = await Api.hello(token);
    //         if (response.status === 200) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } catch (error) {
    //         handleLogError(error);
    //         return false;
    //     }
    // }
    // useEffect(() => {
    //     const handleAuthentication = async () => {
    //         try {
    //             if (auth.isAuthenticated) {
    //                 const isValid = await checkAccessToken(auth.user?.access_token);
    //                 if (!isValid) {
    //                     console.warn('Access token invalid, redirecting to login');
    //                     auth.signinRedirect();
    //                     setHasTriedSignin(true);
    //                 }
    //             }
    //         } catch (error) {
    //             handleLogError(error);

    //             if (error.response?.status === 401) {

    //                 auth.signinRedirect();
    //             } else {
    //                 console.log('An error occurred while trying to authenticate the user');
    //             }
    //         }
    //     };
    //     if (auth.isAuthenticated) {
    //         handleAuthentication();
    //     }
    // }, [auth, hasTriedSignin]);

    const handleLogError = (error) => {
        if (error.response) {
            console.log(error.response.data)
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log(error.message)
        }
    }


    return (

        <Layout>
            <Sider theme="light" trigger={null} collapsed={collapsed} className="sider">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
                <Sidebar />
            </Sider>
            <Layout>
                <Header className='header'>
                    <CustomHeader />
                </Header>
                {isUser() ? (
                    <Content className='content'>
                        <Row justify="space-evenly">
                            <MainContent />
                        </Row>
                    </Content>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <Title>Oops ...</Title>
                        <Title level={2} style={{ color: 'grey' }}>Sai rồi má ơi!</Title>
                    </div>
                )}
                <Footer className='footer' style={{
                    textAlign: 'center',
                }}>
                    Team 2 ©{new Date().getFullYear()} Created by Team 2
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Home