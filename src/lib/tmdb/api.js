import axios from "axios";
import { discoverMoviesEndpoint, latestMoviesEndpoint, movieCreditsEndpoint, movieDetailsEndpoint, movieGenresEndpoint, searchMoviesEndpoint, similarMoviesEndpoint, trendingMoviesEndpoint, upcomingMoviesEndpoint } from "./config.js";

export const fetchMovieGenres = () => {
    return apiCall(movieGenresEndpoint);
}

export const fetchTrending = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchTopRated = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchLatest = () => {
    return apiCall(latestMoviesEndpoint);
}

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

export const fetchPersonDetails = (personId) => {
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonFilms = (personId) => {
    return apiCall(personMoviesEndpoint(personId));
}

export const fetchSearchResults = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}

export const fetchDiscoverMovies = (params) => {
    return apiCall(discoverMoviesEndpoint, params);
}

export const fetchUpcoming = (params) => {
    return apiCall(upcomingMoviesEndpoint, params);
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

