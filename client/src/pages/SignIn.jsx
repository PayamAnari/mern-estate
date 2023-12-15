import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import EmailIcon from '../assets/email.png';
import PasswordIcon from '../assets/password.png';

export default function SignIn() {
  const [formData, setFromData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message, { position: 'top-center', autoClose: 2000 });
        return;
      }
      dispatch(signInSuccess(data));
      const { username } = data;
      toast.success(
        <span className='capitalize'>{`${username}, Sign in successfully!`}</span>,
        { position: 'top-center', autoClose: 2000 }
      );
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className=' max-w-lg border-4 rounded-3xl p-4 mt-9 mx-4 sm:mx-auto shadow-xl'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <h2 className='text-slate-600 text-2xl text-center font-semibold mb-6'>
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <div className='relative'>
          <input
            type='text'
            placeholder='Email'
            className='border p-3 rounded-lg pl-10 w-full'
            id='email'
            onChange={handleChange}
          />
          <img
            src={EmailIcon}
            alt='Email Icon'
            className='absolute left-3 top-3 h-5 w-5'
          />
        </div>
        <div className='relative'>
          <input
            type='password'
            placeholder='Password'
            className='border p-3 rounded-lg pl-10 w-full'
            id='password'
            onChange={handleChange}
          />
          <img
            src={PasswordIcon}
            alt='password Icon'
            className='absolute left-3 top-3 h-5 w-5'
          />
        </div>
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'
        >
          {loading ? 'loading...' : 'Sign in'}
        </button>
        <div className='flex items-center gap-2 mt-2'>
          <div className='border-b flex-1 border-slate-400'></div>
          <span className='mx-2'>Or</span>
          <div className='border-b flex-1 border-slate-400'></div>
        </div>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  );
}
