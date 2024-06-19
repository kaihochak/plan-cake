import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className='flex flex-col bg-[#f6f6f6] -mt-0.5' id="faq">
      
      {/* <div className='absolute top-0 left-0 w-full landing-container reverse-bubble'></div> */}
      <div className='container lg:w-[70%] flex flex-col items-center justify-center w-full h-full pt-10 gap-y-6'>
        <p className='z-50 body-bold text-primary'>Frequently Asked Questions</p>
        <div className='mb-16 md:mb-12 md:w-[80%]'>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className='base-medium text-primary text-start'>How can I create and customize my academic profile?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
                To create your academic profile, sign up for an account and follow the  prompts to enter your personal and academic information. You can  customize your profile by adding a profile picture, a brief bio, your  research interests, publications, and any other relevant details. Navigate to the "Profile" section anytime to update and edit your  information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className='base-medium text-primary text-start'>How do I find and connect with potential collaborators?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
                Our platform features a powerful search and recommendation engine. You can use the search bar to find researchers based on keywords, interests, or specific fields of study. Additionally, our AI-powered recommendations will suggest potential collaborators based on your profile information and activity. Simply visit their profile and send a connection request or message to start a conversation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className='base-medium text-primary text-start'>What kind of academic resources can I share and access on the platform?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
                You can share and access a wide variety of academic resources, including research papers, presentations, datasets, and multimedia materials. To share a resource, go to the "Resources" section, click on "Add Resource," and follow the prompts to upload your file. You can browse and download resources shared by other users through the same section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className='base-medium text-primary text-start'>How can I participate in academic discussions and forums?</AccordionTrigger>
              <AccordionContent className='base-medium text-primary AccordionContent'>
                Our platform hosts several discussion forums on a range of academic topics. To participate, navigate to the "Forums" section, select a topic of interest, and join the conversation by posting your questions, insights, or responses. You can also create new discussion threads if you have a specific topic you’d like to discuss with the community.
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
