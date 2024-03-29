import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserIcon from '../assets/person.png';
import EmailIcon from '../assets/email.png';
import PasswordIcon from '../assets/password.png';
import NameIcon from '../assets/name.png';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListingsCount, setUserListingsCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        toast.error('Error Image upload (image must be less than 2 mb)', {
          position: 'top-center',
          autoClose: 2000,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });

          toast.success('Image successfully uploaded!', {
            position: 'top-center',
            autoClose: 2000,
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message, { position: 'top-center', autoClose: 2000 });

        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success('User is updated successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message, { position: 'top-center', autoClose: 2000 });
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message, { position: 'top-center', autoClose: 2000 });
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('User is deleted successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        toast.error(error.message, { position: 'top-center', autoClose: 2000 });
        return;
      }
      dispatch(signOutUserSuccess(data));
      toast.success('Sign out successful!', {
        position: 'top-center',
        autoClose: 2000,
      });
      navigate('/sign-in');
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const res = await fetch(`/api/user/number-listings/${currentUser._id}`);

        const data = await res.json();

        if (data.count) {
          setUserListingsCount(data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserListings();
  }, [currentUser._id]);

  return (
    <div className='p-3 max-w-5xl mx-auto mb-10 '>
      <h1 className='text-3xl font-semibold text-center my-6 mb-9 capitalize'>{`${currentUser.username} Profile`}</h1>
      <div className='flex flex-col sm:flex-row justify-between gap-6'>
        <div className='bg-slate-300 flex flex-col flex-1 gap-4 w-full items-center border-2 border-gray-300  rounded-3xl p-2 shadow-2xl'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt='profile'
              className='rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-1 shadow-xl'
            />
            <p className='text-sm self-center'>
              {fileUploadError ? (
                <span></span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span></span>
              ) : (
                ''
              )}
            </p>
            <p className='text-base capitalize font-semibold text-center'>{`Welcome, ${currentUser.username}`}</p>
          </form>
          <button
            onClick={handleDeleteUser}
            className='bg-red-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80 text-sm w-40'
          >
            Delete account
          </button>
          <button
            onClick={handleSignOut}
            className='bg-blue-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80 text-sm w-40'
          >
            Sign out
          </button>

          <p>
            {currentUser && (
              <p className='font-semibold text-slate-700 capitalize text-xs mt-2 sm:mt-0 sm:text-base sm:ml-0'>
                {`You have `}
                <span
                  className={userListingsCount !== 1 ? 'active-listings' : ''}
                >
                  {`${userListingsCount} `}
                  <span className='text-green-600'>active</span>
                  {` listing${userListingsCount !== 1 ? 's' : ''}`}
                </span>
              </p>
            )}
          </p>
        </div>
        <div className='bg-slate-300 flex flex-col gap-4 flex-1  w-full border-2 border-gray-300 rounded-3xl p-2 shadow-2xl'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-3 '>
            <div className='relative'>
              <input
                type='text'
                placeholder='Username'
                defaultValue={currentUser.username}
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
                defaultValue={currentUser.email}
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
                type='text'
                placeholder='Full Name'
                defaultValue={currentUser.fullname}
                className='border p-3 rounded-lg pl-10 w-full'
                id='fullname'
                onChange={handleChange}
              />
              <img
                src={NameIcon}
                alt='Name Icon'
                className='absolute left-3 top-3 h-5 w-5'
              />
            </div>
            <div className='relative'>
              <input
                type='password'
                placeholder='Password'
                className='border p-3 rounded-lg pl-10 w-full'
                id='password'
              />
              <img
                src={PasswordIcon}
                alt='Password Icon'
                className='absolute left-3 top-3 h-5 w-5'
              />
            </div>
            <button
              disabled={loading}
              className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <Link
              className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center'
              to={'/create-listing'}
            >
              Create Listing
            </Link>
          </form>
          <p>{updateSuccess ? '' : ''}</p>
        </div>
      </div>
    </div>
  );
}
