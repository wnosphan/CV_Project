import React, { useState } from 'react'
import { Form, Input, Layout, Button, Space, DatePicker, notification } from 'antd'
import { SaveOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom'

import { myCVListApi } from '~/api';
import handleLogError from '~/utils/HandleError';
import { NOTIFICATION } from '~/configs'
import Home from '~/components/layouts/main/MainLayout/Home';

const { Header, Content, Footer } = Layout

function Create() {

    let navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const [post, setPost] = useState({
        full_name: "",
        date_of_birth: "",
        skill: "",
        university: "",
        training_system: "",
        create_by: 1,
        gpa: "",
        apply_position: "",
        link_cv: "",
    },)

    const handleInput = (event) => {
        if (event.target.name === "create_by") {
            const numberValue = parseInt(event.target.value, 10);
            if (!isNaN(numberValue)) {
                setPost({ ...post, [event.target.name]: numberValue });
            } else {
                console.error("create_by must be a number");
            }
        }
        else {
            setPost({ ...post, [event.target.name]: event.target.value });
        }
    }

    const handleDateChange = (date, dateString) => {
        setPost({ ...post, date_of_birth: dateString });
    };

    const [form] = Form.useForm();


    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            await form.validateFields()
            const response = await myCVListApi.createCV(post)
            if (response.status === 200) {
                api.success({
                    message: NOTIFICATION.CREATE.SUCCESS,
                    duration: 2,
                });
                navigate("/");
            }
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
            api.error({
                message: NOTIFICATION.CREATE.ERROR,
                duration: 2,
            });
            handleLogError(errorInfo);
        }
    }


    const contentStyle = {
        textAlign: 'center',
        margin: "auto",
        marginLeft: "120px",
        padding: " 30px",
    }

    const h1Style = {
        textAlign: '90px',
        fontWeight: 'bold',
        fontSize: 25,
    }

    return (
        <Home>
            {contextHolder}
            <Layout>
                <Content >
                    <Form onSubmitCapture={handleSubmit} style={contentStyle}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}
                        autoComplete='off' form={form}
                    >
                        <div className='mb-6'><h1 style={h1Style}>Create a New CV</h1></div>
                        <Form.Item name="Full Name" label="Full Name"
                            rules={[{ required: true, message: "Please Enter Candidate's Full Name" },
                            { whitespace: true },
                            { min: 2, max: 200 },
                            ]}
                            hasFeedback
                        >
                            <Input name="full_name" onChange={handleInput} placeholder='Type candidate name' />
                        </Form.Item>

                        <Form.Item name="Apply position" label="Apply position"
                            rules={[{ required: true, message: "Please Enter Candidate's Position" },
                            { whitespace: true },
                            { min: 1 },
                            ]}
                            hasFeedback
                        >
                            <Input name="apply_position" onChange={handleInput} placeholder='Type candidate position' />
                        </Form.Item>

                        <Form.Item name="Skills" label="Skills"
                            rules={[{ required: true, message: "Please Enter Candidate's Skills" },
                            { whitespace: true },
                            ]}
                            hasFeedback
                        >
                            <Input name="skill" onChange={handleInput} placeholder='Type candidate skills' />
                        </Form.Item>

                        <Form.Item name="Date of Births" label="Date of Birth"
                            rules={[{ required: true, message: "Please Provide Candidate's Birthday" },
                            ]}
                            hasFeedback
                        >
                            <DatePicker name="date_of_birth" type='date' onClick={handleInput} style={{ width: "100%" }} placeholder='Chose date of birth'
                                value={post.date_of_birth}
                                onChange={handleDateChange} />
                        </Form.Item>

                        <Form.Item name="University" label="University"
                            rules={[{ required: true, message: "Please Enter Candidate's University" },
                            { whitespace: true },
                            ]}
                            hasFeedback
                        >
                            <Input name="university" onChange={handleInput} placeholder='Type candidate university' />
                        </Form.Item>

                        <Form.Item name="GPA" label="GPA"
                            rules={[{ required: true, message: "Please Enter Candidate's GPA" },
                            { whitespace: true },
                            { pattern: /^(4|3|2|1)(\.\d+)?$/, message: 'GPA is a decimal number and must be between 1 and 4' },
                            ]}
                            hasFeedback
                        >
                            <Input name="gpa" onChange={handleInput} placeholder='Type candidate GPA' />
                        </Form.Item>

                        <Form.Item name="TrainingSystem" label="TrainingSystem"
                            rules={[{ required: true, message: "Please Enter Candidate's Training system" },
                            { whitespace: true },
                            ]}
                            hasFeedback
                        >
                            <Input name="training_system" onChange={handleInput} placeholder='Type candidate training system' />
                        </Form.Item>

                        <Form.Item name="Upload" label="Upload"
                            rules={[{ required: true, message: "Please Enter Candidate's CV link" },
                            { whitespace: true },
                            ]}
                            hasFeedback
                        >
                            <Input name="link_cv" onChange={handleInput} placeholder='link CV' />
                        </Form.Item>

                        <Form.Item >
                            <Space size={25}>
                                <Button type='primary' htmlType='submit' icon={<SaveOutlined />}>
                                    Save
                                </Button>

                                <Button href='/'>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Home>

    );


}
export default Create