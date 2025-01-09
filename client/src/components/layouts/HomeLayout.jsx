import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router'
import Footer from '../Footer'

const HomeLayout = () => {
  return (
    <div>
      <Navbar />

      <div className='pt-40 px-4 pb-16 '>
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default HomeLayout