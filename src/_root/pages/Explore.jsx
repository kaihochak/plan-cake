import React, { useState } from 'react'
import SearchBar from '@/components/utility/SearchBar'
import EventCollection from '@/components/shared/EventCollection';

const Explore = () => {

  const [category, setCategory] = useState("all");

  const events = [
    {
      "EventID": "1",
      "OrganizerID": "1",
      "AdminID": ["1", "2"],
      "Type": "film",
      "Title": "Movie Night",
      "Description": "A night of fun and laughter",
      "Location": "Lekki",
      "DateTimeOptions": ["2022-12-01T20:00:00Z", "2022-12-02T20:00:00Z", "2022-12-03T20:00:00Z"],
      "Timezone": "WAT",
      "ConfirmedDateTime": "2022-12-01T20:00:00Z",
      "AvailabilityEnabled": true,
      "FilmPollEnabled": true,
      "AddFilmEnabled": true,
      "isPublic": true,
      "InvitedUsers": ["4", "5", "3"],
      "AttendingUsers": ["4", "5", "3"],
      "FilmsPool": ["1", "2", "3"],
      "ConfirmedFilms": ["1"],      
      "EventUrl": "https://www.eventbrite.com/e/afrobeat-festival-tickets-193286664407",
      "EventImg": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
      "Votes": [
        {
          "UserID": "1",
          "FilmID": "1",
          "Timestamp": "2022-12-01T20:00:00Z"
        },
        
      ],

    //   "InvitedUsers": ["Array of UserIDs invited to the event"],
    //   "AttendingUsers": ["Array of UserIDs of users attending"],
    //   "FilmsPool": ["Array of FilmIDs for movie screening events. Empty for music gigs"],
    //   "ConfirmedFilms": ["final selection"],
    //   "EventUrl": ["link to the event; optional"],
    //   "EventImg": ["event image"], 
    //   "Votes": [
    //     {
    //       "UserID": "Identifier of the user voting",
    //       "FilmID": "Identifier of the film voted for",
    //       "Timestamp": "When the vote was cast in ISO format"
    //     }
    //   ],
    //   "Ratings": [
    //     {
    //        "UserID": "Identifier of the user commenting",
    //        "Rating":, 
    //        "Review":,
    //      }
    //    ],   
    //   "Comments": [
    //     {
    //       "UserID": "Identifier of the user commenting",
    //       "CommentText": "Text of the comment",
    //       "Votes": {
    //         "Upvotes": "Number of upvotes",
    //         "Downvotes": "Number of downvotes"
    //       },
    //       "Timestamp": "When the comment was made in ISO format"
    //     }
    //   ]
    // }
    
    

  return (
    <div className="common-container">
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-24 lg:pt-0'>
        <SearchBar />

        {/* <EventCollection
        items={events}
        isFilterVisible={isFilterVisible}
        isParticipantsVisible={false}
        mobileLayout={"grid"}
        desktopLayout={"square"}
        max='8'
        hasButton={false}
      /> */}

      </div>
    </div>
  )
}

export default Explore


