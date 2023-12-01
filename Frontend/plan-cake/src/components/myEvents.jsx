import React from 'react';
import List from './List';
// You will need to import your data for my events or fetch it from an API
import myEventsData from '../data/myEventsData'; 

const MyEvents = () => {
  // Assuming myEventsData is an array of event objects
  return (
    <section className="my-events">
      <header>
        <h2>My Events</h2>
        {/* Other header elements */}
      </header>
      {/* Pass the necessary props to List */}
      <List 
        items={myEventsData} 
        isFilterVisible={false} 
        isParticipantsVisible={true} 
        layout="vertical" 
      />
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

