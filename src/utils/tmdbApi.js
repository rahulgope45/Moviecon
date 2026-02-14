import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get new releases (now playing)
export const getNewReleases = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    throw error;
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits,similar`,
    {
      cache: "no-store", // always fresh (like getServerSideProps)
    }
  );

  if (!res.ok) {
    console.error("TMDB Error:", res.status);
    throw new Error("Failed to fetch movie");
  }

  return await res.json();
};

// Get similar movies
export const getSimilarMovies = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

// Helper to construct image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};