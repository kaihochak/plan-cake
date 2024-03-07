import React from 'react'
import MyEvents from '@/components/shared/MyEvents'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VscLocation } from "react-icons/vsc";


const Profile = () => {
  return (
    <section className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-12'>

        {/* Profile Info */}
        <div className='flex justify-between items-center sm:justify-center sm:gap-14'>
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="h-20 w-20 rounded-full"
          />
          
          <div className="flex flex-col gap-1">
            <p className="text-m-l md:text-m-xl">User Name</p>
            <p className="text-m-m text-light-3 text-border">@username</p>
            <div className='flex flex-row gap-1 text-border '>
              <VscLocation className='text-m-m' />
              <p className="text-m-s">Location</p>
            </div>
          </div>

          <div className='flex flex-row gap-5 '>
            <div>
              <p className='text-m-s text-border md:text-m-m'>Followings</p>
              <p className='text-m-m md:text-m-l'>15</p>
            </div>
            <div>
              <p className='text-m-s text-border md:text-m-m'>Followers</p>
              <p className='text-m-m md:text-m-l'>15</p>
            </div>
          </div>
        </div>


        <Tabs defaultValue="myEvents">
          <TabsList className="flex mx-auto mb-5 w-auto h-[40px] justify-evenly border-2 border-accent">
            <TabsTrigger value="myEvents" className='w-full'>My Events</TabsTrigger>
            <TabsTrigger value="watchlist" className='w-full'>Watchlist</TabsTrigger>
          </TabsList>

          {/* My Events Section */}
          <TabsContent value="myEvents">
            <MyEvents
              isFilterVisible={true}
              hasViewMore={false}
              hasButton={false}
              max="0"
            />
          </TabsContent>

          {/* Watchlist */}
          <TabsContent value="watchlist">
            Watchlist
          </TabsContent>
        </Tabs>




      </div>
    </section>
  )
}

export default Profile;
