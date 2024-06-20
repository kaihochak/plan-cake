import React from 'react'
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/variants";
import { TbMovie } from "react-icons/tb";
import { CgMusic } from "react-icons/cg";
import { RiBook3Line } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Features = () => {

  return (
    <section className='z-10 w-full md:min-h-[700px]' id="features">

      {/* Hero */}
      <div className='container flex-col w-full flex-between 2xl:max-w-[1000px] md:flex-row min-w-[300px] h-full'>
        {/* Title & Images */}
        <div className='flex flex-col md:order-2 w-full gap-y-2 md:w-[50%] md:gap-y-0'>
          <h2 className='py-8 text-center h2 md:py-10 md:w-auto w-[80%] mx-auto'>
            Plancake makes social event easy!
          </h2>

          {/* images */}
          <div className='relative flex w-[75%] mx-auto md:w-full flex-center '>
            <img
              src="/assets/landingpage-mockup2.png"
              alt="app mockup"
              className='top-image'
            />
            <img
              src="/assets/landingpage-mockup1.png"
              alt="app mockup"
              className='bottom-image'
            />
          </div>
        </div>


        {/* Feature Column 1 */}
        <div className='feature-col md:order-1'>
          {/* Feature: Pick A Film */}
          <div className='feature-container'>
            <TbMovie className='text-accent text-[30px] mb-2' />
            <p className='bold text-primary md:text-primary-foreground'>Pick A Film</p>
            <p className='small text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button 
              className='landing-btn bg-accent text-accent-foreground hover:bg-accent-dark' 
              onClick={() => window.location.href = '/pickAFilm'}
            >
              Create Event
            </button>
          </div>

          {/* Feature: Gig Buddies */}
          <div className='feature-container'>
            <CgMusic className='text-accent2 text-[30px] mb-2' />
            <p className='bold text-primary md:text-primary-foreground'>Gig Buddies</p>
            <p className='small text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='border text-accent2 hover:text-white landing-btn border-accent2'>Coming Soon</button>
          </div>
        </div>

        {/* Feature Column 2 */}
        <div className='feature-col md:order-3'>
          {/* Feature: Book Club */}
          <div className='feature-container'>
            <RiBook3Line className='text-green text-[30px] mb-2' />
            <p className='bold text-primary md:text-primary-foreground'>Book Club</p>
            <p className='small text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='border text-green hover:text-white landing-btn border-green'>Coming Soon</button>
          </div>

          {/* Feature: Vote Everything */}
          <div className='feature-container'>
            <FaRegCircleQuestion className='text-red text-[30px] mb-2' />
            <p className='bold text-primary md:text-primary-foreground'>Gig Buddies</p>
            <p className='small text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
            <button className='border text-red hover:text-white landing-btn border-red'>Coming Soon</button>
          </div>

        </div>
      </div>
    </section>

  )
}

export default Features
