import { useEffect, useState } from "react";
import './home.scss';
import moment from 'moment';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Modal, Popconfirm, Spin } from 'antd';
import { decryptData } from "../../HelperFunctions/cryptoUtils";

function Home() {
    //LocalStorage Params & State Variable Declarations
    const isSignedIn = localStorage.getItem('userAuth');
    const signedInUser = localStorage.getItem('username') ? decryptData(localStorage.getItem('username')) : undefined;
    const isExclusiveUser = localStorage.getItem('isExclusiveUser') ? decryptData(localStorage.getItem('isExclusiveUser')) : undefined;
    const firstname = localStorage.getItem('firstname') ? decryptData(localStorage.getItem('firstname')) : undefined;
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState({});
    const [form] = Form.useForm();

    //Function to Render Action Btns based on User Information
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

    //Function responsible for making GetPost API Request to Get Post Information
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

    //Modal Component State Handler functions
    const handleEdit = (index) => {
        setEditModalData(allPosts[index]);
        form.setFieldsValue(allPosts[index]);
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

    //Function to handle Edit Post API
    const onFinish = async (data) => {
        setIsModalOpen(false);
        try {
            setIsLoading(true);
            const allUpdatedPosts = await fetch('https://project-exclusiveaccess.onrender.com/post/edit', {
                method: 'POST',
                body: JSON.stringify({ ...data, updatedAt: moment(), _id: editModalData._id }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const allPostsRes = await allUpdatedPosts.json();
            setAllPosts(allPostsRes.updatedPosts.reverse());
            setIsLoading(false);

        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    }

    //Function to handle Delete Post API Request
    const handleDelete = async (index) => {
        try {
            setIsLoading(true);
            const allUpdatedPosts = await fetch('https://project-exclusiveaccess.onrender.com/post/delete', {
                method: 'POST',
                body: JSON.stringify({ _id: allPosts[index]._id }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const allUpdatedPostsRes = await allUpdatedPosts.json();
            setAllPosts(allUpdatedPostsRes.updatedPosts.reverse());
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    //Function to return User Greet Status.
    const getUserGreetStatus = () => {
        return localStorage.getItem('userGreeted') === 'true';
    }

    //UseEffect Hook to Call GetPost API request, handle User Greet Action
    useEffect(() => {
        getPostsApi();

        if (getUserGreetStatus()) {
            toast.success(`Hi there, ${firstname}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                localStorage.removeItem('userGreeted');
            }, 3000);
        }
    }, []);

    return (
        <>
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
                            {allPosts.length ?
                                allPosts.map((item, index) => <div key={index} className="post-box">
                                    <div className='post-info'>
                                        <p>Title : {item.title}</p>
                                        <p>Description : {item.description}</p>
                                        <p>Author : {item.author}</p>
                                        <p>Created At : {moment(item.time_stamp).format('HH:mm, DD/MM/YYYY')}</p>
                                    </div>

                                    {(isExclusiveUser) ?
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
                            {allPosts.length ?
                                allPosts.map((item, index) => <div key={index} className="post-box-nonSignIn">
                                    <p>Title : {item.title}</p>
                                    <p>Description : {item.description}</p>
                                    <p>Author : {item.author}</p>
                                    <p>Created At : {moment(item.time_stamp).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>)
                                :
                                <div>No Data to Show!</div>}
                        </div>}
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
                            onFinish={onFinish}
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
                        </Form>
                    </Modal>
                </div>
            </Spin>
        </>
    );
}

export default Home;