import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuth = false;

  return (
    <>
      {isAuth ? (<Navigate to="/" /> ) : 
      
      // authentication main layout
      (
        <div className='flex lg:mx-auto lg:w-[1600px]'>
          <section className='flex flex-1 justify-center items-center flex-col'>
            <Outlet />
          </section>
          <img
            src="https://source.unsplash.com/random/800x600"
            alt="Random"
            className="hidden xl:block h-screen w-1/2 object-cover no-repeat"
          />
        </div>
      )}
    </>
  )
}

export default AuthLayout
