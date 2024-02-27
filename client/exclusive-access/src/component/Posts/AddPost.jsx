import { Button, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import './addpost.scss';

function AddPost() {

    const userAuthToken = localStorage.getItem('userAuth');
    const [form] = Form.useForm();

    const addPostApi = async (reqBody) => {
        //Handle Add Post API Here

        try {
            const addpost = await fetch('https://project-exclusiveaccess.onrender.com/post/add', {
                method: 'POST',
                body: JSON.stringify({ ...reqBody, time_stamp: new Date(), token: userAuthToken }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    // Authorization: `Bearer ${userAuthToken}`
                },
            });

            const addPostRes = await addpost.json();

            if (addPostRes.resCode === 'postCreated') {
                toast.success(`${addPostRes.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                form.resetFields();
                window.location.href = '/';
            }
            else if (addPostRes.resCode === 'badRequest') {
                toast.success(`${addPostRes.message}`, {
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
                toast.success(`Unhandled Server Error!`, {
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

        } catch (e) {
            console.log(e);
        }
    };

    const onFinish = (data) => {
        addPostApi(data);
    }

    const onFinishFailed = (data) => {
        alert(`Please enter valid data for following fields:- ${data.errorFields.map((item) => item.name[0]).join()}`);
    }

    return (
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

export default AddPost;