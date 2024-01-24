import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import filmData from "@/data/filmData";
import genresData from "@/data/genres";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import "@/styles/utility.css"
import MultiSelect from "@/components/utility/multiSelect";

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
                                    {item.watchlist
                                        .slice(0, item.watchlist.length > 4 ? 3 : 4)
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
                                        ))}
                                    {/* plus sign + how many more people */}
                                    {item.watchlist.length > 4 && (
                                        <div>+{item.watchlist.length - 3}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Filter Groups
const FilterGroup = ({ genre, setGenre, yearRange, setYearRange }) => {

    return (
        <div className="mb-10 flex flex-col gap-y-3 mx-2">


            {/* Is in watchlist */}
            <MultiSelect
                options={genresData}
                label="Watchlist"
                selected={genre}
                setSelected={setGenre}
            />

            {/* Genres */}
            <MultiSelect
                options={genresData}
                label="Genre"
                selected={genre}
                setSelected={setGenre}
            />

            <MultiSelect
                options={genresData}
                label="Year"
                selected={genre}
                setSelected={setGenre}
            />       
            
            <MultiSelect
                options={genresData}
                label="Rating"
                selected={genre}
                setSelected={setGenre}
            />
            {/* Year Range */}
            <p>{yearRange.start}</p>
            <input
                type="range"
                min="1860"
                max={new Date().getFullYear()}
                value={yearRange.start}
                onChange={(e) => setYearRange({ ...yearRange, start: parseInt(e.target.value) })}
            />

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

    const [isInWatchlist, setIsInWatchlist] = useState(null);
    const [genreFilter, setGenreFilter] = useState(null);
    const [yearRangeFilter, setYearRangeFilter] = useState({
        start: 1860,
        end: new Date().getFullYear()
    });
    const [imdbRating, setImdbRating] = useState(null);


    // API call 
    const applyFilters = () => {
        return filmData.filter(item => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!genreFilter || item.genre === genreFilter); // Apply genre filter if set
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
            console.log(formData.selectedItems);
        }

        nextStep(formData);
    };

    useEffect(() => {
        setFilteredItems(applyFilters());
    }, [searchTerm, genreFilter]); // Re-apply filters when searchTerm or genreFilter changes


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
                        genre={genreFilter}
                        setGenre={(genre) => setGenreFilter(genre)}
                        yearRange={yearRangeFilter}
                        setYearRange={(newRange) => setYearRangeFilter(newRange)}
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
