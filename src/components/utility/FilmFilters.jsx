import React, { useEffect } from 'react'
import { cn } from "@/lib/utils"
import { CiFilter } from 'react-icons/ci'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import Filters from './Filters';

const FilmFilters = ({
    filmData, isFilterApplied, users, filteredResults, setFilteredResults,
    sortBy, setSortBy, filters, setFilters
}) => {
    const [opened, { open, close }] = useDisclosure(false);


    // Filter the film data based on the search term & filters
    const applyFilters = (filmData) => {
        return filmData.filter(film => {




        })
        //         // && (filters.watchlistFilter === 0 || (item.watchlists.length >= filters.watchlistFilter))
        //         // && (filters.specificWatchlistFilter.length === 0 || (Array.isArray(item.watchlists) && item.watchlists.some(user => filters.specificWatchlistFilter.includes(user))))
        //         // && (filters.genreFilter.length === 0 || (Array.isArray(item.genres) && item.genres.some(genre => filters.genreFilter.includes(genre))))
        //         // && (filters.yearFilter[0] <= item.year && item.year <= filters.yearFilter[1])
        //         // && (filters.ratingFilter === 0 || item.rating >= filters.ratingFilter)
        // });
    };


    // Sort the film data based on the selected sort option
    const applySort = (results) => {
        let sortedItems = results;
        console.log("sortedItems", sortedItems);
        switch (sortBy) {
            // case "Watchlists: Most to Least":
            //     sortedItems = sortedItems.sort((a, b) => b.watchlists.length - a.watchlists.length);
            //     break;
            // case "Watchlists: Least to Most":
            //     sortedItems = sortedItems.sort((a, b) => a.watchlists.length - b.watchlists.length);
            //     break;
            // case "Rating: High to Low":
            //     sortedItems = sortedItems.sort((a, b) => b.rating - a.rating);
            //     break;
            // case "Rating: Low to High":
            //     sortedItems = sortedItems.sort((a, b) => a.rating - b.rating);
            //     break;
            // case "Year: Newest to Oldest":
            //     sortedItems = sortedItems.sort((a, b) => b.year - a.year);
            //     break;
            // case "Year: Oldest to Newest":
            //     sortedItems = sortedItems.sort((a, b) => a.year - b.year);
            //     break;
            default:
                break;
        }
        return sortedItems;
    }

    // Filter & sort the film data based on the current state
    useEffect(() => {
        console.log("filmData", filmData);
        const filteredResults = applyFilters(filmData); // Apply filters based on the current state
        const sortedResults = applySort(filteredResults); // Then, sort those results before returning them
        console.log("filteredResults", filteredResults);
        console.log("sortedResults", sortedResults);
        setFilteredResults(sortedResults);
    }, [filmData, sortBy, filters]);

    return (
        <div>
            <Modal opened={opened} onClose={close} centered>
                <Filters filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} closeModal={close} users={users} />   
            </Modal>

            <button onClick={open}
                className={cn("flex items-center text-[30px] mr-2 mt-2 text-primary-foreground/60",
                    { "text-accent/70": isFilterApplied })}>
                <CiFilter />
            </button>
        </div>
    )
}

export default FilmFilters