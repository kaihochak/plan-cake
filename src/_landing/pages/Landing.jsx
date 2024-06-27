import React from 'react'
import Features from '@/components/landing/Features'
import About from '@/components/landing/About'
import FAQ from '@/components/landing/FAQ'
import LandingFooter from '@/components/landing/LandingFooter'
import ScrollToTopButton from '@/components/utility/ScrollToTopButton'

const Landing = () => {
  return (
    <div className='w-full mx-auto'>
      <Features />
      <About /> 
      <FAQ />
      <LandingFooter/>
      <ScrollToTopButton />
    </div>
  )
}

export default Landing
