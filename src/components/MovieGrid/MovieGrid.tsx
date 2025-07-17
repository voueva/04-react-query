import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {
        movies.map(item => {
          return <li onClick={() => onSelect(item)}>
              <div className={css.card}>
                <img
                  className={css.image}
                  src={'https://image.tmdb.org/t/p/w300' + item.poster_path}
                  alt={item.title}
                  loading="lazy"
                />  
                <h2>{item.title}</h2>
              </div>
            </li>
          })
      }
    </ul>
  );
}

export default MovieGrid;
