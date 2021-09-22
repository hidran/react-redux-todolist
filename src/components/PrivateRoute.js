import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = (props) => {
    const user = useSelector((state) => state.user);
    if (user) {
        return <Route {...props}>{props.children}</Route>;
    }
    return <Redirect to='/login'></Redirect>;
};
