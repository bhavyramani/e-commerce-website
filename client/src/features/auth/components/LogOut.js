import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';

const LogOut = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    useEffect(() => {
        dispatch(signOutAsync(user.id));
    }, [dispatch]);

    return (
        <>
            {user && <Navigate to="/login"></Navigate>}
        </>
    )
}

export default LogOut
