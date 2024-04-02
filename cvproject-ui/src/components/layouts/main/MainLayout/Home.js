import * as React from 'react'
import { Layout, Row, Typography, } from 'antd'
import { useAuth } from "react-oidc-context"

import { properties } from '~/configs/properties'
import CustomHeader from '~/components/layouts/components/CustomHeader'
import handleLogError from '~/utils/HandleError';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function Home({ children }) {
    const auth = useAuth();

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

    return (

        <Layout>
            {isUser ? (
                <>
                    <Header className='flex justify-between bg-white'>
                        <CustomHeader />
                    </Header>
                    <Content className='mx-3 mb-6 p-5'>
                        <Row justify="space-evenly">
                            {children}
                        </Row>
                    </Content>
                    <Footer className='text-center'>
                        Team 2 ©{new Date().getFullYear()} Created by Team 2
                    </Footer>
                </>
            ) : (
                <div className='text-center'>
                    <Title>Oops ...</Title>
                    <Title level={2} style={{ color: 'grey' }}>Sai rồi má ơi!</Title>
                </div>
            )}
        </Layout>

    )
}

export default Home