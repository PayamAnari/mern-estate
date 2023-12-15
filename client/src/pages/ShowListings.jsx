import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ShowListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(false);
 
  useEffect(() => {
    handleShowListings();
  }, []); 

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
      toast.error('Error deleting listings', { position: 'top-center',autoClose: 2000, })
      return;
    }

    setUserListings((prev) => 
    prev.filter((listing) => listing._id !== listingId)
    );
    toast.success('Listing deleted successfully!', { position: 'top-center', autoClose: 2000 });

  } catch (error) {
    setDeleteListingError(true);
  }
}

return (
  <div className='p-3 max-w-5xl mx-auto'>
    <div className='flex flex-col gap-4 flex-1 mt-2 w-full'>
      <p className='text-red-700 mt-5'>{showListingError ? 'Error showing listings' : ''}</p>
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mb-3 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border border-gray-400 rounded-lg p-5 flex justify-between items-center gap-6'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-20 w-28 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.title}</p>
              </Link>

              <div className='flex flex-col gap-2 item-center '>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
                <p className='text-red-700 mt-5'>{deleteListingError ? '' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}