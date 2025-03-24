'use client';

import { QuestionsApi } from '@/api';
import { PaginatedGenre, UiState } from '@/types';
import { useEffect, useState } from 'react';

import { useSearchParams } from "next/navigation";


export default function Movies({ genre_id }: { genre_id: number }) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [genre, setGenre] = useState<PaginatedGenre | null>(
    null,
  );
 
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const movieResponse = await api.getMoviesForGenre(parseInt(page), genre_id);

      if (!movieResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setGenre(movieResponse);
      }
    }
    fetchData();
  }, [page, genre_id]);


  return (
    <div>
      <h2>Movies:</h2>

      {uiState === 'loading' && <p>Sæki myndir</p>}
      {uiState === 'error' && <p>Villa við að sækja myndir</p>}
      {uiState === 'data' && (
        <ul>
          {genre?.data.movies.map((movie, index) => (
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