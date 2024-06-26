import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import DummyEventData from '@/data/DummyEventData'
import PickATime from '@/components/event/PickATime'
import FilmPoll from '@/components/event/FilmPoll'
import GuestList from '@/components/event/GuestList'
import CommentSection from '@/components/event/CommentSection'
import TimeConvertor from '../../components/utility/TimeConvertor'

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams(); // Get the event id from the URL

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
        <div className='relative flex top-14 md:-top-52 md:mb-[-150px] md:gap-10 md:flex-start'>
          {/* Poster */}
          <div className='justify-start hidden md:flex'>
            <img src={event?.imageURL} alt={event?.title} className='min-w-[200px] md:min-w-[250px]' />
          </div>          
          {/* Details */}
          <div className='flex flex-col justify-start w-full gap-4 md:gap-y-4 '>
            {/* Event Name */}
            <p className='text-m-xl md:text-[35px] font-bold'>{event?.title}</p>
            {/* Date & Time */}
            <div className='flex-row flex-between md:gap-10'>
              <div>
                <p className="text-m-m text-border md:text-[20px]">Date & Time</p>
                <p className="text-m-m md:text-[20px]"><TimeConvertor confirmedDateTime={event?.confirmedDateTime} /></p>
              </div>
              <PickATime />
            </div>
            {/* Location */}
            <div>
                <p className="text-m-m text-border md:text-[20px]">Location</p>
                <p className="text-m-m md:text-[20px]">{event?.location}</p>
            </div>
            {/* Desc */}
            <div>
              <p className="text-m-m text-border md:text-[20px]">Describtion</p>
              <p className="text-m-m md:text-[20px]">{event?.description}</p>
            </div>
            {/* Guests */}
            <GuestList />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='justify-between p-4 pb-20 event-container'>
      <div className='event-page-inner'>
        {/* Event Info */}
        {!event ?
          <div className='flex flex-col gap-2'>
            <Skeleton className="w-[250px] h-[400px] rounded-sm" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm" />
          </div> : <EventInfo />
        }

        {/* Film Poll */}
        <FilmPoll/>

        {/* CommentSection */}
        <CommentSection />

      </div>
    </div>

  )
}

export default EventPage