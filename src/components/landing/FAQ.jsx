import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className='landing-container reverse-bubble' id='faq'>
      <p className='body-bold text-primary z-10'>Frequently Asked Questions</p>
      <div className=' mb-24 md:mb-12'>
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger className='base-medium text-primary'>How can I create and customize my academic profile?</AccordionTrigger>
            <AccordionContent className='base-medium text-primary'>
              To create your academic profile, sign up for an account and follow the  prompts to enter your personal and academic information. You can  customize your profile by adding a profile picture, a brief bio, your  research interests, publications, and any other relevant details. Navigate to the "Profile" section anytime to update and edit your  information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className='base-medium text-primary'>How do I find and connect with potential collaborators?</AccordionTrigger>
            <AccordionContent className='base-medium text-primary'>
              Our platform features a powerful search and recommendation engine. You can use the search bar to find researchers based on keywords, interests, or specific fields of study. Additionally, our AI-powered recommendations will suggest potential collaborators based on your profile information and activity. Simply visit their profile and send a connection request or message to start a conversation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className='base-medium text-primary'>What kind of academic resources can I share and access on the platform?</AccordionTrigger>
            <AccordionContent className='base-medium text-primary'>
              You can share and access a wide variety of academic resources, including research papers, presentations, datasets, and multimedia materials. To share a resource, go to the "Resources" section, click on "Add Resource," and follow the prompts to upload your file. You can browse and download resources shared by other users through the same section.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className='base-medium text-primary'>How can I participate in academic discussions and forums?</AccordionTrigger>
            <AccordionContent className='base-medium text-primary'>
              Our platform hosts several discussion forums on a range of academic topics. To participate, navigate to the "Forums" section, select a topic of interest, and join the conversation by posting your questions, insights, or responses. You can also create new discussion threads if you have a specific topic you’d like to discuss with the community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default FAQ
