import React, { useState } from "react";
import FilmCard from "@/components/film/FilmCard";

const SearchDisplay = ({ filteredResults, selectedFilms, setSelectedFilms, watchlistObject, guests, max, protectedFilms }) => {

	if (max == null) max = 100;

	// Convert protectedFilms array to a Set for fast lookup, take the id of each film
	const protectedFilmsSet = new Set(protectedFilms.map(film => film.id));

	return (
		<div className="grid grid-cols-3 gap-3 md:gap-4 sm:grid-cols-4 lg:grid-cols-6 tour-apply">
			{filteredResults && filteredResults.slice(0, max).map((item) => {
				const isProtected = protectedFilmsSet.has(item.id); // Check if the current item is protected
				return (
					<div key={item.id}>
						<FilmCard
							item={item}
							selectedFilms={selectedFilms}
							setSelectedFilms={setSelectedFilms}
							watchlistObject={watchlistObject}
							guests={guests}
							isProtected={isProtected}
						/>
					</div>
				)
			})}
		</div>
	);
};

export default SearchDisplay;