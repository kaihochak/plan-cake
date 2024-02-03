import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import "@/styles/utility.css"
import Filters from "@/components/utility/filters";
import { cn } from "@/lib/utils"
// dummy
import filmData from "@/data/filmData";
import usersData from "@/data/users";

// Search Display
const SearchDisplay = ({ filteredItems, selectedItems, setSelectedItems }) => {

    const handleSelect = (itemId) => {
        const newSelectedItems = selectedItems.includes(itemId)
            ? selectedItems.filter(id => id !== itemId) // de-select
            : [...selectedItems, itemId]; // select
        setSelectedItems(newSelectedItems);
    };

    return (
        <div>
            {filteredItems.length > 0 ? (
                <div>
                    {/* List of items */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* each item */}
                        {filteredItems.slice(0, 10).map((item) => (
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
                                        checked={selectedItems.includes(item.id)}
                                        readOnly
                                    />
                                </div>
    
                                {/* image */}
                                <div className={`w-[90%] ${selectedItems.includes(item.id) ? "selected-overlay" : ""}`}>
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
                                            {item.watchlists
                                                .slice(0, item.watchlists.length > 4 ? 3 : 4)
                                                .map((participantID, index) => {
                                                // Find the user in usersData that matches the participant's id
                                                const user = usersData.find(user => user.id === participantID);
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
                                            })}
                                            {/* plus sign + how many more people */}
                                            {item.watchlists.length > 4 && (
                                                <div>+{item.watchlists.length - 3}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-m-l mt-10">No results found</div>
            )}
        </div>
    );
};


// Main Component
const FilmSearch = ({ formData: parentFormData, nextStep }) => {

    const [filteredItems, setFilteredItems] = useState(filmData);
    const [formData, setFormData] = useState(parentFormData);
    // const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);

    // Filter
    const defaultWatchlistFilter = 0;
    const defaultGenreFilter = [];
    const defaultYearFilter = 1860;
    const defaultImdbRating = 0;

    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const [watchlistFilter, setwatchlistFilter] = useState(defaultWatchlistFilter);
    const [genreFilter, setGenreFilter] = useState(defaultGenreFilter);
    const [yearFilter, setYearFilter] = useState(defaultYearFilter);
    const [imdbRating, setImdbRating] = useState(defaultImdbRating);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    
    const applyFilters = () => {
        return filmData.filter(item => {
           // Check if the search term matches (or if search term is empty)
            const titleMatch = searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;

            // Check if any of the item's genres are in the selected genreFilter
            const genreMatch = genreFilter.length === 0 || (Array.isArray(item.genres) && item.genres.some(genre => genreFilter.includes(genre)));

            // Check if the item is at least in selected number of watchlists
            // const watchlistMatch =

            // Check if the item's year is within the selected year range
            // const yearMatch = yearFilter.start <= item.year && item.year <= yearFilter.end;

            // Check if the item's IMDb rating is within the selected rating range
            // const ratingMatch = (imdbRating.start === undefined || imdbRating.start <= item.rating) &&
                                // (imdbRating.end === undefined || item.rating <= imdbRating.end);

            // return titleMatch && genreMatch && watchlistMatch && yearMatch && ratingMatch;
            return titleMatch && genreMatch;
        });
    };

    const updateSelection = (newSelectedItems) => {

        setFormData(formData => ({
            ...formData,
            selectedItems: newSelectedItems
        }));
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = filmData.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleNextStep = () => {
        if (formData.selectedItems.length === 0) {
            setShowNoSelectionError(true); // Show error message if no film is selected
            return;
        } else {
            setShowNoSelectionError(false); // Hide error message if films are selected
        }
        nextStep(formData);
    };

    useEffect(() => {
        setFilteredItems(applyFilters());
    }, [searchTerm, genreFilter]); // Re-apply filters when searchTerm or genreFilter changes

    // Check if any filter has been applied
    useEffect(() => {
        console.log("Current Filters:", { watchlistFilter, genreFilter, yearFilter, imdbRating });
    
        const hasChanged = watchlistFilter !== defaultWatchlistFilter ||
                            (genreFilter && genreFilter.length > 0) || 
                            yearFilter !== defaultYearFilter ||
                            imdbRating !== defaultImdbRating;
    
        setIsFilterApplied(hasChanged);
    }, [watchlistFilter, genreFilter, yearFilter, imdbRating]);

    return (
        <div>
            {/* Filter Group */}
            <ReactModal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="w-full h-full bg-background z-30"
            >
                <Filters
                    closeModal={() => setModalIsOpen(false)}
                    maxNumWatchlist={10}
                    minYear={1860} maxYear={2022}
                    selectedwatchlistFilter={watchlistFilter}
                    setSelectedWatchlists={(newNumWatchlist) => setwatchlistFilter(newNumWatchlist)}
                    selectedGenres={genreFilter}
                    setGenre={(newGenre) => setGenreFilter(newGenre)}
                    selectedYear={yearFilter}
                    setYear={(newYear) => setYearFilter(newYear)}
                    selectedImdbRating={imdbRating}
                    setImdbRating={(newRating) => setImdbRating(newRating)}
                />
            </ReactModal>
            
            {/* Main Content */}
            <div className={`${modalIsOpen ? "hidden" : "block"}`}>

                {/* Description */}
                <div className="text-m-l ">
                    <p className="text-m-m">
                        or many films and decide later which one to watch.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="flex gap-x-4">
                    <div className="relative inline-block w-full mt-3 mb-6">
                        <div className="absolute top-1/2 left-2.5 transform -translate-y-1/2 text-primary-foreground mx-2 text-m-l">
                            <IoIosSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="flex h-14 w-full pl-12 border-2 border-input bg-primary text-primary-foreground text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Filter Button */}
                    <button 
                        className={cn("flex items-center text-[30px] mr-2 mb-3 text-primary-foreground",
                            {"text-accent": isFilterApplied})}
                        onClick={() => setModalIsOpen(true)}
                    >
                        <CiFilter />
                    </button>
                </div>

                {/* Result */}
                <SearchDisplay
                    filteredItems={filteredItems} // Pass the filtered items to the display
                    selectedItems={formData.selectedItems} // Pass the selected items to the display
                    setSelectedItems={updateSelection} // Pass the update function
                />

                {/* Display error message if no film is selected */}
                {showNoSelectionError && (
                    <div className="text-destructive-foreground text-m-m pt-10">
                        Please select at least one film.
                    </div>
                )}

                {/* Next Step */}
                <Button onClick={handleNextStep} type="submit" className="mt-10">
                    Next
                </Button>
            </div>

        </div>
    );
};

export default FilmSearch;
