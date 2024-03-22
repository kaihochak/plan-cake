import { useMediaQuery } from '@react-hook/media-query';
import React from 'react'
import { GoLocation } from "react-icons/go";

const MemberCollection = ({ members, max, maxMobile }) => {

	const bp_768 = useMediaQuery('(min-width:768px)');
  max = bp_768 ? max : maxMobile;
  return (
<div className='flex flex-wrap justify-start'>
  {members && members.slice(0, max).map(member => (
    <div className='flex gap-x-5 md:gap-x-10 p-4 mx-auto md:w-1/2'>
      {/* Image */}
      <div className='min-w-[70px]'>
        <img 
          src={member.profile.avatar} 
          alt="profile picture" 
          className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full object-cover" 
        />
      </div>

      {/* Info */}
      <div className='flex flex-col justify-center gap-y-1'>
        {/* Name */}
        <h3 className='text-m-l md:text-xl'>{member.username}</h3>
        {/* Bio */}
        <p className='text-m-s md:text-md'>
          {member.profile.bio.length > 26 ? member.profile.bio.slice(0, 26) + "..." : member.profile.bio}
        </p>
        {/* Location */}
        <div className='flex gap-x-1 items-center'>
          <GoLocation className='text-m-s' />
          <p className='text-m-xs md:text-sm text-thin'>{member.profile.location}</p>
        </div>
      </div>

      {/* Button */}
      <input type="button" value="+ Follow" className="text-accent font-semibold" />
    </div>
  ))}
</div>

  )
}

export default MemberCollection
