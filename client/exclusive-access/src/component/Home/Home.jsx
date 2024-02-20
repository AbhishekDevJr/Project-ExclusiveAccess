
function Home() {
    const isSignedIn = localStorage.getItem('userAuth');
    return (
        <div>
            {isSignedIn ? <div>Signed In User</div> : <div>Non Signed In User</div>}
        </div>
    )
}

export default Home