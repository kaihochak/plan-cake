import React from 'react'
import { defaultFilters, defaultSortBy } from '../../constants';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

const FilmFiltersDisplay = ({ openFilterModal, isFilterApplied, setIsFilterApplied, sortBy, setSortBy, filters, setFilters }) => {

	let separator = filters.isSpecificAnd ? " & " : ", ";

	const FilterButton = ({ type }) => (
		<Button variant="filter" onClick={() => openFilterModal(true)}>
			<p className="pretitle">{type}</p>
		</Button>
	)

	return (
		<div className="flex flex-wrap justify-start gap-2">
			{sortBy !== defaultSortBy && <FilterButton type={sortBy} />}
			{/* {filters.watchlistFilter !== defaultFilters.watchlistFilter && <Button type={`Watchlists: ≥ ${filters.watchlistFilter}`} />} */}
			{/* {filters.watchlistFilter !== defaultFilters.watchlistFilter && <FilterButton type={filters.specificWatchlistFilter.map(item => item.name).join(separator)} />} */}
			{filters.genreFilter.length !== defaultFilters.genreFilter.length && <FilterButton type={filters.genreFilter.map(item => item.name).join(", ")} />}
			{(filters.yearFilter[0] !== defaultFilters.yearFilter[0] || filters.yearFilter[1] !== defaultFilters.yearFilter[1]) && <FilterButton type={`${filters.yearFilter[0]} - ${filters.yearFilter[1]}`} />}
			{filters.ratingFilter !== defaultFilters.ratingFilter && <FilterButton type={`≥ ${filters.ratingFilter} ⭐`} />}
			{isFilterApplied && (
				<Button variant="filter" size="icon" className="border-none" onClick={() => {
					setSortBy(defaultSortBy);
					setFilters({
						watchlistFilter: defaultFilters.watchlistFilter,
						specificWatchlistFilter: defaultFilters.specificWatchlistFilter,
						genreFilter: defaultFilters.genreFilter,
						yearFilter: defaultFilters.yearFilter,
						ratingFilter: defaultFilters.ratingFilter
					});
					setIsFilterApplied(false);
				}}>
					<IoClose />
				</Button>
			)}
		</div>
	)
}

export default FilmFiltersDisplay