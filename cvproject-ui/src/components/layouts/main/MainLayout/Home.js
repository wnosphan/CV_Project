import * as React from 'react'
import { Layout, Row, } from 'antd'

import CustomHeader from '~/components/layouts/components/CustomHeader'

const { Header, Content, Footer } = Layout;

function Home({ children }) {

    return (

        <Layout>
            <Header className='flex justify-between bg-white shadow-sm'>
                <CustomHeader />
            </Header>
            <Content className='mx-3 mb-6 p-5'>
                <Row>
                    {children}
                </Row>
            </Content>
            <Footer className='text-center'>
                Team 2 ©{new Date().getFullYear()} Created by Team 2
            </Footer>
        </Layout>

    )
}

export default Home