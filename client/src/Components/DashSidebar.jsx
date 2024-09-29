import React from 'react';
import {
  HiUser,
  HiArrowSmRight
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="sm:w-48 sm:h-screen shadow-slate-900 shadow-2xl rounded-lg pt-2 flex flex-col">
      <div className="flex-grow pt-2 space-y-2">
        {/* Profile Option */}
        <Link 
          to="?tab=profile" 
          className={`flex items-center p-2  hover:font-bold transition-colors ${tab === 'profile' ? 'font-bold font-medium shadow-current shadow-inner rounded-lg shadow-2xl'  : ''}`}
          onClick={() => setTab('profile')}
        >
          <HiUser className="mr-2" />
          Profile
        </Link>
        
        {/* Signout Option */}
        <Link 
          to="/logout" 
          className="flex items-center p-2  hover:font-bold transition-colors"
        >
          <HiArrowSmRight className="mr-2" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}
