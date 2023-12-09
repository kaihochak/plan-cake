import React, { useState, useEffect } from 'react';
import List from './List';
import dummyEventData from '../data/myEventsData'; 
import { BsArrowRight } from 'react-icons/bs';
import { BsFillPlusCircleFill } from "react-icons/bs";
//import { fetchEvents } from '../APIService';

const MyEvents = () => {
  const [myEventsData, setMyEventsData] = useState(dummyEventData);

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

  return (
    <section className="my-events">
      <header>
        <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl'>My Events</h2>
          <div className='flex items-center'>
            <p className='mr-2'>VIEW MORE</p>
            <BsArrowRight />
          </div>
        </div>
      </header>

      <List items={myEventsData} isFilterVisible={false} isParticipantsVisible={true} layout="vertical" max="3"/>

      <div className='flex justify-center'>
        <button className='text-m-2xl'>
          <BsFillPlusCircleFill />
        </button>
      </div>
    </section>
  );
};

export default MyEvents;



// import React from "react";
// import { HiOutlineArrowNarrowRight } from 'react-icons/hi';



// export default function MyEvents() {

//     // dummy data
//     // const data = [
//     //     item1 = {
//     //         title: "Birthday Party",
//     //         location: "Kai's House",
//     //         date: "2023.08.08",
//     //         time: "8:00 PM",
//     //         poster_path: "https://image.tmdb.org/t/p/w342/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
//     //     },
//     //     item2 = {
//     //         title: "Birthday Party",
//     //         location: "Kai's House",
//     //         date: "2023.08.08",
//     //         time: "8:00 PM",
//     //         poster_path: "https://image.tmdb.org/t/p/w342/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
//     //     },            
//     // ]

//     // handle click event for each event
//     const handleClick = (item) => {
//         console.log(item)
//     }

//     return (
//         <div className="mb-4 space-y-5">
//               <h2>Test</h2>

//             {/* Title Bar */}
//             <div className="flex flex-row 
//                             justify-between items-end 
//                             space-x-5 border-b py-4">
//                 <h2 className="font-base text-2xl">
//                     My Events
//                 </h2>
//                 {/* View More */}
//                 <button 
//                     className="flex flex-row 
//                                 space-x-2 pb-1
//                                 bg-transparent text-sm font-medium
//                                 justify-between items-center"
//                     onClick={() => {}}>
//                     <div>View More</div>
//                     <HiOutlineArrowNarrowRight />
//                 </button>
//             </div>

//             {/* Events */}
//             <div>

//                 <div className="flex flex-row gap-8 pb-8 space-x-md">
//                     {/* image */}
//                     <img
//                         src="https://image.tmdb.org/t/p/w342/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg"
//                         className="rounded-xl border-[1px]] w"
//                     />
//                     {/* Info */}
//                     <div className="flex flex-col">
//                         {/* Date & Time */}
//                         <div className="flex space-x-md ">
//                             <div>09 Oct 2023</div>
//                             <div>06:00PM</div>
//                         </div>
//                         {/* Title */}
//                         <div>Before Trilogy Bovie Night</div>

//                         <div className="flex justify-items-center space-x-md">
//                             {/* Location */}
//                             <div>Kai's House</div>
//                             {/* Participants */}
//                             <div className="flex">
//                                 <div>1</div>
//                                 <div>2</div>
//                                 <div>3</div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             {/* Create button */}
//             <div>
                
//             </div>

//         </div>
//     )
// }

