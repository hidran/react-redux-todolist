import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userLoggedout } from './userSlice';
import { useDispatch } from 'react-redux';
export const Logout = () => {
    const dispatch = useDispatch();
    const hist = useHistory();
    useEffect(() => {
        
        dispatch(userLoggedout(null));
        hist.replace('/');
        return () => {};
    }, [hist]);
    return <div>Loging out...</div>;
};
export default Logout;
