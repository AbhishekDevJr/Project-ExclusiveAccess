// import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Success:', values.password === values.conPassword, values.password, values.conPassword);
        if (values.password === values.conPassword) {
            console.log('ResetB--------->');
            form.resetFields();
            //Call POST API Here
            const userAdd = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const userAddRes = await userAdd.json();

            if (userAddRes.resCode === 'UserCreated') {
                toast.success(`${userAddRes.message}`, {
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
            else if (userAddRes.resCode === 'UserExists') {
                toast.success(`${userAddRes.message}`, {
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
            else {
                toast.warn(`Unhandled Server Error.`, {
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

            console.log('ResetA--------->');
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

        form.resetFields();
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
                form={form}
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
                    key='firstname'
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
                    key='lastName'
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
                    key='email'
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
                    key='password'
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
                    key='cPassword'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    key='submit'
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