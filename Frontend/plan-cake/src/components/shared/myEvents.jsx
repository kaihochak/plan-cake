import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import List from './List';
import dumMyEventData from '@/data/MyEventsData';
import { BsArrowRight } from 'react-icons/bs';
import { useUserContext } from "@/context/AuthContext";

const MyEvents = ({ hasTitle, isFilterVisible, hasViewMore, hasButton, max}) => {
  const [MyEventsData, setMyEventsData] = useState(dumMyEventData);
  const navigate = useNavigate(); 
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await fetchEvents();
        // setMyEventsData(data);
      } catch (error) {
        // Handle error, show an error message, etc.
      }
    };

    fetchData();
  }, []);

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

      <List 
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
