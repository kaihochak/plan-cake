import React from 'react';
import { RiFolderImageLine } from "react-icons/ri";
import { AiOutlineLinkedin } from "react-icons/ai";

const About = () => {
  return (
    <section className='flex flex-col bg-[#f6f6f6] -mt-[700px] md:-mt-[180px] lg:-mt-[200px]' id="about">
      {/* top wave */}
      <div className='relative w-full mb-36'>
        <div className="wave top-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>

      <div className='container flex flex-col items-center justify-center w-full lg:w-[60%] h-full gap-y-10 mt-[600px] md:mt-[100px]'>
        
        {/* title  */}
        <div className='flex flex-col max-w-lg gap-y-4'>
          <p className='z-10 body-bold text-primary text-start md:text-center'>About</p>
          <p className='z-10 base-medium text-primary text-start md:text-center'>Plancake is an app designed to make social outings seamless by  allowing  users to organize movie nights and discover local shows with  friends and like-minded enthusiasts.</p>
        </div>
        
        {/* Team */}
        <div className='z-10 flex flex-col justify-around gap-8 mb-8 md:flex-row '>

          {/* Jacob Chak */}
          <div className='p-6 rounded-lg md:p-8 bg-accent'>
            <div className='flex flex-between'>
              <p className='mb-2 body-bold text-primary'>Jacob Chak</p>
              <div className='flex justify-end mb-2 gap-x-1'>
                <a href="https://www.jacobchak.com/"><RiFolderImageLine className='text-primary text-[25px]' /></a>
                <a href="https://www.linkedin.com/in/kaihochak/"><AiOutlineLinkedin className='text-primary text-[25px]' /></a>
              </div>
            </div>
            <p className='z-10 body text-primary'>Absolutely, we've all been there. You're ready for a movie night,  but instead, you end up scrolling endlessly or debating over what to  watch. That's where Pick A Film comes in! Everyone adds their favorite  movies to a shared list and then votes. It’s super simple and actually  makes choosing the movie part of the fun.</p>
          </div>

          {/* Joanna */}
          <div className='p-6 rounded-lg md:p-8 bg-accent2'>
            <div className='flex flex-between '>
              <p className='mb-2 body-bold text-primary'>Joanna Chow</p>
              <div className='flex justify-end mb-2 gap-x-1'>
                <a href="https://www.joanna-chow.com/"><RiFolderImageLine className='text-primary text-[25px]' /></a>
                <a href="https://www.linkedin.com/in/joannachowhy/"><AiOutlineLinkedin className='text-primary text-[25px]' /></a>
              </div>
            </div>
            <p className='z-10 body text-primary'>Absolutely, we've all been there. You're ready for a movie night,  but instead, you end up scrolling endlessly or debating over what to  watch. That's where Pick A Film comes in! Everyone adds their favorite  movies to a shared list and then votes. It’s super simple and actually  makes choosing the movie part of the fun.</p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default About
