import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRouter = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div>Loading....</div>
    }
    if (user && user.email) {
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRouter;