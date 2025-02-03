import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (state === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          toast.success('Account created successfully!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          toast.success('Logged in successfully!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form 
      onSubmit={onSubmitHandler} 
      className='min-h-[80vh] flex items-center' 
      autoComplete="on"
      name="login-form"
    >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type="text"
              name="name"
              required
              autoComplete="name"
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="email"
            name="email"
            required
            autoComplete="email"
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            name="password"
            required
            autoComplete={state === 'Sign Up' ? 'new-password' : 'current-password'}
          />
        </div>

        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>Already have an account? <span onClick={() => { setState('Login'); setPassword(''); }} className='text-primary underline cursor-pointer'>Login here</span></p>
        ) : (
          <p>Don't have an account? <span onClick={() => { setState('Sign Up'); setPassword(''); }} className='text-primary underline cursor-pointer'>Sign up here</span></p>
        )}
      </div>
    </form>
  );
};

export default Login;
