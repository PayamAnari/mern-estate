import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=6');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=6');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=6');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-24 px-3 max-w-6xl mx-auto'>
        <h1 className='text-black font-bold text-3xl lg:text-6xl'>
          Discover Your Dream <span className='text-slate-600'>Home</span>
          <br />
          with <span className='text-blue-600'>Payam</span> Estate
        </h1>
        <div className='text-gray-500 text-xs sm:text-sm'>
          Discover unparalleled living at Payam Estate, where your dream home
          awaits.
          <br />
          Explore a curated selection of properties, each designed to redefine
          your
          <br />
          living experience. Begin your search now.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-lg text-blue-800 font-bold hover:opacity-80'
        >
          Let's get started...
        </Link>
      </div>

      <div>
        <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[500px]'
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='container mx-auto max-w-5xl flex gap-12 flex-wrap items-start mt-12 mb-16 justify-center md:justify-between'>
        <div className='grid gap-4 justify-items-center text-center  md:flex-1'>
          <div className=' rounded-full border-8 border-blue-600 p-4 shadow-2xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-14 h-14'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
              ></path>
            </svg>
          </div>
          <h3 className='text-xl font-bold md:text-2xl sm:text-3xl'>
            Secure Living Spaces
          </h3>
          <p>Discover homes with advanced security for your peace of mind</p>
        </div>
        <div className='grid gap-4 justify-items-center text-center md:flex-1'>
          <div className=' rounded-full border-8 border-blue-600 p-4 shadow-2xl '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-14 h-14'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
              ></path>
            </svg>
          </div>
          <h3 className='text-xl font-bold md:text-2xl sm:text-3xl'>
            Luxurious Properties
          </h3>
          <p>Discover high-end properties with modern amenities</p>
        </div>
        <div className='grid gap-4 justify-items-center text-center md:flex-1'>
          <div className=' rounded-full border-8 border-blue-600 p-4 shadow-2xl '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-14 h-14'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
              ></path>
            </svg>
          </div>
          <h3 className='text-xl font-bold md:text-2xl sm:text-3xl'>
            Trusted Expertise
          </h3>
          <p>Benefit from our real estate expertise for a decade</p>
        </div>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent offers
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?offer=true'}
              >
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for rent
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
