import type { Movie, MovieListResponse } from "../types/movie";
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Array<Movie> | undefined> => {
    try {
        const response = await axios.get<MovieListResponse>(`${API_URL}/search/movie`, {
            params: { query },
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            accept: 'application/json'
            }
        });

        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from TMDb:', error);
    }
};
