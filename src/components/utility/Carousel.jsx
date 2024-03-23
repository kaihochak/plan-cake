// Import Swiper React components
// https://swiperjs.com/react#swiper-props
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { fallbackMoviePoster, image500 } from '@/lib/tmdb/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const Carousel = ({ items }) => {
    const [swiper, setSwiper] = useState(null); // hold the Swiper to interact with the Swiper API

    // responsive breakpoints
    let bp_768 = useMediaQuery('(min-width:768px)');
    let space = bp_768 ? 0 : 0;
    let isNavigation = bp_768 ? true : false;
    let slidesPerView = bp_768 ? 2 : 2;
    let stretch = bp_768 ? 0 : 0;
    let depth = bp_768 ? 50 : 120;

    return (
        <div className="flex-center">
            <Swiper
                className="w-[320px] xs:w-[350px] sm:w-[500px] md:w-[680px] lg:w-[900px] xl:[1200px]"
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
                onSlideChange={()=>{}} // Triggered when the active slide changes
            >
                {items.map((item, id) => (
                    <SwiperSlide 
                        key={id}
                        className={`${bp_768 ? "aspect-w-[1] aspect-h-[0.75]" : "aspect-w-[1] aspect-h-[0.75]"}`
                    }>
                        <Link
                            to={`/film/${item.id}`}>
                            <img 
                                className="object-cover object-center rounded-lg w-full h-full" 
                                src={item?.poster_path ? image500(item.poster_path) : fallbackMoviePoster} alt={item.title} 
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Carousel;


// API response template 
// 
// adult: false
// backdrop_path: "/4k46cQr1msDErfsEqZJVT10oKoH.jpg"
// genre_ids: (2) [28, 53]
// id: 359410
// media_type: "movie"
// original_language: "en"
// original_title: "Road House"
// overview: "Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems."
// popularity: 340.262
// poster_path: "/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg"
// release_date: "2024-03-08"
// title: "Road House"
// video: false
// vote_average: 6.679
// vote_count: 148