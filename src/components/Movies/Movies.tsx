'use client';

import { QuestionsApi } from '@/api';
import { GenericMovie, Paginated, UiState } from '@/types';
import { useEffect, useState } from 'react';

import { useSearchParams } from "next/navigation";


export default function Movies() {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [movies, setMovies] = useState<Paginated<GenericMovie> | null>(
    null,
  );
 
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      let movieResponse = await api.getMovies(parseInt(page));

      if (!movieResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setMovies(movieResponse);
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
    </div>
  );
}
