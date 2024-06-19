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
    <section className='landing-container' id="features">

      {/* Hero */}
      <div className='flex-col flex-between'>
        <h2 className='text-center h2 md:max-w-[500px]'>
          Plancake makes it easy to plan your social life!
        </h2>
        {/* images */}
        <div className='flex-center landing-img-container'>
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

      {/* Features */}
      <div className='features-container'>
        {/* Pick A Film */}
        <div className='feature-container'>
          <TbMovie className='text-accent text-[30px]' />
          <p className='body-bold text-primary md:text-primary-foreground'>Pick A Film</p>
          <p className='body text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
          <Link to='/pickAFilm'>
            <button className='button-text landing-btn bg-accent text-accent-foreground px-1 py-2 w-[80%] rounded-md mt-2 hover:bg-accent-dark'>Create Event</button>
          </Link>
        </div>

        {/* Gig Buddies */}
        <div className='feature-container'>
          <CgMusic className='text-accent2 text-[30px]' />
          <p className='body-bold text-primary md:text-primary-foreground'>Gig Buddies</p>
          <p className='body text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
          <button className='border button-text text-accent2 hover:text-white landing-btn border-accent2'>Coming Soon</button>
        </div>

        {/* Book Club */}
        <div className='feature-container'>
          <RiBook3Line className='text-green text-[30px]' />
          <p className='body-bold text-primary md:text-primary-foreground'>Book Club</p>
          <p className='body text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
          <button className='border button-text text-green hover:text-white landing-btn border-green'>Coming Soon</button>
        </div>

        {/* Vote Everything */}
        <div className='feature-container'>
          <FaRegCircleQuestion className='text-red text-[30px]' />
          <p className='body-bold text-primary md:text-primary-foreground'>Gig Buddies</p>
          <p className='body text-primary md:text-primary-foreground'>Everyone adds their favorite movies to a shared list and then votes.</p>
          <button className='border button-text text-red hover:text-white landing-btn border-red'>Coming Soon</button>
        </div>
      </div>
    </section>

  )
}

export default Features
