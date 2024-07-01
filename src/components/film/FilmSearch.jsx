import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchDisplay from "./SearchDisplay";
import { Button } from "@/components/ui/button";
import "@/styles/utility.css";
import SearchBar from "@/components/utility/SearchBar";
import FilmFilters from "@/components/film/FilmFilters";
import FilmFiltersDisplay from "@/components/film/FilmFiltersDisplay";
import { BiFilterAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { defaultFilters, defaultSortBy } from "@/constants";
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { useGetUpcoming, useGetSearchResults } from "@/lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import Loader from '@/components/utility/Loader';
import useDebounce from "@/hooks/useDebounce";


const FilmSearch = ({ showFilmSearch, setShowFilmSearch, selectedFilms, handleApply, protectedFilms, setModalOpen }) => {

	/************************************************************************
	 * UPCOMING
	 ************************************************************************/
	const { data: upcomingData, error: upcomingError, fetchNextPage: fetchNextPageUpcoming,
		hasNextPage: hasNextPageUpcoming, isFetching: isFetchingUpcoming,
		isFetchingNextPage: isFetchingNextPageUpcoming, status: statusUpcoming,
	} = useGetUpcoming();

	/************************************************************************
	 * SEARCH
	 ************************************************************************/

	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);
	const shouldShowSearchResults = debouncedSearch.length > 0;

	// Query search results
	const { data: searchData, error: searchError, fetchNextPage: fetchNextPageSearch,
		hasNextPage: hasNextPageSearch, isFetching: isFetchingSearch,
		isFetchingNextPage: isFetchingNextPageSearch, status: statusSearch,
	} = useGetSearchResults(debouncedSearch);

	// No results found
	const shouldShowNoResults = searchTerm && searchData && searchData.pages[0].results.length === 0;

	/************************************************************************
	 * INFINITE SCROLL
	 ************************************************************************/
	const { ref, inView } = useInView();

	// infinite scrolling
	useEffect(() => {
		if (inView) {
			if (!searchTerm && hasNextPageUpcoming && !isFetchingNextPageUpcoming) fetchNextPageUpcoming();
			else if (searchTerm && hasNextPageSearch && !isFetchingNextPageSearch) fetchNextPageSearch();
		}
	}, [inView]);


	// Form Data
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

	console.log("isFilterApplied", isFilterApplied);


	// Filter and sort the films based on the selected filters
	useEffect(() => {
	    if (debouncedSearch) {
	        if (searchData) setFilteredResults(sortResults(filterResults(searchData.pages.flatMap(page => page.results))));
	    } else {
	        if (upcomingData) setFilteredResults(sortResults(filterResults(upcomingData.pages.flatMap(page => page.results))));
	    }
	}, [searchData, upcomingData, searchTerm, filters, sortBy]);

	/************************************************************************
	 * FILTERS & SORTING
	 ************************************************************************/

	const filterResults = (filmData) => {
	    // const specificUserIDs = filters.specificWatchlistFilter.map(filter => filter.id);
	    // const specificUsers = users.filter(user => specificUserIDs.includes(user._id));

	    // const watchlistedFilms_OR = specificUsers.flatMap(user => user.films.watchlist);

	    // const watchlistedFilms_AND = specificUsers.reduce((acc, user) => {
	    //     return acc.filter(film => user.films.watchlist.some(watchlistedFilm => watchlistedFilm._id === film._id));
	    // }, specificUsers.length > 0 ? specificUsers[0].films.watchlist : []);

	    // const watchlistFilterActive = filters.watchlistFilter > 0;
	    // const specificWatchlistFilterActive = filters.specificWatchlistFilter.length > 0;
	    const genreFilterActive = filters.genreFilter.length > 0;
	    const yearFilterActive =
	        filters.yearFilter[0] !== defaultFilters.yearFilter[0] ||
	        filters.yearFilter[1] !== defaultFilters.yearFilter[1];
	    const ratingFilterActive = filters.ratingFilter > 0;

	    return filmData.filter(film => {
	        return (
	            // (specificWatchlistFilterActive ? filterBySpecificWatchlist(film) : true) &&
	            // (watchlistFilterActive ? filterByWatchlist(film) : true) &&
	            (genreFilterActive ? filterByGenre(film) : true) &&
	            (yearFilterActive ? filterByYears(film) : true) &&
	            (ratingFilterActive ? filterByRating(film) : true)
	        );
	    });

		// Helper functions
	    // function filterBySpecificWatchlist(film) {
	    //     if (filters.isSpecificAnd) {
	    //         if (watchlistedFilms_AND.some(watchlistedFilm => watchlistedFilm._id === film.id.toString())) return true;
	    //     } else {
	    //         if (watchlistedFilms_OR.some(watchlistedFilm => watchlistedFilm._id === film.id.toString())) return true;
	    //     }
	    // }

	    // function filterByWatchlist(film) {
	    //     let counter = 0;
	    //     users.forEach(user => {
	    //         user.films.watchlist.forEach(watchlistedFilm => {
	    //             if (watchlistedFilm._id === film.id.toString()) counter++;
	    //         });
	    //     });
	    //     return counter >= filters.watchlistFilter;
	    // }

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

	// const filterWatchlistedFilms = (films) => {
	//     return films.filter(film => !watchlistObject[film.id]);
	// };

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
	        // case "Watchlists: Most to Least" || "Watchlists: Least to Most":
	        //     break;
	        default:
	            break;
	    }
	    return sortedItems;
	};

	// const sortFilmsByWatchlist = (films) => {
	//     return films.sort((a, b) => {
	//         return watchlistObject[b.id].length - watchlistObject[a.id].length;
	//     });
	// };

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
		<Dialog open={showFilmSearch} onOpenChange={setShowFilmSearch}>
			{/* all child sections have px-4 */}
			<DialogContent
				hasClose={false}
				className="flex flex-col max-w-[1024px] w-full h-full lg:w-[75%] lg:h-[80%] text-secondary [&_section]:px-3 [&_section]:md:px-4"
			>
				{/* Top */}
				<section className="sticky top-0 flex flex-col w-full pt-3 md:pt-4 bg-opacity-10 custom-z-index gap-y-1 md:gap-y-3 text-primary-foreground lg:mx-auto">
					<div className="px-1 my-1 flex-between">
						<h3 className="subtitle">Pick A Film!</h3>
						<div onClick={() => setModalOpen(false)} className="cursor-pointer subtitle">
							<IoClose />
						</div>
					</div>

					<div className="flex flex-col">
						{/* Search & Filters */}
						<div className="flex gap-x-3 md:gap-x-4 tour-search-filter">
							<SearchBar
								searchTerm={searchTerm}
								handleSearchChange={(e) => setSearchTerm(e.target.value)}
							/>
							{/* Filters Modal defined at the bottom */}
							<button
								onClick={() => setFilterModalOpen(true)}
								className={`flex items-center big pr-2 pb-1 md:pb-2 transition-colors duration-300 ease-in-out hover:text-accent/70 ${isFilterApplied ? "text-accent/70" : "text-input"}`}
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
					</div>
				</section>

				{/* Result */}
				<section className="flex-col h-full overflow-y-auto flex-start custom-scrollbar">
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

					{/* Observer element for infinite scrolling */}
					{((hasNextPageUpcoming && !searchTerm) || (hasNextPageSearch && searchTerm)) ?
						(<div ref={ref} className="mt-10"><Loader height="h-[40p]" weight="h-[40px]" /></div>)
						// Loader for debouncedSearch or No results found
						: (isFetchingSearch ?
							<div className="h-full flex-center"><Loader height="h-[40px]" weight="h-[40px]" /></div>
							: (shouldShowNoResults && <div className="h-full flex-center big">😞 No results found</div>))
					}
				</section>

				{/* Next Step */}
				<section className="z-50 flex items-center justify-center w-full pt-1 pb-3 md:pb-4">
					<Button
						onClick={() => handleApply(formData)}
						type="submit"
						className="w-full border-none shadow-xl bg-accent text-primary"
					>
						Apply
					</Button>
				</section>
			</DialogContent>
		</Dialog>
	);
};

export default FilmSearch;
