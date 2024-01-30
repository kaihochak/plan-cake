import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import "@/styles/utility.css"
import MultiSelect from "@/components/utility/multiSelect";

// dummy
import filmData from "@/data/filmData";
import genresData from "@/data/genres";
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

// Filter Groups
const FilterGroup = ({ 
    selectedWatchlists, setSelectedWatchlists, selectedGenres, setGenre, 
    selectedYearRange, setYearRange, selectedImdbRating, setImdbRating }) => {

    return (
        <div className="mb-8 flex flex-col gap-y-3 mx-2">

            {/* Is in watchlist */}
            <MultiSelect
                options={usersData}
                label="Watchlist"
                selected={selectedWatchlists}
                setSelected={setSelectedWatchlists}
            />

            {/* Genres */}
            <MultiSelect
                options={genresData}
                label="Genre"
                selected={selectedGenres}
                setSelected={setGenre}
            />
            
            {/* Year Range */}
            
            {/* Imdb Rating */}
         
        </div>

    )


}

// Main Component
const FilmSearch = ({ formData: parentFormData, nextStep }) => {

    const [filteredItems, setFilteredItems] = useState(filmData);
    const [formData, setFormData] = useState(parentFormData);
    // const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);

    // Filter
    const [filterGroupOpen, setFilterGroupOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const [isInWatchlists, setIsInWatchlists] = useState([]);
    const [genreFilters, setGenreFilters] = useState([]);
    const [yearRangeFilter, setYearRangeFilter] = useState({
        start: 1860,
        end: new Date().getFullYear()
    });
    const [imdbRating, setImdbRating] = useState({ start: null, end: null });

    const applyFilters = () => {
        return filmData.filter(item => {
           // Check if the search term matches (or if search term is empty)
            const titleMatch = searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;

            // Check if any of the item's genres are in the selected genreFilters
            const genreMatch = genreFilters.length === 0 || (Array.isArray(item.genres) && item.genres.some(genre => genreFilters.includes(genre)));

            // Check if the item is in the watchlist
            const watchlistMatch = isInWatchlists.length === 0 || (Array.isArray(item.watchlists) && item.watchlists.some(user => isInWatchlists.includes(user)));

            // Check if the item's year is within the selected year range
            // const yearMatch = yearRangeFilter.start <= item.year && item.year <= yearRangeFilter.end;

            // Check if the item's IMDb rating is within the selected rating range
            // const ratingMatch = (imdbRating.start === undefined || imdbRating.start <= item.rating) &&
                                // (imdbRating.end === undefined || item.rating <= imdbRating.end);

            // return titleMatch && genreMatch && watchlistMatch && yearMatch && ratingMatch;
            return titleMatch && genreMatch && watchlistMatch;
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
    }, [searchTerm, genreFilters]); // Re-apply filters when searchTerm or genreFilters changes


    // Filter Animation
    useEffect(() => {
        if (filterGroupOpen) {
            setIsAnimating(true);
        }
    }, [filterGroupOpen]);

    const handleAnimationEnd = () => {
        if (!filterGroupOpen) setIsAnimating(false);
    };


    return (
        <div>
            {/* Search Bar */}
            <div className="flex gap-x-4">
                <div className="relative inline-block w-full my-6">
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
                    className="flex items-center text-m-l mr-3 text-primary-foreground"
                    onClick={() => setFilterGroupOpen(!filterGroupOpen)}    
                >
                    <CiFilter />
                </button>
            </div>


            {/* Filter Button */}
            {(filterGroupOpen || isAnimating) && (
                <div 
                    className={`transition-transform duration-300 ${filterGroupOpen ? 'animate-slide-down' : 'animate-slide-up'}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <FilterGroup
                        selectedWatchlists={isInWatchlists}
                        setSelectedWatchlists={(watchlist) => setIsInWatchlists(watchlist)}
                        selectedGenres={genreFilters}
                        setGenre={(genre) => setGenreFilters(genre)}
                        selectedYearRange={yearRangeFilter}
                        setYearRange={(newRange) => setYearRangeFilter(newRange)}
                        selectedImdbRating={imdbRating}
                        setImdbRating={(rating) => setImdbRating(rating)}
                    />
                </div>
            )}

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
    );
};

export default FilmSearch;