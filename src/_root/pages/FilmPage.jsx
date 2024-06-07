import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import FilmCollection from '@/components/shared/FilmCollection'
import { useMediaQuery } from '@react-hook/media-query'
import { fetchFilmDetails, fetchCast, fetchSimilarMovies, fetchCrew } from '@/lib/tmdb/api'
import { fallbackPersonImage, fallbackMoviePoster, image342, image500, imagePath } from '@/lib/tmdb/config'
// import ScrollToTop from '@/components/utility/ScrollToTop'

const FilmPage = () => {
  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState(null);
  const [cast, setCast] = useState(null);
  const [crew, setCrew] = useState(null);
  const [similarFilms, setSimilarFilms] = useState(null);
  const bp_768 = useMediaQuery('(min-width:768px)');
  const { id } = useParams();   // Get the film id from the URL

  useEffect(() => {
    console.log("FilmPage useEffect id: ", id);
  }, [id]);

  const getFilmData = async () => {
    const data = await fetchFilmDetails(id);
    data && setFilm(data);
    setLoading(false);
  }

  const getCastData = async () => {
    const data = await fetchCast(id);
    data && data?.cast && setCast(data.cast);
  }

  const getCrewData = async () => {
    const data = await fetchCrew(id);
    data && data?.crew && setCrew(data.crew);
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
    film && getCrewData();
    film && getSimilarFilms();
  }, [film]);

  // banner changes based on screen size
  const FilmInfo = () => {
    return (
      <div className='inset-0 w-full mb-4 md:mb-0'>
        {/* image & title*/}
        <div className='film-img-container'>
          {bannerSrc && <img src={bannerSrc} alt={film?.title} className='film-img' />}
          {/* fade mask */}
          <div className='film-img-mask'></div>
        </div>

        {/* Info */}
        <div className='relative flex -mb-24 gap-x-8 -top-20 sm:-top-36 sm:-mb-36 md:-top-72 md:-mb-60'>
          {/* image */}
          {bp_768 &&
            <div className='flex justify-start'>
              <img src={film?.poster_path ? image500(film.poster_path) : fallbackMoviePoster} alt={film?.title} className='min-w-[200px] md:min-w-[250px]' />
            </div>
          }
          <div className="flex mx-auto">
            <div className='flex flex-col justify-center gap-y-1 md:gap-y-2 '>
              {/* title */}
              <h1 className="text-m-l md:text-[30px] md:my-4 my-2 font-bold ">{film?.title === film.original_title ? film.title : film.original_title + " (" + film.title + ")"}</h1>
              {/* <p className='text-m-m md:text-[15px]'>
                Directed by <a href="">{crew?.filter(member => member.job === "Director").map(director => director.name).join(", ")}</a>
              </p> */}
              <p className='text-m-m md:text-[15px]'>
                Directed by {
                  crew?.filter(member => member.job === "Director")
                    .map((director, index, array) => (
                      <span key={director.id}>
                        <a href={`/directors/${director.id}`} className="underline cursor-pointer underline-offset-4">
                          {director.name}
                        </a>
                        {index < array.length - 1 ? ', ' : ''}
                      </span>
                    ))
                }
              </p>

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
    )
  }

  return (
    <div className='justify-between pb-20 film-container'>
      <div className='film-page-inner'>
        {/* Film Info */}
        {loading ?
          <div className='flex flex-col gap-6 mt-20 justify-items-center'>
            <Skeleton className="w-[250px] h-[400px] rounded-sm md:w-[800px] md:h-[350px]" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm md:w-[800px] md:h-[30px]" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm md:w-[800px] md:h-[30px]" />
            <Skeleton className="w-[250px] h-[20px] rounded-sm md:w-[800px] md:h-[30px]" />
            <div className='flex flex-row gap-4 md:gap-10 '>
              <Skeleton className="w-[80px] h-[80px] rounded-full" />
              <Skeleton className="w-[80px] h-[80px] rounded-full" />
              <Skeleton className="w-[80px] h-[80px] rounded-full" />
            </div>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0' >
              <Skeleton className="w-[120px] h-[200px] rounded-sm  md:w-[180px] md:h-[240px]" />
              <Skeleton className="w-[120px] h-[200px] rounded-sm  md:w-[180px] md:h-[240px]" />
              <Skeleton className="w-[120px] h-[200px] rounded-sm  md:w-[180px] md:h-[240px]" />
              <Skeleton className="w-[120px] h-[200px] rounded-sm  md:w-[180px] md:h-[240px]" />
            </div>

          </div> :
          <FilmInfo />}

        {/* Cast */}
        <Cast />

        {/* Similar Films */}
        <div>
          <h2 className='mb-2 font-bold text-m-l md:mb-10'>Similar Films</h2>
          {similarFilms && <FilmCollection
            items={similarFilms}
            isFilterVisible={false}
            max='8'
            maxMobile='4' />
          }
        </div>

        {/* In Current Events */}
        <div>
          <h2 className='mb-2 font-bold text-m-l'>You might also be interested in...</h2>
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
// titile: "Road House"
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