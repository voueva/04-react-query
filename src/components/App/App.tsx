import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setShowError(false);
    setIsLoading(true);
    setMovies([]);

    try {
      const newMovieList = await fetchMovies(query);

      if (!newMovieList || newMovieList.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        setMovies(newMovieList);
      }
    } catch {
      setShowError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {showError && <ErrorMessage />}
      {!isLoading && !showError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setActiveMovie} />
      )}
      {activeMovie && <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />}

      <Toaster />
    </>
  );
}
