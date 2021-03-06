import React, { useEffect } from 'react';

import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mytodos from './features/todos/Mytodos';

import Header from './components/Header';

import Lists from './features/lists/Lists';

import { ToastContainer } from 'react-toastify';
import EditList from './features/lists/EditList';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';
import { PrivateRoute } from './components/PrivateRoute';
import Register from './features/auth/Register';
function App() {
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <div className='App container'>
            <Router>
                <div className='row d-flex justify-content-center'>
                    <Header />
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register'>
                            <Register />
                        </Route>
                        <PrivateRoute path='/lists/:list_id/todos'>
                            <Mytodos />
                        </PrivateRoute>
                        <PrivateRoute path='/lists/:list_id/edit'>
                            <EditList />
                        </PrivateRoute>
                        <PrivateRoute exact path='(/|/lists)'>
                            <Lists />
                        </PrivateRoute>
                        <PrivateRoute exact path='/logout'>
                            <Logout />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
            <ToastContainer
                position='bottom-right'
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
