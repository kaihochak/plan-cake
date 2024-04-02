import React, { useState, useEffect, useCallback } from "react";
import SearchDisplay from "./SearchDisplay";
import { Button } from "@/components/ui/button";
import "@/styles/utility.css"
import DummyUserData from "@/data/users";
import SearchBar from "@/components/utility/SearchBar";
import Loader from "@/components/utility/Loader";
import debounce from "lodash.debounce";
import { fetchUpcoming, searchFilms } from "../../lib/tmdb/api";
import FilmFilters from "../utility/FilmFilters";
import FilmFiltersDisplay from "../utility/FilmFiltersDisplay";
import { CiFilter } from 'react-icons/ci'
import { cn } from "@/lib/utils"
import { defaultFilters, defaultSortBy } from "@/constants";

const FilmSearch = ({ formData: parentFormData, nextStep }) => {

    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(parentFormData);
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);

    const [filmData, setFilmData] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [filters, setFilters] = useState({
        watchlistFilter: defaultFilters.defaultWatchlistFilter,
        specificWatchlistFilter: defaultFilters.defaultSpecificWatchlistFilter,
        genreFilter: defaultFilters.defaultGenreFilter,
        yearFilter: defaultFilters.defaultYearFilter,
        ratingFilter: defaultFilters.defaultRating,
    });

    let users = DummyUserData;

    /**
     * FILM DATA
     */

    // Fetch initial film data
    useEffect(() => {
        setLoading(true);
        getInitialFilms();
    }, []);

    const getInitialFilms = async () => {
        const upcoming = await fetchUpcoming();
        if (upcoming && upcoming.results) {
            setFilmData(upcoming.results);
            setFilteredResults(upcoming.results);
            setUpcomingFilms(upcoming.results);
            setLoading(false);
        }
    }

    /**
     * SEARCH
     */

    // Filter the film data based on the search term
    useEffect(() => {
        if (searchTerm && searchTerm.length > 0) {
            setFilteredResults(filmData);
        } else {
            setFilteredResults(upcomingFilms);
        }
    }, [filmData]);

    // handle search should be debounced to avoid multiple API calls
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };
    const debouncedSearch = useCallback(
        (searchTerm) => requestSearch(searchTerm), []
    );
    const requestSearch = debounce(async (searchTerm) => {
        console.log("searching for", searchTerm);
        // if search term is not empty, fetch search results
        if (searchTerm && searchTerm.length > 0) {
            setLoading(true);
            const data = await searchFilms({
                query: searchTerm,
                include_adult: false,
                language: 'en-US',
                page: 1
            })
            if (data && data.results) {
                console.log("search results", data);
                setFilmData(data.results);
            }
        } else setFilmData(upcomingFilms);
        setLoading(false);
    }, 500);

    /**
     * FILTERS & SORTING
     */

    // // keep track of whether any filter or sort has been applied
    // useEffect(() => {
    //     const hasChanged = Object.keys(filters).some(key => filters[key] !== defaultFilters[key]) && sortBy !== defaultSortBy;
    //     setIsFilterApplied(hasChanged);
    // }, [sortBy, filters]);

    // Update selected films
    const updateSelection = (newSelectedFilms) => {
        setFormData(formData => ({ ...formData, selectedFilms: newSelectedFilms }));
    };

    // Handle next step
    const handleNextStep = () => {
        if (formData.selectedFilms.length === 0) {
            setShowNoSelectionError(true); // Show error message if no film is selected
            return;
        } else setShowNoSelectionError(false); // Hide error message if films are selected
        nextStep(formData);
    };


    useEffect(() => {
        console.log("modalOpen", modalOpen);
    }, [modalOpen]);


    return (
        <div className="w-full">
            <h2 className="text-m-2xl mb-3">Pick A Film</h2>


            {!modalOpen ? (

                <div className="flex flex-col">
                    <div className="text-m-l">
                        <p className="text-m-m"> or many films and decide later on.</p>
                    </div>

                    <div className="flex gap-x-4 pt-6">
                        <SearchBar
                            searchTerm={searchTerm}
                            handleSearchChange={handleSearchChange}
                        />
                        <button onClick={() => setModalOpen(true)}
                            className={cn("flex items-center text-[30px] mr-2 mt-2 text-primary-foreground/60",
                                { "text-accent/70": isFilterApplied })}>
                            <CiFilter />
                        </button>
                    </div>


                    {/* <FilmFiltersDisplay 
                     filters={filters}
                     setFilters={setFilters}
                     sortBy={sortBy}
                     setSortBy={setSortBy}
                     isFilterApplied={isFilterApplied}
                 /> */}

                    {/* Result */}
                    {loading ?
                        <div className="flex-center h-[400px] md:h-[800px]">
                            <Loader height="h-[60px]" weight="h-[60px]" />
                        </div> :
                        <SearchDisplay
                            filteredResults={filteredResults}
                            selectedFilms={formData.selectedFilms}
                            setSelectedFilms={updateSelection}
                        />
                    }

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

            ) : (
                <FilmFilters
                    filmData={filmData}
                    users={users}
                    setIsFilterApplied={setIsFilterApplied}
                    setModalOpen={setModalOpen}
                    sortBy={sortBy}
                    filters={filters}
                    setFilteredResults={setFilteredResults}
                />
            )}
        </div>
    );
};

export default FilmSearch;

