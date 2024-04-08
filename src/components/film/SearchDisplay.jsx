import React, { useState } from "react";
import "@/styles/utility.css"
import { image500 } from "@/lib/tmdb/config";
import { useMediaQuery } from '@react-hook/media-query'
import { IoIosAddCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FilmPreview from "@/components/film/FilmPreview";

const SearchDisplay = ({ filteredResults, selectedFilms, setSelectedFilms, watchlistObject, guests, max }) => {
    const bp_768 = useMediaQuery('(min-width:768px)');
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [viewFilmId, setViewFilmId] = React.useState(null)

    if (max == null) max = 100;

    const handleSelect = (itemId) => {
        const newSelectedFilms = selectedFilms.includes(itemId)
            ? selectedFilms.filter(id => id !== itemId) // de-select
            : [...selectedFilms, itemId]; // select
        setSelectedFilms(newSelectedFilms);
    };

    const handleViewFilm = (itemId) => {
        setViewFilmId(itemId);
        setIsModalOpen(true);
    }

    const filmCard = (item) => {

        const watchlisters = watchlistObject[item.id];

        return (
            <div className="relative flex flex-col gap-y-2">
                {/* Poster */}
                <div className="w-full ">
                    <div className="aspect-w-1 aspect-h-[1.5]">
                        {/* Image */}
                        <img
                            src={image500(item.poster_path)}
                            alt={item.title}
                            className={`object-cover object-center rounded-sm
                                        ${selectedFilms.includes(item.id) ? 'border-4 border-accent' : ''}`}
                        />

                        {/* Overlay */}
                        <div className={`overlay-buttons [&_*]:hidden [&_*]:hover:flex transition-all duration-500 ease-in-out 
                                        ${selectedFilms.includes(item.id) ? 'bg-black/50' : ''}`}>
                            {/* Select Button */}
                            <div className="overlay-button">
                                <button onClick={() => handleSelect(item.id)} >
                                    <IoIosAddCircleOutline className={`m-3 rotate-0 transition-all ${ selectedFilms.includes(item.id)? "-rotate-90 scale-0 hidden md:block" : "scale-100"}`}/>
                                    <IoIosCheckmarkCircleOutline className={`m-3 text-accent absolute transition-all ${ selectedFilms.includes(item.id) ? "rotate-0 scale-100" : "hidden scale-0 rotate-90"}`}/>
                                </button>
                            </div>
                            {/* Preview Button */}
                            <div className="overlay-button">
                                <button onClick={() => handleViewFilm(item.id)}><AiOutlineInfoCircle className="m-3"/></button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Info */}
                <div className="flex flex-col justify-start gap-y-1">

                    {/* Title */}
                    <h3 className="font-semibold align-baseline line-clamp-1 text-m-xl">{item.title}</h3>

                    <div className="flex justify-between">
                        {/* Rating */}
                        <div className="flex items-center">
                            <div className="ml-1 mr-2 text-m-l">★</div>
                            <div className="text-m-m">{item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</div>
                        </div>

                        {/* watchlist */}
                        <div className="flex">
                            {watchlisters && watchlisters.slice(0, 4).map((watchlister, index) => {
                                const user = guests.find(user => user._id === watchlister);
                                return (
                                    <div key={index} className={`w-6 h-6 rounded-full overflow-hidden flex items-center  justify-center ${index > 0 ? "-ml-1" : ""} `}
                                    >
                                        <img
                                            className="object-cover min-w-full min-h-full"
                                            src={user ? user.profile.avatar : 'defaultAvatarUrl'} // Use the found user's avatar or a default avatar URL
                                            alt={user ? user.username : 'Default Name'}
                                        />
                                    </div>
                                )
                            })}
                            {/* plus sign + how many more people */}
                            {watchlisters && watchlisters.length > 4 && (
                                <div>+{item.watchlists.length - 3}</div>)}
                        </div>


                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {filteredResults?.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-10 sm:grid-cols-3 lg:grid-cols-4">
                    {filteredResults.slice(0, max).map((item) => <div key={item.id}>{filmCard(item)}</div>)}
                </div>
            ) : (
                <div className="mt-4 text-center text-m-l">No results found...</div>
            )}

            {/* Film Page Modal */}
            <FilmPreview filmId={viewFilmId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
};

export default SearchDisplay;