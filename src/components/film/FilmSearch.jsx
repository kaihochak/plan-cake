import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchDisplay from "./SearchDisplay";
import { Button } from "@/components/ui/button";
import "@/styles/utility.css";
import SearchBar from "@/components/utility/SearchBar";
import debounce from "lodash.debounce";
import FilmFilters from "@/components/film/FilmFilters";
import FilmFiltersDisplay from "@/components/film/FilmFiltersDisplay";
import { BiFilterAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { defaultFilters, defaultSortBy } from "@/constants";
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { useGetUpcoming, useGetSearchResults } from "@/lib/react-query/queries";

const FilmSearch = ({ selectedFilms, handleApply, protectedFilms, setModalOpen }) => {
    
    // Form Data
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({ selectedFilms });
    const [users, setUsers] = useState([]);

    // Film Data
    const [filmData, setFilmData] = useState([]);
    const [watchlistObject, setWatchlistObject] = useState({});
    const [sortedWatchlist, setSortedWatchlist] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    // Filter and Search
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [filters, setFilters] = useState({
        watchlistFilter: defaultFilters.watchlistFilter,
        specificWatchlistFilter: defaultFilters.specificWatchlistFilter,
        isSpecificAnd: defaultFilters.isSpecificAnd,
        genreFilter: defaultFilters.genreFilter,
        yearFilter: defaultFilters.yearFilter,
        ratingFilter: defaultFilters.ratingFilter,
    });

    // Query upcoming films
    const { data: upcomingData, error: upcomingError, fetchNextPage: fetchNextPageUpcoming,
        hasNextPage: hasNextPageUpcoming, isFetching: isFetchingUpcoming,
        isFetchingNextPage: isFetchingNextPageUpcoming, status: statusUpcoming,
    } = useGetUpcoming();

    // Query search results
    const { data: searchData, error: searchError, fetchNextPage: fetchNextPageSearch,
        hasNextPage: hasNextPageSearch, isFetching: isFetchingSearch,
        isFetchingNextPage: isFetchingNextPageSearch, status: statusSearch,
    } = useGetSearchResults(searchTerm);

    // Observer for infinite scrolling
    const observerElem = useRef();

    // Filter and sort the films based on the selected filters
    useEffect(() => {

        if (searchTerm) {
            if (searchData) {
                const allFilms = searchData.pages.flatMap(page => page.results);
                // console.log("allFilms", allFilms);
                setFilteredResults(sortResults(filterResults(allFilms)));
            }
        } else {
            if (upcomingData) {
                const allFilms = upcomingData.pages.flatMap(page => page.results);
                setFilteredResults(sortResults(filterResults(allFilms)));
            }
        }
    }, [searchData, upcomingData, searchTerm]);

    // Infinite scrolling observer for both upcoming and search results
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (searchTerm && hasNextPageSearch) {
                        fetchNextPageSearch();
                    } else if (!searchTerm && hasNextPageUpcoming) {
                        fetchNextPageUpcoming();
                    }
                }
            },
            { threshold: 1.0 }
        );

        if (observerElem.current) {
            observer.observe(observerElem.current);
        }

        return () => {
            if (observerElem.current) {
                observer.unobserve(observerElem.current);
            }
        };
    }, [fetchNextPageUpcoming, fetchNextPageSearch, hasNextPageUpcoming, hasNextPageSearch, searchTerm]);

    /************************************************************************
     * SEARCH
     ************************************************************************/

    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
        debouncedSearch(e.target.value);
    };
    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            console.log("searchTerm", searchTerm);
            setSearchTerm(searchTerm);
        }, 350),
        []
    );

    /************************************************************************
     * FILTERS & SORTING
     ************************************************************************/

    useEffect(() => {
        setFilteredResults(sortResults(filterResults(filmData)));
    }, [filmData, sortBy, filters]);

    const filterResults = (filmData) => {
        const specificUserIDs = filters.specificWatchlistFilter.map(filter => filter.id);
        const specificUsers = users.filter(user => specificUserIDs.includes(user._id));

        const watchlistedFilms_OR = specificUsers.flatMap(user => user.films.watchlist);

        const watchlistedFilms_AND = specificUsers.reduce((acc, user) => {
            return acc.filter(film => user.films.watchlist.some(watchlistedFilm => watchlistedFilm._id === film._id));
        }, specificUsers.length > 0 ? specificUsers[0].films.watchlist : []);

        const watchlistFilterActive = filters.watchlistFilter > 0;
        const specificWatchlistFilterActive = filters.specificWatchlistFilter.length > 0;
        const genreFilterActive = filters.genreFilter.length > 0;
        const yearFilterActive =
            filters.yearFilter[0] !== defaultFilters.yearFilter[0] ||
            filters.yearFilter[1] !== defaultFilters.yearFilter[1];
        const ratingFilterActive = filters.ratingFilter > 0;

        return filmData.filter(film => {
            return (
                (specificWatchlistFilterActive ? filterBySpecificWatchlist(film) : true) &&
                (watchlistFilterActive ? filterByWatchlist(film) : true) &&
                (genreFilterActive ? filterByGenre(film) : true) &&
                (yearFilterActive ? filterByYears(film) : true) &&
                (ratingFilterActive ? filterByRating(film) : true)
            );
        });

        function filterBySpecificWatchlist(film) {
            if (filters.isSpecificAnd) {
                if (watchlistedFilms_AND.some(watchlistedFilm => watchlistedFilm._id === film.id.toString())) return true;
            } else {
                if (watchlistedFilms_OR.some(watchlistedFilm => watchlistedFilm._id === film.id.toString())) return true;
            }
        }

        function filterByWatchlist(film) {
            let counter = 0;
            users.forEach(user => {
                user.films.watchlist.forEach(watchlistedFilm => {
                    if (watchlistedFilm._id === film.id.toString()) counter++;
                });
            });
            return counter >= filters.watchlistFilter;
        }

        function filterByGenre(film) {
            if (film.genres)
                return filters.genreFilter?.some(selectedGenre => film.genres.some(genre => genre.id === selectedGenre.id));
            if (film.genre_ids)
                return filters.genreFilter?.some(selectedGenre => film.genre_ids.some(genre => genre === selectedGenre.id));
        }

        function filterByYears(film) {
            let year = film.release_date.split("-")[0];
            return filters.yearFilter[0] <= year && year <= filters.yearFilter[1];
        }

        function filterByRating(film) {
            return film.vote_average >= filters.ratingFilter;
        }
    };

    const filterWatchlistedFilms = (films) => {
        return films.filter(film => !watchlistObject[film.id]);
    };

    const sortResults = (results) => {
        let sortedItems = results;
        switch (sortBy) {
            case "Rating: High to Low":
                sortedItems = sortedItems.sort((a, b) => b.vote_average - a.vote_average);
                break;
            case "Rating: Low to High":
                sortedItems = sortedItems.sort((a, b) => a.vote_average - b.vote_average);
                break;
            case "Year: New to Old":
                sortedItems = sortedItems.sort(
                    (a, b) => parseInt(b.release_date.split("-")[0]) - parseInt(a.release_date.split("-")[0])
                );
                break;
            case "Year: Old to New":
                sortedItems = sortedItems.sort(
                    (a, b) => parseInt(a.release_date.split("-")[0]) - parseInt(b.release_date.split("-")[0])
                );
                break;
            case "Watchlists: Most to Least" || "Watchlists: Least to Most":
                break;
            default:
                break;
        }
        return sortedItems;
    };

    const sortFilmsByWatchlist = (films) => {
        return films.sort((a, b) => {
            return watchlistObject[b.id].length - watchlistObject[a.id].length;
        });
    };

    /************************************************************************
     *  Components
     ************************************************************************/

    const FilmFiltersDialog = () => {
        return (
            <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
                <DialogContent hasClose={false} className="max-w-[1024px] w-full h-full lg:w-[75%] lg:h-[80%] overflow-y-auto bg-primary custom-scrollbar text-secondary">
                    <FilmFilters
                        filmData={filmData}
                        users={users}
                        setIsFilterApplied={setIsFilterApplied}
                        setModalOpen={setFilterModalOpen}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        filters={filters}
                        setFilters={setFilters}
                        setFilteredResults={setFilteredResults}
                    />
                </DialogContent>
            </Dialog>
        );
    };

    /************************************************************************
     *  RENDER
     ************************************************************************/

    return (
        <div className="flex flex-col w-full h-full px-2 mb-10 gap-y-2 bg-primary text-primary-foreground lg:mx-auto">
            <div className="my-4 flex-between">
                <h3 className="h3">Pick A Film!</h3>
                <div onClick={() => setModalOpen(false)} className="cursor-pointer text-m-xl">
                    <IoClose />
                </div>
            </div>

            <div className="flex flex-col">
                {/* Search & Filters */}
                <div className="flex gap-x-4">
                    <SearchBar searchTerm={inputValue} handleSearchChange={handleSearchChange} />
                    <button
                        onClick={() => setFilterModalOpen(true)}
                        className={`flex items-center text-[30px] mr-2 mb-2 text-primary-foreground/60 ${isFilterApplied ? "text-accent/70" : ""}`}
                    >
                        <BiFilterAlt />
                    </button>
                    <FilmFiltersDialog />
                </div>

                <FilmFiltersDisplay
                    openFilterModal={setFilterModalOpen}
                    isFilterApplied={isFilterApplied}
                    setIsFilterApplied={setIsFilterApplied}
                    filters={filters}
                    setFilters={setFilters}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Result */}
                <SearchDisplay
                    isLoading={searchTerm ? isFetchingSearch : isFetchingUpcoming}
                    filteredResults={filteredResults}
                    selectedFilms={formData.selectedFilms}
                    setSelectedFilms={(newSelectedFilms) =>
                        setFormData({ ...formData, selectedFilms: newSelectedFilms })
                    }
                    watchlistObject={watchlistObject}
                    guests={users}
                    protectedFilms={protectedFilms}
                />

                {/* Next Step */}
                <div className="sticky bottom-0 z-50 flex items-center justify-center w-full">
                    <Button
                        onClick={() => handleApply(formData)}
                        type="submit"
                        className="w-[95%] border-none bg-accent text-primary shadow-xl"
                    >
                        Apply
                    </Button>
                </div>
            </div>

            {/* Observer element for infinite scrolling */}
            <div ref={observerElem} className="w-full h-10"></div>
        </div>
    );
};

export default FilmSearch;
