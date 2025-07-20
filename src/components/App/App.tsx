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
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [wasSearched, setWasSearched] = useState<boolean>(false);

  const {
    data = {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    setWasSearched(true);
  };

  useEffect(() => {
    if (wasSearched && !isLoading && data.results?.length === 0 && !isError) {
      toast.error('No movies found for your request.');
    }
  }, [data, isLoading, isError, wasSearched]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && data.results && data.results.length > 0 && (
        <>
          {data.total_pages > 1 && (
            <ReactPaginate 
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              forcePage={currentPage - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}

          <MovieGrid movies={data.results} onSelect={setActiveMovie} />
        </>
      )}

      {activeMovie && <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />}
      <Toaster />
    </>
  );
}
