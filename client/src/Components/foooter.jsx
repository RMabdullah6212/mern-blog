import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaGithub, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 fixed bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center">
          <div className="mb-0">
             <Link to="/" className="text-sm">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white font-bold">
              Abdullah's
            </span>
            Blog
          </Link>
            <p className="text-xs pt-2">© All rights reserved.</p>
          </div>

          <div className="flex space-x-3">
            
            
            <Link to="https://github.com/RMabdullah6212" className="hover:text-pink-500" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} />
            </Link>
            <Link to="https://linkedin.com/in/raomabdullah" className="hover:text-blue-700" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} />
            </Link>
            <Link to="https://www.fiverr.com/s/bd8e8rX" className="hover:bg-green-400 bg-white text-black rounded-full text-center w-5 h-5" target="_blank" rel="noopener noreferrer rounded">
              <p className='rounded-full text-bold  pb-2 w-5 h-5 text-sm font-extrabold' >fi</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
