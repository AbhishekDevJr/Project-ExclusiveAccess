// import React from 'react'

import { Button, Form, Input, Spin } from "antd";
import './exclusiveaccess.scss';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

function ExclusiveAccess() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const exclusiveAPI = async (reqObj) => {
        try {
            setIsLoading(true);
            const exclusiveRes = await fetch('https://project-exclusiveaccess.onrender.com/users/exclusive', {
                method: 'POST',
                body: JSON.stringify(reqObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const resFinal = await exclusiveRes.json();

            if (resFinal.resCode === 'OK') {

                toast.success(`${resFinal.message}`, {
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
            else if (resFinal.resCode === 'hasAccess') {
                toast.success(`${resFinal.message}`, {
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
            setIsLoading(false);
        }
        catch (e) {
            setIsLoading(false);
            console.log('Error------->', e);
        }
    }

    const onFinish = (data) => {
        if (data.exclusivePasscode.toLowerCase() === 'rasengan') {
            exclusiveAPI(data);
            form.resetFields();
        }
        else {
            toast.error('Incorrect Passcode', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const onFinishFailed = (data) => {
        alert(`Please enter valid data for following fields:- ${data.errorFields.map((item) => item.name[0]).join()}`);
    };

    return (
        <Spin tip="Fetching..." size="large" fullscreen={isLoading} spinning={isLoading}>
            <div className='container-exclusiveAccess'>
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

                    <h1>Get Exclusive Access</h1>

                    <div className='group-input-exclusive'>
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
                            label="Exclusive Passcode"
                            name="exclusivePasscode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input a valid Passcode!',
                                    pattern: /^[A-Za-z]+$/
                                },
                            ]}
                        >
                            <Input />
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
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

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

            </div>
        </Spin>
    )
}

export default ExclusiveAccess;