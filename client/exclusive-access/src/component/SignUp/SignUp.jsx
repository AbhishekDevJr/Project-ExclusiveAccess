import { Button, Form, Input, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    //Form Instance/State Variable
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    //Function to handle SignUp API Request & Response Toasts 
    const onFinish = async (values) => {
        if (values.password === values.conPassword) {
            form.resetFields();

            try {
                setIsLoading(true);
                const userAdd = await fetch('https://project-exclusiveaccess.onrender.com/users/signup', {
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
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    navigate('/signin');
                }
                else if (userAddRes.resCode === 'UserExists') {
                    toast.success(`${userAddRes.message}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
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
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log('Error-->', e);
            }
        }
        else {
            toast.error('Password & Confirm Password should match', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    //Form Validation/Success Failed Function
    const onFinishFailed = (errorInfo) => {
        alert(`Please enter valid data for following fields:- ${errorInfo.errorFields.map((item) => item.name[0]).join()}`);
    };

    return (
        <>
            <Spin tip="Fetching..." size="large" fullscreen={isLoading} spinning={isLoading}>
                <div className='container-singup'>
                    <div className='container-signup-form'>
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

                            <h1>Sign up</h1>

                            <div className='group-input-names'>
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
                            </div>

                            <div className='group-input-email'>
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
                            </div>

                            <div className='group-input-password'>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                            pattern: /^[ A-Za-z0-9_@./#&+-]*$/
                                        },
                                    ]}
                                    key='password'
                                >
                                    <Input.Password classNames='input-passwords' />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="conPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                            pattern: /^[ A-Za-z0-9_@./#&+-]*$/
                                        },
                                    ]}
                                    key='cPassword'
                                >
                                    <Input.Password classNames='input-passwords' />
                                </Form.Item>
                            </div>

                            <div className='group-input-btn'>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                    key='submit'
                                >
                                    <Button type="primary" htmlType="submit">
                                        SIGN UP
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </Spin>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
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
    );
}
export default SignUp;