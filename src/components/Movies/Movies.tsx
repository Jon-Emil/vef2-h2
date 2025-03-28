"use client";

import { QuestionsApi } from "@/api";
import { GenericMovie, Paginated, UiState } from "@/types";
import { useEffect, useState } from "react";
import styles from "./Movies.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Movie from "../Movie/Movie";
import { useContextValues } from "../ContextHolder/ContextHolder";

export default function Movies({
  genre_slug = null,
}: {
  genre_slug?: string | null;
}) {
  const [uiState, setUiState] = useState<UiState>("loading");
  const [movies, setMovies] = useState<Array<GenericMovie> | null>(null);
  const [limit, setLimit] = useState<number>(9);
  const [total, setTotal] = useState<number>(0);
  const [genreName, setGenreName] = useState<string>("");
  const { movieAmount, setMovieAmount } = useContextValues();

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  let loadingMovies = movieAmount ? movieAmount - 9 * page : 9;
  let loadingRows = Math.ceil(loadingMovies / 3);

  // temp
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const movieRows = [];
  if (movies) {
    for (let i = 0; i < movies.length; i += 3) {
      movieRows.push(movies.slice(i, i + 3));
    }
  }

  useEffect(() => {
    async function fetchData() {
      await sleep(5000); // fake load time for dev
      const api = new QuestionsApi();
      let listOfMovies: GenericMovie[];

      if (genre_slug) {
        const allGenres = await api.getAllGenres();
        if (!allGenres) {
          setUiState("error");
          return;
        }
        const genreItem = allGenres.data.find(
          (genreItem) =>
            genreItem.name.replace(/ /g, "-").toLowerCase() === genre_slug
        );
        if (!genreItem) {
          setUiState("error");
          return;
        }
        setGenreName(genreItem.name);
        const movieResponse = await api.getMoviesForGenre(
          page,
          genreItem.id,
          9
        );
        if (!movieResponse) {
          setUiState("error");
          return;
        }
        setLimit(movieResponse.limit);
        setTotal(movieResponse.total);
        setMovieAmount(movieResponse.total);
        listOfMovies = movieResponse.data.movies;
      } else {
        const movieResponse = await api.getMovies(page, 9);
        if (!movieResponse) {
          setUiState("error");
          return;
        }
        setLimit(movieResponse.limit);
        setTotal(movieResponse.total);
        listOfMovies = movieResponse.data;
      }

      setUiState("data");
      setMovies(listOfMovies);
    }
    fetchData();
  }, [page]);

  return (
    <div>
      {uiState === "loading" && (
        <div>
          <h2>Loading Movies...</h2>
          <div className={styles.movieSection}>
            {Array.from({ length: loadingRows }).map((_, index) => (
              <ul key={index} className={styles.fakeRow}>
                {Array.from({ length: 3 }).map((_, movieIndex) => (
                  <li key={movieIndex + index}>
                    <div className={styles.fakeMovie} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
      {uiState === "error" && <p>Villa við að sækja myndir</p>}
      {uiState === "data" && (
        <div>
          <h2>{genre_slug ? `${genreName} Movies:` : "Movies:"}</h2>
          <div className={styles.movieSection}>
            {movieRows.map((row, rowIndex) => (
              <ul key={rowIndex} className={styles.movieRow}>
                {row.map((movie, index) => (
                  <li key={(rowIndex + 1) * (index + 1)}>
                    <Movie movie={movie} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
      <ul className={styles.buttons}>
        {page > 1 && (
          <li className={styles.buttonPrev}>
            <Link className={styles.button} href={`/movies?page=${page - 1}`}>
              prev
            </Link>
          </li>
        )}
        {page < total / limit && (
          <li className={styles.buttonNext}>
            <Link className={styles.button} href={`/movies?page=${page + 1}`}>
              next
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
