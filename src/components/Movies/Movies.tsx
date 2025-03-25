'use client';

import { QuestionsApi } from '@/api';
import { GenericMovie, Paginated, UiState } from '@/types';
import { useEffect, useState } from 'react';

import { useSearchParams } from "next/navigation";
import Link from 'next/link';


export default function Movies() {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [movies, setMovies] = useState<Paginated<GenericMovie> | null>(
    null,
  );
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
 
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const movieResponse = await api.getMovies(page);

      if (!movieResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setMovies(movieResponse);
        setLimit(movieResponse.limit);
        setTotal(movieResponse.total);
        console.log(movieResponse);
      }
    }
    fetchData();
  }, [page]);


  return (
    <div>
      <h2>Movies:</h2>

      {uiState === 'loading' && <p>Sæki myndir</p>}
      {uiState === 'error' && <p>Villa við að sækja myndir</p>}
      {uiState === 'data' && (
        <ul>
          {movies?.data.map((movie, index) => (
            <li key={index}>
                <div>
                    <img src={movie.img_url} style={{ maxWidth: "250px", height: "auto" }}/>
                    <div>
                        <p>{movie.title}</p>
                        <p>{movie.year}</p>
                        <ul>
                            {movie.genres.map((genre, index) => (
                                <li key={index}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
          ))}
        </ul>
      )}
      <ul>
        {page > 1 && <li><Link href={`/movies?page=${page-1}`}>prev</Link></li>}
        {page < total / limit && <li><Link href={`/movies?page=${page+1}`}>next</Link></li>}
      </ul>
    </div>
  );
}
