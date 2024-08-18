import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="justify-end inline-block text-left right-3 w-screen">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <FaBars size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            About
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Projects
          </a>
        </div>
      )}
    </div>
  );
};

export default About;
