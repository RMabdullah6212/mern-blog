import React from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center w-full p-5">
      <h1 className="text-2xl font-semibold mb-2">Profile</h1>
      <form action="" className="flex flex-col items-center space-y-4 p-1 shadow-none rounded-lg w-full max-w-3xl">
        {/* Profile Picture */}
        <div className="w-32 h-32 overflow-hidden rounded-full border border-gray-300">
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Username */}
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          defaultValue={currentUser.username}
          placeholder="Username"
        />

        {/* Email */}
        <input
          type="email"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          defaultValue={currentUser.email}
          placeholder="Email"
        />

        {/* Password */}
        <input
          type="password"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          placeholder="Password"
        />
          <button 
        className="text-sm justify-between w-full rounded-lg text-white bg-gradient-to-r from-cyan-500 to-cyan-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded h-8  text-center"
        
        >
      
          Update
        </button>
        <div className="flex justify-between w-full">
          <button className="text-sm text-red-600">Delete Account</button>
          <button className="text-sm text-red-600">Sign Out</button>
        </div>
      </form>
    </div>
  );
}
