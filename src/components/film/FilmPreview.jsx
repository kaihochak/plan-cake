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
            <div className='flex'>
                {/* Info */}
                <div className='flex gap-4 md:gap-6 lg:gap-10'>
                    {/* image */}
                    {bp_768 &&
                        <div className='flex justify-start'>
                            <img src={film?.poster_path ? image500(film.poster_path) : fallbackMoviePoster} alt={film?.title} className='min-w-[200px] md:min-w-[250px]' />
                        </div>
                    }
                    {/* Info */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-10">
                        {/* title */}
                        <h1 className="text-m-l md:text-[30px] md:my-4 my-2 font-bold ">{film?.original_title}</h1>
                        {/* relase date, runtime, genres */}
                        <p className='text-m-m md:text-[15px]'>
                            {film?.release_date?.split("-")[0] || "N/A"}{" | "}{film?.runtime} min |
                            {film?.genres?.map((genre, index) => (
                                <span key={index}> {genre.name}{index < film.genres.length - 1 && ' '}</span>
                            ))}
                        </p>
                        <p className='text-m-m md:text-[15px]'>{film?.overview}</p>
                        <div className='flex flex-col flex-shrink-0 w-full md:mb-10'>
                            <h2 className='mb-2 font-bold text-m-l'>Cast</h2>
                            <div className="overflow-x-auto scrollbar-hide">
                                <div className='flex py-2 gap-x-3'>
                                    {cast?.map((person, index) => (
                                        <div key={index} className="items-center px-1 mr-2">
                                            {/* profile pic */}
                                            {/* <div className="items-center object-cover w-32 h-32 overflow-hidden rounded-full shadow-md"> */}
                                            <div className="min-w-[90px]">
                                                <img src={person?.profile_path ? image342(person.profile_path) : fallbackPersonImage} className="w-[90px] h-[90px] md:w-[120px] rounded-full object-cover" />
                                            </div>
                                            {/* character */}
                                            <p className="pt-1 mt-1 text-s" >
                                                {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                                            </p>
                                            {/* name */}
                                            <p className="mt-1 text-xs" >
                                                {person?.original_name.length > 12 ? person?.original_name.slice(0, 12) + '...' : person?.original_name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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
            <DialogContent className="bg-primary text-secondary">
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