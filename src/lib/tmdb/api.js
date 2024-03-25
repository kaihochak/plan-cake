import axios from "axios";
import { latestMoviesEndpoint, movieCreditsEndpoint, movieDetailsEndpoint, searchMoviesEndpoint, similarMoviesEndpoint, trendingMoviesEndpoint, upcomingMoviesEndpoint } from "./config.js";

// home screen apis
export const fetchTrending = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchTopRated = () => {
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchUpcoming = () => {
    return apiCall(upcomingMoviesEndpoint);
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
export const searchFilms = (params) => {
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

