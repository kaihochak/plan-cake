import React from 'react'
import MyEvents from '@/components/shared/MyEvents'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VscLocation } from "react-icons/vsc";


const Profile = () => {
  return (
    <section className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-12'>

        {/* Profile Info */}
        <div className='flex justify-between items-center lg:justify-evenly'>
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="h-20 w-20 rounded-full"
          />
          
          <div className="flex flex-col">
            <p className="body-bold">User Name</p>
            <p className="small-regular text-light-3 text-border">@username</p>
            <div className='flex flex-row gap-1 text-border'>
              <VscLocation />
              <p className="small-regular text-light-3">Location</p>
            </div>
          </div>

          <div className='flex flex-row gap-5 '>
            <div>
              <p className='tiny-medium text-light-3 text-border'>Followings</p>
              <p className='body-bold'>15</p>
            </div>
            <div>
              <p className='tiny-medium text-light-3 text-border'>Followers</p>
              <p className='body-bold'>15</p>
            </div>
          </div>
        </div>


        <Tabs defaultValue="myEvents">
          <TabsList className="flex mx-auto mb-10 w-auto h-[40px] justify-evenly">
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
