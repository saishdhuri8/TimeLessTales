import React from 'react';
import { Outlet } from 'react-router'
import Navbar from '../Navbar';

const AuthLayout = () => {
  return (

    <div>
      <Navbar/>

      <div className=''>
      <Outlet />
      </div>

    </div>



  );
};

export default AuthLayout;
