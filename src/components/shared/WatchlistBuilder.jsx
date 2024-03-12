import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import dumMyEventData from '@/data/MyEventsData';

const WatchlistBuilder = () => {
    return (
        <Carousel className="w-[70%] mx-auto lg:w-[70%]">
            <CarouselContent className="">
                {dumMyEventData.map((item, id) => {
                        return (
                            <CarouselItem key={id} className="flex justify-center">
                                <Skeleton className="w-[200px] h-[300px] lg:w-[300px] lg:h-[500px]" />
                            </CarouselItem>
                        )
                    }
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default WatchlistBuilder
