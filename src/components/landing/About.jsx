import React from 'react';
import { RiFolderImageLine } from "react-icons/ri";
import { AiOutlineLinkedin } from "react-icons/ai";

const About = () => {
  return (
    <section className='flex flex-col bg-[#f6f6f6] -mt-[700px] md:-mt-[180px] lg:-mt-[200px]'>
      {/* top wave */}
      <div className='relative w-full mb-36'>
        <div className="wave top-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
      </div>

      <div className='container flex flex-col items-center justify-center w-full lg:w-[60%] h-full gap-y-10 mt-[600px] md:mt-[100px]' id="about">
        
        {/* title  */}
        <div className='flex flex-col max-w-2xl my-8 gap-y-4'>
          <p className='z-10 body-bold text-primary text-start md:text-center'>About</p>
          {/* <p className='z-10 base-medium text-primary text-start md:text-center'>Plancake is an app designed to make social outings seamless by  allowing  users to organize movie nights and discover local shows with  friends and like-minded enthusiasts.</p>
          <p className='z-10 base-medium text-primary text-start md:text-center'>Our mission is to help you spend less time planning and more time enjoying the things you love. We believe that the best memories are  made when you’re surrounded by the people you care about, and we’re here to make that happen.</p> */}
          <p className='z-10 base-medium text-primary text-start md:text-center'>Absolutely, we've all been there. You're excited about hosting a cultural event, but the planning gets overwhelming. That's where Plancake comes in! Whether it's creating a book club, planning a movie night, or organizing a concert outing, Plancake lets everyone add their favorites to a shared list and vote.</p>

          <p className='z-10 base-medium text-primary text-start md:text-center'>It’s super simple and makes the planning process part of the fun. Connect with people who share your interests and make every event unforgettable. With Plancake, you'll spend less time organizing and more time enjoying the moments that matter.</p>
        </div>
        
        {/* Team */}
        <div className='z-10 grid justify-around grid-cols-1 gap-8 mb-8 md:grid-cols-2'>

          {/* Jacob Chak */}
          <div className='p-6 rounded-lg md:p-8 bg-accent'>
            <div className='flex flex-between'>
              <p className='mb-2 font-bold subtitle text-primary'>Jacob Chak</p>
              <div className='flex justify-end mb-2 gap-x-3'>
                <a href="https://www.jacobchak.com/"><RiFolderImageLine className='text-primary text-[25px]' /></a>
                <a href="https://www.linkedin.com/in/kaihochak/"><AiOutlineLinkedin className='text-primary text-[25px]' /></a>
              </div>
            </div>
            <p className='z-10 body text-primary'>Hi there! I'm Jacob, the project manager and developer behind Plancake. This app was created to help people like you spend less time planning and more time enjoying the things you love. I believe that the best memories are made when you’re surrounded by the people you care about, and I hope being in a part of this app will help you make that happen.</p>
          </div>

          {/* Joanna */}
          <div className='p-6 rounded-lg md:p-8 bg-accent2-light'>
            <div className='flex flex-between '>
              <p className='mb-2 font-bold subtitle text-primary'>Joanna Chow</p>
              <div className='flex justify-end mb-2 gap-x-3'>
                <a href="https://www.joanna-chow.com/"><RiFolderImageLine className='text-primary text-[25px]' /></a>
                <a href="https://www.linkedin.com/in/joannachowhy/"><AiOutlineLinkedin className='text-primary text-[25px]' /></a>
              </div>
            </div>
            <p className='z-10 body text-primary'>Hey! I'm Joanna, the product designer and front-end developer for Plancake. Making plans with friends doesn't have to be annoying—it can be a lot of fun choosing which films to watch, books to read, and shows to see. I hope you find that same fun and excitement in using the app we've created!</p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default About
