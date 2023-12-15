import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { sendEmail } from '../utils/Emailjs';

export default function Footer() {

  const form = useRef();

  const handleSubscribe = (e) => {
    e.preventDefault();

    sendEmail(form.current)
      .then(() => {
        toast.success("Thank you for subscribing!", { position: 'top-center',autoClose: 2000, });
        form.current.reset();
      })
      .catch(() => {
        toast.error("Error subscribing. Please try again.");
      });
    };

  return (
    <footer className="bg-gray-800 text-white py-6 mt-16">
    <div className="max-w-6xl mx-auto flex flex-col items-center">
    <div className="flex items-center gap-2 ">
      <form className="flex items-center gap-2 " ref={form} onSubmit={handleSubscribe} >
        <input
          type="email"
          name="user-email"
          placeholder="example@gmail.com"
          className="bg-gray-600 text-white px-3 py-1 rounded-xl"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:opacity-90">
          Subscribe
        </button>
        </form>
      </div>
      <Link to='/'>
          <h1 className='font-bold text-2xl mt-6'>
            <span className='text-blue-400'>Payam</span>
            <span className='text-slate-500'>Estate</span>
          </h1>
        </Link>

      <div className=" flex mt-8 gap-5 ">
          <a href='/' className="hover:text-gray-400 ">
             Home
          </a>
          <a href='/about' className="hover:text-gray-400 ">
             About
          </a>
          <a href='/show-listings' className="hover:text-gray-400 ">
             Listings
          </a>
          <a href='/profile' className="hover:text-gray-400 ">
             Profile
          </a>
        </div>

      <div className=''>
       
      </div>
      <div className="flex gap-3 mt-6">
          <a href="#" className="hover:text-gray-400 ">
            <FaFacebook className='w-5 h-5'/> 
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaTwitter className='w-5 h-5'/>
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagram className='w-5 h-5'/>
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaLinkedin className='w-5 h-5'/>
          </a>
        </div>
    </div>
    <hr className='mt-5' />
    <div className=" flex mt-8 gap-3 justify-center text-sm text-gray-400 ">
          <a href='/' className="hover:text-white ">
             FAQ
          </a>
          <a href='/about' className="hover:text-white ">
             Cookies
          </a>
          <a href='/show-listings' className="hover:text-white ">
             Term Of Use
          </a>
          <a href='/profile' className="hover:text-white ">
             Privacy Policy
          </a>
          <a href='/profile' className="hover:text-white ">
           Support Policy
          </a>
        </div>
        <p className='text-center text-xs text-gray-500 mt-3'>Copyright © 2023 PayamEstate</p>
  
  </footer>  )
}
