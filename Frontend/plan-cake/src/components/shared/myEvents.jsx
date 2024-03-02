import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List from './List';
import dumMyEventData from '@/data/MyEventsData';
import { BsArrowRight } from 'react-icons/bs';

const MyEvents = ({ isFilterVisible, hasViewMore, hasButton, max}) => {
  const [MyEventsData, setMyEventsData] = useState(dumMyEventData);
  const navigate = useNavigate(); 

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
      <div>
        <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl'>My Events</h2>
          { hasViewMore &&
            <div className='flex items-center'>
              <p className='mr-2'>VIEW MORE</p>
              <BsArrowRight />
            </div>
          }          
        </div>
      </div>

      <List 
        items={MyEventsData}
        isFilterVisible={isFilterVisible}
        isParticipantsVisible={true}
        mobileLayout="vertical"
        max={max}
        hasButton={hasButton}
      />
    </section>
  );
};

export default MyEvents;
