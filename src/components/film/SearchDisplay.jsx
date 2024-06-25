import React, { useState } from "react";
import FilmCard from "@/components/film/FilmCard";

const SearchDisplay = ({ filteredResults, selectedFilms, setSelectedFilms, watchlistObject, guests, max, protectedFilms }) => {

	if (max == null) max = 100;

	// Convert protectedFilms array to a Set for fast lookup, take the id of each film
	const protectedFilmsSet = new Set(protectedFilms.map(film => film.id));

	return (
		<div>
			{filteredResults?.length > 0 ? (
				<div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-10 sm:grid-cols-3 lg:grid-cols-4">
					{filteredResults.slice(0, max).map((item) => {
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
			) : (
				<div className="mt-4 text-center text-m-l">No results found...</div>
			)}
		</div>
	);
};

export default SearchDisplay;