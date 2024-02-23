import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

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