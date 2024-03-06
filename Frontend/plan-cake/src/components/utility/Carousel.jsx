// Import Swiper React components
// https://swiperjs.com/react#swiper-props
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const Carousel = ({ items }) => {
    const [swiper, setSwiper] = useState(null); // hold the Swiper to interact with the Swiper API
    
    // responsive breakpoints
    const bp_768 = useMediaQuery('(min-width:768px)');
    const space = bp_768 ? 30 : 0;
    // const isPagination = bp_768 ? { clickable: true } : false;
    const isNavigation = bp_768 ? true : false;
    const slidesPerView = bp_768 ? 3 : 2;
    const stretch = bp_768 ? 0 : -20;
    const depth = bp_768 ? 150 : 100;
    
    return  (
        <div >
            <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                spaceBetween={space} // Space between slides
                pagination={false} // Enable and make pagination dots clickable
                navigation={isNavigation} // Enable navigation arrows
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={slidesPerView} // Number of slides to show at once
                effect="coverflow" // Use the coverflow effect for a 3D look
                coverflowEffect={{
                    rotate: 0, // Disable rotation for the coverflow effect
                    stretch: stretch, // Stretch space between slides
                    depth: depth, // Depth offset for the coverflow effect
                    modifier: 1, // Effect multiplier to control the effect's strength
                    slideShadows: true, // Enable slide shadows
                }}
                onSwiper={setSwiper} // Store the Swiper instance when it's initialized
                onSlideChange={console.log("")} // Triggered when the active slide changes
            >
                {items.map((item, id) => (
                    <SwiperSlide 
                        key={id} 
                        className={`${bp_768 ? "aspect-w-[1.3] aspect-h-[0.6]" : "aspect-w-[1] aspect-h-[0.75]" }`
                    }>
                        <img className="object-cover object-center rounded-lg" src={item.image} alt={item.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Carousel;
