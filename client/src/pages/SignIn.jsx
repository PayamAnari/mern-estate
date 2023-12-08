import { useState } from 'react';
import { Link, useNavigate }from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';


export default function SignIn() {
  const [formData, setFromData] = useState({})
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await fetch('api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(data.success === false) {
         dispatch(signInFailure(data.message));
         toast.error(data.message, { position: 'top-center',autoClose: 2000, });
         return;
      }
      dispatch(signInSuccess(data));
      const { username } = data;
      toast.success(`${username}, Sign in successfully!`, { position: 'top-center',autoClose: 2000, });
      navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
 
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>{loading ? 'loading...' : 'Sign in'}</button>
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
  )
}
