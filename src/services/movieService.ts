import type { Movie } from "../types/movie";
import axios from 'axios';

export interface MovieListResponse {
    page: number;
    results: Array<Movie>;
    total_pages: number;
    total_results: number;
}

const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page: number): Promise<MovieListResponse> => {
    try {
        const response = await axios.get<MovieListResponse>(`${API_URL}/search/movie`, {
            params: { query, page },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                accept: 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data from TMDb:', error);
        throw error;
    }
};
