import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { cn } from "@/lib/utils"
import { BsFillPlusCircleFill } from 'react-icons/bs';
import useMediaQuery from '@mui/material/useMediaQuery';

const EventCollection = ({
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

          {/* EventCollection of items */}
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
                  <h3 className="text-xl xl:text-3xl h-20">
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

          {/* EventCollection of items */}
          <div
            className={cn("grid", // universal
              mobileLayout === "grid" ? "grid-cols-2 sm:grid-cols-3 gap-x-1 gap-y-4" : "grid-cols-1 sm:grid-cols-3 sm:gap-x-4",
              hasButton && "sm:grid-cols-3 sm:w-full")}
          >
            {/* each item */}
            {filteredItems.slice(0, max).map((item) => (
              <div
                key={item.id}
                className={`flex ${mobileLayout === "grid" ? "flex-col gap-y-4" : "justify-between sm:justify-start py-4 gap-x-6 sm:gap-x-8 sm:flex-col"}`}
              >

                {/* image */}
                <div className={`${mobileLayout === "grid" ? "w-[90%]" : "inset-0 w-[35%] sm:w-full"}`}>
                  {/* The image fills the square container */}
                  <div className={`aspect-w-1 aspect-h-1 ${mobileLayout === "grid" ? "" : "sm:aspect-h-[1.47]"}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover object-center rounded-xl"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className={`flex flex-col justify-start 
                  ${mobileLayout === "grid" ? "gap-y-1 pr-4" : "gap-y-2 sm:pt-3 w-[65%] sm:w-full"}`
                }>
                  {/* Date & Time */}
                  <div className={`flex gap-x-2 
                    ${mobileLayout === "grid" ? "text-m-s sm:text-m-m" : "text-m-m"}`}>
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>

                  {/* Title */}
                  <h3 className={`${mobileLayout === "grid" ? "text-m-l sm:text-m-xl mb-2 h-10 sm:h-16" : "text-m-xl sm:h-16"}`}>
                    {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                  </h3>

                  {/* Location & Participants */}
                  <div className="flex justify-between items-center">
                    {/* Location */}
                    <div className={`flex items-center ${mobileLayout === "grid" ? "text-m-s sm:text-m-m gap-x-2" : "gap-x-2 text-m-m"}`}>
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
            <div className='flex justify-center sm:pt-4'>
              <button className='text-m-2xl sm:text-[50px]' onClick={buttonHandler}>
                <BsFillPlusCircleFill />
              </button>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default EventCollection;
