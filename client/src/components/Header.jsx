import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
import { toast } from 'react-toastify';


export default function Header() {
  const { currentUser, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        toast.error(error.message, { position: 'top-center',autoClose: 2000, })
        return;
      }
      dispatch(signOutUserSuccess(data));
      toast.success('Sign out successful!', { position: 'top-center',autoClose: 2000, });
      setShowDropdown(false);

      navigate('/sign-in');

    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);


  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-600'>Payam</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex gap-6 items-center sm:gap-0'>
          <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button>
          <FaSearch className='text-slate-600' />
          </button>
          
        </form>
        <ul className='flex gap-4 '>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
          {currentUser && <p className='font-semibold text-slate-700 capitalize text-xs  mt-2 sm:mt-0 sm:text-base  sm:ml-0'>{`Hi, ${currentUser.username}`}</p>}
          <div className='relative' ref={dropdownRef} style={{ zIndex: 1000 }}>
            {currentUser && (
              <img
                onClick={() => setShowDropdown(!showDropdown)}
                className='rounded-full h-9 w-9 object-cover cursor-pointer mr-7 sm:mr-0'
                src={currentUser.avatar}
                alt='profile'
              />
            )}
            {!currentUser && (
              <Link to={'/sign-in'}>
             <li className='text-slate-700 hover:underline'>Sign in</li>
             </Link>
            )}
            {showDropdown && currentUser && (
                <div className='absolute right-0 mt-2 bg-slate-300 rounded-md shadow-lg sm:w-32 flex flex-col items-center'>
                 <ul className='text-slate-700 py-2'>
                  <li className='cursor-pointer hover:underline py-2 px-4'>
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <li className='cursor-pointer hover:underline py-2 px-4'>
                    <Link to='/show-listings'>Listings</Link>
                  </li>
                  <li onClick={handleSignOut} className='cursor-pointer hover:underline py-2 px-4'>
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}