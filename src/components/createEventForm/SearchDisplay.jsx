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
            {filteredResults?.length > 0 ? (
                <div>
                    {/* EventCollection of items */}
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {/* each item */}
                        {filteredResults.slice(0, max).map((item) => (
                            <div
                                key={item.id}
                                className="relative flex flex-col gap-y-2"
                                onClick={() => handleSelect(item.id)}
                            >
                                {/* Checkbox */}
                                <div className="absolute z-10 mr-4 top-3 right-3">
                                    <input
                                        type="checkbox"
                                        className="w-8 h-8 border-2 focus:ring-0"
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
                                <div className="flex flex-col justify-start pr-4 gap-y-1">
                                    {/* Date & Time */}
                                    <div className="flex text-m-s gap-x-2">
                                        <p>{item.date}</p>
                                        <p>{item.time}</p>
                                    </div>
    
                                    <h3 className="h-12 mb-2 text-m-l">
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
                                                            className="object-cover min-w-full min-h-full"
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
                                            <div className="text-m-m">{item.vote_average.toFixed(1)}</div>
                                            <div className="ml-1 text-m-s">⭐</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-4 text-center text-m-l">No results found...</div>
            )}
        </div>
    );
};

export default SearchDisplay;