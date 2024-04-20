import React from 'react'
import DummyUserData from '@/data/DummyUserData';


const GuestList = () => {
  const [users, setUsers] = React.useState(DummyUserData);

  return (
    <div>
      <p className="subtitle">Guests</p>
      <div className="flex">
        {users.map((user, index) => 
          <div key={index} className={`w-6 h-6 rounded-full overflow-hidden flex items-center  justify-center ${index > 0 ? "-ml-1" : ""} `}>
            <img
              className="object-cover min-w-full min-h-full"
              src={user ? user.profile.avatar : 'defaultAvatarUrl'} // Use the found user's avatar or a default avatar URL
              alt={user ? user.username : 'Default Name'}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestList
