import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

//Funtion To Redirect Non-LogedIn Users to LoginIn Component, while accessing restricted routes
export default function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('userAuth');
    if (isAuthenticated) {
        return children;
    }
    else {
        return <Navigate to={'/signin'} />;
    }
}

ProtectedRoute.propTypes = {
    user: PropTypes.string,
    children: PropTypes.any.isRequired,
};