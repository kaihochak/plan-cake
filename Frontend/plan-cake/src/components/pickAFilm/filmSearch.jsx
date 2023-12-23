import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import filmData from "@/data/filmData";
import { IoIosSearch } from "react-icons/io";
import "@/styles/utility.css"
import { CiFilter } from "react-icons/ci";

// Search Display
const SearchDisplay = ({ filteredItems, selectedItems, setSelectedItems }) => {
    
    console.log("Rendering SearchDisplay, selectedItems:", selectedItems); 

    const handleSelect = (itemId) => {

        console.log("handleSelect: ", itemId);
        const newSelectedItems = selectedItems.includes(itemId)
            ? selectedItems.filter(id => id !== itemId)
            : [...selectedItems, itemId];

        setSelectedItems(newSelectedItems); // This now calls 'updateSelection' from FilmSearch
    };

    return (
        <div>
            {/* List of items */}
            <div className="grid grid-cols-2 gap-6">
                {filteredItems.slice(0, 10).map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-y-2 relative"
                        onClick={() => handleSelect(item.id)}
                    >
                        {/* Checkbox */}
                        <div className="absolute top-3 right-1">
                            <input
                                type="checkbox"
                                className="h-5 w-5 text-black z-40" // Adjust the size and color as needed
                                checked={selectedItems.includes(item.id)}
                                readOnly
                            />
                        </div>
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
const FilmSearch = ({ onSelectionChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(filmData);
    const [searchTerm, setSearchTerm] = useState("");
    {/* Use to identify input element as search bar */}
    const isSearchBar = true;

    // Call this function when an item's selection state changes
    const updateSelection = (newSelectedItems) => {
        console.log("updateSelection: ", newSelectedItems);
        setSelectedItems(newSelectedItems); // Update the selected items
        onSelectionChange(newSelectedItems); // Notify the caller of the change
    };

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
            <div className="flex gap-x-4">
                <div className="relative inline-block w-full my-6">
                    <div className="absolute top-1/2 left-2.5 transform -translate-y-1/2 text-primary-foreground mx-2 text-m-l">
                        <IoIosSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex h-14 w-full pl-12 border-2 border-input bg-primary text-primary-foreground text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Filter Button */}
                <button className="flex items-center text-m-l mr-3 text-primary-foreground">
                    <CiFilter />
                </button>
            </div>

            {/* <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                isSearchBar={isSearchBar}
            /> */}
            {/* Result */}
            <SearchDisplay
                filteredItems={filteredItems} // Pass the filtered items to the display
                selectedItems={selectedItems} // Pass the selected items to the display
                setSelectedItems={updateSelection} // Pass the update function
            />
        </div>
    );
};

export default FilmSearch;
