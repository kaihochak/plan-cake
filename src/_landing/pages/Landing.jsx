import React from 'react'
import Features from '@/components/landing/Features'
import About from '@/components/landing/About'
import FAQ from '@/components/landing/FAQ'
import LandingFooter from '@/components/landing/LandingFooter'

const Landing = () => {
  return (
    <div className='flex flex-col w-full mx-auto overflow-x-hidden '>
      <Features />
      <About /> 
      <FAQ />
      <LandingFooter/>
    </div>
  )
}

export default Landing
