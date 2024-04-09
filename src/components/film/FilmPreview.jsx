import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/filmPageDialog"
import { fetchFilmDetails, fetchCast, fetchSimilarMovies } from '@/lib/tmdb/api'
import { Skeleton } from "@/components/ui/skeleton"
import { fallbackPersonImage, fallbackMoviePoster, image342, image500 } from '@/lib/tmdb/config'
import { useMediaQuery } from '@react-hook/media-query'

const FilmPreview = ({ filmId, isModalOpen, setIsModalOpen }) => {
    const [loading, setLoading] = useState(true);
    const [film, setFilm] = useState(null);
    const [cast, setCast] = useState(null);
    const bp_768 = useMediaQuery('(min-width:768px)');

    let id = filmId ? filmId.toString() : null;

    // Get the film from the database
    useEffect(() => {
        getFilmData();
        // ScrollToTop();
    }, [id]);

    useEffect(() => {
        film && getCastData();
    }, [film]);

    /******************************************************************
     * API calls
     ******************************************************************/
    const getFilmData = async () => {
        const data = await fetchFilmDetails(id);
        data && setFilm(data);
        setLoading(false);
    }

    const getCastData = async () => {
        const data = await fetchCast(id);
        data && data?.cast && setCast(data.cast);
    }

    /******************************************************************
     * Page layout
     * ******************************************************************/

    const FilmInfo = () => {
        return (
            <div className='flex '>
                {/* Info */}
                <div className='flex flex-col md:flex-row gap-4 lg:gap-10 justify-center'>
                    {/* image */}
                    <div className='justify-start p-6 '>
                        <img src={film?.poster_path ? image500(film.poster_path) : fallbackMoviePoster} alt={film?.title} className='min-w-[150px] md:min-w-[200px] lg:min-w-[250px]' />
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-2 lg:gap-4">
                        {/* title */}
                        <h1 className="text-m-xl md:text-[30px] lg:text-[38px] md:mt-4 mt-2 font-bold ">{film?.original_title}</h1>
                        {/* relase date, runtime, genres */}
                        <p className='text-m-s md:text-[15px]'>
                            {film?.release_date?.split("-")[0] || "N/A"}{" | "}{film?.runtime} min |
                            {film?.genres?.map((genre, index) => (
                                <span key={index}> {genre.name}{index < film.genres.length - 1 && ' '}</span>
                            ))}
                        </p>
                        <p className='text-m-s md:text-[15px] mb-2'>{film?.overview}</p>
                        <div className='flex flex-col flex-shrink-0 w-full'>
                            <h2 className='mb-1 font-bold text-m-l'>Cast</h2>
                            <div className="overflow-x-auto scrollbar-hide">
                                <div className='flex py-2 gap-x-3'>
                                <p className='text-m-s md:text-[15px]'>{
                                    cast?.slice(0,10).map((person, id, array) => (
                                        <span key={id}>
                                            <a href="" className="underline cursor-pointer underline-offset-4">
                                            {person?.original_name}
                                            </a>
                                            {id < array.length - 1 ? ', ' : ''}
                                        </span>
                                        ))
                                    } 
                                 <br />...
                                </p>
                                </div>
                            </div>
                        </div>
                        <div><a className="text-m-s md:text-[15px] text-center underline cursor-pointer underline-offset-4" href={`/film/${film.id}`}>View details</a></div>
                    </div>
                </div>

            </div>
        )
    }
    let bannerSrc = image500(film?.poster_path);
    if (bp_768) bannerSrc = image500(film?.backdrop_path);

    /******************************************************************
    * layout
    ******************************************************************/

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            {/* Content */}
            <DialogContent className="bg-primary text-secondary max-w-[80%] lg:w-[50%] h-[80%] md:h-auto overflow-scroll">
                <div>
                    {/* Film Info */}
                    {loading ?
                        <div className='flex flex-col gap-6 mt-20 justify-items-center'>
                            <Skeleton className="w-[250px] h-[400px] rounded-xl md:w-[800px] md:h-[350px]" />
                            <Skeleton className="w-[250px] h-[20px] rounded-xl md:w-[800px] md:h-[30px]" />
                            <Skeleton className="w-[250px] h-[20px] rounded-xl md:w-[800px] md:h-[30px]" />
                            <Skeleton className="w-[250px] h-[20px] rounded-xl md:w-[800px] md:h-[30px]" />
                            <div className='flex flex-row gap-4 md:gap-10 '>
                                <Skeleton className="w-[80px] h-[80px] rounded-full" />
                                <Skeleton className="w-[80px] h-[80px] rounded-full" />
                                <Skeleton className="w-[80px] h-[80px] rounded-full" />
                            </div>
                            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0' >
                                <Skeleton className="w-[120px] h-[200px] rounded-xl  md:w-[180px] md:h-[240px]" />
                                <Skeleton className="w-[120px] h-[200px] rounded-xl  md:w-[180px] md:h-[240px]" />
                                <Skeleton className="w-[120px] h-[200px] rounded-xl  md:w-[180px] md:h-[240px]" />
                                <Skeleton className="w-[120px] h-[200px] rounded-xl  md:w-[180px] md:h-[240px]" />
                            </div>

                        </div> :
                        <FilmInfo />}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FilmPreview