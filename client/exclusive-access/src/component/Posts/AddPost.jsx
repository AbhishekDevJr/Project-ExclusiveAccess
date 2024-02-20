import { Button, Form, Input } from "antd";

function AddPost() {

    const addPostApi = (reqBody) => {
        //Handle Add Post API Here
    };

    const onFinish = (data) => {
        addPostApi(data);
    }

    const onFinishFailed = (data) => {
        console.log('error--------->', data);
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
            >

                <h1>Add Post</h1>

                <div className='group-signin-inputs'>
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
                        <Input.TextArea classNames='input-passwords' />
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
    )
}

export default AddPost;