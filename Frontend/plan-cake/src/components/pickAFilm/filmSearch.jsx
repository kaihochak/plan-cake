import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import filmData from "@/data/filmData";
import { IoIosSearch } from "react-icons/io";
import "@/styles/utility.css"

// Search Display
const SearchDisplay = ({ filteredItems }) => {
    return (
        <div>
            {/* List of items */}
            <div className="grid grid-cols-2 gap-6">
                {filteredItems.slice(0, 10).map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-y-2"
                    >
                        {/* image */}
                        <div className="w-[90%]">
                            {/* The image fills the square container */}

                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover object-center rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-start gap-y-1 pr-4">
                            {/* Date & Time */}
                            <div className="text-m-s flex gap-x-2">
                                <p>{item.date}</p>
                                <p>{item.time}</p>
                            </div>

                            <h3 className="text-m-l mb-2 h-12">
                                {item.title.length > 30
                                    ? item.title.substring(0, 30) + "..."
                                    : item.title}
                            </h3>

                            <div className="flex justify-between">

                                {/* watchlist */}
                                <div className="flex">
                                    {item.watchlist
                                        .slice(0, item.watchlist.length > 4 ? 3 : 4)
                                        .map((participant, index) => (
                                            <div
                                                className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center 
                            ${index > 0 ? "-ml-1" : ""} 
                            `}
                                                key={participant.id}
                                            >
                                                <img
                                                    className="min-w-full min-h-full object-cover"
                                                    src={participant.avatar}
                                                    alt={participant.name}
                                                />
                                            </div>
                                        ))}
                                    {/* plus sign + how many more people */}
                                    {item.watchlist.length > 4 && (
                                        <div>+{item.watchlist.length - 3}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Component
const FilmSearch = () => {
    const [filteredItems, setFilteredItems] = useState(filmData);
    const [searchTerm, setSearchTerm] = useState("");
    {/* Use to identify input element as search bar */}
    const isSearchBar = true;

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = filmData.filter(item => 
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
        <div>
            {/* Search Bar */}
            <div className="relative inline-block w-full my-6">
                <div className="absolute top-1/2 left-2.5 transform -translate-y-1/2 text-primary-foreground ml-2">
                    <IoIosSearch />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input flex h-14 w-full border-2 border-input bg-primary text-primary-foreground p-2 text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                />
            </div>

            {/* <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                isSearchBar={isSearchBar}
            /> */}
            {/* Result */}
            <SearchDisplay filteredItems={filteredItems} />
        </div>
    );
};

export default FilmSearch;
