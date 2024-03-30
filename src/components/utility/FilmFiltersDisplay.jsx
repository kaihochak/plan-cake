import React from 'react'
import { defaultFilters, defaultSortBy } from '../../constants';
import { IoMdCloseCircleOutline } from "react-icons/io";

const FilmFiltersDisplay = ({openFilterModal, isFilterApplied, sortBy, setSortBy, filters, setFilters}) => {
    return (
        <div className="flex flex-wrap gap-2 justify-start mt-1 mb-4">
            {sortBy !== defaultSortBy && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{sortBy}</p>
                </button>
            )}
            {filters.watchlistFilter > 0 && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">Watchlists: ≥ {watchlistFilter}</p>
                </button>
            )}
            {filters.specificWatchlistFilter.length > 0 && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{specificWatchlistFilter.join(" & ")}</p>
                </button>
            )}
            {filters.genreFilter.length > 0 && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{genreFilter.join(", ")}</p>
                </button>
            )}
            {(filters.yearFilter[0] !== defaultYearFilter[0] || yearFilter[1] !== defaultYearFilter[1]) && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{yearFilter[0]} - {yearFilter[1]}</p>
                </button>
            )}
            {filters.ratingFilter > 0 && (
                <button onClick={() => openFilterModal(true)}>
                    <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">≥ {ratingFilter}</p>
                </button>
            )}
            {isFilterApplied && (
                <button onClick={() => {
                    setSortBy(defaultSortBy);
                    setFilters(defaultFilters);
                }}>
                    <IoMdCloseCircleOutline className="text-accent/50 text-xl" />
                </button>
            )}
        </div>
    )
}

export default FilmFiltersDisplay