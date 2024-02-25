import { useEffect, useState } from "react";
import './home.scss';
import moment from 'moment';

function Home() {
    const isSignedIn = localStorage.getItem('userAuth');
    const [allPosts, setAllPosts] = useState([]);

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
            setAllPosts(allPostsRes.posts.reverse());

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPostsApi();
    }, []);

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
                    {allPosts.length ?
                        allPosts.map((item, index) => <div key={index} className="post-box">
                            <p>Title : {item.title}</p>
                            <p>Description : {item.description}</p>
                            <p>Author : {item.author}</p>
                            <p>Created At : {moment(item.time_stamp).format('HH:mm, DD/MM/YYYY')}</p>
                        </div>)
                        :
                        <div>No Data to Show!</div>}
                </div>
                :
                <div className='container-posts'>
                    {allPosts.length ?
                        allPosts.map((item, index) => <div key={index} className="post-box">
                            <p>Title : {item.title}</p>
                            <p>Description : {item.description}</p>
                            <p>Author : {item.author}</p>
                            <p>Created At : {moment(item.time_stamp).format('HH:mm, DD/MM/YYYY')}</p>
                        </div>)
                        :
                        <div>No Data to Show!</div>}
                </div>}
        </div>
    );
}

export default Home;