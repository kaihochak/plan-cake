import React from 'react'
import MyEvents from '@/components/shared/MyEvents'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Profile = () => {
  return (
    <section className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-12'>

        {/* Profile Info */}
        <div className='flex gap-3 items-center'>
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">User Name</p>
            <p className="small-regular text-light-3">@username</p>
          </div>
        </div>


        <Tabs defaultValue="myEvents">
          <TabsList className="flex mx-auto mb-10 w-[800px] h-[70px]">
            <TabsTrigger value="myEvents">myEvents</TabsTrigger>
            <TabsTrigger value="watchlist">watchlist</TabsTrigger>
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
