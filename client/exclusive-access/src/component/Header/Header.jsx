import { Link, useNavigate } from 'react-router-dom'
import './header.scss';
import signout from '../../assets/signout.png';
import { decryptData } from '../../HelperFunctions/cryptoUtils';

function Header() {
    const navigate = useNavigate();
    const isSignedIn = localStorage.getItem('userAuth');
    const firstname = decryptData(localStorage.getItem('firstname'));

    const handleSignOut = () => {
        localStorage.setItem('userAuth', '');
        localStorage.setItem('expTime', '');
        localStorage.setItem('signedInAt', '');
        localStorage.setItem('userNotified', '');
        localStorage.setItem('firstname', '');
        localStorage.setItem('username', '');
        localStorage.setItem('isExclusiveUser', '');
        navigate('/signin');
    };

    return (
        <header className='strip-header'>
            <div className='secret-exculsive-route' onDoubleClick={() => navigate('/exclusive')}>
                <Link to='/'><h2>Members <span>only Club</span></h2></Link>
            </div>
            <div className='nav-links'>
                {isSignedIn ?
                    <div className='user-info'>
                        <h2><span>Welcome, </span>{firstname}!</h2>
                        <div className='container-signout' onClick={handleSignOut}>
                            <img src={signout} alt='' />
                            <span>SIGN OUT</span>
                        </div>
                    </div>
                    :
                    <>
                        <Link to='/signup'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            <span>SIGN UP</span>
                        </Link>
                        <Link to='/signin'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H12V13H4.5C4.22386 13 4 13.2239 4 13.5C4 13.7761 4.22386 14 4.5 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.5ZM6.60355 4.89645C6.40829 4.70118 6.09171 4.70118 5.89645 4.89645C5.70118 5.09171 5.70118 5.40829 5.89645 5.60355L7.29289 7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7.29289L5.89645 9.39645C5.70118 9.59171 5.70118 9.90829 5.89645 10.1036C6.09171 10.2988 6.40829 10.2988 6.60355 10.1036L8.85355 7.85355C9.04882 7.65829 9.04882 7.34171 8.85355 7.14645L6.60355 4.89645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            <span>SIGN IN</span>
                        </Link>
                    </>}
            </div>
        </header>
    )
}

export default Header;