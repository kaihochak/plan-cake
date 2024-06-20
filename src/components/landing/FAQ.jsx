import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className='flex flex-col bg-[#f6f6f6] -mt-0.5' id="faq">
      
      {/* <div className='absolute top-0 left-0 w-full landing-container reverse-bubble'></div> */}
      <div className='container lg:w-[70%] flex flex-col items-center justify-center w-full h-full py-10 gap-y-6'>
        <p className='z-50 body-bold text-primary'>Frequently Asked Questions</p>
        <div className='mb-16 md:mb-12 md:w-[80%]'>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className='base-medium text-primary text-start'>How exactly does Plancake simplify event planning?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
              Plancake allows users to create shared lists, add their favorite options, and vote on them. This makes organizing events like movie nights, book clubs, and concerts easy and fun. For example, the PickAFilm feature lets you and your friends add movies to a poll where everyone can vote. It displays the runtime, genres, and ratings, making it easy to choose and enjoy your movie night without the endless scrolling.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className='base-medium text-primary text-start'>How do I find and connect with people who share the same interest?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
              Plancake makes it easy to connect with like-minded people. With features like discovering local events, concerts, and galleries, you can find and join activities that interest you. Instead of aimlessly connecting with people on dating apps and finding no common ground, Plancake helps you meet those who share your tastes. For example, if you want to see a concert but none of your friends are interested, Gig Buddies will find you a friend to go with.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className='base-medium text-primary text-start'>Is Plancake suitable for all types of cultural events?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
              It depends. Currently, we are developing features for movie screenings, concerts, and book clubs. Feel free to let us know your suggestions, and we will explore adding more features.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className='base-medium text-primary text-start'>How is Plancake different from Letterboxd, Eventbrite, or Meetup?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
              Plancake combines the best of both worlds by offering information and functionality for event planning. Unlike Letterboxd, which focuses solely on movies, Plancake supports a variety of cultural events and helps organize them. Unlike Eventbrite, which is primarily for ticketed events, Plancake emphasizes community-building and shared decision-making for any type of social activity. Unlike Meetup, Plancake offers integrated voting and shared list features, making the planning process collaborative and fun.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>

      {/* bottom wave */}
      <div className='relative w-full mt-10 md:mt-36'>
        <div className="bottom-wave wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>

    </section>
  )
}

export default FAQ
