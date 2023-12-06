import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [deleteListingError, setDeleteListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);

    } catch (error) {
      setShowListingError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      setDeleteListingError(false);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        setDeleteListingError(true);
        return;
      }

      setUserListings((prev) => 
      prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setDeleteListingError(true);
    }
  }

  return (
    <div className='p-3 max-w-5xl mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-6' >Profile</h1>
      <div className='flex flex-col sm:flex-row justify-between gap-6'>
        <div className='flex flex-col flex-1 gap-4 w-full items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-1' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <p className='text-base uppercase font-semibold text-center'>{`Welcome, ${currentUser.username}`}</p>
      </form>
      <button onClick={handleDeleteUser} className='bg-red-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80 text-sm w-40'>Delete account</button>
      <button onClick={handleSignOut} className='bg-blue-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80 text-sm w-40'>Sign out</button>
      </div>
      <div className='flex flex-col gap-4 flex-1 mt-4 w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
    
      <input type='text' placeholder='User Name' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' onChange={handleChange}/>
      <input type='email' placeholder='Email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg' onChange={handleChange} />
      <input type='text' placeholder='Full Name' defaultValue={currentUser.fullname} id='fullname' className='border p-3 rounded-lg' onChange={handleChange}/>
      <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg' />
      <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Updating...' : 'Update'}</button>
      <Link className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center' to={'/create-listing'}>
      Create Listing
      </Link>
      </form>
      
      <button disabled={loading} onClick={handleShowListings} className='bg-green-400 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'>{loading ? 'Show Listings...' : 'Show listings'}</button>
      <p className='text-red-700 mt-5'>{showListingError ? 'Error showing listings' : ''}</p>
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-2 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
                <p className='text-red-700 mt-5'>{deleteListingError ? 'Error deleting listings' : ''}</p>
              </div>
             
            </div>
          ))}
        </div>
      )}
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
      </div>
      </div>
      </div>
    
  )
}
