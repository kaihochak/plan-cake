import React from 'react';
import { RiFolderImageLine } from "react-icons/ri";
import { AiOutlineLinkedin } from "react-icons/ai";

const About = () => {
  return (
    <div className='landing-container bubble md:mt-20' id='about'>
      <p className='body-bold text-primary z-10'>About</p>
      <p className='base-medium text-primary text-center z-10'>Plancake is an app designed to make social outings seamless by  allowing  users to organize movie nights and discover local shows with  friends and like-minded enthusiasts.</p>
      <div className='z-10 flex flex-wrap gap-8 justify-around mb-8 md:flex-row '>
        <div className='bg-accent p-4 rounded-lg md:w-[40%]'> 
          <div className='flex-between flex-row '>
            <p className='body-bold text-primary mb-2'>Jacob Chak</p>
            <div className='flex gap-x-1 justify-end'>
              <a href="https://www.jacobchak.com/"><RiFolderImageLine className='text-primary text-[25px]'/></a>
              <a href="https://www.linkedin.com/in/kaihochak/"><AiOutlineLinkedin className='text-primary text-[25px]'/></a>
            </div>
          </div>
          <p className='base-medium text-primary z-10'>Absolutely, we've all been there. You're ready for a movie night,  but instead, you end up scrolling endlessly or debating over what to  watch. That's where Pick A Film comes in! Everyone adds their favorite  movies to a shared list and then votes. It’s super simple and actually  makes choosing the movie part of the fun.</p>
        </div>
        <div className='bg-accent2 p-4 rounded-lg md:w-[40%]'> 
        <div className='flex-between flex-row '>
          <p className='body-bold text-primary mb-2'>Joanna Chow</p>
          <div className='flex gap-x-1 justify-end'>
            <a href="https://www.joanna-chow.com/"><RiFolderImageLine className='text-primary text-[25px]'/></a>
            <a href="https://www.linkedin.com/in/joannachowhy/"><AiOutlineLinkedin className='text-primary text-[25px]'/></a>
          </div>
        </div>
        <p className='base-medium text-primary z-10'>Absolutely, we've all been there. You're ready for a movie night,  but instead, you end up scrolling endlessly or debating over what to  watch. That's where Pick A Film comes in! Everyone adds their favorite  movies to a shared list and then votes. It’s super simple and actually  makes choosing the movie part of the fun.</p>
        </div>
      </div>
    </div>
  )
}

export default About
