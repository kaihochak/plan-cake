const apiBaseUrl = import.meta.env.VITE_TMDB_ENDPOINT;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// static endpoints
export const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
export const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
export const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
export const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// dynamic endpoints
export const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
export const movieCreditsEndpoint = id  => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
export const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const imagePath = posterPath => posterPath ? 'https://image.tmdb.org/t/p/original' + posterPath : null;
export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;

// fallback images 
export const fallbackMoviePoster = "/assets/posters/fallbackMoviePoster.jpg";
export const fallbackPersonImage = "/assets/posters/fallbackPersonImage.jpg";


