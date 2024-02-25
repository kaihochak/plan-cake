import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List from './List';
import dummyEventData from '../data/myEventsData';
import { BsArrowRight } from 'react-icons/bs';


const MyEvents = () => {
  const [myEventsData, setMyEventsData] = useState(dummyEventData);
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
    <section className='my-14'>
      <header>
        <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl'>My Events</h2>
          <div className='flex items-center'>
            <p className='mr-2'>VIEW MORE</p>
            <BsArrowRight />
          </div>
        </div>
      </header>

      <div
        className='flex flex-col lg:flex-row lg:space-x-4 lg:gap-4 lg:justify-start '
      >
        <List 
          items={myEventsData}
          isFilterVisible={false}
          isParticipantsVisible={true}
          mobileLayout="vertical"
          max="3"
          hasButton={true}
          buttonHandler={navigateToCreateEvent}
        />

        {/* <div className='flex justify-center'>
          <button className='text-m-2xl' onClick={navigateToCreateEvent}>
            <BsFillPlusCircleFill />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default MyEvents;
