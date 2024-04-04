import React, { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from "react-router-dom";
import { fallbackMoviePoster, image342 } from "@/lib/tmdb/config";

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
		item?.original_title?.toLowerCase().includes(filter.toLowerCase())
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

	return (
		<div className="py-2">
			<div >
				{/* optional */}
				<CategoryFilter />

				{/* FilmCollection of items */}
				<div className="gap-4 xl:gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
					{/* each item */}
					{filteredItems.slice(0, max).map((item, index) => (
						<Link to={`/film/${item?.id}`} key={index} >
							<div
								className="flex flex-col justify-start"
							>
								{/* image */}
								<div className="aspect-w-1 aspect-h-[1.47]">
									<img
										src={item?.poster_path ? image342(item.poster_path) : fallbackMoviePoster}
										alt={item?.original_title}
										className="object-cover object-center rounded-xl"
									/>
								</div>
								{/* Info */}
								<div className="flex justify-between pt-4 gap-y-1 xl:gap-y-3">
									{/* Title */}
									<h3 className="text-md xl:text-xl h-20">
										{item.original_title.length > 30 ? item.title.substring(0, 30) + '...' : item.original_title}
									</h3>
									{/* Rating */}
									<div className="flex items-center gap-x-1">
										<p>⭐️</p>
										<p>{item?.vote_average}</p> 
										{/* use imdb rating for now */}
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default FilmCollection;
