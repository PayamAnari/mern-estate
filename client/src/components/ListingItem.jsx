import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt='listing image' className='h-[320px]
        sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700 '>{listing.title}</p>
        <div className='flex items-center gap-2'>
          <MdLocationOn className='h-5 w-5 text-green-700'/>
          <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
        </div>
        <div className=''>
        <p className='text-sm text-gray-600 line-clamp-2 w-full'>{listing.description}</p>
        <p className='text-slate-600 mt-2 font-semibold'>
        €
        {listing.offer ? 
        listing.discountPrice.toLocaleString('en-us') 
        : listing.regularPrice.toLocaleString('en-us')}
        {listing.type === 'rent' && ' / month'}
        </p>
        <div className='text-slate-700 flex gap-4 mt-2 '>
          <div className='font-bold text-xs '>
            {listing.bedrooms > 1 ? `${listing.bedrooms}
            beds` : `${listing.bedrooms} bed`}
          </div>
          <div className='font-bold text-xs '>
            {listing.bathrooms > 1 ? `${listing.bathrooms}
            baths` : `${listing.bathrooms} bath`}
          </div>
        </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
