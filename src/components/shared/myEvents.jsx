import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import EventCollection from './EventCollection';
import dumMyEventData from '@/data/MyEventsData';
import { BsArrowRight } from 'react-icons/bs';
import { useUserContext } from "@/context/AuthContext";
import { useGetUserEvents } from '@/lib/react-query/queries';

const MyEvents = ({ hasTitle, isFilterVisible, hasViewMore, hasButton, max}) => {

  const [MyEventsData, setMyEventsData] = useState(dumMyEventData);
  const navigate = useNavigate(); 
  // const { id } = useParams();
  const { user } = useUserContext();

  // console.log('MyEvents id:', id);

  // const { data: event, isPending: isEventLoading } = useGetEvent(id);
  const { data: userEvents, isPending: isUserEventsLoading } = useGetUserEvents(user.id);

  // Event handler for navigating to the CreateEvent page
  const navigateToCreateEvent = () => {
    console.log('Navigating to CreateEvent page');
    navigate('/create-event');
  };

  return (
    <section className='w-full'>
      {/* Title */}
      { hasTitle && 
        <div>
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>My Events</h2>
            { hasViewMore &&
                <NavLink 
                  to={`/profile/${user.id}`} 
                  className='flex items-center'
                >
                  <div className='flex items-center'>
                      <p className='mr-2 sm:text-m-l'>VIEW MORE</p>
                      <BsArrowRight />
                  </div>
                </NavLink>
            }          
          </div>
        </div>
      }

      { isUserEventsLoading ? 
        <p>Loading...</p> : 
        // if there are no events
        userEvents.length === 0 ? 
          <p>No events found</p> : 
          console.log('userEvents:', userEvents.documents) 

          
      }

    
      <EventCollection 
        items={MyEventsData}
        isFilterVisible={isFilterVisible}
        isParticipantsVisible={true}
        mobileLayout="vertical"
        desktopLayout="tall"
        max={max}
        hasButton={hasButton}
        buttonHandler={navigateToCreateEvent}
      />
    </section>
  );
};

export default MyEvents;
