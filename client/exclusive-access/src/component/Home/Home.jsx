import { useEffect, useState } from "react";
import './home.scss';

function Home() {
    const isSignedIn = localStorage.getItem('userAuth');
    const [allPosts, setAllPosts] = useState([]);

    const dummyData = [
        {
            title: "Lorem Ipsum 1",
            description: "This is a dummy description for the first object.",
            author: "John Doe",
            date_stamp: "2024-02-24",
        },
        {
            title: "Lorem Ipsum 2",
            description: "Another dummy description for the second object.",
            author: "Jane Smith",
            date_stamp: "2024-02-25",
        },
        {
            title: "Lorem Ipsum 3",
            description: "Yet another dummy description for the third object.",
            author: "Bob Johnson",
            date_stamp: "2024-02-26",
        },
        {
            title: "Lorem Ipsum 4",
            description: "Description for the fourth object.",
            author: "Alice Brown",
            date_stamp: "2024-02-27",
        },
        {
            title: "Lorem Ipsum 5",
            description: "Description for the fifth object.",
            author: "Charlie Wilson",
            date_stamp: "2024-02-28",
        },
        {
            title: "Lorem Ipsum 6",
            description: "Description for the sixth object.",
            author: "Eva Davis",
            date_stamp: "2024-02-29",
        },
        {
            title: "Lorem Ipsum 7",
            description: "Description for the seventh object.",
            author: "Frank Miller",
            date_stamp: "2024-03-01",
        },
        {
            title: "Lorem Ipsum 8",
            description: "Description for the eighth object.",
            author: "Grace Lee",
            date_stamp: "2024-03-02",
        },
        {
            title: "Lorem Ipsum 9",
            description: "Description for the ninth object.",
            author: "Harry Turner",
            date_stamp: "2024-03-03",
        },
        {
            title: "Lorem Ipsum 10",
            description: "Description for the tenth object.",
            author: "Ivy Perez",
            date_stamp: "2024-03-04",
        },
    ];

    const getPostsApi = async () => {
        try {
            const allPosts = await fetch('http://localhost:5000/get-posts', {
                method: 'GET',
                body: JSON.stringify(),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const allPostsRes = await allPosts.json();
            setAllPosts(allPostsRes.posts)

        } catch (e) {
            console.log(e);
        }
    };

    // useEffect(() => {
    //     getPostsApi();
    // }, []);

    console.log('AppPosts-------->', allPosts);

    return (
        <div className='container-home'>
            <h1>Special club for <span>members</span> only</h1>

            <div className='general-info'>
                <p>Everybody can see posts and their <span>creators.</span></p>
                <p><span>Members</span> can add posts.</p>
                <p>Exclusive <span>Members</span> can Edit/Update anyone&apos;s Posts.</p>
            </div>

            {isSignedIn ?
                <div className='container-posts'>
                    {dummyData.length ?
                        dummyData.map((item, index) => <div key={index} className="post-box">
                            <p>Title : {item.title}</p>
                            <p>Description : {item.description}</p>
                            <p>Author : {item.author}</p>
                            <p>Created At : {item.date_stamp}</p>
                        </div>)
                        :
                        <div>No Data to Show!</div>}
                </div>
                :
                <div>Non Signed In User</div>}
        </div>
    );
}

export default Home;