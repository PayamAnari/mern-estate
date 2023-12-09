import { useState } from 'react';
import { Link, useNavigate }from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import UserIcon from '../assets/person.png';
import EmailIcon from '../assets/email.png';
import PasswordIcon from '../assets/password.png';

export default function SignUp() {
  const [formData, setFromData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFromData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
         setLoading(false);
         setError(data.message);
         
         return;
      }
      setLoading(false);
      setError(null);
      const { username } = formData; 
      toast.success(`${username}, Sign up successfully!`, { position: 'top-center',autoClose: 2000, })
      navigate('/sign-in');
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
 
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <h2 className=' text-slate-600 text-2xl text-center font-semibold my-5 mb-6'>Welcome to PayamEstate!</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <div className='relative'>
    <input
      type='text'
      placeholder='Username'
      className='border p-3 rounded-lg pl-10 w-full'
      id='username'
      onChange={handleChange}
    />
    <img
      src={UserIcon}
      alt='Username Icon'
      className='absolute left-3 top-3 h-5 w-5'
    />
  </div>
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
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>{loading ? 'loading...' : 'Sign up'}</button>
        <div className='flex items-center gap-2 mt-2'>
        <div className='border-b flex-1 border-slate-400'></div>
        <span className='mx-2'>Or</span>
        <div className='border-b flex-1 border-slate-400'></div>
      </div>
      <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      <p className='text-slate-500 mt-4 text-sm'>By signing up, you agree to our Terms Of Use and Privacy Policy</p>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
