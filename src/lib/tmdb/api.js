import axios from "axios";
import { latestMoviesEndpoint, movieCreditsEndpoint, movieDetailsEndpoint, movieGenresEndpoint, searchMoviesEndpoint, similarMoviesEndpoint, trendingMoviesEndpoint, upcomingMoviesEndpoint } from "./config.js";

// event screen apis
export const fetchMovieGenres = () => {
    return apiCall(movieGenresEndpoint);
}

// home screen apis
export const fetchTrending = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchTopRated = () => {
    return apiCall(topRatedMoviesEndpoint);
}
export async function fetchUpcoming({ pageParam = 1 }) {
    return apiCall(upcomingMoviesEndpoint(pageParam));
}
export const fetchLatest = () => {
    return apiCall(latestMoviesEndpoint);
}

// film screen apis
export const fetchFilmDetails = (FilmId) => {
    return apiCall(movieDetailsEndpoint(FilmId));
}
export const fetchCast = (FilmId) => {
    return apiCall(movieCreditsEndpoint(FilmId));
}
export const fetchCrew = (FilmId) => {
    return apiCall(movieCreditsEndpoint(FilmId));
}
export const fetchSimilarMovies = (FilmId) => {
    return apiCall(similarMoviesEndpoint(FilmId));
}

// person screen apis
export const fetchPersonDetails = (personId) => {
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonFilms = (personId) => {
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const fetchSearchResults = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}

// API CALL Method 
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

