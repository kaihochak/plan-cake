import React from "react";
import { GoLocation } from "react-icons/go";

const List = ({
  items,
  isFilterVisible,
  isParticipantsVisible,
  layout,
  max
}) => {
  const [filter, setFilter] = React.useState("");

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
            className="w-full p-2 mb-4 rounded-md"
            type="text"
            placeholder="Filter events..."
            value={filter}
            onChange={handleFilterChange}
          />
          {/* Other filters can be added here */}
        </div>
      )}

      {/* List of items */}
      <div
        className={
          layout === "grid" ? "grid grid-cols-2 gap-6" : "flex flex-col"
        }
      >
        {filteredItems.slice(0, max).map((item) => (
          <div key={item.id} className={ layout === "grid" ? "flex flex-col gap-y-2" : "flex justify-between space-x-4 py-4"}>
            {/* image */}
            <div className={ layout === "grid" ? "w-[90%]" : "inset-0 w-[35%]" }>
          
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
            <div className={ layout === "grid" ? "flex flex-col justify-start gap-y-1 pr-4" : "w-[65%] flex flex-col justify-start gap-y-2"}>
              {/* Date & Time */}
              <div className={ layout === "grid" ? "text-m-s flex gap-x-2" : "flex gap-x-2"}>
                <p>{item.date}</p>
                <p>{item.time}</p>
              </div>

              <h3 className={ layout === "grid" ? "text-m-l mb-2 h-12" : "text-m-xl"}>
                {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
              </h3>

              <div className="flex justify-between">
                {/* Location */}
                <div className={ layout === "grid" ? "text-m-s flex items-center gap-x-2" : "flex items-center space-x-2"}>
                  <GoLocation />
                  <p>{item.location}</p>
                </div>

                {/* participants */}
                {isParticipantsVisible && (
                  <div className="flex">
                    {item.participants
                      .slice(0,  item.participants.length > 4 ? 3 : 4)
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
    </div>
  );
};

export default List;
