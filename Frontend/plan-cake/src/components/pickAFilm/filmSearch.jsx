import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import SearchDisplay from "./searchDisplay";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "@/styles/utility.css"
import Filters from "@/components/utility/filters";
import { cn } from "@/lib/utils"
// dummy
import dummyFilmData from "@/data/filmData";

const FilmSearch = ({ formData: parentFormData, nextStep }) => {

    const [filmData, setFilmData] = useState(dummyFilmData);
    const [filteredItems, setFilteredItems] = useState(filmData);
    const [formData, setFormData] = useState(parentFormData);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);

    // Filter settings
    const defaultSortBy = "Watchlists: Most to Least";
    const defaultWatchlistFilter = 0;
    const defaultSpecificWatchlistFilter = [];
    const defaultGenreFilter = [];
    const defaultYearFilter = [1860, new Date().getFullYear()];
    const defaultRating = 0;
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [watchlistFilter, setwatchlistFilter] = useState(defaultWatchlistFilter);
    const [specificWatchlistFilter, setSpecificWatchlistFilter] = useState(defaultSpecificWatchlistFilter);
    const [genreFilter, setGenreFilter] = useState(defaultGenreFilter);
    const [yearFilter, setYearFilter] = useState(defaultYearFilter);
    const [ratingFilter, setRatingFilter] = useState(defaultRating);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch data initially
    // useEffect(() => {
    //     const fetchData = async () => {
    //     const result = await axios('https://api.example.com/data');
    //     setData(result.data);
    //     };
    //     fetchData();
    // }, []);

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
        console.log("Current Filters:", { watchlistFilter, sortBy, specificWatchlistFilter, genreFilter, yearFilter, ratingFilter });

        // show the filter button in a different color if any filter has been applied
        const hasChanged = sortBy !== defaultSortBy ||
            watchlistFilter !== defaultWatchlistFilter ||
            (specificWatchlistFilter && specificWatchlistFilter.length > 0) ||
            (genreFilter && genreFilter.length > 0) ||
            yearFilter[0] !== defaultYearFilter[0] ||
            yearFilter[1] !== defaultYearFilter[1] ||
            ratingFilter !== defaultRating;

        setIsFilterApplied(hasChanged);
        setFilteredItems(applyFiltersAndSort());

    }, [searchTerm, sortBy, watchlistFilter, specificWatchlistFilter, genreFilter, yearFilter, ratingFilter]);

    const applyFiltersAndSort = () => {
        let results = applyFilters(); // Apply filters based on the current state
        return applySort(results); // Then, sort those results before returning them
    };

    const applyFilters = () => {
        return filmData.filter(item => {
            // Check if the item's title includes the search term
            const titleMatch = searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;

            // Check if the item matches the filters
            const watchlistMatch = watchlistFilter === 0 || item.watchlists.length >= watchlistFilter;
            const specificWatchlistMatch = specificWatchlistFilter.length === 0 || (Array.isArray(item.watchlists) && item.watchlists.some(user => specificWatchlistFilter.includes(user)));
            const genreMatch = genreFilter.length === 0 || (Array.isArray(item.genres) && item.genres.some(genre => genreFilter.includes(genre)));
            const yearMatch = yearFilter[0] <= item.year && item.year <= yearFilter[1];
            const ratingMatch = ratingFilter === 0 || item.rating >= ratingFilter;

            return titleMatch && watchlistMatch && specificWatchlistMatch && genreMatch && yearMatch && ratingMatch;

        });
    };

    const applySort = (results) => {
        let sortedItems = results;
        switch (sortBy) {
            case "Watchlists: Most to Least":
                sortedItems = sortedItems.sort((a, b) => b.watchlists.length - a.watchlists.length);
                break;
            case "Watchlists: Least to Most":
                sortedItems = sortedItems.sort((a, b) => a.watchlists.length - b.watchlists.length);
                break;
            case "Rating: High to Low":
                sortedItems = sortedItems.sort((a, b) => b.rating - a.rating);
                break;
            case "Rating: Low to High":
                sortedItems = sortedItems.sort((a, b) => a.rating - b.rating);
                break;
            case "Year: Newest to Oldest":
                sortedItems = sortedItems.sort((a, b) => b.year - a.year);
                break;
            case "Year: Oldest to Newest":
                sortedItems = sortedItems.sort((a, b) => a.year - b.year);
                break;
            default:
                break;
        }
        return sortedItems;
    }

    return (
        <div className="w-full">

            {!showFilters ?
                (
                    // main content
                    <div className="flex flex-col">
                        {/* Description */}
                        <div className="text-m-l">
                            <p className="text-m-m">
                                or many films and decide later which one to watch.
                            </p>
                        </div>

                        {/* Search & Filter */}
                        <div className="flex gap-x-4">
                            <div className="relative inline-block w-full mt-3 mb-2">
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
                                className={cn("flex items-center text-[30px] mr-2 mt-2 text-primary-foreground/60",
                                    { "text-accent/70": isFilterApplied })}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <CiFilter />
                            </button>
                        </div>

                        {/* Filter Displays */}
                        <div className="flex flex-wrap gap-2 justify-start mt-1 mb-4">
                            {sortBy !== defaultSortBy && (
                                <button onClick={() => setShowFilters(true)}>
                                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{sortBy}</p>
                                </button>
                            )}
                            {watchlistFilter > 0 && (
                                <button onClick={() => setShowFilters(true)}>
                                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">Watchlists: ≥ {watchlistFilter}</p>
                                </button>
                            )}
                            {specificWatchlistFilter.length > 0 && (
                                <button onClick={() => setShowFilters(true)}>
                                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{specificWatchlistFilter.join(" & ")}</p>
                                </button>
                            )}
                            {genreFilter.length > 0 && (
                                <button onClick={() => setShowFilters(true)}>
                                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{genreFilter.join(", ")}</p>
                                </button>
                            )}
                            {(yearFilter[0] !== defaultYearFilter[0] || yearFilter[1] !== defaultYearFilter[1]) && (
                                <button onClick={() => setShowFilters(true)}>
                                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{yearFilter[0]} - {yearFilter[1]}</p>
                                </button>
                            )}
                            {ratingFilter > 0 && (
                                <button onClick={() => setShowFilters(true)}>
                                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">≥ {ratingFilter}</p>
                                </button>
                            )}
                            {isFilterApplied && (
                                <button onClick={() => {
                                    setSortBy(defaultSortBy);
                                    setwatchlistFilter(defaultWatchlistFilter);
                                    setSpecificWatchlistFilter(defaultSpecificWatchlistFilter);
                                    setGenreFilter(defaultGenreFilter);
                                    setYearFilter(defaultYearFilter);
                                    setRatingFilter(defaultRating);
                                }}>
                                    <IoMdCloseCircleOutline className="text-accent/50 text-xl" />
                                </button>
                            )}
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
                    </div>) : (

                    // filter modal
                    <Filters
                        closeModal={() => setShowFilters(false)}
                        maxNumWatchlist={6}
                        minYear={defaultYearFilter[0]}
                        maxYear={defaultYearFilter[1]}
                        ratingSteps={10}
                        selectedSortBy={sortBy}
                        setSelectedSortBy={(newSortBy) => setSortBy(newSortBy)}
                        selectedWatchlists={watchlistFilter}
                        setSelectedWatchlists={(newNumWatchlist) => setwatchlistFilter(newNumWatchlist)}
                        selectedSpecificWatchlists={specificWatchlistFilter}
                        setSelectedSpecificWatchlists={(newSpecificWatchlist) => setSpecificWatchlistFilter(newSpecificWatchlist)}
                        selectedGenres={genreFilter}
                        setGenre={(newGenre) => setGenreFilter(newGenre)}
                        selectedYear={yearFilter}
                        setYear={(newYear) => setYearFilter(newYear)}
                        selectedRating={ratingFilter}
                        setRating={(newRating) => setRatingFilter(newRating)}
                    />
                )

            }

        </div>

    );
};

export default FilmSearch;
