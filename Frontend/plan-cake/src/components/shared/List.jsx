import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { cn } from "@/lib/utils"
import { BsFillPlusCircleFill } from 'react-icons/bs';
import useMediaQuery from '@mui/material/useMediaQuery';

const List = ({
  items,
  isFilterVisible,
  isParticipantsVisible,
  mobileLayout, // grid or vertical
  desktopLayout, // tall or square
  max,
  hasButton,
  buttonHandler,
}) => {
  const [filter, setFilter] = useState("");
  const bp_768 = useMediaQuery('(min-width:768px)');

  if (max === "0") { max = items.length; };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter items based on filter state
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-2">

      {/* Desktop  */}
      {bp_768 ?
        <div className={hasButton ? "flex" : ""}>

          {/* Filter */}
          {isFilterVisible && (
            <div>
              <input
                className="w-full p-2 mb-4 rounded-md"
                type="text"
                placeholder="Filter events..."
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          )}

          {/* List of items */}
          <div
            className={cn("gap-4 xl:gap-6 grid grid-cols-4", // universal
              hasButton && "grid-cols-3 w-[85%] xl:w-[75%]")}
          >
            {/* each item */}
            {filteredItems.slice(0, max).map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-start"
              >
                {/* image */}
                <div className={`${desktopLayout === "tall" ? "aspect-w-1 aspect-h-[1.47]" : "aspect-w-1 aspect-h-1"}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover object-center rounded-xl"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-start pt-4 gap-y-1 xl:gap-y-3">
                  {/* Date & Time */}
                  <div className="flex gap-x-2 text-m xl:text-l">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl xl:text-3xl">

                    {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                  </h3>

                  {/* Location & Participants */}
                  <div className="flex justify-between gap-y-2 ">

                    {/* Location */}
                    <div className="flex items-center text-m xl:text-l gap-x-2">
                      <GoLocation />
                      <p>{item.location}</p>
                    </div>

                    {/* participants */}
                    {isParticipantsVisible && (
                      <div className="flex">
                        {item.participants
                          .slice(0, item.participants.length > 4 ? 3 : 4)
                          .map((participant, index) => (
                            <div
                              className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center 
                                ${index > 0 ? "-ml-1" : ""} 
                              `}
                              key={participant.id}
                            >
                              <img
                                className="min-w-full min-h-full object-cover"
                                src={participant.avatar}
                                alt={participant.name}
                              />
                            </div>
                          ))
                        }
                        {/* plus sign + how many more people */}
                        {item.participants.length > 4 && (
                          <div>+{item.participants.length - 3}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Button */}
          {hasButton && (
            <div className='flex justify-center w-[15%] xl:w-[25%]'>
              <button className='text-3xl lg:text-[60px]' onClick={buttonHandler}>
                <BsFillPlusCircleFill />
              </button>
            </div>
          )}

        </div>
        : // Mobile
        <div>
          {/* Filter */}
          {isFilterVisible && (
            <div>
              <input
                className="w-full p-2 mb-4 rounded-md"
                type="text"
                placeholder="Filter events..."
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          )}

          {/* List of items */}
          <div className={`grid ${mobileLayout === "grid" ? "grid-cols-2 sm:grid-cols-3 gap-x-1 gap-y-4" : "grid-cols-1"}`}>
            {/* each item */}
            {filteredItems.slice(0, max).map((item) => (
              <div
                key={item.id}
                className={`flex ${mobileLayout === "grid" ? "flex-col gap-y-4" : "justify-between space-x-4 py-4 sm:gap-x-8"}`}
              >

                {/* image */}
                <div className={`${mobileLayout === "grid" ? "w-[90%]" : "inset-0 w-[35%] sm:w-[45%]"}`}>
                  {/* The image fills the square container */}
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover object-center rounded-xl"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className={`flex flex-col justify-start ${mobileLayout === "grid" ? "gap-y-1 pr-4" : "gap-y-2 sm:gap-y-6 w-[65%] sm:w-[55%]"}`}>
                  {/* Date & Time */}
                  <div className={`flex gap-x-2 ${mobileLayout === "grid" ? "text-m-s sm:text-m-m" : "text-m-m sm:text-m-xl"}`}>
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>

                  {/* Title */}
                  <h3 className={`${mobileLayout === "grid" ? "text-m-l sm:text-m-xl mb-2 h-10 sm:h-16" : "text-m-xl sm:text-m-3xl"}`}>
                    {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                  </h3>

                  {/* Location & Participants */}
                  <div className="flex justify-between">
                    {/* Location */}
                    <div className={`flex items-center ${mobileLayout === "grid" ? "text-m-s sm:text-m-m gap-x-2" : "space-x-2 text-m-m sm:text-m-xl"}`}>
                      <GoLocation />
                      <p>{item.location}</p>
                    </div>

                    {/* participants */}
                    {isParticipantsVisible && (
                      <div className="flex">
                        {item.participants
                          .slice(0, item.participants.length > 4 ? 3 : 4)
                          .map((participant, index) => (
                            <div
                              className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center 
                                ${index > 0 ? "-ml-1" : ""} 
                              `}
                              key={participant.id}
                            >
                              <img
                                className="min-w-full min-h-full object-cover"
                                src={participant.avatar}
                                alt={participant.name}
                              />
                            </div>
                          ))
                        }
                        {/* plus sign + how many more people */}
                        {item.participants.length > 4 && (
                          <div>+{item.participants.length - 3}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          {hasButton && (
            <div className='flex justify-center sm:pt-12 lg:pt-0 lg:w-[25%]'>
              <button className='text-m-2xl sm:text-[50px] lg:text-[60px]' onClick={buttonHandler}>
                <BsFillPlusCircleFill />
              </button>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default List;
