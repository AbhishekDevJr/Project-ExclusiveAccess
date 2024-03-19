import { Button, Form, Input, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import './addpost.scss';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const userAuthToken = localStorage.getItem('userAuth');
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    //Function to handle AddPost API Request & Handle Response
    const addPostApi = async (reqBody) => {
        try {
            setIsLoading(true);
            const addpost = await fetch('https://project-exclusiveaccess.onrender.com/post/add', {
                method: 'POST',
                body: JSON.stringify({ ...reqBody, time_stamp: new Date(), token: userAuthToken }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const addPostRes = await addpost.json();

            if (addPostRes.resCode === 'postCreated') {
                toast.success(`${addPostRes.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                form.resetFields();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            else if (addPostRes.resCode === 'badRequest') {
                toast.success(`${addPostRes.message}`, {
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
                toast.success(`Unhandled Server Error!`, {
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
            console.log(e);
        }
    };

    //Form Finish/Validation Success Function
    const onFinish = (data) => {
        addPostApi(data);
    }

    //Form FinishFailes/Validation Error Function
    const onFinishFailed = (data) => {
        alert(`Please enter valid data for following fields:- ${data.errorFields.map((item) => item.name[0]).join()}`);
    }

    return (
        <>
            <Spin tip="Fetching..." size="large" fullscreen={isLoading} spinning={isLoading}>
                <div className='container-add-post'>
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

                        <h1>Add Post</h1>

                        <div className='group-post-inputs'>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a valid Title!',
                                        pattern: /(?!^$)([^\s])/
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a valid Description!',
                                        pattern: /(?!^$)([^\s])/
                                    },
                                ]}
                            >
                                <Input.TextArea classNames='input-passwords' autoSize={true} />
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
                                    POST
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
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
    )
}

export default AddPost;