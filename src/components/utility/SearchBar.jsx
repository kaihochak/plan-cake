import React from 'react'
import { IoIosSearch } from 'react-icons/io'

const SearchBar = ({ searchTerm, handleSearchChange, 
    categories, selectedCategory, handleCategoryChange, // these are for category filters 
    scrollToSection, // Function for scrolling to a specific section
}) => {
    return (
        <div className='w-full'>
            {/* search */}
            <div className={`relative inline-block w-full mb-2`}>
                <div className="absolute top-1/2 left-2.5 transform -translate-y-1/2 text-primary-foreground mx-2 text-m-l">
                    <IoIosSearch />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex h-12 w-full pl-12 border-2 border-input bg-primary-dark rounded-sm text-primary-foreground text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
};

export default SearchBar;