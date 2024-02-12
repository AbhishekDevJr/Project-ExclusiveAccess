// import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const onFinish = async (values) => {
        console.log('Success:', values.password === values.conPassword, values.password, values.conPassword);
        if (values.password === values.conPassword) {
            toast.success('Form Submitted Successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            //Call POST API Here
            await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        else {
            toast.error('Password & Confirm Password should match', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='container-singup' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Sign Up</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid First Name!',
                            pattern: /^[A-Za-z]+$/
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid Last Name!',
                            pattern: /^[A-Za-z]+$/
                        },
                    ]}
                >
                    <Input onCha />
                </Form.Item>

                <Form.Item
                    label="Emai"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid Email Id!',
                            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                            // pattern:
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Confirm Pass"
                    name="conPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    // pauseOnHover
                    theme="dark"
                    transition:Bounce
                />
            </Form>
        </div>
    );
}
export default SignUp;