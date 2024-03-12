import React from 'react';
import { GoLocation } from 'react-icons/go';
import filmData from '@/data/filmData';
import { TiSocialFacebookCircular } from "react-icons/ti";
import { RiWhatsappLine, RiInstagramLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";
import { Button } from '@/components/ui/Button';

const ConfirmedEvent = ({formData, goToEventPage}) => {
  const formattedDate = formData.date instanceof Date ? formData.date.toDateString() : '';
  const firstFilmID = formData.selectedFilms[0];
  const item = filmData.find(item => item.id === firstFilmID);

  return (
    <div>
      <h2 className="text-m-2xl mb-3">Event Created!</h2>

      {/* event image */}
      {formData.imageUrl &&
        <div className="flex flex-1 justify-center p-5 lg:p-10">
          <img src={formData.imageUrl} alt="image" className="file_uploader-img" />
        </div>
      }

      <div key={formData.id} className="flex justify-between space-x-4 py-4">
        {/* poster */}
        <div className="inset-0 w-[35%]">
          <div className="aspect-w-1 aspect-h-1" >
            <img
              src={item.image}
              alt={item.title}
              className="object-cover object-center rounded-xl"
            />
          </div>
        </div>

        {/* Info */}
        <div className="w-[65%] flex flex-col justify-start gap-y-2">
          {/* Date & Time */}
          <div className="flex gap-x-2">
            <p>{formattedDate}</p>
          </div>

          <h3 className="text-m-xl">
            {formData.title.length > 30 ? formData.title.substring(0, 30) + '...' : formData.title}
          </h3>

          <div className="flex justify-between">
            {/* Location */}
            <div className="flex items-center space-x-2">
              <GoLocation />
              <p>{formData.location}</p>
            </div>

            {/* Participants */}
            <div className="flex">
              {formData.guestList
                .slice(0, formData.guestList.length > 4 ? 3 : 4)
                .map((participant, index) => (
                  <div
                    className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center 
                    ${index > 0 ? "-ml-1" : ""}`}
                    key={participant.id}
                  >
                    <img
                      className="min-w-full min-h-full object-cover"
                      src={participant.avatar}
                      alt={participant.name}
                    />
                  </div>
                ))
              }
              {formData.guestList.length > 4 && (
                <div>+{formData.guestList.length - 3}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next */}
      <Button onClick={goToEventPage} type="submit" className="mt-10">
        Go to Event Page
      </Button>

      {/* Share */}
      <div className="flex flex-col justify-center items-center mt-8 text-m-m text-border">
        <p className=" text-primary-foreground">Invite Friends</p>
        <div className="flex justify-center items-center mt-3 gap-3">

          {/* Share on Facebook  */}
          <div className="bg-default rounded-full p-1 text-m-l text-primary-default">
            <a href="https://www.facebook.com/sharer/sharer.php?u=[URL_TO_SHARE]" target="_blank" rel="noopener noreferrer">
              <TiSocialFacebookCircular />
            </a>
          </div>

          {/* Share via Whatsapp */}
          <div className="bg-default rounded-full p-1 text-m-l text-primary-default">
            <a href="https://wa.me/?text=[URL_TO_SHARE]" data-action="share/whatsapp/share" target="_blank" rel="noopener noreferrer">
              <RiWhatsappLine />
            </a>
          </div>

          {/* Share link */}
          <div className="bg-default rounded-full p-1 text-m-l text-primary-default">
            <FaLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedEvent;
