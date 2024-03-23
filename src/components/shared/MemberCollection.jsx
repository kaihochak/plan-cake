import { useMediaQuery } from '@react-hook/media-query';
import React from 'react'
import { GoLocation } from "react-icons/go";
import { Link } from 'react-router-dom';

const MemberCollection = ({ members, max, maxMobile }) => {

  const bp_768 = useMediaQuery('(min-width:768px)');
  max = bp_768 ? max : maxMobile;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
      {members && members.slice(0, max).map(member => (
        <Link to={`/profile/${member._id}`} key={member._id} className='hover:underline'>
          <div className='flex gap-x-5 md:gap-x-10 p-4 mx-auto '>
            {/* image */}
            <div className='min-w-[70px]'>
              <img src={member.profile.avatar} className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] rounded-full object-cover" alt="profile picture"/>
            </div>

            {/* info */}
            <div className='flex flex-col justify-center gap-y-1'>
              {/* name */}
              <h3 className='text-m-l md:text-xl'>{member.username}</h3>
              {/* bio */}
              <p className='text-m-s md:text-md'>
                {member.profile.bio.length > 26 ? member.profile.bio.slice(0, 26) + "..." : member.profile.bio}
              </p>
              {/* location */}
              <div className='flex gap-x-1 items-center'>
                <GoLocation className='text-m-s ' />
                <p className='text-m-xs md:text-sm text-thin'>{member.profile.location}</p>
              </div>
            </div>

            {/* button */}
            <input type="button" value="+ Follow" className="text-accent font-semibold" />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MemberCollection
