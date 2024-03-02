import React from 'react'
import SearchBar from '@/components/utility/SearchBar'
import WhatsNearby from '@/components/shared/WhatsNearby'

const Explore = () => {
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Explore Posts</h2>
        <SearchBar />
      </div>

      {/* Filter Tags */}
      <div>
        Filters
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        {/* What's Nearby Section */}
        <WhatsNearby
          isFilterVisible={true}
          hasViewMore={false}
          hasButton={false}
          max="10"
        />
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">

      </div>

    </div>
  )
}

export default Explore
