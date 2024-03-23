import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import FilmCollection from '@/components/shared/FilmCollection'
import { useMediaQuery } from '@react-hook/media-query'
import { fetchFilmDetails, fetchCast, fetchSimilarMovies } from '@/lib/tmdb/api'
import { image342, image500, imagePath } from '@/lib/tmdb/config'
// import ScrollToTop from '@/components/utility/ScrollToTop'

const FilmPage = () => {
  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState(null);
  const [cast, setCast] = useState(null);
  const [similarFilms, setSimilarFilms] = useState(null);
  const bp_768 = useMediaQuery('(min-width:768px)');
  const { id } = useParams();   // Get the film id from the URL


  // const { data: film, isPending: isLoading } = useGetFilmById(id);
  // console.log('film', film);

  const getFilmData = async () => {
    const data = await fetchFilmDetails(id);
    data && setFilm(data);
    setLoading(false);
  }

  const getCastData = async () => {
    const data = await fetchCast(id);
    data && data?.cast && setCast(data.cast);
  }

  // fetch data for similar films
  const getSimilarFilms = async () => {
    const data = await fetchSimilarMovies(id);
    data && data.results && setSimilarFilms(data.results);
  };



  // Get the film from the database
  useEffect(() => {
    getFilmData();
    // ScrollToTop();
  }, [id]);


  useEffect(() => {
    film && getCastData();
    film && getSimilarFilms();
  }, [film]);



  // banner changes based on screen size
  const FilmInfo = () => {
    return (
      <div className='inset-0 w-full mb-4 md:mb-0'>
        {/* image & title*/}
        <div className='film-img-container'>
          {bannerSrc && <img src={bannerSrc} alt={film?.original_title} className='film-img' />}
          {/* fade mask */}
          <div className='film-img-mask'></div>
        </div>

        {/* Info */}
        <div className='relative flex gap-x-8 -top-30 md:-top-52 md:mb-[-150px]'>
          {/* image */}
          {bp_768 &&
            <div className='flex justify-start'>
              <img src={image500(film?.poster_path)} alt={film?.title} className='min-w-[200px] md:min-w-[250px]' />
            </div>
          }
          <div className="flex mx-auto">
            <div className='flex flex-col justify-center gap-y-1 md:gap-y-2 '>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
  let bannerSrc = image500(film?.poster_path);
  if (bp_768) bannerSrc = imagePath(film?.backdrop_path);

  // Cast
  const Cast = () => {

    return (
      <div className='flex flex-col flex-shrink-0 w-full md:mb-10'>
        <h2 className='text-m-l mb-2 font-bold'>Cast</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className='flex gap-x-3 py-2'>
            {cast?.map((person, index) => (
              <div key={index} className="mr-2 px-1 items-center">
                {/* profile pic */}
                {/* <div className="overflow-hidden items-center h-32 w-32 rounded-full shadow-md object-cover"> */}
                <div className="min-w-[90px]">
                  <img src={image342(person?.profile_path)} className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full object-cover" />
                </div>
                {/* character */}
                <p className="text-s mt-1 pt-1" >
                  {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                </p>
                {/* name */}
                <p className="text-xs mt-1" >
                  {person?.original_name.length > 12 ? person?.original_name.slice(0, 12) + '...' : person?.original_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='film-container justify-between pb-20'>
      <div className='film-page-inner'>
        {/* Film Info */}
        {loading ?
          <div className='flex flex-col gap-2'>
            <Skeleton className="w-[250px] h-[400px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
          </div> :
          <FilmInfo />}

        {/* Cast */}
        <Cast />

        {/* Similar Films */}
        <div>
          <h2 className='text-m-l mb-2 font-bold md:mb-10'>Similar Films</h2>
          {similarFilms && <FilmCollection
            items={similarFilms}
            isFilterVisible={false}
            max='8'
            maxMobile='4' />
          }
        </div>

        {/* In Current Events */}
        <div>
          <h2 className='text-m-l mb-2 font-bold'>You might also be interested in...</h2>
        </div>

      </div>
    </div>

  )
}

export default FilmPage


// API Response template
// adult: false
// backdrop_path: "/oe7mWkvYhK4PLRNAVSvonzyUXNy.jpg"
// belongs_to_collection: {id: 224976, name: 'Road House Collection', poster_path: '/cadfcktKwvKMpg9FFvCTTzj9pFY.jpg', backdrop_path: '/3sC0DdygqYHesLqzFT8etDmDTAX.jpg'}
// budget: 85000000
// genres: (2) [{…}, {…}]
// homepage: "https://www.amazon.com/gp/video/detail/B0CH5YQPZQ"
// id: 359410
// imdb_id: "tt3359350"
// original_language: "en"
// original_title: "Road House"
// overview: "Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems."
// popularity: 243.044
// poster_path: "/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg"
// production_companies: (2) [{…}, {…}]
// production_countries: [{…}]
// release_date: "2024-03-08"
// revenue: 0
// runtime: 121
// spoken_languages: [{…}]
// status: "Released"
// tagline: "Take it outside."
// title: "Road House"
// video: false
// vote_average: 6.76
// vote_count: 131