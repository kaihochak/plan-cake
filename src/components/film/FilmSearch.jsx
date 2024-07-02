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
import { useGetUpcoming, useGetSearchResults, useGetDiscover } from "@/lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import Loader from '@/components/utility/Loader';
import useDebounce from "@/hooks/useDebounce";

// Define initial state
const initialFilterState = {
  isFilterApplied: false,
	filterModalOpen: false,
	genreFilter: defaultFilters.genreFilter,
	yearFilter: defaultFilters.yearFilter,
	ratingFilter: defaultFilters.ratingFilter,
	runtimeFilter: defaultFilters.runtimeFilter,
	includeAdult: false,
	includeVideo: false,
	sortBy: defaultSortBy,
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_GENRE_FILTER':
			return { ...state, genreFilter: action.payload };
		case 'SET_YEAR_FILTER':
			return { ...state, yearFilter: action.payload };
		case 'SET_RATING_FILTER':
			return { ...state, ratingFilter: action.payload };
		case 'SET_RUNTIME_FILTER':
			return { ...state, runtimeFilter: action.payload };
		case 'SET_INCLUDE_ADULT':
			return { ...state, includeAdult: action.payload };
		case 'SET_INCLUDE_VIDEO':
			return { ...state, includeVideo: action.payload };
		case 'SET_SORT_BY':
			return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};


/************************************************************************
 * FILM SEARCH COMPONENT
 ************************************************************************/

const FilmSearch = ({ showFilmSearch, setShowFilmSearch, selectedFilms, handleApply, protectedFilms, setModalOpen }) => {
	const [filterState, dispatch] = React.useReducer(reducer, initialFilterState);

	/************************************************************************
	 * UPCOMING
	 ************************************************************************/
	const { data: upcomingData, error: upcomingError, fetchNextPage: fetchNextPageUpcoming,
		hasNextPage: hasNextPageUpcoming, isFetching: isFetchingUpcoming,
		isFetchingNextPage: isFetchingNextPageUpcoming, status: statusUpcoming,
	} = useGetUpcoming();

	const { data: discoverData, error: discoverError, fetchNextPage: fetchNextPageDiscover,
		hasNextPage: hasNextPageDiscover, isFetching: isFetchingDiscover,
		isFetchingNextPage: isFetchingNextPageDiscover, status: statusDiscover,
	} = useGetDiscover({
		sort_by: "popularity.desc",
	});
	
	console.log("discoverData", discoverData);

	/************************************************************************
	 * SEARCH
	 ************************************************************************/

	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	// Query search results
	const { data: searchData, error: searchError, fetchNextPage: fetchNextPageSearch,
		hasNextPage: hasNextPageSearch, isFetching: isFetchingSearch,
		isFetchingNextPage: isFetchingNextPageSearch, status: statusSearch,
	} = useGetSearchResults(debouncedSearch);

	/************************************************************************
	 * INFINITE SCROLL
	 ************************************************************************/
	const { ref, inView } = useInView();
	
	// infinite scrolling
	useEffect(() => {
		if (inView) {
			// if (!searchTerm && hasNextPageUpcoming && !isFetchingNextPageUpcoming) fetchNextPageUpcoming();
			if (!debouncedSearch && hasNextPageDiscover && !isFetchingNextPageDiscover) fetchNextPageDiscover();
			else if (debouncedSearch && hasNextPageSearch && !isFetchingNextPageSearch) fetchNextPageSearch();
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

	// Filter and sort the films based on the selected filters
	useEffect(() => {
		if (debouncedSearch) {
			if (searchData) setFilteredResults(sortResults(filterResults(searchData.pages.flatMap(page => page.results))));
		} else {
			// if (upcomingData) setFilteredResults(sortResults(filterResults(upcomingData.pages.flatMap(page => page.results))));
			if (discoverData) setFilteredResults(sortResults(filterResults(discoverData.pages.flatMap(page => page.results))));
		}
		// }, [searchData, upcomingData, searchTerm, filters, sortBy]);
	}, [searchData, discoverData, debouncedSearch, filters, sortBy]);

	/************************************************************************
	 * FILTERS & SORTING
	 ************************************************************************/

	const filterResults = (filmData) => {
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
			default:
				break;
		}
		return sortedItems;
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
								className={`flex items-center big pr-1 pb-1 md:pb-2 transition-colors duration-300 ease-in-out hover:text-accent/70 ${isFilterApplied ? "text-accent/70" : "text-input"}`}
							>
								<BiFilterAlt />
							</button>
							<FilmFilters
								filmData={filmData}
								users={users}
								setIsFilterApplied={setIsFilterApplied}
								modalOpen={filterModalOpen}
								setModalOpen={setFilterModalOpen}
								sortBy={sortBy}
								setSortBy={setSortBy}
								filters={filters}
								setFilters={setFilters}
								setFilteredResults={setFilteredResults}
							/>
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
						filteredResults={filteredResults}
						selectedFilms={formData.selectedFilms}
						setSelectedFilms={(newSelectedFilms) => setFormData({ ...formData, selectedFilms: newSelectedFilms })}
						watchlistObject={watchlistObject}
						guests={users}
						protectedFilms={protectedFilms}
					/>

					{/* Observer element for infinite scrolling */}
					{((hasNextPageDiscover && !debouncedSearch) || (hasNextPageSearch && debouncedSearch)) ?
						(<div ref={ref} className="mt-10"><Loader height="h-[40p]" weight="h-[40px]" /></div>)
						// Loader for debouncedSearch or No results found
						: (isFetchingSearch ?
							<div className="h-full flex-center"><Loader height="h-[40px]" weight="h-[40px]" /></div>
							: (filteredResults.length === 0 && <div className="h-full flex-center big">😞 No results found</div>))
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
