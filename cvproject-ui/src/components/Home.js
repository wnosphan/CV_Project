import React, { useEffect, useState } from 'react'
import { Api } from '../components/Api'
import { Layout, Col, Row } from 'antd'
import { useAuth, hasAuthParams } from "react-oidc-context"
import AuthBar from './AuthBar'
import { Typography } from 'antd'
import ToDoForm from './TodoForm'
import ToDoTable from './ToDoTable'
import { properties } from '../configs/properties'
const { Header, Content } = Layout
const { Title } = Typography
function Home() {
    const [todos, setTodos] = useState([]);
    const auth = useAuth();
    // const [hasTriedSignin, setHasTriedSignin] = React.useState(false);
    const access_token = auth.user?.access_token;
    // useEffect(() => {
    //     handleToDos()
    // }, [])

    // const handleToDos = async () => {
    //     try {
    //         const response = await myToDoListApi.getToDos()
    //         setTodos(response.data)
    //     } catch (error) {
    //         handleLogError(error)
    //     }
    // }

    // const onFinish = async (addToDoRequest) => {
    //     try {
    //         await myToDoListApi.addToDo(addToDoRequest)
    //         await handleToDos()
    //     } catch (error) {
    //         handleLogError(error)
    //     }
    // }

    // const onComplete = async (key) => {
    //     try {
    //         await myToDoListApi.updateToDo(key, true)
    //         await handleToDos()
    //     } catch (error) {
    //         handleLogError(error)
    //     }
    // }

    // const onDelete = async (key) => {
    //     try {
    //         await myToDoListApi.deleteToDo(key)
    //         await handleToDos()
    //     } catch (error) {
    //         handleLogError(error)
    //     }
    // }

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
                }else if(response.status === 401){
                    console.log('Access token invalid, redirecting to login');
                }else{
                    
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

    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#333',
        fontSize: '3em'
    }

    return (
        <Layout>
            <Header style={headerStyle}>CVProject</Header>
            <AuthBar />
            {isUser() ? (
                <Content>
                    <Row justify="space-evenly">
                        <Col span={6}>
                            <ToDoForm
                            // onFinish={onFinish}
                            />
                        </Col>
                        <Col span={17}>
                            <ToDoTable
                                todos={todos}
                            // onComplete={onComplete}
                            // onDelete={onDelete}
                            />
                        </Col>
                    </Row>
                </Content>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <Title>Oops ...</Title>
                    <Title level={2} style={{ color: 'grey' }}>Sai rồi má ơi!</Title>
                </div>
            )}
        </Layout>
    )
}

export default Home