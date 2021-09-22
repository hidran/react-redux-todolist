import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../../service/authService';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLoggedin } from './userSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { error, isLoading, data }] = useLoginMutation();
    const dispatch = useDispatch();
    const hist = useHistory();
    console.log(error, isLoading, data);
    const verifyLogin = (e) => {
        e.preventDefault();
        if (email.length < 6) {
            alert('Email length has to be 6 chars');
        }

        login({ email, password });
    };

    useEffect(() => {
        if (data && data.access_token) {
            console.log('data', data);

            dispatch(userLoggedin(data));
            hist.replace('/');
            console.log('redirected home');
        }
        return () => {};
    }, [dispatch, hist, data]);

    return (
        <div className='col-md-6 m-auto'>
            {error && <h2 className='alert-danger'>{error.data.error}</h2>}
            <form onSubmit={verifyLogin} method='POST'>
                <div className='form-group'>
                    <label htmlFor='email'>Email address</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control'
                        id='email'
                        aria-describedby='emailHelp'
                        placeholder='Enter email'
                    />

                    <small id='emailHelp' className='form-text text-muted'>
                        Email that you have used while registration.
                    </small>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control'
                        id='password'
                        placeholder='Password'
                    />
                </div>
                <div className='form-check'>
                    <input
                        type='checkbox'
                        name='checkbox'
                        className='form-check-input'
                        id='remember'
                    />
                    <label className='form-check-label' htmlFor='remember'>
                        Remember me
                    </label>
                </div>
                <button type='submit' className='btn btn-primary float-right'>
                    Login
                </button>
            </form>
        </div>
    );
};
export default Login;
