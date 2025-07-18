import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [wasSearched, setWasSearched] = useState<boolean>(false); // новое

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', query],
    queryFn: () => fetchMovies(query),
    enabled: query !== '',
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setWasSearched(true);
  };

  useEffect(() => {
    if (wasSearched && !isLoading && movies.length === 0 && !isError) {
      toast.error('No movies found for your request.');
    }
  }, [movies, isLoading, isError, wasSearched]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setActiveMovie} />
      )}
      {activeMovie && (
        <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
      )}

      <Toaster />
    </>
  );
}
