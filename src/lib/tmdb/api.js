import axios from "axios";
import { movieCreditsEndpoint, movieDetailsEndpoint, similarMoviesEndpoint, trendingMoviesEndpoint } from "./config.js";

// home screen apis
export const fetchTrending = () => {
    return apiCall(trendingMoviesEndpoint);
}
// export const fetchWatchlist = () => {
//     return apiCall(upcomingMoviesEndpoint);
// }
export const fetchTopRated = () => {
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchUpcoming = () => {
    return apiCall(upcomingMoviesEndpoint);
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

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;

// fallback images 
export const fallbackMoviePoster = "/assets/images/fallbackMoviePoster.jpg";
export const fallbackPersonImage = "/assets/images/fallbackPersonImage.jpg";