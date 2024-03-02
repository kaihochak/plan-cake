import React from "react";
import { GoLocation } from "react-icons/go";
import { cn } from "@/lib/utils"
import { BsFillPlusCircleFill } from 'react-icons/bs';

const List = ({
  items,
  isFilterVisible,
  isParticipantsVisible,
  mobileLayout,
  max,
  hasButton,
  buttonHandler,
}) => {
  const [filter, setFilter] = React.useState("");

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
    <div className={hasButton ? "lg:flex lg:flex-row" : ""}>  
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
        className={
          cn("lg:space-x-4 lg:gap-4 lg:grid-cols-4", // universal
          mobileLayout === "grid" ?
            "grid grid-cols-2 gap-6" : // grid view
            "grid grid-cols-1",       // vertical view (only for for mobile) 
            hasButton && "lg:grid-cols-3 lg:w-[75%]"
        )}
      >
        {/* each item */}
        {filteredItems.slice(0, max).map((item) => (
          <div
            key={item.id}
            className={
              cn("flex lg:py-8 lg:justify-start lg:w-auto", // universal
              mobileLayout === "grid" ?
                "flex-col gap-y-2" :  // grid view (only for mobile)
                "lg:flex-col justify-between lg:justify-start space-x-4 lg:space-x-0 py-4 lg:gap-y-2 " // vertical veiw (only for mobile)
            )}>
              
            {/* image */}
            <div className={
              cn("lg:w-[200px]", // universal
              mobileLayout === "grid" ?
                "w-[90%]" : // grid view (only for mobile)
                "inset-0 w-[35%]" // vertical view (only for mobile)
            )}>

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
            <div className={
              cn("flex flex-col justify-start lg:p-0 lg:w-auto lg:pt-4", // universal
              mobileLayout === "grid" ?
                "gap-y-1 lg:gap-y-2 pr-4" : // grid view (only for mobile)
                "gap-y-2 w-[65%] " // vertical view (only for mobile)
              )}>
              {/* Date & Time */}
              <div className={
                cn("flex gap-x-2 lg:text-l", // universal
                mobileLayout === "grid" ? 
                  "text-m-s" : // grid view (only for mobile)
                  "" // grid view (only for mobile)
              )}>
                <p>{item.date}</p>
                <p>{item.time}</p>
              </div>

              {/* Title */}
              <h3 className={
                cn("lg:text-3xl", // universal
                mobileLayout === "grid" ? 
                "text-m-l mb-2 h-12 lg:mb-0 lg:h-auto" : // grid view (only for mobile)
                "text-m-xl" // vertical view (only for mobile)
              )}>
                {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
              </h3>

              {/* Location & Participants */}
              <div className="flex justify-between">

                {/* Location */}
                <div className={
                  cn("flex items-center lg:text-l", // universal
                    mobileLayout === "grid" ? 
                    "text-m-s gap-x-2" : // grid view (only for mobile)
                    "space-x-2" // vertical view (only for mobile)
                  )}>
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
        <div className='flex justify-center lg:w-[25%]'>
          <button className='text-m-2xl lg:text-[60px]' onClick={buttonHandler}>
            <BsFillPlusCircleFill />
          </button>
        </div>
      )}

    </div>
  );
};

export default List;
