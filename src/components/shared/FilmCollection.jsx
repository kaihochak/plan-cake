import React, { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from "react-router-dom";
import { fallbackMoviePoster, image342 } from "@/lib/tmdb/config";
import FilmCard from "@/components/film/FilmCard";

const FilmCollection = ({
	items,
	isFilterVisible,
	max,
	maxMobile,
}) => {
	const [filter, setFilter] = useState("");
	const bp_768 = useMediaQuery('(min-width:768px)');

	if (max === "0") { max = items.length; };
	if (maxMobile === "0") { maxMobile = items.length; };
	if (!bp_768) { max = maxMobile; }

	// Handle filter change
	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	// Filter items based on filter state
	const filteredItems = items.filter((item) =>
		item?.title?.toLowerCase().includes(filter.toLowerCase())
	);

	// Category Filter
	const CategoryFilter = () => {
		if (isFilterVisible) {
			return (
				<div>
					<input
						className="w-full p-2 mb-4 rounded-md"
						type="text"
						placeholder="Filter events..."
						value={filter}
						onChange={handleFilterChange}
					/>
				</div>
			);
		}
	}

	console.log("FilmCollection items: ", items);

	return (
		<div className="py-2">
			<div >
				{/* optional */}
				<CategoryFilter />

				{/* FilmCollection of items */}
				<div className="grid grid-cols-2 gap-4 xl:gap-6 sm:grid-cols-3 md:grid-cols-4">
					{/* each item */}
					{filteredItems.slice(0, max).map((item, index) => (
						<div key={index}>
							<FilmCard item={item}/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FilmCollection;
