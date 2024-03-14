// import React from 'react'

import { Button, Form, Input, Spin } from "antd";
import './signin.scss';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { encryptData } from "../../HelperFunctions/cryptoUtils";

function SignIn() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    //Function to handle SignIn API Request
    const signInApi = async (reqObj) => {
        try {
            setIsLoading(true);
            const userSignIn = await fetch('https://project-exclusiveaccess.onrender.com/users/signin', {
                method: 'POST',
                body: JSON.stringify(reqObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const userRes = await userSignIn.json();

            if (userRes.resCode === 'Authenticated') {
                form.resetFields();

                localStorage.setItem('userAuth', userRes.token);
                localStorage.setItem('expTime', userRes.expTime);
                localStorage.setItem('signedInAt', moment());
                localStorage.setItem('firstname', encryptData(userRes.name));
                localStorage.setItem('username', encryptData(userRes.username));
                localStorage.setItem('isExclusiveUser', userRes.isExclusiveUser ? encryptData(userRes.isExclusiveUser) : '');
                localStorage.setItem('userGreeted', true);

                toast.success(`${userRes.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                navigate('/');
            }
            else if (userRes.resCode === 'Authentication Failed') {
                toast.error(`${userRes.message}`, {
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
            else if (userRes.resCode === 'UserNotFound') {
                toast.info(`${userRes.message}`, {
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
                form.resetFields();
                toast.error(`Unhandled Server Error`, {
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
            setIsLoading(false);
        }
        catch (e) {
            setIsLoading(false);
            console.log('Error---->', e);
        }
    }

    //Form Finish/Validation Success Function
    const onFinish = (data) => {
        signInApi(data);
    }

    //Form FinishFailed/Validation Error Function
    const onFinishFailed = (data) => {
        alert(`Please enter valid data for following fields:- ${data.errorFields.map((item) => item.name[0]).join()}`);
    }

    return (
        <>
            <Spin tip="Fetching..." size="large" fullscreen={isLoading} spinning={isLoading}>
                <div className={`container-signin`}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >

                        <h1>Sign In</h1>

                        <div className='group-signin-inputs'>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a valid Username!',
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
                                        message: 'Please input a valid Passcode!',
                                        pattern: /^[ A-Za-z0-9_@./#&+-]*$/
                                    },
                                ]}
                            >
                                <Input.Password classNames='input-passwords' />
                            </Form.Item>
                        </div>

                        <div className='group-btn'>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    SIGNIN
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Spin>
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
            // transition: Bounce
            />
        </>
    )
}

export default SignIn;