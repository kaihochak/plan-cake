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
        <div className='relative flex gap-x-8 -top-30 md:-top-52 md:mb-[-150px]'>
          {/* Poster */}
          <div className='hidden md:flex justify-start'>
            <img src={event?.imageURL} alt={event?.title} className='min-w-[200px] md:min-w-[250px]' />
          </div>
          {/* Date & Time */}
          <div className="flex mx-auto">
            <div className='flex flex-col justify-center gap-y-1 md:gap-y-2 '>
              {/* Date & Time */}
              <div>
                <h1 className="text-m-l md:text-[30px] md:my-4 my-2 font-bold ">
                  Date & Time
                  <TimeConvertor confirmedDateTime={event?.confirmedDateTime} />
                </h1>
                <PickATime />
              </div>
              {/* Location */}
              <p className='text-m-m md:text-[15px]'>{event?.releasedYear} | {event?.duration} | {event?.genre}</p>
              <p className='text-m-m md:text-[15px]'>{event?.description}</p>
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

        {/* Guests */}
        <GuestList />

        {/* Film Poll */}
        <FilmPoll/>

        {/* Threads */}
        <Threads />

      </div>
    </div>

  )
}

export default EventPage