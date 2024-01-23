import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import filmData from "@/data/filmData";
import { IoIosSearch } from "react-icons/io";
import "@/styles/utility.css"
import { CiFilter } from "react-icons/ci";
import { set } from "date-fns";

// Search Display
const SearchDisplay = ({ filteredItems, selectedItems, setSelectedItems }) => {
    
    const handleSelect = (item) => {
        const itemId = item.id;
        const itemTitle = item.title;

        // Check if the item is already selected based on its id
        const isItemSelected = selectedItems.some(selectedItem => selectedItem.id === itemId);

        const newSelectedItems = isItemSelected
            ? selectedItems.filter(selectedItem => selectedItem.id !== itemId) // de-select
            : [...selectedItems, { id: itemId, title: itemTitle }]; // select

        setSelectedItems(newSelectedItems); 
    };

    return (
        <div>
            {/* List of items */}
            <div className="grid grid-cols-2 gap-6">
                {filteredItems.slice(0, 10).map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-y-2 relative"
                        onClick={() => handleSelect(item)}
                    >
                        {/* Checkbox */}
                        <div className="absolute top-3 right-3 mr-4 z-10">
                            <input
                                type="checkbox"
                                className="h-8 w-8 border-2 focus:ring-0"
                                checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                                readOnly
                            />
                        </div>

                        {/* image */}
                        <div className={`w-[90%] ${selectedItems.some(selectedItem => selectedItem.id === item.id) ? "selected-overlay" : ""}`}>
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
const FilmSearch = ({ formData: parentFormData, nextStep }) => {

    const [filteredItems, setFilteredItems] = useState(filmData);
    const [formData, setFormData] = useState(parentFormData);
    // const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNoSelectionError, setShowNoSelectionError] = useState(false); 

    // API call 

    const updateSelection = (newSelectedItems) => {

        setFormData(formData => ({
            ...formData,
            selectedItems: newSelectedItems
        }));
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = filmData.filter(item => 
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleNextStep = () => {
        if (formData.selectedItems.length === 0) {
            setShowNoSelectionError(true); // Show error message if no film is selected
            return;
        } else {
            setShowNoSelectionError(false); // Hide error message if films are selected
        }
        nextStep(formData); 
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

            {/* Result */}
            <SearchDisplay
                filteredItems={filteredItems} // Pass the filtered items to the display
                selectedItems={formData.selectedItems} // Pass the selected items to the display
                setSelectedItems={updateSelection} // Pass the update function
            />


            {/* Display error message if no film is selected */}
                        {showNoSelectionError && (
                <div className="text-destructive-foreground text-m-m pt-10">
                    Please select at least one film.
                </div>
            )}
            
            {/* Next Step */}
            <Button onClick={handleNextStep} type="submit" className="mt-10">
                Next
            </Button>
        </div>
    );
};

export default FilmSearch;
