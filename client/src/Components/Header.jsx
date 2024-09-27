


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaBars, FaUser, FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Home() {
  // Initialize the theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentUser } = useSelector(state => state.user)

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Update body background color based on theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = 'gray';
      document.body.style.color = 'white';

    } else {
      document.body.style.backgroundColor = 'white'; // Light mode background
      document.body.style.color = 'Black';
    }
  }, [isDarkMode]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [isOpenUser, setIsOpenUser] = useState(false);
  
  const toggleUserMenu = () => {
    setIsOpenUser(!isOpenUser);
  };
  const handlebuttonClick = () => {
    const input = document.getElementById('search');
    if (input) {
      input.focus();
    }
  };

  return (
    <header className='h-12 bg-slate-200 ring-offset-2 ring-2 ring-slate-400 sticky'>
      <div className='grid grid-cols-12 h-full pt-2 pb-2 pl-3 pr-3 bg-transparent'>

        {/* 1 */}
        <div id='cont1' className='col-span-2 justify-start h-full text-black sm:text-sm text-xs mt-1.5'>
          <Link to='/' className=''>
            <span className='px-2 py-2 max-h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Abdullah's
            </span>
            Blog
          </Link>
        </div>

        {/* 2 */}
        <div id='cont2' className='place-items-center flex justify-center col-span-8 h-5/6 pt-1.5'>
          <nav>
            <div id='cont2' className='place-items-center flex justify-center w-full h-full md:pb-0 sm:pb-0 lg:pb-0 space-x-2'>
              <div className='rounded-full w-1/2 h-full border-slate-400 border-double border sm:mt-0 flex items-center justify-center self-center lg:h-full bg-white'>
                <div className='w-5/6'>
                  <input
                    id='search'
                    type='text'
                    className='focus:outline-none rounded-full text-center w-full h-fit'
                    placeholder='Search'
                  />
                </div>
                <button
                  className='border-none rounded bg-transparent w-1/6'
                  onClick={handlebuttonClick} // Set the onClick handler to focus the input
                >
                  <AiOutlineSearch className='justify-end border-none text-black rounded-full bg-white' enableBackground={''} />
                </button>
              </div>
              <div id='menu' className='lg:block md:block sm:block hidden text-black text-center font-semibold space-x-4 ml-3'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/projects'>Projects</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* 3 */}
        <div id='cont3' className='col-span-2 flex h-max w-full justify-end'>
          <div className='absolute flex space-x-3 lg:mt-0'>
          {isDarkMode ? (
  <button onClick={toggleTheme} className='mb-1 lg:mb-0'>
    <FaSun className='text-slate-500 size-6' />
  </button>
) : (
  <button onClick={toggleTheme} className='mb-1 lg:mb-0'>
    <FaMoon className='text-black size-6' />
  </button>
)}

            
            <div className="relative inline-block">
      {currentUser ? (
        <div>
          <button
            onClick={toggleUserMenu}
            type="button"
            className="flex  items-center justify-center p-1 bg-transparent hover:bg-slate-200 font-medium rounded h-8"
          >
          {currentUser.profilePicture ? (
          <img
            src={currentUser.profilePicture}
            alt="User Avatar"
            className="rounded-full h-8 w-8"
          />
        ) : (
          <FaUser color={'gray'} size={24} />
        )}
          </button>

          {isOpenUser && (
            <div className={`absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg`}>
              <div
                
                className='block px-4 py-2 overflow-hidden text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
              </div>
              <Link
                to={'/dashboard?tab=profile'}
                className='block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                Dashboard
              </Link>
              <div
                
                className='block px-4 py-2 hover:cursor-pointer text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                sign out
              </div>
            </div>
          )}
        </div>
      ) : (
        <button 
        className="text-sm justify-between w-fit text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded h-8  text-center"
        
        >
        <Link
          to="/sign-in"
          className='pr-1 pl-1'
        >
          Sign In
        </Link></button>
      )}
    </div>
            <div className='inline-block mb-1 h-full lg:hidden md:hidden sm:hidden' >
              <button
                onClick={toggleMenu}
                className='flex items-center justify-center p-1 hover:text-gray-900 focus:outline-none'
              >
                <FaBars color={'black'} size={24} />
              </button>
              {isOpen && (
                <div className='absolute right-0 w-30 mt-2 origin-top-right rounded-md shadow-lg ' color={isDarkMode ? 'white' : 'black'} >
                  <Link
                    to='/'
                    className='block px-4 py-2 text-sm hover:bg-gray-100'
                  >
                    Home
                  </Link>
                  <Link
                    to='/about'
                    className='block px-4 py-2 text-sm hover:bg-gray-100'
                  >
                    About
                  </Link>
                  <Link
                    to='/projects'
                    className='block px-4 py-2 text-sm hover:bg-gray-100'
                  >
                    Projects
                  </Link>
                </div>
              )}
            </div>
          
          </div>
        </div>

      </div>
    </header>
  );
}
