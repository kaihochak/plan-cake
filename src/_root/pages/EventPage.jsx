import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import DummyEventData from '@/data/DummyEventData'
import PickATime from '@/components/filmPage/PickATime'
import FilmPoll from '@/components/filmPage/FilmPoll'
import GuestList from '@/components/filmPage/GuestList'
import Threads from '@/components/filmPage/Threads'
import TimeConvertor from '../../components/utility/TimeConvertor'

const EventPage = () => {
  const [event, setEvent] = useState(null);

  // Get the event id from the URL
  const { id } = useParams();

  // Get the event from the database
  useEffect(() => {
    // event data
    const event = DummyEventData.find(event => event._id.toString() === id);
    console.log('Event ID:', id);
    if (!event)
      return console.log('Event not found');
    else {
      console.log('Event found:', event);
      setEvent(event);
    }
  }, []);

  const EventInfo = () => {
    return (
      <div className='inset-0 w-full mb-4 md:mb-0'>
        {/* imageURL & title*/}
        <div className='event-img-container'>
          <img src={event?.imageURL} alt={event?.title} className='event-img' />
          {/* fade mask */}
          <div className='event-img-mask'></div>
        </div>

        {/* Info */}
        <div className='relative flex top-14 md:-top-52 md:mb-[-150px]'>
          {/* Poster */}
          <div className='hidden md:flex justify-start'>
            <img src={event?.imageURL} alt={event?.title} className='min-w-[200px] md:min-w-[250px]' />
          </div>          
          {/* Details */}
          <div className='flex flex-col justify-start gap-4 md:gap-y-2 '>
            {/* Event Name */}
            <p className='text-m-xl md:text-[30px] font-bold'>{event?.title}</p>
            {/* Date & Time */}
            <div className='flex justify-start flex-row'>
              <div>
                <p className="text-m-m text-border md:text-[30px]">Date & Time</p>
                <p className="text-m-m md:text-[30px]"><TimeConvertor confirmedDateTime={event?.confirmedDateTime} /></p>
              </div>
              <PickATime />
            </div>
            {/* Location */}
            <div>
                <p className="text-m-m text-border md:text-[30px]">Location</p>
                <p className="text-m-m md:text-[30px]">{event?.location}</p>
            </div>
            {/* Desc */}
            <div>
              <p className="text-m-m text-border md:text-[30px]">Describtion</p>
              <p className="text-m-m md:text-[30px]">{event?.description}</p>
            </div>
            {/* Guests */}
            <div>
              <p className="text-m-m text-border md:text-[30px]">Guests</p>
              <GuestList />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='event-container justify-between p-4 pb-20'>
      <div className='event-page-inner'>
        {/* Event Info */}
        {!event ?
          <div className='flex flex-col gap-2'>
            <Skeleton className="w-[250px] h-[400px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
          </div> : <EventInfo />
        }

        {/* Film Poll */}
        <FilmPoll/>

        {/* Threads */}
        <Threads />

      </div>
    </div>

  )
}

export default EventPage