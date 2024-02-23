import { useEffect, useState } from "react";

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
            setAllPosts(allPostsRes.posts)

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPostsApi();
    }, []);

    console.log('AppPosts-------->', allPosts);

    return (
        <div>
            {isSignedIn ? <div>Signed In User</div> : <div>Non Signed In User</div>}
        </div>
    );
}

export default Home;