import React from 'react'
import { defaultFilters, defaultSortBy } from '../../constants';
import { IoMdCloseCircleOutline } from "react-icons/io";

const FilmFiltersDisplay = ({openFilterModal, isFilterApplied, setIsFilterApplied, sortBy, setSortBy, filters, setFilters}) => {

    let separator = filters.isSpecificAnd ? " & " : ", ";

    return (
        <div className="flex flex-wrap gap-2 justify-start mt-1 mb-4">
            {sortBy !== defaultSortBy && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{sortBy}</p>
                </button>
            )}
            {filters.watchlistFilter !== defaultFilters.watchlistFilter && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">Watchlists: ≥ {filters.watchlistFilter}</p>
                </button>
            )}
            {filters.specificWatchlistFilter.length !== defaultFilters.specificWatchlistFilter.length && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{filters.specificWatchlistFilter.map(item => item.name).join(separator)}</p>
                </button>
            )}
            {filters.genreFilter.length !== defaultFilters.genreFilter.length && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{filters.genreFilter.map(item => item.name).join(", ")}</p>
                </button>
            )} 
            {(filters.yearFilter[0] !== defaultFilters.yearFilter[0] || filters.yearFilter[1] !== defaultFilters.yearFilter[1]) && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{filters.yearFilter[0]} - {filters.yearFilter[1]}</p>
                </button>
            )}
            {filters.ratingFilter !== defaultFilters.ratingFilter && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">≥ {filters.ratingFilter} ⭐</p>
                </button>
            )}
            {isFilterApplied && (
                <button onClick={() => {
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
                    <IoMdCloseCircleOutline className="text-accent/50 text-xl" />
                </button>
            )}
        </div>
    )
}

export default FilmFiltersDisplay