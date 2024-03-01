import React from 'react';
import { GoLocation } from 'react-icons/go';
import filmData from '@/data/filmData';
import { TiSocialFacebookCircular } from "react-icons/ti";
import { RiWhatsappLine, RiInstagramLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";

const ConfirmedEvent = ({
  formData,
  isParticipantsVisible,
  layout,
}) => {
  const formattedDate = formData.eventDate instanceof Date ? formData.eventDate.toDateString() : '';
  const firstFilmID = formData.selectedItems[0];
  const item = filmData.find(item => item.id === firstFilmID);

  return (
    <div>
      <div key={formData.id} className={layout === "grid" ? "flex flex-col gap-y-2" : "flex justify-between space-x-4 py-4" }>
      {/* image */}
      <div className={layout === "grid" ? "w-[90%]" : "inset-0 w-[35%]"}>
        <div className="aspect-w-1 aspect-h-1"  key={0}>
            <img
              src={item.image}
              alt={item.title}
              className="object-cover object-center rounded-xl"
            />
        </div>
      </div>

      {/* Info */}
      <div className={layout === "grid" ? "flex flex-col justify-start gap-y-1 pr-4" : "w-[65%] flex flex-col justify-start gap-y-2"}>
        {/* Date & Time */}
        <div className={layout === "grid" ? "text-m-s flex gap-x-2" : "flex gap-x-2"}>
          <p>{formattedDate}</p>
        </div>

        <h3 className={layout === "grid" ? "text-m-l mb-2 h-12" : "text-m-xl"}>
          {formData.eventName.length > 30 ? formData.eventName.substring(0, 30) + '...' : formData.eventName}
        </h3>

        <div className="flex justify-between">
          {/* Location */}
          <div className={layout === "grid" ? "text-m-s flex items-center gap-x-2" : "flex items-center space-x-2"}>
            <GoLocation />
            <p>{formData.eventLocation}</p>
          </div>

          {/* Participants */}
          {isParticipantsVisible && (
            <div className="flex">
              {formData.guess
                .slice(0, formData.guess.length > 4 ? 3 : 4)
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
              {formData.guess.length > 4 && (
                <div>+{formData.guess.length - 3}</div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
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
