import React, { useState , useEffect } from 'react';
import FilmCollection from './FilmCollection';
import DummyFilmData from '@/data/DummyFilmData';
import { fetchTrending } from '@/lib/tmdb/api';

const MyWatchlist = () => {
    const [mostWatchlistedData, setMostWatchlistedData] = useState(DummyFilmData);

        // call api, fetch data
        useEffect(() => {
            getMostWatchlisted();
        }, []);

        // fetch data for most watchlisted films
        const getMostWatchlisted = async () => {
            const data = await fetchTrending(); // will be using tmdb trending api for now until more users are there
            if (data && data.results) setMostWatchlistedData(data.results);
            setLoading(false);
        }

    return (
        <div id="films">
            {/* {title && <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>Films</h2>
            </div>} */}

            <FilmCollection 
                items={mostWatchlistedData}
                isFilterVisible={false}
                max='8'
                maxMobile='4'
            />
        </div>
    );
};

export default MyWatchlist;