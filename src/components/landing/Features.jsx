import React from 'react'
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/variants";
import { TbMovie } from "react-icons/tb";
import { CgMusic } from "react-icons/cg";
import { RiBook3Line } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";

const Features = () => {
  return (
    <section className='landing-container flex flex-col gap-y-14 w-full min-h-screen mx-auto wave-section bubble' id="features">
        <div>
          <h2 className='text-center h2 md:w-[600px]'>
              Plancake makes it easy to plan your social life!
          </h2>
          <div className='landing-img-container flex justify-center items-center'>
          <img src="/assets/landingpage-mockup2.png" alt="app mockup" className='w-[60%] top-image h-full object-cover rounded-lg md:w-[35%] lg:w-[40%] xl:w-[50%]  '/>
          <img src="/assets/landingpage-mockup1.png" alt="app mockup" className='w-[60%] bottom-image h-full object-cover rounded-lg md:w-[35%] lg:w-[40%] xl:w-[50%] '/>
          </div>
        </div>
        <div className='features-container'>
          <div className='feature-container'>
            <TbMovie className='text-accent text-[30px]'/>
            <p className='body-bold text-primary md:text-primary-foreground'>Pick A Film</p>
            <p className='base-medium text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='button-text landing-btn bg-accent text-accent-foreground px-1 py-2 w-[80%] rounded-md mt-2 hover:bg-accent-dark'>Create Event</button>
          </div>
          <div className='feature-container'>
            <CgMusic className='text-accent2 text-[30px]'/>
            <p className='body-bold text-primary md:text-primary-foreground'>Gig Buddies</p>
            <p className='base-medium text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='button-text text-accent2  hover:text-white landing-btn border border-accent2'>Coming Soon</button>
          </div>
          <div className='feature-container'>
            <RiBook3Line className='text-green text-[30px]'/>
            <p className='body-bold text-primary md:text-primary-foreground'>Book Club</p>
            <p className='base-medium text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='button-text text-green  hover:text-white landing-btn border border-green'>Coming Soon</button>
          </div>
          <div className='feature-container'>
            <FaRegCircleQuestion className='text-red text-[30px]'/>
            <p className='body-bold text-primary md:text-primary-foreground'>Gig Buddies</p>
            <p className='base-medium text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='button-text text-red hover:text-white landing-btn border border-red'>Coming Soon</button>
          </div>
        </div>
    </section>

  )
}

export default Features
