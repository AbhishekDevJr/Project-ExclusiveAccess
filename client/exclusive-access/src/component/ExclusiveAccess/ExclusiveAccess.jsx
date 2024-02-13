// import React from 'react'

import { Button, Form, Input } from "antd";
import './exclusiveaccess.scss';
import { ToastContainer, toast } from 'react-toastify';

function ExclusiveAccess() {

    const [form] = Form.useForm();

    const exclusiveAPI = async (reqObj) => {
        const exclusiveRes = await fetch('http://localhost:5000/users/exclusive', {
            method: 'POST',
            body: JSON.stringify(reqObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const resFinal = await exclusiveRes.json();

        console.log('Res------------->', resFinal);

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
    }

    const onFinish = (data) => {
        console.log('data------->', data);
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
        console.log('Failed--------------->', data.errorFields.map((item) => item.name[0]).join());
        alert(`Please enter valid data for following fields:- ${data.errorFields.map((item) => item.name[0]).join()}`);
    };

    return (
        <div className='container-exclusiveAccess'>
            <h1>Get Exclusive Access</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 12,
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
    )
}

export default ExclusiveAccess;