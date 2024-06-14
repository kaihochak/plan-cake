import React from 'react';
import { AiOutlineLinkedin } from "react-icons/ai";

const LandingFooter = () => {
  return (
    <div className='container relative flex flex-col items-center w-full p-10 gap-y-2' id='footer'>
      <p className='small-regular text-accent'>Made with ❤️‍🔥 by the plancake team.</p>
      <a href=""><AiOutlineLinkedin className='text-accent text-[20px]'/></a>
    </div>
  )
}

export default LandingFooter
