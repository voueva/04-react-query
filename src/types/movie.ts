export interface MovieListResponse {
    page: number;
    results?: Array<Movie>;
    total_pages: number;
    total_results: number 
}
export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}
