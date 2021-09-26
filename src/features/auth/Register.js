import React, { useState, useEffect } from 'react';
import { useRegisterMutation } from '../../service/authService';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userRegistered } from './userSlice';
import FieldError from '../../components/FieldError';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [register, { error, isLoading, data }] = useRegisterMutation();
    const dispatch = useDispatch();
    const hist = useHistory();
    console.log(error, isLoading, data);
    const verifyRegister = (e) => {
        e.preventDefault();
        if (email.length < 6) {
            alert('Email length has to be 6 chars');
        }

        register({ email, password, password_confirmation: password2, name });
    };

    useEffect(() => {
        if (data && data.access_token) {
            console.log('data', data);

            dispatch(userRegistered(data));
            hist.replace('/');
            console.log('redirected home');
        }
        return () => {};
    }, [dispatch, hist, data]);
    const emailErrors = error?.data?.errors?.email ?? [];
    const nameErrors = error?.data?.errors?.name ?? [];
    const passwordErrors = error?.data?.errors?.password ?? [];
    return (
        <div className='col-md-6 m-auto'>
            <form onSubmit={verifyRegister} method='POST'>
                <div className='form-group'>
                    <label htmlFor='email'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='form-control'
                        id='nasme'
                        aria-describedby='nameHelp'
                        placeholder='Enter name'
                    />
                    <small id='emailHelp' className='form-text text-muted'>
                        We'll never share your email with anyone else.
                    </small>
                    <FieldError errors={nameErrors} />
                </div>
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
                        We'll never share your email with anyone else.
                    </small>
                    <FieldError errors={emailErrors} />
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
                    <FieldError errors={passwordErrors} />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmpassword'>Password</label>
                    <input
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        className='form-control'
                        id='confirmpassword'
                        placeholder='Password Again'
                    />
                </div>

                <button
                    disabled={password != password2 ? true : false}
                    type='submit'
                    className='btn btn-primary float-right'>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
