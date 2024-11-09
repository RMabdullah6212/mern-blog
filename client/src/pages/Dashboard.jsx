import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../Components/DashSidebar';

import DashProfile from '../Components/DashProfile';

const Dashboard = () => {
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
    <div className='flex sm:flex-row flex-col min-h-full'>
      <div className=''>
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profiel */}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard
