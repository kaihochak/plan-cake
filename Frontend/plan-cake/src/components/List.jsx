import React from 'react';
import { GoLocation } from "react-icons/go";

const List = ({ items, isFilterVisible, isParticipantsVisible, layout, max }) => {
  const [filter, setFilter] = React.useState('');

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter items based on filter state
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );



  return (
    <div>
      {/* Filter */}
      {isFilterVisible && (
        <div>
          <input
          className='w-full p-2 mb-4 rounded-md'
            type="text"
            placeholder="Filter events..."
            value={filter}
            onChange={handleFilterChange}
          />
          {/* Other filters can be added here */}
        </div>
      )}

      {/* List of items */}
      <div className={layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col'}>
        {filteredItems.map((item) => (  
          <div key={item.id} className="flex justify-between space-x-4 py-4">
            {/* image */}
            <div className="inset-0  w-full">
              {/* The image fills the square container */}
              
              <div class="w-[35%] h-0 aspect-w-1 aspect-h-1  ">
                <img src={item.image} alt={item.title} className="w-full object-cover object-center rounded-xl" />
              </div>
            </div>


            {/* Info */}
            <div className="w-[65%] flex flex-col justify-start">
              {/* Date & Time */}
              <div className='flex gap-x-2'>
                <p>{item.date}</p>
                <p>{item.time}</p>
              </div>

              <h3 className='text-m-xl py-3'>{item.title}</h3>

              <div className='flex justify-between'>
                {/* Location */}
                <div className="flex items-center space-x-2">
                  <GoLocation />
                  <p>{item.location}</p>
                </div>

                {/* participants */}
                {isParticipantsVisible && (
                  <div className="flex">
                    {/* Render participant avatars or icons here */}
                    {item.participants.map((participant) => (
                      <img key={participant.id} src={participant.avatar} alt={participant.name} />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
