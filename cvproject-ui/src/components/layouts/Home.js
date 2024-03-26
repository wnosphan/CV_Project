import React, { useEffect, useState } from 'react'
import { Layout, Row, Typography, Button } from 'antd'
import { useAuth } from "react-oidc-context"
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import MainContent from '../Content/MainContent'
import { properties } from '../../configs/properties'
import Sidebar from '../Sidebar'
import CustomHeader from '../CustomHeader'
import handleLogError from '../../utils/HandleError';
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

    return (

        <Layout>
            <Sider theme="light" trigger={null} collapsed={collapsed} className="h-screen sticky bottom-0 left-0 top-0">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-14 h-14 text-base fixed bottom-2.5 left-2.5"
                />
                <Sidebar />
            </Sider>
            <Layout>
                {isUser ? (
                    <>
                        <Header className='flex justify-end bg-white'>
                            <CustomHeader />
                        </Header>
                        <Content className='mx-3 my-6 p-5'>
                            <Row justify="space-evenly">
                                <MainContent />
                            </Row>
                        </Content>
                    </>
                ) : (
                    <div className='text-center'>
                        <Title>Oops ...</Title>
                        <Title level={2} style={{ color: 'grey' }}>Sai rồi má ơi!</Title>
                    </div>
                )}
                <Footer className='text-center'>
                    Team 2 ©{new Date().getFullYear()} Created by Team 2
                </Footer>
            </Layout>
        </Layout>

    )
}

export default Home