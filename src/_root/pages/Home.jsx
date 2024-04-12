// Home.jsx
import React from 'react';
import MostWatchlisted from '@/components/shared/MostWatchlisted';
import MyEvents from '@/components/shared/MyEvents';
import WhatsNearby from '@/components/shared/WhatsNearby';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { TbExternalLink } from "react-icons/tb";

const Home = () => {
  const [opened, { open, close }] = useDisclosure(true);


  return (
    <div className='flex flex-1'>
      <section className='home-container'>

        {/* Kai's introduction */}
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          size="lg"
          transitionProps={{ transition: 'fade', duration: 200 }}
        >
          <div className='flex flex-col p-4 gap-y-4'>
            <div className='flex-col flex-center'>
              <div className='h3-bold'>Hi! We're </div>

              {/* Names */}
              <div className='flex-center'>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className='w-auto p-2 hover:border-0 hover:underline'>
                      <div className='p-0 text-black h3-bold'>@jacobchak</div>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="/assets/avatars/profile.jpg" alt="Jacob Chak" className='object-cover' />
                        <AvatarFallback>JC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="p7-semibold">@jacobchak</h4>
                        <p className="p8-regular">
                          A business analyst / developer, currently looking for professional mentorship.
                        </p>
                        <Button asChild variant="link" className='w-auto p-0 mx-auto hover:border-0 hover:underline '>
                          <Link to='https://jacobchak.com'>
                            <div className='p7-semibold'>Learn more about me</div>
                            <TbExternalLink className='w-4 h-4 md:w-6 md:h-6' />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <div className='h3-bold'>🧑🏻‍🌾</div>
              </div>

              <div className='text-black h3-bold'>&</div>
              <div className='flex-center'>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className='w-auto p-2 hover:border-0 hover:underline'>
                      <div className='p-0 text-black h3-bold'>@joannachow</div>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="/assets/avatars/profile_jchow.jpg" alt="Joanna Chow" className='object-cover' />
                        <AvatarFallback>JC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="p7-semibold">@joannachow</h4>
                        <p className="p8-regular">
                          Enthusiastic and fast-learning IT Applications Analyst with hands-on experience in programming, IT project management, development of documentation and managing business applications.
                        </p>
                        <Button asChild variant="link" className='w-auto p-0 mx-auto hover:border-0 hover:underline '>
                          <Link to='https://www.joanna-chow.com/'>
                            <div className='p7-semibold'>Learn more about me</div>
                            <TbExternalLink className='w-4 h-4 md:w-6 md:h-6' />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <div className='h3-bold'>🕵🏻</div>
              </div>

            </div>
            <div className='leading-relaxed text-center p2-regular'>
              Thank you so much for visiting! <br></br>
              We are currently in the process of building this site but feel free to browse around and let us know if you have any feedback or suggestions! 🚀
            </div>

            <Button onClick={close} variant="accent" className='mx-auto w-[150px] p-2 hover:accent/50'>
              <div className='h4-bold'>Browse around</div>
            </Button>

          </div>
        </Modal>

        <div className='mt-4 home-posts'>
          {/* Most Watchlisted Section */}
          <MostWatchlisted />

          {/* My Events Section */}
          <MyEvents
            hasTitle={true}
            isFilterVisible={false}
            hasViewMore={true}
            hasButton={true}
            max="3"
            maxMobile="3"
          />
          {/* What's Nearby Section */}
          <WhatsNearby
            hasTitle={true}
            isFilterVisible={false}
            hasViewMore={false}
            hasButton={false}
            max="4"
            maxMobile="4"
          />
          {/* Gap */}
          <div className="h-8 md:h-0"></div>
        </div>
      </section>

    </div>
  );
};

export default Home;
