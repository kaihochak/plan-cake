import React from 'react'
import { image500 } from "@/lib/tmdb/config";
import { useMediaQuery } from '@react-hook/media-query'
import { IoIosAddCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FilmPreview from "@/components/film/FilmPreview";
import { Link } from 'react-router-dom';

const FilmCard = ({ item, selectedFilms, setSelectedFilms, watchlistObject, guests, isProtected, disabled }) => {
    const bp_768 = useMediaQuery('(min-width:768px)');
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [viewFilmId, setViewFilmId] = React.useState(false)
    const watchlisters = watchlistObject ? watchlistObject[item.id] : null;

    // Select or de-select a film, then update the selectedFilms state back in the parent component
    const handleSelect = (itemId) => {

        // check if the item is already in the selectedFilms array, 
        //      if yes, remove it, if not, add it
        const newSelectedFilms = selectedFilms.find(film => parseInt(film.id) === itemId) ?
            selectedFilms.filter(film => parseInt(film.id) !== itemId) :
            [...selectedFilms, item];
        setSelectedFilms(newSelectedFilms);
    };

    const handleViewFilm = (itemId) => {
        setViewFilmId(itemId);
        setIsModalOpen(true);
    }

    return (

        <div className="relative flex flex-col gap-y-2">
            {/* Poster */}
            <div className="w-full ">
                <div className="aspect-w-1 aspect-h-[1.5]">
                    {/* Image */}
                    {selectedFilms ? (
                        <img
                            src={image500(item.poster_path)}
                            alt={item.title}
                            className={`object-cover object-center rounded-sm ${isProtected ? 'border-4 border-accent2' :
                                selectedFilms?.find((film) => parseInt(film.id) == item.id) ? 'border-4 border-accent' : ''}`}
                        />
                    ) : (
                        <Link to={`/film/${item.id}`}>
                            <img
                                src={image500(item.poster_path)}
                                alt={item.title}
                                className="object-cover object-center rounded-sm"
                            />
                        </Link>
                    )}

                    {/* Overlay: Select & Preview Buttons */}
                    {selectedFilms &&
                        <div className={`overlay-buttons [&_*]:hidden [&_*]:hover:flex transition-all duration-500 ease-in-out 
                                ${isProtected ? 'bg-black/30 flex-col' : ''}
                                ${selectedFilms?.find((film) => parseInt(film.id) == item.id) ? 'bg-black/30' : ''}`}>
                            {/* Select Button */}
                            {!isProtected &&
                                <div className="overlay-button">
                                    <button onClick={() => handleSelect(item.id)} >
                                        <IoIosAddCircleOutline className={`m-3 rotate-0 transition-all ${selectedFilms.find((film) => parseInt(film.id) == item.id) ? "-rotate-90 scale-0 hidden md:block" : "scale-100"}`} />
                                        <IoIosCheckmarkCircleOutline className={`m-3 text-accent absolute transition-all ${selectedFilms.find((film) => parseInt(film.id) == item.id) ? "rotate-0 scale-100" : "hidden scale-0 rotate-90"}`} />
                                    </button>
                                </div>
                            }
                            {/* Preview Button */}
                            <div className="overlay-button">
                                <button onClick={() => handleViewFilm(item.id)}><AiOutlineInfoCircle className="m-3" /></button>
                            </div>
                            {/* Protected Message */}
                            {isProtected &&
                                <div className="overlay-message">
                                    <p className='small'>voted by guest(s)</p>
                                </div>
                            }
                        </div>
                    }

                    {/* Overlay for disabled card */}
                    {disabled && (
                        <div className="cursor-pointer overlay-buttons [&_*]:hidden [&_*]:hover:flex transition-all duration-500 ease-in-out bg-black/30 flex-col">
                            <div className="overlay-button">
                                <button onClick={() => handleViewFilm(item.id)}><AiOutlineInfoCircle className="m-3" /></button>
                            </div>
                            <div className="overlay-message">
                                <p className='small'>Select your name to vote!</p>
                            </div>
                        </div>
                    )}

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

            {/* Film Page Modal */}
            <FilmPreview filmId={viewFilmId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}

export default FilmCard