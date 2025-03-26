'use client';

import { QuestionsApi } from '@/api';
import { GenericMovie, Paginated, UiState } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Movies.module.css';
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import Movie from '../Movie/Movie';


export default function Movies({ genre_id = null }: { genre_id?: number | null }) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [movies, setMovies] = useState<Array<GenericMovie> | null>(
    null,
  );
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
 
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  const movieRows = [];
  if (movies) {
    for (let i = 0; i < movies.length; i += 3) {
      movieRows.push(movies.slice(i, i + 3));
    }
  }

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      let listOfMovies: GenericMovie[];

      if (genre_id) {
        const movieResponse = await api.getMoviesForGenre(page, genre_id, 9);
        if (!movieResponse) {
          setUiState('error');
          return;
        }
        setLimit(movieResponse.limit);
        setTotal(movieResponse.total);
        listOfMovies = movieResponse.data.movies;
      } else {
        const movieResponse = await api.getMovies(page, 9);
        if (!movieResponse) {
          setUiState('error');
          return;
        }
        setLimit(movieResponse.limit);
        setTotal(movieResponse.total);
        listOfMovies = movieResponse.data;
      }
      
      setUiState('data');
      setMovies(listOfMovies);
    }
    fetchData();
  }, [page]);


  return (
    <div>
      <h2>Movies:</h2>

      {uiState === 'loading' && <p>Sæki myndir</p>}
      {uiState === 'error' && <p>Villa við að sækja myndir</p>}
      {uiState === 'data' && (
        <div className={styles.movieSection}>
          {movieRows.map((row, rowIndex) => (
            <ul key={rowIndex} className={styles.movieRow}>
              {row.map((movie, index) => (
                <li key={(rowIndex+1) * (index+1)}>
                  <Movie movie={movie} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
      <ul className={styles.buttons}>
        {page > 1 && <li className={styles.buttonPrev}><Link className={styles.button} href={`/movies?page=${page-1}`}>prev</Link></li>}
        {page < total / limit && <li className={styles.buttonNext}><Link className={styles.button} href={`/movies?page=${page+1}`}>next</Link></li>}
      </ul>
    </div>
  );
}
