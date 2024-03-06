import { useEffect, useState } from "react";
import './home.scss';
import moment from 'moment';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Modal, Popconfirm, Spin } from 'antd';
import { decryptData } from "../../HelperFunctions/cryptoUtils";
// import { ReactComponent as EditSvg } from '../../assets/delete.svg';

function Home() {
    const isSignedIn = localStorage.getItem('userAuth');
    const signedInUser = decryptData(localStorage.getItem('username'));
    const isExclusiveUser = decryptData(localStorage.getItem('isExclusiveUser'));
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState({});
    const [form] = Form.useForm();

    const dummyData = [
        {
            title: "Lorem Ipsum 1",
            description: "This is a dummy description for the first object.",
            author: "John Doe",
            time_stamp: "2024-02-24",
        },
        {
            title: "Lorem Ipsum 2",
            description: "Another dummy description for the second object.",
            author: "Jane Smith",
            time_stamp: "2024-02-25",
        },
        {
            title: "Lorem Ipsum 3",
            description: "Yet another dummy description for the third object.",
            author: "Bob Johnson",
            time_stamp: "2024-02-26",
        },
        {
            title: "Lorem Ipsum 4",
            description: "Description for the fourth object.",
            author: "Alice Brown",
            time_stamp: "2024-02-27",
        },
        {
            title: "Lorem Ipsum 5",
            description: "Description for the fifth object.",
            author: "Charlie Wilson",
            time_stamp: "2024-02-28",
        },
        {
            title: "Lorem Ipsum 6",
            description: "Description for the sixth object.",
            author: "Eva Davis",
            time_stamp: "2024-02-29",
        },
        {
            title: "Lorem Ipsum 7",
            description: "Description for the seventh object.",
            author: "Frank Miller",
            time_stamp: "2024-03-01",
        },
        {
            title: "Lorem Ipsum 8",
            description: "Description for the eighth object.",
            author: "Grace Lee",
            time_stamp: "2024-03-02",
        },
        {
            title: "Lorem Ipsum 9",
            description: "Description for the ninth object.",
            author: "Harry Turner",
            time_stamp: "2024-03-03",
        },
        {
            title: "Lorem Ipsum 10",
            description: "Description for the tenth object.",
            author: "Ivy Perez",
            time_stamp: "2024-03-04",
        },
    ];

    const getPostActions = (index) => {
        return (
            <div className='post-actionBtns'>
                <svg onClick={() => handleEdit(index)} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#A6ADBA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#A6ADBA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <Popconfirm
                    title="Delete this Post"
                    description="Are you sure you want to delete this post?"
                    onConfirm={() => handleDelete(index)}
                    onCancel={() => { }}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" /><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" />
                    </svg>
                </Popconfirm>
            </div>
        );
    }

    const getPostsApi = async () => {
        try {
            setIsLoading(true);
            const allPosts = await fetch('https://project-exclusiveaccess.onrender.com/get-posts', {
                method: 'GET',
                body: JSON.stringify(),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const allPostsRes = await allPosts.json();
            setAllPosts(allPostsRes.posts.reverse());
            setIsLoading(false);

        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    };

    const handleEdit = (index) => {
        console.log(dummyData[index]);
        setEditModalData(dummyData[index]);
        form.setFieldsValue(dummyData[index]);
        setIsModalOpen(true);
    }

    const handleEditClose = () => {
        setEditModalData({});
        setIsModalOpen(false);
    }

    const handleEditSubmit = () => {
        form.validateFields()
            .then((values) => {
                onFinish(values);
                setIsModalOpen(false);
            })
            .catch((error) => {
                alert(`Please enter valid data for following fields:- ${error.errorFields.map((item) => item.name[0]).join()}`);
            })
    }

    const onFinish = (data) => {
        setIsModalOpen(false);
        //Call Edit API Here
        console.log('form data---------->', data);
    }

    const handleDelete = (index) => {
        console.log('Delete Index------->', index);
        //Call Delete API Here
    }

    // useEffect(() => {
    //     getPostsApi();

    //     if (isSignedIn && !localStorage.getItem('userNotified')) {
    //         toast.success(`Successfully Signed In!`, {
    //             position: "top-center",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });

    //         localStorage.setItem('userNotified', 'userNotified');
    //     }
    // }, []);

    return (
        <Spin tip="Fetching..." size="large" fullscreen={isLoading} spinning={isLoading}>
            <div className='container-home'>
                <h1>Special club for <span>members</span> only</h1>

                <div className='general-info'>
                    <p>Everybody can see posts and their <span>creators.</span></p>
                    <p><span>Members</span> can {isSignedIn ? <Link to='/post/add'><span id='btn-addPost'>Add Posts.</span></Link> : 'add posts.'} </p>
                    <p>Exclusive <span>Members</span> can Edit/Update anyone&apos;s Posts.</p>
                </div>

                {isSignedIn ?
                    <div className='container-posts'>
                        {dummyData.length ?
                            dummyData.map((item, index) => <div key={index} className="post-box">
                                <div className='post-info'>
                                    <p>Title : {item.title}</p>
                                    <p>Description : {item.description}</p>
                                    <p>Author : {item.author}</p>
                                    <p>Created At : {moment(item.time_stamp).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>

                                {(true) ?
                                    getPostActions(index)
                                    :
                                    (signedInUser === item.author) ?
                                        getPostActions(index) :
                                        null
                                }
                            </div>)
                            :
                            <div>No Data to Show!</div>}
                    </div>
                    :
                    <div className='container-posts'>
                        {dummyData.length ?
                            dummyData.map((item, index) => <div key={index} className="post-box-nonSignIn">
                                <p>Title : {item.title}</p>
                                <p>Description : {item.description}</p>
                                <p>Author : {item.author}</p>
                                <p>Created At : {moment(item.time_stamp).format('HH:mm, DD/MM/YYYY')}</p>
                            </div>)
                            :
                            <div>No Data to Show!</div>}
                    </div>}

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="dark"
                />

                <Modal
                    title="Edit Post"
                    centered
                    open={isModalOpen}
                    onOk={handleEditSubmit}
                    onCancel={handleEditClose}
                    okText={'Submit'}
                >
                    <Form
                        name="basic"
                        // initialValues={editModalData}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                        layout="vertical"
                    >

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

                        {/* <div className='group-btn'>
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
                        </div> */}
                    </Form>
                </Modal>
            </div>
        </Spin>
    );
}

export default Home;