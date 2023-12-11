import { FaHome, FaInfoCircle, FaList, FaUser, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      {/* Left Section - Navigation Links */}
      <div className=" flex flex-col gap-3 ml-6">
          <a href="#" className="hover:text-gray-400 flex gap-2">
            <FaHome /> Home
          </a>
          <a href="#" className="hover:text-gray-400 flex gap-2">
            <FaInfoCircle /> About
          </a>
          <a href="#" className="hover:text-gray-400 flex gap-2">
            <FaList /> Listings
          </a>
          <a href="#" className="hover:text-gray-400 flex gap-2">
            <FaUser /> Profile
          </a>
        </div>

      {/* Center Section - Social Icons */}
      <div className=''>
       
      </div>
      <div className="flex gap-3">
          <a href="#" className="hover:text-gray-400">
            <FaFacebook /> 
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaLinkedin />
          </a>
        </div>

      {/* Right Section - Subscribe Input */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Subscribe..."
          className="bg-gray-700 text-white px-3 py-1 rounded-xl"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded-xl">
          Subscribe
        </button>
      </div>
    </div>
  </footer>  )
}
