// import React from 'react'

import { Button, Form, Input } from "antd";
import './signin.scss';
import { ToastContainer, toast } from 'react-toastify';

function SignIn() {

    const signInApi = async (reqObj) => {
        const userSignIn = await fetch('http://localhost:5000/users/signin', {
            method: 'POST',
            body: JSON.stringify(reqObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const userRes = await userSignIn.json();

        if (userRes.resCode === 'Authenticated') {
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
        }
        else if (userRes.resCode === 'Authentication Failed') {
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
        }
        else if (userRes.resCode === 'UserNotFound') {
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
        }
        else {
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

        console.log('userSignIn-------->', userRes);
    }

    const onFinish = (data) => {
        console.log('data----------->', data);
        signInApi(data);
    }

    const onFinishFailed = (data) => {
        console.log('error--------->', data);
        alert(`Please enter valid data for following fields:- ${data.errorFields.map((item) => item.name[0]).join()}`);
    }

    return (
        <div className='container-signin'>
            <h1>Sign In</h1>

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
                    label="Password"
                    name="password"
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

export default SignIn;