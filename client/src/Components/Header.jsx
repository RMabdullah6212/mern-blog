




// import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { FaMoon, FaBars } from 'react-icons/fa';



// export default function Home() {
 
//   const ThemeToggle = () => {
//     // Initialize the theme state
//     const [isDarkMode, setIsDarkMode] = useState(false);
  
//     // Toggle the theme
//     const toggleTheme = () => {
//       setIsDarkMode(!isDarkMode);
//     };
  
//     // Update body background color based on theme
//     useEffect(() => {
//       if (isDarkMode) {
//         document.body.style.backgroundColor = 'gray'; // Dark mode background
//       } else {
//         document.body.style.backgroundColor = 'white'; // Light mode background
//       }
//     }, [isDarkMode]);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };


//   const handlebuttonClick = () => {
//     const input = document.getElementById('search');
//     if (input) {
//       input.focus();
//     }
//   };
//   return (
//     <header className='h-12 bg-slate-50 ring-offset-2  ring-2 ring-slate-300 sticky'>
//       <div className='grid grid-cols-12   h-full pt-2 pb-2 pl-3 pr-3 bg-transparent '>

//         {/* 1 */}
//         <div id='cont1' className='col-span-2   justify-start h-full text-sm mt-1.5'>
//           <Link
//             to='/'
//             className=''
//           >
//             <span className='px-2 py-2 max-h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//               Abdullah's
//             </span>
//             Blog
//           </Link>

//         </div>




//         {/* 2 */}
//         <div id='cont2' className='place-items-center flex justify-center col-span-8 h-5/6 pt-1.5 '>

//           <nav className=''>

//             <div id='cont2' className='place-items-center  flex justify-center w-full  h-full  md:pb-0 sm:pb-0 lg:pb-0 space-x-2'>
//               <div className=' rounded-full  w-1/2 h-full border-slate-400  border-double border  sm:mt-0  flex items-center justify-center self-center lg:h-full bg-white  '>
//                 <div className='w-5/6'>
//                   <input id='search'
//                     type="text"
//                     className='focus:outline-none   rounded-full text-center    w-full h-fit '
//                     placeholder="Search"
//                   />
//                 </div>
//                 <button
//                   className='border-none  rounded bg-transparent w-1/6  '
                  
//                   onClick={handlebuttonClick} // Set the onClick handler to focus the input
//                 >
//                   <AiOutlineSearch className=' justify-end border-none rounded-full bg-white' enableBackground={''}/>
//                 </button>
//               </div>
//               <div id="menu" className='lg:block md:block sm:block  hidden  text-center font-semibold space-x-4 ml-3 '>

//                 <Link to='/'>Home</Link>
//                 <Link to='/about'>About</Link>
//                 <Link to='/projects'>Projects</Link>
//               </div>



//             </div>
//           </nav>
//         </div>


//         {/* 3 */}
//         <div id="cont3" className="col-span-2 flex h-max w-full justify-end">
//   <div className="absolute flex space-x-3 lg:mt-0">
//     <button  onClick={toggleTheme} color="gray" className="mb-1 lg:mb-0">
//       <FaMoon  color={isDarkMode ? 'white' : 'black'} className="size-6" />
//     </button>
//     <div className="inline-block mb-1 h-full lg:hidden md:hidden sm:hidden">
//       <button
//         onClick={toggleMenu}
//         className="flex items-center justify-center p-1 text-gray-700 hover:text-gray-900 focus:outline-none"
//       >
//         <FaBars  color={isDarkMode ? 'white' : 'black'} size={24} />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 w-30 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
//           <Link
//             to="/"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             About
//           </Link>
//           <Link
//             to="/projects"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Projects
//           </Link>
//           <Link
//             to="/sign-in"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Sign In
//           </Link>
//         </div>
//       )}
//     </div>
//     <button
//       type="button"
//       className="hidden lg:block md:block sm:block text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded h-8 text-center"
//     >
//       <Link to="/sign-in" className="m-2">
//         Sign In
//       </Link>
//     </button>
//   </div>
// </div>

//       </div>
//     </header>
//   )
// }




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaBars } from 'react-icons/fa';

export default function Home() {
  // Initialize the theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        <div id='cont1' className='col-span-2 justify-start h-full text-black text-sm mt-1.5'>
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
              <div id='menu' className='lg:block md:block sm:block hidden text-center font-semibold space-x-4 ml-3'>
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
            <button onClick={toggleTheme} color='gray' className='mb-1 lg:mb-0'>
              <FaMoon color={isDarkMode ? 'white' : 'black'} className='size-6' />
            </button>
            <div className='inline-block mb-1 h-full lg:hidden md:hidden sm:hidden'>
              <button
                onClick={toggleMenu}
                className='flex items-center justify-center p-1 text-gray-700 hover:text-gray-900 focus:outline-none'
              >
                <FaBars color={'black'} size={24} />
              </button>
              {isOpen && (
                <div className='absolute right-0 w-30 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg'>
                  <Link
                    to='/'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Home
                  </Link>
                  <Link
                    to='/about'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    About
                  </Link>
                  <Link
                    to='/projects'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Projects
                  </Link>
                  <Link
                    to='/sign-in'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
            <button
              type='button'
              className='hidden lg:block md:block sm:block text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded h-8 text-center'
            >
              <Link to='/sign-in' className='m-2'>
                Sign In
              </Link>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
