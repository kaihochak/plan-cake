import React from "react";
import "@/styles/utility.css"
import usersData from "@/data/users";
import { image500 } from "../../lib/tmdb/config";

const SearchDisplay = ({ filteredResults, selectedFilms, setSelectedFilms, max }) => {

    if (max == null) max = 100;

    const handleSelect = (itemId) => {
        const newSelectedFilms = selectedFilms.includes(itemId)
            ? selectedFilms.filter(id => id !== itemId) // de-select
            : [...selectedFilms, itemId]; // select
        setSelectedFilms(newSelectedFilms);
    };

    return (
        <div>
            {filteredResults.length > 0 ? (
                <div>
                    {/* EventCollection of items */}
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {/* each item */}
                        {filteredResults.slice(0, max).map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-y-2 relative"
                                onClick={() => handleSelect(item.id)}
                            >
                                {/* Checkbox */}
                                <div className="absolute top-3 right-3 mr-4 z-10">
                                    <input
                                        type="checkbox"
                                        className="h-8 w-8 border-2 focus:ring-0"
                                        checked={selectedFilms.includes(item.id)}
                                        readOnly
                                    />
                                </div>
    
                                {/* image */}
                                <div className={`w-[90%] ${selectedFilms.includes(item.id) ? "selected-overlay" : ""}`}>
                                    {/* The image fills the square container */}
                                    <div className="aspect-w-1 aspect-h-1">
                                        <img
                                            src={image500(item.poster_path)}
                                            alt={item.title}
                                            className="object-cover object-center rounded-xl"
                                        />
                                    </div>
                                </div>
    
                                {/* Info */}
                                <div className="flex flex-col justify-start gap-y-1 pr-4">
                                    {/* Date & Time */}
                                    <div className="text-m-s flex gap-x-2">
                                        <p>{item.date}</p>
                                        <p>{item.time}</p>
                                    </div>
    
                                    <h3 className="text-m-l mb-2 h-12">
                                        {item.title.length > 30
                                            ? item.title.substring(0, 30) + "..."
                                            : item.title}
                                    </h3>
    
                                    <div className="flex justify-between">
    
                                        {/* watchlist */}
                                        <div className="flex">
                                            {/* {item.watchlists
                                                .slice(0, item.watchlists.length > 4 ? 3 : 4)
                                                .map((participantName, index) => {
                                                // Find the user in usersData that matches the participant's id
                                                const user = usersData.find(user => user.value === participantName);
                                                return (    
                                                    <div
                                                        className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center 
                                                                    ${index > 0 ? "-ml-1" : ""} 
                                                                    `}
                                                        key={index}
                                                    >
                                                        <img
                                                            className="min-w-full min-h-full object-cover"
                                                            src={user ? user.avatar : 'defaultAvatarUrl'} // Use the found user's avatar or a default avatar URL
                                                            alt={user ? user.name : 'Default Name'}
                                                        />
                                                    </div>
                                                )
                                            })} */}
                                            {/* plus sign + how many more people */}
                                            {/* {item.watchlists.length > 4 && (
                                                <div>+{item.watchlists.length - 3}</div>
                                            )} */}
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center">
                                            <div className="text-m-s">{item.rating}</div>
                                            <div className="text-m-s ml-1">⭐</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-m-l mt-4 text-center">No results found...</div>
            )}
        </div>
    );
};

export default SearchDisplay;