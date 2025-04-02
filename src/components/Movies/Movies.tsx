"use client";

import { QuestionsApi } from "@/api";
import { GenericMovie, UiState } from "@/types";
import { useEffect, useState } from "react";
import styles from "./Movies.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Movie from "../Movie/Movie";
import NotFound from "../NotFound/NotFound";

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
          12
        );
        if (!movieResponse) {
          setUiState("error");
          return;
        }
        setLimit(movieResponse.limit);
        setTotal(movieResponse.total);
        listOfMovies = movieResponse.data.movies;
      } else {
        const movieResponse = await api.getMovies(page, 12);
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
  }, [page, genre_slug]);

  return (
    <div className={styles.movies}>
      {uiState === "loading" && <h2>Loading Movies...</h2>}
      {uiState === "error" && <NotFound/>}
      {uiState === "data" && (
        <h2>{genre_slug ? `${genreName} Movies:` : "Movies:"}</h2>
      )}
      {uiState === "loading" && (
        <div>
          <ul className={styles.loadingSection}>
            {Array.from({ length: 12 }).map((_, movieIndex) => (
              <li key={movieIndex}>
                <div className={styles.fakeMovie} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {uiState === "data" && (
        <div>
          <ul className={styles.movieSection}>
            {movies?.map((movie, index) => (
              <li key={index}>
                <Movie movie={movie} />
              </li>
            ))}
          </ul>
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
