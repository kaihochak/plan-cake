import React from 'react'
import Features from '@/components/landing/Features'
import About from '@/components/landing/About'
import FAQ from '@/components/landing/FAQ'

const Landing = () => {
  return (
    <div className='flex flex-col w-full mx-auto overflow-x-hidden '>
      <Features />
      <About /> 
      <FAQ />
    </div>
  )
}

export default Landing
