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
          <div className='flex flex-col gap-y-4 p-4'>
            <div className='flex-center'>
              <div className='h3-bold'>Hi! I'm</div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className='hover:border-0 hover:underline w-auto p-2'>
                    <div className='h3-bold text-black'>@jacobchak.</div>
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
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div className='h3-bold'>🕵🏻</div>
            </div>
            <div className='p2-regular text-center leading-relaxed'>
              Thank you so much for visiting! <br></br>
              I am currently in the process of building this site but feel free to browse around and let me know if you have any feedback or suggestions! 🚀
            </div>
            <Button asChild variant="link" className='hover:border-0 hover:underline w-auto p-2 mx-auto'>
              <Link to='https://jacobchak.com'>
                <div className='h3-bold'>Learn more about me</div>
                <TbExternalLink className='m-2 w-4 h-4 md:w-6 md:h-6'/>
              </Link>
            </Button>
            <Button onClick={close} variant="accent" className='mx-auto w-[150px] p-2 hover:accent/50'>
              <div className='h4-bold'>Browse around</div>
            </Button>

          </div>
        </Modal>

        <div className='home-posts'>
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
