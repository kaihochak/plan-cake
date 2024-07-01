import React from 'react'
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ searchTerm, handleSearchChange, 
    categories, selectedCategory, handleCategoryChange, // these are for category filters 
    scrollToSection, // Function for scrolling to a specific section
}) => {
    return (
        <div className='w-full'>
            {/* search */}
            <div className={`relative inline-block w-full mb-2`}>
                <div className="absolute top-1/2 left-2.5 transform -translate-y-1/2 text-primary-foreground/50 mx-2 text-m-l">
                    <BiSearch />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex w-full h-12 pl-12 rounded-sm border-[1px] md:border-2 border-input bg-primary text-primary-foreground text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
};

export default SearchBar;